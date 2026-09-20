import { useEffect, useRef } from 'react';

interface MagneticOptions {
  strength?: number; // Distance multiplier (default 0.35)
  radius?: number;   // Activation radius in px (default 120)
}

export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(options: MagneticOptions = {}) {
  const ref = useRef<T | null>(null);
  const { strength = 0.35, radius = 120 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Safety checks: Touch device or prefers-reduced-motion
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || isReducedMotion) return;

    let animId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const updatePosition = () => {
      // Smooth lerp (linear interpolation)
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      if (element) {
        element.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }

      if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
        animId = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < radius) {
        targetX = distanceX * strength;
        targetY = distanceY * strength;
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(updatePosition);
      } else {
        targetX = 0;
        targetY = 0;
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
      if (element) {
        element.style.transform = 'translate3d(0,0,0)';
      }
    };
  }, [strength, radius]);

  return ref;
}
