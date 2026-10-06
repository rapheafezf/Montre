import React, { useEffect, useState } from 'react';

export default function WatchDialClockSvg({ className = "w-32 h-32" }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourAngle = (hours * 30) + (minutes * 0.5);
  const minuteAngle = (minutes * 6) + (seconds * 0.1);

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-[0_4px_20px_rgba(197,160,89,0.18)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="dialSunburst" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a1c23" />
            <stop offset="85%" stopColor="#0a0c10" />
            <stop offset="100%" stopColor="#050608" />
          </radialGradient>

          <linearGradient id="goldBezel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#faecd0" />
            <stop offset="50%" stopColor="#c5a059" />
            <stop offset="100%" stopColor="#7a5a22" />
          </linearGradient>

          <linearGradient id="bluedSteel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>

        {/* Outer Fluted / Polished Bezel */}
        <circle cx="100" cy="100" r="96" stroke="url(#goldBezel)" strokeWidth="3" fill="#090a0d" />
        <circle cx="100" cy="100" r="92" stroke="#222630" strokeWidth="1" />

        {/* Dial Face with Subtle Radial Finish */}
        <circle cx="100" cy="100" r="90" fill="url(#dialSunburst)" />

        {/* Minute Railway Track (Chemin de fer) */}
        <circle cx="100" cy="100" r="82" stroke="#d4ba7d" strokeWidth="0.5" opacity="0.35" />
        <circle cx="100" cy="100" r="76" stroke="#d4ba7d" strokeWidth="0.5" opacity="0.35" />

        {/* 60 Minute Markers */}
        {[...Array(60)].map((_, i) => (
          <line
            key={i}
            x1="100"
            y1={i % 5 === 0 ? "76" : "79"}
            x2="100"
            y2="82"
            stroke={i % 5 === 0 ? "#d4ba7d" : "#4b5563"}
            strokeWidth={i % 5 === 0 ? "1.5" : "0.5"}
            opacity={i % 5 === 0 ? "0.9" : "0.4"}
            transform={`rotate(${i * 6} 100 100)`}
          />
        ))}

        {/* 12 Applied Gold Hour Batons (Index appliques biseautes) */}
        {[...Array(12)].map((_, i) => {
          if (i === 0) return null; // 12h is double baton
          return (
            <rect
              key={i}
              x="98.5"
              y="26"
              width="3"
              height="14"
              rx="0.5"
              fill="url(#goldBezel)"
              transform={`rotate(${i * 30} 100 100)`}
            />
          );
        })}

        {/* 12 O'Clock Double Baton Marker */}
        <rect x="96" y="24" width="3" height="16" rx="0.5" fill="url(#goldBezel)" />
        <rect x="101" y="24" width="3" height="16" rx="0.5" fill="url(#goldBezel)" />

        {/* Inscriptions */}
        <text
          x="100"
          y="64"
          textAnchor="middle"
          fill="#f8f6f0"
          fontSize="7"
          fontFamily="Cinzel, serif"
          letterSpacing="0.25em"
          fontWeight="600"
        >
          LE MOUVEMENT
        </text>

        <text
          x="100"
          y="72"
          textAnchor="middle"
          fill="#c5a059"
          fontSize="4.5"
          fontFamily="Cinzel, serif"
          letterSpacing="0.2em"
          opacity="0.8"
        >
          CHRONOMÈTRE
        </text>

        <text
          x="100"
          y="142"
          textAnchor="middle"
          fill="#989186"
          fontSize="4"
          fontFamily="Plus Jakarta Sans, sans-serif"
          letterSpacing="0.2em"
        >
          LYON • FRANCE
        </text>

        {/* Hour Hand (Aiguille Feuille / Alpha) */}
        <g transform={`rotate(${hourAngle} 100 100)`}>
          <path
            d="M 100 100 L 98 90 L 97.5 56 L 100 44 L 102.5 56 L 102 90 Z"
            fill="url(#goldBezel)"
            stroke="#5c441b"
            strokeWidth="0.5"
          />
          {/* Luminous Insert */}
          <line x1="100" y1="58" x2="100" y2="82" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.9" />
        </g>

        {/* Minute Hand (Aiguille des minutes affûtée) */}
        <g transform={`rotate(${minuteAngle} 100 100)`}>
          <path
            d="M 100 100 L 98.5 90 L 98 38 L 100 24 L 102 38 L 101.5 90 Z"
            fill="url(#goldBezel)"
            stroke="#5c441b"
            strokeWidth="0.5"
          />
          <line x1="100" y1="40" x2="100" y2="84" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.9" />
        </g>

        {/* Sweep Seconds Hand (Trotteuse fluide en acier bleui à contrepoids) */}
        <g className="animate-sweep-seconds">
          <line x1="100" y1="124" x2="100" y2="20" stroke="url(#bluedSteel)" strokeWidth="1" strokeLinecap="round" />
          {/* Counterweight circle */}
          <circle cx="100" cy="116" r="3.5" fill="none" stroke="url(#bluedSteel)" strokeWidth="1" />
          {/* Red arrow tip / accent */}
          <circle cx="100" cy="22" r="1.5" fill="#ef4444" />
        </g>

        {/* Center Cap Chaton */}
        <circle cx="100" cy="100" r="4.5" fill="url(#goldBezel)" />
        <circle cx="100" cy="100" r="2" fill="#090a0d" />
      </svg>
    </div>
  );
}
