import React from 'react';

export default function TourbillonEscapementSvg({ className = "w-16 h-16" }) {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(197,160,89,0.25)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="tourbillonGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#faecd0" />
            <stop offset="50%" stopColor="#c5a059" />
            <stop offset="100%" stopColor="#7a5a22" />
          </linearGradient>

          <linearGradient id="bluedSteelTourb" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
        </defs>

        {/* Outer Fixed Tourbillon Well / Bezel */}
        <circle cx="60" cy="60" r="56" stroke="url(#tourbillonGold)" strokeWidth="1.5" strokeDasharray="2 3" opacity="0.6" />
        <circle cx="60" cy="60" r="52" stroke="#222632" strokeWidth="2" fill="#090b10" />

        {/* Internal Fixed Seconds Track */}
        {[...Array(60)].map((_, i) => (
          <line
            key={i}
            x1="60"
            y1={i % 5 === 0 ? "11" : "13"}
            x2="60"
            y2="15"
            stroke={i % 5 === 0 ? "#c5a059" : "#374151"}
            strokeWidth={i % 5 === 0 ? "1" : "0.5"}
            transform={`rotate(${i * 6} 60 60)`}
          />
        ))}

        {/* Rotating 60-Second Tourbillon Cage */}
        <g className="animate-sweep-seconds origin-center">
          {/* Three-arm tourbillon bridge in polished blued steel */}
          {[0, 120, 240].map((deg) => (
            <path
              key={deg}
              d="M 60 60 Q 72 35 60 18 Q 48 35 60 60"
              fill="none"
              stroke="url(#bluedSteelTourb)"
              strokeWidth="2.5"
              strokeLinecap="round"
              transform={`rotate(${deg} 60 60)`}
            />
          ))}

          {/* Tourbillon Counterpoise / Counterweight */}
          <circle cx="60" cy="18" r="4.5" fill="url(#tourbillonGold)" stroke="#1e40af" strokeWidth="1" />
          <circle cx="60" cy="18" r="1.5" fill="#ef4444" />

          {/* Escapement ruby pallet jewels */}
          <rect x="58" y="26" width="4" height="2" fill="#dc2626" rx="0.5" />
          <rect x="58" y="34" width="4" height="2" fill="#dc2626" rx="0.5" />

          {/* Central Chaton & Ruby */}
          <circle cx="60" cy="60" r="7" fill="url(#tourbillonGold)" />
          <circle cx="60" cy="60" r="4" fill="#dc2626" className="animate-jewel" />
          <circle cx="59" cy="59" r="1.2" fill="#ffffff" opacity="0.8" />
        </g>

        {/* Oscillating Glucydur Balance Wheel Inside Cage */}
        <g className="animate-balance origin-center">
          <circle cx="60" cy="60" r="32" stroke="url(#tourbillonGold)" strokeWidth="1.8" fill="none" opacity="0.9" />
          {/* Micro-screws around balance rim */}
          {[...Array(12)].map((_, i) => (
            <circle
              key={i}
              cx="60"
              cy="28"
              r="1.2"
              fill="url(#tourbillonGold)"
              transform={`rotate(${i * 30} 60 60)`}
            />
          ))}
          {/* Balance Arms */}
          <line x1="28" y1="60" x2="92" y2="60" stroke="url(#tourbillonGold)" strokeWidth="1.2" />
          <line x1="60" y1="28" x2="60" y2="92" stroke="url(#tourbillonGold)" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}
