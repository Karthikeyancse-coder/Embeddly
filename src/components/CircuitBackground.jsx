"use client";

import { useEffect, useRef } from "react";

export default function CircuitBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initCircuitMesh();
    };

    window.addEventListener("resize", handleResize);

    let traces = [];
    let pulses = [];
    let nodes = [];

    function initCircuitMesh() {
      traces = [];
      pulses = [];
      nodes = [];

      const spacing = 120;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      // 1. Create circuit node grid (~35% density for realistic sparse PCB aesthetic)
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (Math.random() < 0.35) {
            const x = i * spacing + (Math.random() * 20 - 10);
            const y = j * spacing + (Math.random() * 20 - 10);
            nodes.push({
              x,
              y,
              radius: Math.random() < 0.2 ? 3.5 : 2,
              amber: Math.random() < 0.15,
              pulseOffset: Math.random() * Math.PI * 2,
            });
          }
        }
      }

      // 2. Connect nearby nodes with orthogonal (PCB 90-degree) traces
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 50 && dist < spacing * 1.8 && Math.random() < 0.5) {
            const midX =
              nodes[i].x +
              (nodes[j].x - nodes[i].x) * (Math.random() < 0.5 ? 0.4 : 0.6);

            traces.push({
              p1: { x: nodes[i].x, y: nodes[i].y },
              bend: { x: midX, y: nodes[j].y },
              p2: { x: nodes[j].x, y: nodes[j].y },
              length: dist,
            });

            if (Math.random() < 0.4) {
              pulses.push({
                traceIndex: traces.length - 1,
                progress: Math.random(),
                speed: 0.003 + Math.random() * 0.005,
                color: Math.random() < 0.25 ? "#FFB020" : "#2E5AFF",
                size: 2.2,
              });
            }
          }
        }
      }
    }

    initCircuitMesh();

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw circuit traces
      ctx.lineWidth = 1;
      for (let i = 0; i < traces.length; i++) {
        const t = traces[i];
        ctx.beginPath();
        ctx.strokeStyle = "rgba(198, 216, 255, 0.45)";
        ctx.moveTo(t.p1.x, t.p1.y);
        ctx.lineTo(t.bend.x, t.bend.y);
        ctx.lineTo(t.p2.x, t.p2.y);
        ctx.stroke();
      }

      // Draw circuit nodes
      const now = Date.now() * 0.002;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const glow = Math.sin(now + n.pulseOffset) * 0.35 + 0.65;

        // Outer ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + 2, 0, Math.PI * 2);
        ctx.strokeStyle = n.amber
          ? `rgba(255, 176, 32, ${0.4 * glow})`
          : `rgba(46, 90, 255, ${0.4 * glow})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Inner solid core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.amber
          ? `rgba(255, 176, 32, ${0.85 * glow})`
          : `rgba(46, 90, 255, ${0.85 * glow})`;
        ctx.fill();
      }

      // Draw pulsing electron currents
      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i];
        p.progress += p.speed;
        if (p.progress > 1) {
          p.progress = 0;
        }

        const t = traces[p.traceIndex];
        if (!t) continue;

        let currentX, currentY;
        if (p.progress < 0.5) {
          const subT = p.progress / 0.5;
          currentX = t.p1.x + (t.bend.x - t.p1.x) * subT;
          currentY = t.p1.y + (t.bend.y - t.p1.y) * subT;
        } else {
          const subT = (p.progress - 0.5) / 0.5;
          currentX = t.bend.x + (t.p2.x - t.bend.x) * subT;
          currentY = t.bend.y + (t.p2.y - t.bend.y) * subT;
        }

        const grad = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          p.size * 3.5
        );
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, "rgba(46, 90, 255, 0)");

        ctx.beginPath();
        ctx.arc(currentX, currentY, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(currentX, currentY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="circuit-canvas" ref={canvasRef} aria-hidden="true" />;
}
