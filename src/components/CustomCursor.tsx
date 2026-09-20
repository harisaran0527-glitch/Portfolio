import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const posRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Detect touch screens & reduced motion
    const touchCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const motionCheck = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (touchCheck) setIsTouch(true);
    if (motionCheck) setIsReducedMotion(true);

    if (touchCheck || motionCheck) return;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Hover detection for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer') ||
        target.classList.contains('btn-magnetic')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  // Smooth frame loop for trail spring lerp
  useEffect(() => {
    if (isTouch || isReducedMotion || !isVisible) return;

    let animId: number;
    const followMouse = () => {
      trailRef.current = {
        x: trailRef.current.x + (posRef.current.x - trailRef.current.x) * 0.18,
        y: trailRef.current.y + (posRef.current.y - trailRef.current.y) * 0.18,
      };
      setTrailPosition({ x: trailRef.current.x, y: trailRef.current.y });
      animId = requestAnimationFrame(followMouse);
    };
    animId = requestAnimationFrame(followMouse);
    return () => cancelAnimationFrame(animId);
  }, [isTouch, isReducedMotion, isVisible]);

  if (isTouch || isReducedMotion || !isVisible) return null;

  return (
    <>
      {/* Dynamic Cursor Glow Backdrop */}
      <div
        className="fixed top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full pointer-events-none z-30 blur-2xl transition-opacity duration-300"
        style={{
          transform: `translate3d(${trailPosition.x - 64}px, ${trailPosition.y - 64}px, 0)`,
          opacity: isHovered ? 0.8 : 0.3,
        }}
      />

      {/* Primary Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-50 transition-transform duration-75 ease-out shadow-[0_0_10px_#00f0ff]"
        style={{
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0) scale(${
            isClicked ? 0.6 : isHovered ? 2.2 : 1
          })`,
        }}
      />

      {/* Ring Trail with Hover Expansion & Click Ripple */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-40 transition-all duration-200 ease-out border ${
          isHovered
            ? 'w-11 h-11 border-cyan-400/80 bg-cyan-500/10 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
            : isClicked
            ? 'w-6 h-6 border-blue-400/90 bg-blue-500/20'
            : 'w-7 h-7 border-slate-300/30'
        }`}
        style={{
          transform: `translate3d(${trailPosition.x - (isHovered ? 22 : isClicked ? 12 : 14)}px, ${
            trailPosition.y - (isHovered ? 22 : isClicked ? 12 : 14)
          }px, 0)`,
        }}
      />
    </>
  );
};

