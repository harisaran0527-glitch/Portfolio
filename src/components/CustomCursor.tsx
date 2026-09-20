import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch screens
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Add listener for hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  useEffect(() => {
    if (isTouch || !isVisible) return;

    let animId: number;
    const followMouse = () => {
      setTrailPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2,
      }));
      animId = requestAnimationFrame(followMouse);
    };
    animId = requestAnimationFrame(followMouse);
    return () => cancelAnimationFrame(animId);
  }, [position, isTouch, isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Primary Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-blue-400 rounded-full pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0) scale(${
            isHovered ? 2.5 : 1
          })`,
        }}
      />
      {/* Ring Trail */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-40 transition-all duration-300 ease-out border ${
          isHovered
            ? 'w-10 h-10 border-indigo-400/60 bg-indigo-500/10'
            : 'w-7 h-7 border-slate-400/30'
        }`}
        style={{
          transform: `translate3d(${trailPosition.x - (isHovered ? 20 : 14)}px, ${
            trailPosition.y - (isHovered ? 20 : 14)
          }px, 0)`,
        }}
      />
    </>
  );
};
