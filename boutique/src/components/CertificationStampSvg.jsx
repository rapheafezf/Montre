import React from 'react';

export default function CertificationStampSvg({ className = "w-28 h-28" }) {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="stampGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#faecd0" />
            <stop offset="50%" stopColor="#c5a059" />
            <stop offset="100%" stopColor="#89642e" />
          </linearGradient>

          <path
            id="textCirclePath"
            d="M 100 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
          />
        </defs>

        {/* Outer Serrated Guarantee Border (Dentelure du poinçon de garantie) */}
        <circle cx="100" cy="100" r="92" stroke="url(#stampGold)" strokeWidth="1.5" strokeDasharray="2 3" opacity="0.6" />
        <circle cx="100" cy="100" r="86" stroke="url(#stampGold)" strokeWidth="1" opacity="0.9" />
        <circle cx="100" cy="100" r="56" stroke="url(#stampGold)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />

        {/* Circular Circular Engraved Text along Path */}
        <text fill="url(#stampGold)" fontSize="7.5" fontFamily="Cinzel, serif" letterSpacing="0.22em" fontWeight="600">
          <textPath href="#textCirclePath" startOffset="0%">
            • CONTRÔLE 20 POINTS • CERTIFIÉ AUTHENTIQUE • LE MOUVEMENT •
          </textPath>
        </text>

        {/* Center Seal Emblem */}
        <g transform="translate(100, 100)">
          {/* Subtle spinning balance wheel in the seal center */}
          <g className="animate-gear-slow">
            <circle cx="0" cy="0" r="28" stroke="url(#stampGold)" strokeWidth="1.5" strokeDasharray="2 4" />
            <circle cx="0" cy="0" r="22" stroke="url(#stampGold)" strokeWidth="0.8" />
            {[...Array(6)].map((_, i) => (
              <line
                key={i}
                x1="0"
                y1="-22"
                x2="0"
                y2="22"
                stroke="url(#stampGold)"
                strokeWidth="1"
                transform={`rotate(${i * 30})`}
              />
            ))}
          </g>

          {/* Central 5-Point Star Hallmark (Poinçon horloger) */}
          <polygon
            points="0,-12 3.5,-3.5 12,-3.5 5,2 8,11 0,6 -8,11 -5,2 -12,-3.5 -3.5,-3.5"
            fill="url(#stampGold)"
          />
        </g>
      </svg>
    </div>
  );
}
