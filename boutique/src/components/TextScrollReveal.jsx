import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * TextScrollReveal - Replicates Cominvi's signature text-reveal effect.
 * Each word starts dimmed (opacity 0.18) and illuminates to bright gold/ivory
 * as the user scrolls through the paragraph.
 */
export default function TextScrollReveal({ 
  text, 
  className = "", 
  baseOpacity = 0.18,
  activeColor = "#F7F4EE" 
}) {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  const words = text.split(/\s+/).filter(Boolean);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || wordsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordsRef.current,
        {
          opacity: baseOpacity,
          color: "rgba(224, 216, 201, 0.28)",
          transform: "translateY(4px)",
        },
        {
          opacity: 1,
          color: activeColor,
          transform: "translateY(0px)",
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 45%",
            scrub: 0.6,
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, [text, baseOpacity, activeColor]);

  return (
    <p ref={containerRef} className={`${className} leading-relaxed font-light`}>
      {words.map((word, idx) => (
        <span
          key={idx}
          ref={el => wordsRef.current[idx] = el}
          className="inline-block mr-[0.28em] transition-colors will-change-[opacity,transform]"
        >
          {word}
        </span>
      ))}
    </p>
  );
}
