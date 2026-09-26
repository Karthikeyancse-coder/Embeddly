"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWebGLDispose } from "@/hooks/useWebGLDispose";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Inner 3D Model Component
function RobotModel({ mousePos, prefersReducedMotion, deviceType, scrollGroupRef }) {
  // Nested group references for separate animation layers:
  // 1. scrollGroupRef: ScrollTrigger transform (stays within right-side stall)
  // 2. parallaxGroupRef: Micro mouse parallax (X: ±0.03, Y: ±0.02)
  // 3. idleGroupRef: Gentle breathing/floating
  // 4. lookGroupRef: Subtle mouse-look rotation (Y: ±6°, X: ±4°)
  const parallaxGroupRef = useRef();
  const idleGroupRef = useRef();
  const lookGroupRef = useRef();
  const headNodeRef = useRef(null);

  // Automatically cleans up GPU VRAM (geometries, materials, textures) on unmount
  useWebGLDispose(scrollGroupRef);

  const { scene } = useGLTF("/models/embeddly-bot.glb");

  // Clone scene so multiple mounts/HMR won't conflict
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    // Compute bounding box and normalize scale & ground level
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Target height: 1.95 units (reduced 15% from 2.3 for perfect breathing room)
    const maxDim = Math.max(size.x, size.y, size.z);
    const desiredHeight = 1.95;
    const scale = desiredHeight / (maxDim || 1);

    clone.scale.setScalar(scale);

    // Re-center horizontally and place feet flat at y = -1.0
    clone.position.x = -center.x * scale;
    clone.position.z = -center.z * scale;
    clone.position.y = -box.min.y * scale - 1.0;

    // Enhance materials for clean futuristic studio aesthetic
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material = child.material.clone();
          child.material.roughness = Math.min(child.material.roughness, 0.35);
          child.material.metalness = Math.max(child.material.metalness, 0.08);
          child.material.needsUpdate = true;
        }

        const name = (child.name || "").toLowerCase();
        if (name.includes("head") || name.includes("face")) {
          if (!headNodeRef.current) {
            headNodeRef.current = child.parent || child;
          }
        }
      }
    });

    return clone;
  }, [scene]);

  // Combined animation loop: Idle + Mouse Look + Parallax
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. IDLE ANIMATION (Gentle breathing and subtle mechanical floating)
    if (idleGroupRef.current) {
      if (prefersReducedMotion) {
        idleGroupRef.current.position.y = 0;
        idleGroupRef.current.rotation.z = 0;
      } else {
        const floatY = Math.sin(time * 1.2) * 0.025;
        const tiltZ = Math.sin(time * 0.8) * 0.008;
        idleGroupRef.current.position.y = floatY;
        idleGroupRef.current.rotation.z = THREE.MathUtils.damp(
          idleGroupRef.current.rotation.z,
          tiltZ,
          2.5,
          delta
        );
      }
    }

    // 2. MOUSE LOOK & ORIENTATION
    // Determine interaction strength based on device and reduced-motion setting
    let interactionStrength = 1.0;
    if (prefersReducedMotion || deviceType === "mobile") {
      interactionStrength = 0; // Disabled on mobile and reduced motion
    } else if (deviceType === "tablet") {
      interactionStrength = 0.5; // Reduced on tablet
    }

    if (lookGroupRef.current) {
      // Base orientation: slight 3/4 perspective (-0.18 rad ≈ -10.3°)
      const baseRotY = -0.18;

      // Mouse targets clamped to subtle range:
      // Y-axis rotation (looking left/right): ±6.5° (±0.11 rad)
      // X-axis rotation (looking up/down): ±4° (±0.07 rad)
      const targetRotY = baseRotY + (mousePos.current.x * 0.11 * interactionStrength);
      const targetRotX = (mousePos.current.y * 0.07 * interactionStrength);

      // Smooth damping / interpolation (lag-free, natural deceleration)
      lookGroupRef.current.rotation.y = THREE.MathUtils.damp(
        lookGroupRef.current.rotation.y,
        targetRotY,
        3.5,
        delta
      );
      lookGroupRef.current.rotation.x = THREE.MathUtils.damp(
        lookGroupRef.current.rotation.x,
        targetRotX,
        3.5,
        delta
      );

      // Articulate head node slightly if available
      if (headNodeRef.current && headNodeRef.current !== lookGroupRef.current) {
        headNodeRef.current.rotation.y = THREE.MathUtils.damp(
          headNodeRef.current.rotation.y,
          mousePos.current.x * 0.05 * interactionStrength,
          4,
          delta
        );
        headNodeRef.current.rotation.x = THREE.MathUtils.damp(
          headNodeRef.current.rotation.x,
          mousePos.current.y * 0.03 * interactionStrength,
          4,
          delta
        );
      }
    }

    // 3. MICRO POSITIONAL PARALLAX (strictly bounded: X: ±0.03, Y: ±0.02)
    if (parallaxGroupRef.current) {
      const targetPosX = mousePos.current.x * 0.03 * interactionStrength;
      const targetPosY = mousePos.current.y * 0.02 * interactionStrength;

      parallaxGroupRef.current.position.x = THREE.MathUtils.damp(
        parallaxGroupRef.current.position.x,
        targetPosX,
        3,
        delta
      );
      parallaxGroupRef.current.position.y = THREE.MathUtils.damp(
        parallaxGroupRef.current.position.y,
        targetPosY,
        3,
        delta
      );
    }
  });

  return (
    <group ref={scrollGroupRef} position={[0, -0.05, 0]}>
      {/* Parallax Group: Micro translation inside right stall */}
      <group ref={parallaxGroupRef}>
        {/* Idle Group: Subtle vertical floating and breathing */}
        <group ref={idleGroupRef}>
          {/* Look Group: Subtle mouse-look rotation */}
          <group ref={lookGroupRef} rotation={[0, -0.18, 0]}>
            <primitive object={clonedScene} />
          </group>
        </group>
      </group>

      {/* Futuristic Circular Ground Platform Ring (Stays grounded at base y = -1.0) */}
      <group position={[0, -1.0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Outer glowing border ring */}
        <mesh position={[0, 0, 0.005]}>
          <ringGeometry args={[1.15, 1.18, 64]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.42} depthWrite={false} />
        </mesh>

        {/* Soft inner light disk */}
        <mesh position={[0, 0, 0.002]}>
          <circleGeometry args={[1.15, 64]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.06} depthWrite={false} />
        </mesh>

        {/* Center accent ring */}
        <mesh position={[0, 0, 0.004]}>
          <ringGeometry args={[0.46, 0.48, 48]} />
          <meshBasicMaterial color="#93c5fd" transparent opacity={0.22} depthWrite={false} />
        </mesh>
      </group>

      {/* Ground Contact Shadow (Fixed on floor platform) */}
      <ContactShadows
        position={[0, -1.01, 0]}
        opacity={0.35}
        scale={5.8}
        blur={2.4}
        far={3.5}
        color="#0f172a"
      />
    </group>
  );
}

