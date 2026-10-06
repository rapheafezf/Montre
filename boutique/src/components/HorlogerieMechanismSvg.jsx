import React from 'react';

export default function HorlogerieMechanismSvg({ className = "w-64 h-64", interactive = true }) {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full drop-shadow-[0_0_35px_rgba(197,160,89,0.15)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle metal gradients */}
          <linearGradient id="brassDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4ba7d" />
            <stop offset="50%" stopColor="#9a7936" />
            <stop offset="100%" stopColor="#5c441b" />
          </linearGradient>

          <linearGradient id="brassBright" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#faecd0" />
            <stop offset="40%" stopColor="#d4ba7d" />
            <stop offset="80%" stopColor="#b38f45" />
            <stop offset="100%" stopColor="#785920" />
          </linearGradient>

          <linearGradient id="steelGleam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3f4f6" />
            <stop offset="50%" stopColor="#9ca3af" />
            <stop offset="100%" stopColor="#4b5563" />
          </linearGradient>

          <radialGradient id="rubyGlow" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ff4d6d" />
            <stop offset="60%" stopColor="#c9184a" />
            <stop offset="100%" stopColor="#590d22" />
          </radialGradient>

          <radialGradient id="perlagePattern" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1f232b" />
            <stop offset="100%" stopColor="#0c0e12" />
          </radialGradient>
        </defs>

        {/* 1. Base Plate (Platine Principale perlée) */}
        <circle cx="200" cy="200" r="185" fill="url(#perlagePattern)" stroke="#272b36" strokeWidth="2" />
        <circle cx="200" cy="200" r="185" stroke="#d4ba7d" strokeWidth="0.75" strokeDasharray="3 4" opacity="0.4" />

        {/* Decorative Caliber Bridge (Pont de rouage et de balancier ciselé) */}
        <path
          d="M 60 200 C 60 110, 130 65, 230 65 C 290 65, 330 95, 340 140 C 310 135, 275 155, 260 190 C 245 225, 255 270, 290 290 C 270 320, 230 335, 190 335 C 110 335, 60 280, 60 200 Z"
          fill="#13161c"
          stroke="url(#brassDark)"
          strokeWidth="1.5"
          opacity="0.9"
        />

        {/* Côtes de Genève pattern lines on Bridge */}
        <g stroke="#ffffff" strokeWidth="0.5" opacity="0.04">
          {[...Array(14)].map((_, i) => (
            <line key={i} x1="70" y1={80 + i * 18} x2="330" y2={80 + i * 18} />
          ))}
        </g>

        {/* 2. Large Gilt Center Wheel (Grande Roue de centre - rotation lente) */}
        <g transform="translate(130, 220)">
          <g className="animate-gear-slow">
            {/* Gear Rim */}
            <circle cx="0" cy="0" r="75" stroke="url(#brassBright)" strokeWidth="6" fill="none" opacity="0.85" />
            <circle cx="0" cy="0" r="70" stroke="#785920" strokeWidth="1" fill="none" />
            {/* Gear Teeth */}
            {[...Array(32)].map((_, i) => (
              <rect
                key={i}
                x="-2.5"
                y="-80"
                width="5"
                height="8"
                rx="1"
                fill="url(#brassBright)"
                transform={`rotate(${i * (360 / 32)})`}
              />
            ))}
            {/* Curved Arms / Rayons du rouage */}
            {[...Array(5)].map((_, i) => (
              <path
                key={i}
                d="M 0 0 Q 25 -30, 0 -70"
                stroke="url(#brassDark)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                transform={`rotate(${i * 72})`}
              />
            ))}
            {/* Center Chaton */}
            <circle cx="0" cy="0" r="14" fill="url(#brassDark)" />
            <circle cx="0" cy="0" r="8" fill="url(#rubyGlow)" className="animate-jewel" />
          </g>
        </g>

        {/* 3. Intermediate Wheel (Roue moyenne - rotation moyenne) */}
        <g transform="translate(265, 140)">
          <g className="animate-gear-medium">
            <circle cx="0" cy="0" r="50" stroke="url(#brassBright)" strokeWidth="4.5" fill="none" opacity="0.9" />
            {[...Array(24)].map((_, i) => (
              <rect
                key={i}
                x="-2"
                y="-55"
                width="4"
                height="7"
                rx="0.8"
                fill="url(#brassBright)"
                transform={`rotate(${i * (360 / 24)})`}
              />
            ))}
            {[...Array(4)].map((_, i) => (
              <line
                key={i}
                x1="0"
                y1="-48"
                x2="0"
                y2="48"
                stroke="url(#brassDark)"
                strokeWidth="3.5"
                transform={`rotate(${i * 45})`}
              />
            ))}
            <circle cx="0" cy="0" r="10" fill="url(#brassDark)" />
            <circle cx="0" cy="0" r="5.5" fill="url(#rubyGlow)" />
          </g>
        </g>

        {/* 4. Escape Wheel (Roue d'échappement aux dents inclinées caractéristiques) */}
        <g transform="translate(230, 255)">
          <g className="animate-gear-fast">
            <circle cx="0" cy="0" r="32" stroke="url(#steelGleam)" strokeWidth="2.5" fill="none" />
            {/* Club-shaped teeth of the Swiss lever escape wheel */}
            {[...Array(15)].map((_, i) => (
              <path
                key={i}
                d="M 0 -32 L 6 -38 L 4 -40 L -2 -34 Z"
                fill="url(#steelGleam)"
                transform={`rotate(${i * (360 / 15)})`}
              />
            ))}
            {[...Array(3)].map((_, i) => (
              <line
                key={i}
                x1="0"
                y1="0"
                x2="0"
                y2="-30"
                stroke="url(#steelGleam)"
                strokeWidth="2.5"
                transform={`rotate(${i * 120})`}
              />
            ))}
            <circle cx="0" cy="0" r="8" fill="url(#steelGleam)" />
            <circle cx="0" cy="0" r="4.5" fill="url(#rubyGlow)" />
          </g>
        </g>

        {/* 5. Swiss Anchor Lever (Ancre suisse oscillante avec levées de rubis) */}
        <g transform="translate(215, 225)">
          <g className="animate-escapement-lever">
            {/* Lever Body */}
            <path
              d="M -15 -10 L 0 0 L 15 -10 L 2 -25 L -2 -25 Z"
              fill="url(#steelGleam)"
              stroke="#222"
              strokeWidth="0.5"
            />
            {/* Synthetic Ruby Pallet Stones (Levées d'entrée et de sortie) */}
            <rect x="-17" y="-12" width="5" height="4" rx="0.5" fill="url(#rubyGlow)" transform="rotate(-15)" />
            <rect x="13" y="-12" width="5" height="4" rx="0.5" fill="url(#rubyGlow)" transform="rotate(15)" />
            {/* Lever pivot */}
            <circle cx="0" cy="0" r="3.5" fill="url(#rubyGlow)" />
          </g>
        </g>

        {/* 6. Coq de Balancier & Balance Bridge */}
        <path
          d="M 180 50 C 240 50, 270 70, 280 120 C 250 125, 235 150, 230 180 C 210 180, 190 170, 180 150 Z"
          fill="url(#brassDark)"
          stroke="#e5d1a4"
          strokeWidth="0.8"
          opacity="0.95"
        />

        {/* 7. Balance Wheel & Hairspring (Le Balancier Spiral Oscillateur 28 800 A/h) */}
        <g transform="translate(200, 185)">
          {/* Oscillating Balance Wheel Assembly */}
          <g className="animate-balance">
            {/* Balance Rim (Serge du balancier en Glucydur) */}
            <circle cx="0" cy="0" r="54" stroke="url(#brassBright)" strokeWidth="4" fill="none" />
            <circle cx="0" cy="0" r="50" stroke="#785920" strokeWidth="0.75" fill="none" />

            {/* Compensating Gold Screws on Rim (Vis massottes de réglage) */}
            {[...Array(16)].map((_, i) => (
              <circle
                key={i}
                cx={54 * Math.cos((i * 2 * Math.PI) / 16)}
                cy={54 * Math.sin((i * 2 * Math.PI) / 16)}
                r="2"
                fill="url(#brassBright)"
                stroke="#5c441b"
                strokeWidth="0.5"
              />
            ))}

            {/* 3 Arms (Bras du balancier) */}
            {[...Array(3)].map((_, i) => (
              <line
                key={i}
                x1="0"
                y1="0"
                x2="0"
                y2="-51"
                stroke="url(#brassBright)"
                strokeWidth="3.5"
                strokeLinecap="round"
                transform={`rotate(${i * 120})`}
              />
            ))}

            {/* Breathing Hairspring (Spiral Breguet) */}
            <g className="animate-hairspring">
              <path
                d="M 0 0 
                   A 4 4 0 0 1 4 -4 
                   A 8 8 0 0 1 8 6 
                   A 13 13 0 0 1 -10 11 
                   A 18 18 0 0 1 -18 -8 
                   A 23 23 0 0 1 12 -21 
                   A 28 28 0 0 1 28 14 
                   A 34 34 0 0 1 -20 30"
                stroke="#60a5fa"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
                opacity="0.85"
              />
            </g>

            {/* Incabloc Shock Protection & Center Cap Jewel */}
            <circle cx="0" cy="0" r="13" fill="url(#brassBright)" stroke="#5c441b" strokeWidth="1" />
            {/* Lyre-shaped Spring (Ressort antichoc Incabloc) */}
            <path
              d="M -7 -4 C -7 -10, 7 -10, 7 -4 C 10 3, -10 3, -7 -4 Z"
              stroke="#f3f4f6"
              strokeWidth="1"
              fill="none"
            />
            {/* Core Olive Ruby Jewel (Contre-pivot en rubis birman) */}
            <circle cx="0" cy="0" r="6" fill="url(#rubyGlow)" className="animate-jewel" />
            <circle cx="-1.5" cy="-1.5" r="1.5" fill="#ffffff" opacity="0.8" />
          </g>
        </g>

        {/* Polished Screws on Movement Plate */}
        {[
          { x: 95, y: 110 },
          { x: 310, y: 110 },
          { x: 100, y: 290 },
          { x: 290, y: 310 },
          { x: 175, y: 65 }
        ].map((pt, i) => (
          <g key={i} transform={`translate(${pt.x}, ${pt.y})`}>
            <circle cx="0" cy="0" r="5" fill="url(#steelGleam)" stroke="#222" strokeWidth="0.5" />
            <line x1="-3.5" y1="0" x2="3.5" y2="0" stroke="#111827" strokeWidth="1" transform={`rotate(${i * 35})`} />
          </g>
        ))}

        {/* Circular Engraving Badge around Bezel */}
        <text
          x="200"
          y="375"
          textAnchor="middle"
          fill="#d4ba7d"
          fontSize="9"
          fontFamily="Cinzel, serif"
          letterSpacing="0.3em"
          opacity="0.8"
        >
          LE MOUVEMENT • CALIBRE MÉCANIQUE • 28'800 A/H
        </text>
      </svg>
    </div>
  );
}
