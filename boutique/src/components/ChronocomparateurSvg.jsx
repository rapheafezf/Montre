import React, { useEffect, useState } from 'react';

export default function ChronocomparateurSvg({ className = "w-full max-w-lg h-56", rate = "+02", amplitude = "295°", beatError = "0.1ms" }) {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 100);
    }, 125); // ~8 Hz (28,800 A/h is 8 beats per second)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative bg-obsidian-950 border border-obsidian-750 p-4 select-none ${className}`}>
      {/* Instrument Frame Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-obsidian-800 text-[10px] font-mono text-sand">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
          <span className="text-ivory-100 font-semibold uppercase tracking-wider">CHRONOSCOPE ATELIER • TEST EN COURS</span>
        </div>
        <div className="text-brass-400 font-mono text-[9px] tracking-widest uppercase">
          CAL. CERTIFIÉ 28 800 A/H
        </div>
      </div>

      {/* SVG Screen Display */}
      <svg
        viewBox="0 0 500 160"
        className="w-full h-auto bg-[#070a0e] border border-obsidian-800/90 rounded-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Grid pattern */}
          <pattern id="chronoGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#141a24" strokeWidth="0.75" />
          </pattern>

          {/* Glow filter */}
          <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Oscilloscope Background Grid */}
        <rect width="500" height="160" fill="#070a0e" />
        <rect width="500" height="160" fill="url(#chronoGrid)" />

        {/* Center datum line */}
        <line x1="0" y1="80" x2="500" y2="80" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

        {/* Acoustic Tick-Tock Escapement Wave (Moving waveform) */}
        <g opacity="0.85">
          <path
            d={`M 0 80 
               Q 40 80, 50 40 T 60 120 T 70 80 
               L 110 80 
               Q 120 80, 130 35 T 140 125 T 150 80 
               L 190 80 
               Q 200 80, 210 38 T 220 122 T 230 80 
               L 270 80 
               Q 280 80, 290 36 T 300 124 T 310 80 
               L 350 80 
               Q 360 80, 370 34 T 380 126 T 390 80 
               L 430 80 
               Q 440 80, 450 37 T 460 123 T 470 80 
               L 500 80`}
            stroke="#10b981"
            strokeWidth="1.2"
            fill="none"
            filter="url(#emeraldGlow)"
            className="animate-pulse"
          />
        </g>

        {/* Parallel Dot Matrix Traces (Typical Witschi dual dot trace showing straight line) */}
        <g fill="#34d399" opacity="0.9">
          {[...Array(25)].map((_, i) => {
            const x = (i * 20 + pulse * 2) % 490 + 5;
            const y1 = 70 + Math.sin(i * 0.5) * 1.5;
            const y2 = 90 + Math.sin(i * 0.5) * 1.5;
            return (
              <React.Fragment key={i}>
                <circle cx={x} cy={y1} r="1.5" />
                <circle cx={x} cy={y2} r="1.5" />
              </React.Fragment>
            );
          })}
        </g>

        {/* Overlay Telemetry HUD Display */}
        <g fontFamily="ui-monospace, SFMono-Regular, monospace" fontSize="9">
          {/* Rate readout */}
          <rect x="15" y="12" width="100" height="24" rx="2" fill="#0c131d" stroke="#10b981" strokeWidth="0.8" opacity="0.9" />
          <text x="22" y="27" fill="#6ee7b7" fontWeight="bold">DÉRIVE: {rate} s/j</text>

          {/* Amplitude readout */}
          <rect x="125" y="12" width="105" height="24" rx="2" fill="#0c131d" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.9" />
          <text x="132" y="27" fill="#38bdf8" fontWeight="bold">AMPL: {amplitude}</text>

          {/* Beat Error readout */}
          <rect x="240" y="12" width="115" height="24" rx="2" fill="#0c131d" stroke="#c5a059" strokeWidth="0.8" opacity="0.9" />
          <text x="247" y="27" fill="#facc15" fontWeight="bold">REPÈRE: {beatError}</text>

          {/* Status stamp */}
          <rect x="365" y="12" width="120" height="24" rx="2" fill="#064e3b" stroke="#34d399" strokeWidth="0.8" />
          <text x="375" y="27" fill="#a7f3d0" fontWeight="bold" letterSpacing="0.05em">CONFORME COSC ✓</text>
        </g>
      </svg>

      {/* Footer Indicators */}
      <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-obsidian-850 text-center font-mono text-[9px]">
        <div>
          <span className="text-sand/70 uppercase block">Position</span>
          <span className="text-ivory-100 font-semibold">Cadran Haut (CH)</span>
        </div>
        <div>
          <span className="text-sand/70 uppercase block">Angle de levée</span>
          <span className="text-ivory-100 font-semibold">52.0°</span>
        </div>
        <div>
          <span className="text-sand/70 uppercase block">Diagnostic</span>
          <span className="text-emerald-400 font-semibold">Excellente santé</span>
        </div>
      </div>
    </div>
  );
}
