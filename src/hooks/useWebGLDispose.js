'use client';

import { useEffect } from 'react';

/**
 * Traverses a Three.js scene/group and explicitly disposes 
 * geometries, materials, and attached textures from GPU VRAM.
 */
export function useWebGLDispose(ref) {
  useEffect(() => {
    return () => {
      const root = ref?.current;
      if (!root) return;

      root.traverse((obj) => {
        if (!obj.isMesh) return;

        // 1. Dispose Geometry buffer
        if (obj.geometry) {
          obj.geometry.dispose();
        }

        // 2. Dispose Material(s) and bound texture maps
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => disposeMaterial(mat));
          } else {
            disposeMaterial(obj.material);
          }
        }
      });
    };
  }, [ref]);
}

function disposeMaterial(material) {
  if (!material) return;

  // Scan all material keys for bound textures (map, normalMap, roughnessMap, etc.)
  Object.keys(material).forEach((prop) => {
    const value = material[prop];
    if (value && typeof value.dispose === 'function' && prop !== 'parent') {
      value.dispose();
    }
  });

  material.dispose();
}
