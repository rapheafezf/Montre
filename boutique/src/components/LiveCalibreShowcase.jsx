import React from 'react';

export default function LiveCalibreShowcase() {
  return (
    <div className="w-full flex items-center justify-center relative select-none py-4">
      
      {/* Self-contained CSS keyframe animations for the caliber (slowed down for graceful, hypnotic rhythm) */}
      <style>{`
        @keyframes calGearCW {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes calGearCCW {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes calBalanceOsc {
          0% { transform: rotate(-34deg); }
          50% { transform: rotate(34deg); }
          100% { transform: rotate(-34deg); }
        }
        @keyframes calSpiralPulse {
          0% { transform: scale(0.91); opacity: 0.85; }
          50% { transform: scale(1.09); opacity: 1; }
          100% { transform: scale(0.91); opacity: 0.85; }
        }
        @keyframes calAnchorRock {
          0% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
          100% { transform: rotate(-8deg); }
        }
        @keyframes calEscapeStep {
          0% { transform: rotate(0deg); }
          12.5% { transform: rotate(45deg); }
          25% { transform: rotate(90deg); }
          37.5% { transform: rotate(135deg); }
          50% { transform: rotate(180deg); }
          62.5% { transform: rotate(225deg); }
          75% { transform: rotate(270deg); }
          87.5% { transform: rotate(315deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-brass-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Pure Mechanical Caliber in motion (No borders, no text, no buttons) */}
      <div className="relative w-full max-w-[380px] sm:max-w-[430px] aspect-square flex items-center justify-center">
        
        <svg 
          viewBox="0 0 400 400" 
          className="w-full h-full filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="liveBrass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f5e6c4" />
              <stop offset="50%" stopColor="#c5a059" />
              <stop offset="100%" stopColor="#89642e" />
            </linearGradient>

            <linearGradient id="liveSteel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            <linearGradient id="liveBreguetBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>

            <radialGradient id="liveRuby" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fca5a5" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </radialGradient>
          </defs>

          {/* Mainplate circular chassis with dual golden bezel */}
          <circle cx="200" cy="200" r="188" fill="#080a0e" stroke="url(#liveBrass)" strokeWidth="3" />
          <circle cx="200" cy="200" r="176" fill="#0c0e14" stroke="#1f2430" strokeWidth="1.5" />
          
          {/* Côtes de Genève subtle horizontal texture stripes */}
          {[...Array(14)].map((_, i) => (
            <line 
              key={i} 
              x1="36" 
              y1={55 + i * 22} 
              x2="364" 
              y2={55 + i * 22} 
              stroke="#151a24" 
              strokeWidth="1.5" 
              opacity="0.65" 
            />
          ))}

          {/* Perlage circular graining hallmarks */}
          <circle cx="115" cy="135" r="14" fill="none" stroke="#222838" strokeWidth="1" />
          <circle cx="135" cy="125" r="14" fill="none" stroke="#222838" strokeWidth="1" />
          <circle cx="125" cy="150" r="14" fill="none" stroke="#222838" strokeWidth="1" />

          {/* Polished steel fixing screws on bridges */}
          <circle cx="95" cy="80" r="4.5" fill="#0d1017" stroke="url(#liveSteel)" strokeWidth="1" />
          <line x1="92" y1="80" x2="98" y2="80" stroke="#f1f5f9" strokeWidth="1" />

          <circle cx="310" cy="85" r="4.5" fill="#0d1017" stroke="url(#liveSteel)" strokeWidth="1" />
          <line x1="307" y1="85" x2="313" y2="85" stroke="#f1f5f9" strokeWidth="1" />

          <circle cx="315" cy="305" r="4.5" fill="#0d1017" stroke="url(#liveSteel)" strokeWidth="1" />
          <line x1="312" y1="305" x2="318" y2="305" stroke="#f1f5f9" strokeWidth="1" />

          {/* -------------------------------------------------------- */}
          {/* 1. Mainspring Barrel Drum (Left, Slow Calm Rotation) */}
          {/* -------------------------------------------------------- */}
          <g style={{ transformOrigin: '110px 220px', animation: 'calGearCW 28s linear infinite' }}>
            <circle cx="110" cy="220" r="64" fill="#131620" stroke="url(#liveBrass)" strokeWidth="3" />
            {[...Array(20)].map((_, i) => (
              <rect key={i} x="108" y="152" width="4" height="6.5" rx="0.8" fill="#c5a059" transform={`rotate(${i * 18} 110 220)`} />
            ))}
            {/* Spiral mainspring glimpse */}
            <circle cx="110" cy="220" r="44" fill="none" stroke="#475569" strokeWidth="2.5" opacity="0.4" />
            <circle cx="110" cy="220" r="28" fill="none" stroke="#64748b" strokeWidth="3" opacity="0.65" />
            {/* Arbor screw */}
            <circle cx="110" cy="220" r="10.5" fill="#0a0c10" stroke="url(#liveSteel)" strokeWidth="1.5" />
            <line x1="103" y1="220" x2="117" y2="220" stroke="#f1f5f9" strokeWidth="1.5" />
          </g>

          {/* -------------------------------------------------------- */}
          {/* 2. Center Wheel & Intermediate Pinion (Gear Train, Smooth) */}
          {/* -------------------------------------------------------- */}
          <g style={{ transformOrigin: '200px 145px', animation: 'calGearCCW 12s linear infinite' }}>
            <circle cx="200" cy="145" r="48" fill="#11141c" stroke="url(#liveBrass)" strokeWidth="2.5" />
            {/* 4 Openworked spokes */}
            <line x1="200" y1="101" x2="200" y2="189" stroke="#ab8441" strokeWidth="2" />
            <line x1="156" y1="145" x2="244" y2="145" stroke="#ab8441" strokeWidth="2" />
            {[...Array(16)].map((_, i) => (
              <rect key={i} x="198" y="94" width="4" height="5.5" rx="0.8" fill="#d4ba7d" transform={`rotate(${i * 22.5} 200 145)`} />
            ))}
            <circle cx="200" cy="145" r="13" fill="url(#liveBrass)" />
            <circle cx="200" cy="145" r="4.5" fill="url(#liveRuby)" />
          </g>

          {/* -------------------------------------------------------- */}
          {/* 3. Escape Wheel (Stepping gracefully) */}
          {/* -------------------------------------------------------- */}
          <g style={{ transformOrigin: '210px 270px', animation: 'calEscapeStep 4s steps(8, end) infinite' }}>
            <circle cx="210" cy="270" r="34" fill="#0d0f15" stroke="url(#liveSteel)" strokeWidth="1.5" />
            {[...Array(15)].map((_, i) => (
              <path key={i} d="M 210 234 L 215 238 L 209 242 Z" fill="#cbd5e1" transform={`rotate(${i * 24} 210 270)`} />
            ))}
            <circle cx="210" cy="270" r="4.5" fill="url(#liveRuby)" />
          </g>

          {/* -------------------------------------------------------- */}
          {/* 4. Swiss Lever (Rocking on Ruby Pallets, Slow 1.2s) */}
          {/* -------------------------------------------------------- */}
          <g style={{ transformOrigin: '250px 240px', animation: 'calAnchorRock 1.2s ease-in-out infinite' }}>
            <path d="M 250 240 L 220 250 L 222 255 L 250 240 L 242 272 L 247 274 Z" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />
            {/* Entry & Exit Ruby stones */}
            <rect x="218" y="249" width="6" height="3.2" rx="0.8" fill="url(#liveRuby)" />
            <rect x="239" y="271" width="6" height="3.2" rx="0.8" fill="url(#liveRuby)" />
            <circle cx="250" cy="240" r="3.2" fill="url(#liveRuby)" />
          </g>

          {/* -------------------------------------------------------- */}
          {/* 5. Golden Balance Wheel (Slow, Graceful Oscillation 1.2s) */}
          {/* -------------------------------------------------------- */}
          <g style={{ transformOrigin: '280px 160px', animation: 'calBalanceOsc 1.2s ease-in-out infinite' }}>
            {/* Heavy Gold Rim */}
            <circle cx="280" cy="160" r="56" fill="none" stroke="url(#liveBrass)" strokeWidth="3.5" />
            {/* Balance poising screws around rim */}
            {[...Array(14)].map((_, i) => (
              <circle key={i} cx="280" cy="102" r="2.4" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" transform={`rotate(${i * 25.7} 280 160)`} />
            ))}
            {/* Crossarms */}
            <line x1="280" y1="106" x2="280" y2="214" stroke="#c5a059" strokeWidth="2.5" />
            <line x1="226" y1="160" x2="334" y2="160" stroke="#c5a059" strokeWidth="2.5" />
          </g>

          {/* Blued Steel Breguet Hairspring (Breathing in rhythm, 1.2s) */}
          <g style={{ transformOrigin: '280px 160px', animation: 'calSpiralPulse 1.2s ease-in-out infinite' }}>
            <path 
              d="M 280 160 
                 m 0,-5 a 5,5 0 1,0 0,10 a 5,5 0 1,0 0,-10 
                 m 0,-6 a 11,11 0 1,0 0,22 a 11,11 0 1,0 0,-22 
                 m 0,-7 a 18,18 0 1,0 0,36 a 18,18 0 1,0 0,-36 
                 m 0,-7 a 25,25 0 1,0 0,50 a 25,25 0 1,0 0,-50" 
              fill="none" 
              stroke="url(#liveBreguetBlue)" 
              strokeWidth="1.8" 
            />
          </g>

          {/* Balance jewel cap & Shock spring (Incabloc) */}
          <circle cx="280" cy="160" r="9.5" fill="#0c0e14" stroke="url(#liveBrass)" strokeWidth="1.5" />
          <circle cx="280" cy="160" r="4.8" fill="url(#liveRuby)" />

          {/* -------------------------------------------------------- */}
          {/* Sweeping Seconds Hand Sub-Dial at Bottom */}
          {/* -------------------------------------------------------- */}
          <g style={{ transformOrigin: '200px 320px', animation: 'calGearCW 16s linear infinite' }}>
            <circle cx="200" cy="320" r="26" fill="#090b0f" stroke="url(#liveBrass)" strokeWidth="1.5" />
            {[...Array(12)].map((_, i) => (
              <line key={i} x1="200" y1="296" x2="200" y2="301" stroke="#c5a059" strokeWidth="1" transform={`rotate(${i * 30} 200 320)`} />
            ))}
            {/* Red sweeping trotteuse */}
            <line x1="200" y1="324" x2="200" y2="298" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="200" cy="320" r="2.2" fill="#ef4444" />
          </g>

        </svg>

      </div>

    </div>
  );
}
