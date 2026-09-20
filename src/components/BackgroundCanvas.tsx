import React, { useEffect, useRef } from 'react';

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isReducedMotion = reducedMotionQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
    };
    reducedMotionQuery.addEventListener('change', handleMotionChange);

    // Setup Canvas context (WebGL / 2D Canvas Fallback)
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // ── Interaction State ──────────────────────────────────────────────
    const mouse = {
      x: width * 0.5,
      y: height * 0.5,
      targetX: width * 0.5,
      targetY: height * 0.5,
      vx: 0,
      vy: 0,
    };

    const scroll = {
      y: window.scrollY,
      targetY: window.scrollY,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleScroll = () => {
      scroll.targetY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Tab Visibility Handling (Pause loop when tab inactive)
    let isTabActive = true;
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // ── Wave Definition & Fluid Physics Model ─────────────────────────
    /*
      Each wave layer is rendered as a continuous liquid surface defined by
      multi-frequency sine harmonics + interactive mouse displacement.
    */
    interface WaveLayer {
      baseYPercent: number; // Vertical position relative to screen height
      amplitude: number;    // Primary wave height
      frequency: number;    // Primary wave wavelength
      speed: number;        // Primary wave drift speed
      secFreq: number;      // Secondary harmonic frequency
      secSpeed: number;     // Secondary harmonic speed
      thickness: number;    // Translucent ribbon body height
      parallax: number;     // Scroll parallax multiplier
      colorStops: Array<{ offset: number; color: string }>;
      highlightColor: string;
      blur: number;
    }

    const waveLayers: WaveLayer[] = [
      // 1. Deep Background Wave (Midnight Blue & Soft Violet Glow)
      {
        baseYPercent: 0.25,
        amplitude: 65,
        frequency: 0.0012,
        speed: 0.0004,
        secFreq: 0.0028,
        secSpeed: 0.0008,
        thickness: 280,
        parallax: 0.04,
        colorStops: [
          { offset: 0, color: 'rgba(6, 11, 20, 0.95)' },
          { offset: 0.4, color: 'rgba(10, 17, 30, 0.75)' },
          { offset: 0.85, color: 'rgba(76, 29, 149, 0.18)' },
          { offset: 1, color: 'rgba(5, 7, 10, 0)' }
        ],
        highlightColor: 'rgba(139, 92, 246, 0.25)',
        blur: 0
      },
      // 2. Upper Framing Silk Wave (Cyan & Electric Blue Volumetric Flow)
      {
        baseYPercent: 0.12,
        amplitude: 85,
        frequency: 0.0015,
        speed: 0.0006,
        secFreq: 0.0035,
        secSpeed: -0.0011,
        thickness: 220,
        parallax: 0.08,
        colorStops: [
          { offset: 0, color: 'rgba(0, 240, 255, 0.03)' },
          { offset: 0.35, color: 'rgba(2, 132, 199, 0.22)' },
          { offset: 0.75, color: 'rgba(59, 130, 246, 0.14)' },
          { offset: 1, color: 'rgba(5, 7, 10, 0)' }
        ],
        highlightColor: 'rgba(0, 240, 255, 0.45)',
        blur: 0
      },
      // 3. Lower Sweep Wave (Deep Ocean Flow arching around Hero Bottom)
      {
        baseYPercent: 0.72,
        amplitude: 110,
        frequency: 0.0011,
        speed: -0.0005,
        secFreq: 0.0024,
        secSpeed: 0.0009,
        thickness: 340,
        parallax: 0.12,
        colorStops: [
          { offset: 0, color: 'rgba(5, 7, 10, 0.05)' },
          { offset: 0.3, color: 'rgba(14, 165, 233, 0.18)' },
          { offset: 0.7, color: 'rgba(99, 102, 241, 0.15)' },
          { offset: 1, color: 'rgba(5, 7, 10, 0)' }
        ],
        highlightColor: 'rgba(56, 189, 248, 0.40)',
        blur: 0
      },
      // 4. Foreground Frame Wave (Soft Edge Depth Layer)
      {
        baseYPercent: 0.85,
        amplitude: 140,
        frequency: 0.0009,
        speed: 0.0004,
        secFreq: 0.0018,
        secSpeed: -0.0007,
        thickness: 380,
        parallax: 0.18,
        colorStops: [
          { offset: 0, color: 'rgba(2, 6, 18, 0.90)' },
          { offset: 0.4, color: 'rgba(59, 130, 246, 0.16)' },
          { offset: 0.8, color: 'rgba(6, 182, 212, 0.08)' },
          { offset: 1, color: 'rgba(5, 7, 10, 0)' }
        ],
        highlightColor: 'rgba(255, 255, 255, 0.35)',
        blur: 0
      }
    ];

    let lastTime = performance.now();
    let time = 0;

    // ── Render Loop ───────────────────────────────────────────────────
    const render = (now: number) => {
      if (!isTabActive) return;

      const dt = (now - lastTime) * 0.001;
      lastTime = now;

      if (!isReducedMotion) {
        time += dt;
      }

      // Smooth mouse interpolation (easing)
      mouse.vx = (mouse.targetX - mouse.x) * 0.04;
      mouse.vy = (mouse.targetY - mouse.y) * 0.04;
      mouse.x += mouse.vx;
      mouse.y += mouse.vy;

      // Smooth scroll interpolation
      scroll.y += (scroll.targetY - scroll.y) * 0.06;

      // ── 1. Clear & Render Deep Base Environment (#05070A) ────────────
      ctx.fillStyle = '#05070A';
      ctx.fillRect(0, 0, width, height);

      // Deep Midnight Atmosphere Gradient
      const baseGrad = ctx.createRadialGradient(
        width * 0.5 + (mouse.x - width * 0.5) * 0.05,
        height * 0.4 + (mouse.y - height * 0.5) * 0.05,
        100,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      );
      baseGrad.addColorStop(0, '#0a1118');
      baseGrad.addColorStop(0.5, '#060a10');
      baseGrad.addColorStop(1, '#05070a');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // ── 2. Render Layered Liquid Light Waves ─────────────────────────
      const step = 8; // Horizontal sampling resolution for silk smoothness

      waveLayers.forEach((layer, layerIdx) => {
        const baseY = height * layer.baseYPercent + (scroll.y * layer.parallax);
        const animTime = time * (isReducedMotion ? 0.05 : 1.0);

        ctx.save();

        ctx.beginPath();
        // Start top-left
        ctx.moveTo(0, baseY);

        // Compute top liquid wave boundary points
        for (let x = 0; x <= width + step; x += step) {
          // Primary Sine + Secondary Harmonic Wave Equation
          let y = baseY +
            Math.sin(x * layer.frequency + animTime * layer.speed * 1000 + layerIdx) * layer.amplitude +
            Math.cos(x * layer.secFreq - animTime * layer.secSpeed * 1000 + layerIdx * 2) * (layer.amplitude * 0.45);

          // Interactive Mouse Fluid Deformation Force
          // When cursor approaches wave, nearby points flex smoothly
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 320;
          const maxDistSq = maxDist * maxDist;

          if (distSq < maxDistSq) {
            const factor = Math.pow(1 - Math.sqrt(distSq) / maxDist, 2);
            // Repel / Bend wave vertically near mouse
            const force = (mouse.vy * 0.6 + (dy > 0 ? 35 : -35)) * factor;
            y += force;
          }

          ctx.lineTo(x, y);
        }

        // Complete liquid wave shape by drawing lower boundary (thickness envelope)
        const lastX = width + step;
        ctx.lineTo(lastX, height + 100);
        ctx.lineTo(0, height + 100);
        ctx.closePath();

        // Wave Fill Gradient
        const waveGrad = ctx.createLinearGradient(0, baseY - layer.amplitude, 0, baseY + layer.thickness);
        layer.colorStops.forEach(stop => waveGrad.addColorStop(stop.offset, stop.color));
        ctx.fillStyle = waveGrad;
        ctx.fill();

        // Luminous Top Edge Stroke (Liquid Light Rim Highlight)
        ctx.beginPath();
        ctx.moveTo(0, baseY);
        for (let x = 0; x <= width + step; x += step) {
          let y = baseY +
            Math.sin(x * layer.frequency + animTime * layer.speed * 1000 + layerIdx) * layer.amplitude +
            Math.cos(x * layer.secFreq - animTime * layer.secSpeed * 1000 + layerIdx * 2) * (layer.amplitude * 0.45);

          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 320;

          if (distSq < maxDist * maxDist) {
            const factor = Math.pow(1 - Math.sqrt(distSq) / maxDist, 2);
            y += (mouse.vy * 0.6 + (dy > 0 ? 35 : -35)) * factor;
          }

          ctx.lineTo(x, y);
        }

        ctx.lineWidth = 1.5;
        const strokeGrad = ctx.createLinearGradient(0, 0, width, 0);
        strokeGrad.addColorStop(0, 'rgba(0, 240, 255, 0.05)');
        strokeGrad.addColorStop(0.3, layer.highlightColor);
        strokeGrad.addColorStop(0.7, 'rgba(59, 130, 246, 0.35)');
        strokeGrad.addColorStop(1, 'rgba(139, 92, 246, 0.05)');
        ctx.strokeStyle = strokeGrad;
        ctx.stroke();

        ctx.restore();
      });

      // ── 3. HERO SAFE AREA MASKING (Vast Clean Dark Void) ──────────────
      /*
        Ensures central hero text (center-left) and profile portrait (center-right)
        remain completely dark, legible, and un-distorted.
        The liquid waves gracefully frame around hero content.
      */
      if (scroll.y < height * 0.8) {
        ctx.save();

        // 1. Text Void (Center-Left)
        const textVoidX = width * 0.30;
        const textVoidY = height * 0.42;
        const textVoidGrad = ctx.createRadialGradient(textVoidX, textVoidY, 50, textVoidX, textVoidY, width * 0.38);
        textVoidGrad.addColorStop(0, 'rgba(5, 7, 10, 0.96)');
        textVoidGrad.addColorStop(0.5, 'rgba(5, 7, 10, 0.70)');
        textVoidGrad.addColorStop(1, 'rgba(5, 7, 10, 0)');
        ctx.fillStyle = textVoidGrad;
        ctx.fillRect(0, 0, width, height);

        // 2. Profile Photo Void (Center-Right)
        const photoVoidX = width * 0.75;
        const photoVoidY = height * 0.42;
        const photoVoidGrad = ctx.createRadialGradient(photoVoidX, photoVoidY, 40, photoVoidX, photoVoidY, width * 0.32);
        photoVoidGrad.addColorStop(0, 'rgba(5, 7, 10, 0.95)');
        photoVoidGrad.addColorStop(0.5, 'rgba(5, 7, 10, 0.65)');
        photoVoidGrad.addColorStop(1, 'rgba(5, 7, 10, 0)');
        ctx.fillStyle = photoVoidGrad;
        ctx.fillRect(0, 0, width, height);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // ── Cleanup ───────────────────────────────────────────────────────
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      reducedMotionQuery.removeEventListener('change', handleMotionChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};