// ScrollController handles the GSAP ScrollTrigger story
// Constrains the robot strictly inside its right-side stage
function ScrollController({ scrollGroupRef, prefersReducedMotion }) {
  const { camera } = useThree();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const heroSection = document.getElementById("home");
    if (!heroSection || !scrollGroupRef.current) return;

    const ctx = gsap.context(() => {
      // Timeline scrubs the 3D robot as the user scrolls through the Hero
      // Keeps the robot inside its stage, applying subtle rotation and scale
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        scrollGroupRef.current.position,
        {
          x: -0.12, // Minimal inward shift (never enters left column!)
          y: -0.1,
          ease: "power1.inOut",
        },
        0
      )
      .to(
        scrollGroupRef.current.rotation,
        {
          y: 0.18, // Subtle rotation
          ease: "power1.inOut",
        },
        0
      )
      .to(
        scrollGroupRef.current.scale,
        {
          x: 0.9,
          y: 0.9,
          z: 0.9,
          ease: "power1.inOut",
        },
        0
      );
    });

    return () => ctx.revert();
  }, [camera, prefersReducedMotion, scrollGroupRef]);

  return null;
}

// Main Robot Canvas Component
export default function EmbeddlyRobot() {
  const containerRef = useRef(null);
  const scrollGroupRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    // 1. Check reduced motion
    const mediaQueryMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQueryMotion.matches);
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQueryMotion.addEventListener("change", handleMotionChange);

    // 2. Check device type (desktop / tablet / mobile)
    const updateDeviceType = () => {
      const width = window.innerWidth;
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      if (width < 640 || isTouch) {
        setDeviceType("mobile");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };
    updateDeviceType();
    window.addEventListener("resize", updateDeviceType);

    // 3. Mouse move tracking across window (normalized -1 to 1)
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePos.current.x = Math.max(-1, Math.min(1, x));
      mousePos.current.y = Math.max(-1, Math.min(1, y));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      mediaQueryMotion.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", updateDeviceType);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[460px] sm:h-[500px] lg:h-[540px] xl:h-[560px] flex items-center justify-center select-none"
      id="hero-3d-robot-container"
    >
      <Canvas
        camera={{
          position: [0, 0.05, 5.8],
          fov: 34,
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        className="w-full h-full"
      >
        {/* Clean Studio Lighting Setup */}
        <ambientLight intensity={0.72} />
        
        {/* Soft White Key Light (Front-Right) */}
        <directionalLight
          position={[3.5, 4.5, 4]}
          intensity={1.4}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Soft Blue Rim Light (Back-Left) */}
        <directionalLight
          position={[-3.8, 3.2, -2.5]}
          intensity={1.8}
          color="#60a5fa"
        />

        {/* Subtle Fill Light (Front-Left) */}
        <directionalLight
          position={[-3, 0.8, 2.5]}
          intensity={0.5}
          color="#e0e7ff"
        />

        {/* Subtle Top Cyan Accent */}
        <pointLight position={[0, 3.5, 1.2]} intensity={0.5} color="#93c5fd" />

        {/* 3D Robot Model */}
        <RobotModel
          mousePos={mousePos}
          prefersReducedMotion={prefersReducedMotion}
          deviceType={deviceType}
          scrollGroupRef={scrollGroupRef}
        />

        {/* Scroll Controller with GSAP ScrollTrigger (Constrained to Stage) */}
        <ScrollController
          scrollGroupRef={scrollGroupRef}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Canvas>
    </div>
  );
}

// Preload the GLB model for instant rendering
useGLTF.preload("/models/embeddly-bot.glb");
