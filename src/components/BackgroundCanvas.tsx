import React, { useEffect, useRef } from 'react';

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking for interactive spotlight shift
    const mouse = { x: width * 0.75, y: height * 0.3, targetX: width * 0.75, targetY: height * 0.3 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Micro dust particles
    const particleCount = Math.min(Math.floor((width * height) / 22000), 45);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.3 + 0.1,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.006;

      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.035;
      mouse.y += (mouse.targetY - mouse.y) * 0.035;

      ctx.clearRect(0, 0, width, height);

      // 1. Base Layer — Deep Midnight Dark Navy / Near Black
      const baseGrad = ctx.createLinearGradient(0, 0, width, height);
      baseGrad.addColorStop(0, '#040509');
      baseGrad.addColorStop(0.35, '#070914');
      baseGrad.addColorStop(0.75, '#06070e');
      baseGrad.addColorStop(1, '#030407');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Large Soft Aurora Light Field #1 (Electric Blue top right)
      const auroraX1 = width * 0.75 + Math.sin(time * 0.7) * 70;
      const auroraY1 = height * 0.25 + Math.cos(time * 0.5) * 50;
      const grad1 = ctx.createRadialGradient(auroraX1, auroraY1, 0, auroraX1, auroraY1, width * 0.55);
      grad1.addColorStop(0, 'rgba(37, 99, 235, 0.22)');
      grad1.addColorStop(0.4, 'rgba(79, 70, 229, 0.12)');
      grad1.addColorStop(0.75, 'rgba(147, 51, 234, 0.04)');
      grad1.addColorStop(1, 'rgba(4, 5, 9, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // 3. Large Soft Aurora Light Field #2 (Deep Violet left / mid)
      const auroraX2 = width * 0.2 + Math.cos(time * 0.6) * 60;
      const auroraY2 = height * 0.65 + Math.sin(time * 0.8) * 50;
      const grad2 = ctx.createRadialGradient(auroraX2, auroraY2, 0, auroraX2, auroraY2, width * 0.5);
      grad2.addColorStop(0, 'rgba(124, 58, 237, 0.16)');
      grad2.addColorStop(0.5, 'rgba(14, 165, 233, 0.07)');
      grad2.addColorStop(1, 'rgba(4, 5, 9, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 4. Dedicated Soft Hero Spotlight (Interactive position near mouse)
      const spotGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 500);
      spotGrad.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
      spotGrad.addColorStop(0.4, 'rgba(99, 102, 241, 0.06)');
      spotGrad.addColorStop(1, 'rgba(4, 5, 9, 0)');
      ctx.fillStyle = spotGrad;
      ctx.fillRect(0, 0, width, height);

      // 5. Subtle Technical Grid Pattern Overlay
      const gridSize = 48;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 6. Micro Particles & Faint Constellation Links
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(191, 219, 254, ${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.09;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(147, 197, 253, ${opacity})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-100"
    />
  );
};
