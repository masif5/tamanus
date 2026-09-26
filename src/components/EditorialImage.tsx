import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  parallaxSpeed?: number; // e.g. -15 to +15 %
  aspectRatio?: string;
  overlayText?: React.ReactNode;
  revealDirection?: 'left-to-right' | 'top-to-bottom';
  priority?: boolean;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  parallaxSpeed = 12,
  aspectRatio,
  overlayText,
  revealDirection = 'left-to-right',
  priority = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Reveal Animation on scroll entrance: Left-to-Right wipe curtain
      if (curtainRef.current) {
        if (revealDirection === 'left-to-right') {
          gsap.fromTo(
            curtainRef.current,
            { scaleX: 1, transformOrigin: 'right' },
            {
              scaleX: 0,
              duration: 1.3,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        } else {
          gsap.fromTo(
            curtainRef.current,
            { scaleY: 1, transformOrigin: 'top' },
            {
              scaleY: 0,
              duration: 1.3,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }

      // Initial image subtle scale and de-blur
      gsap.fromTo(
        imageRef.current,
        { scale: 1.15, filter: 'blur(5px)', xPercent: -3 },
        {
          scale: 1,
          filter: 'blur(0px)',
          xPercent: 0,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Continuous Scrub Parallax Effect
      if (parallaxSpeed !== 0) {
        gsap.fromTo(
          imageRef.current,
          { yPercent: -parallaxSpeed },
          {
            yPercent: parallaxSpeed,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [parallaxSpeed, isLoaded, revealDirection]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#0D281E]/30 select-none ${aspectRatio || ''} ${containerClassName}`}
    >
      {/* Editorial Luxury Curtain Wipe Mask (Wipes Left-to-Right by scaling from right) */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-[#0D281E] z-20 pointer-events-none origin-right"
      />

      {/* Parallax Image element with extended overflow height */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-[126%] -top-[13%] absolute left-0 object-cover will-change-transform ${className}`}
      />

      {overlayText && <div className="relative z-10 w-full h-full">{overlayText}</div>}
    </div>
  );
};
