import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, RotateCw, Gauge, Zap, 
  Layers, Disc, Activity, Eye, EyeOff, RefreshCw
} from 'lucide-react';

export default function CalibreMovementSimulator({
  watch,
  className = "w-full h-full"
}) {
  // Simulator State
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1); // 0.25 (super-slow), 1 (real-time), 2 (accelerated)
  const [showRotor, setShowRotor] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [powerReserve, setPowerReserve] = useState(46.5); // Hours (max 48h)
  const [isWinding, setIsWinding] = useState(false);

  // Animation values stored in refs for 60fps smoothness
  const animRef = useRef(null);
  const audioCtxRef = useRef(null);
  const lastTimeRef = useRef(performance.now());
  const tickCountRef = useRef(0);
  const lastBeatIndexRef = useRef(-1);

  // Mechanical rotation angles
  const [angles, setAngles] = useState({
    balance: 0,          // Balance wheel oscillation (-150° to +150°)
    hairspringScale: 1,  // Hairspring breathing scale (0.92 to 1.08)
    palletAngle: 0,      // Lever escapement fork (-12° to +12°)
    escapeWheel: 0,      // Escapement wheel (steps 12° per tick)
    fourthWheel: 0,      // Seconds wheel (continuous)
    thirdWheel: 0,       // Intermediate wheel
    centerWheel: 0,      // Center minute wheel
    barrel: 0,           // Mainspring barrel
    rotor: 35            // Automatic winding rotor
  });

  // Telemetry jitter simulation
  const [telemetry, setTelemetry] = useState({
    amplitude: 301,
    beatError: 0.1,
    dailyRate: "+1.2"
  });

  // Web Audio Horological Tic-Tac Sound
  const playTickSound = (isTic) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      if (!audioCtxRef.current) return;
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      // Two rapid clicks mimicking the lever entering & ruby impulse
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Pitch: 'Tic' is slightly higher frequency (~1400Hz), 'Tac' is slightly deeper (~1100Hz)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isTic ? 1350 : 1120, now);
      osc.frequency.exponentialRampToValueAtTime(isTic ? 400 : 320, now + 0.025);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Ignore audio policy errors
    }
  };

  // Main Mechanical Simulation Loop
  useEffect(() => {
    let internalEscapeStep = 0;
    let internalSecAngle = 0;
    let internalThirdAngle = 0;
    let internalCenterAngle = 0;
    let internalRotorAngle = angles.rotor;
    let internalRotorVel = 0;

    const animate = (currentTime) => {
      const dt = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      if (isPlaying) {
        // Frequency: 4 Hz = 8 alternances per second (28,800 A/h)
        const baseFreq = 4.0 * speed;
        const timeSec = currentTime / 1000;

        // Harmonic sine oscillation of the balance wheel (max amplitude ~150° in 2D view)
        const balanceOsc = Math.sin(timeSec * Math.PI * 2 * baseFreq);
        const balanceAngle = balanceOsc * 155;

        // Hairspring breathing (expands when balance rotates one way, contracts the other)
        const hairspringScale = 1 + balanceOsc * 0.09;

        // Pallet lever fork toggles sharply near balance dead center
        const palletAngle = Math.sign(balanceOsc) * 11.5;

        // Escapement wheel steps 8 times per second (one step per alternation)
        const currentBeatIndex = Math.floor(timeSec * baseFreq * 2);
        if (currentBeatIndex !== lastBeatIndexRef.current) {
          const isTic = currentBeatIndex % 2 === 0;
          internalEscapeStep += 12; // 360 / (15 teeth * 2) = 12 deg per step
          lastBeatIndexRef.current = currentBeatIndex;
          playTickSound(isTic);

          // Small telemetry jitter
          if (currentBeatIndex % 16 === 0) {
            setTelemetry({
              amplitude: 298 + Math.floor(Math.sin(timeSec) * 6),
              beatError: (0.1 + Math.sin(timeSec * 0.5) * 0.03).toFixed(1),
              dailyRate: (1.2 + Math.cos(timeSec * 0.2) * 0.2).toFixed(1)
            });
          }
        }

        // Gear train smooth rotation
        const wheelDt = dt * speed;
        internalSecAngle = (internalSecAngle + wheelDt * 6) % 360;      // 6 deg/sec = 1 RPM (seconds hand)
        internalThirdAngle = (internalThirdAngle - wheelDt * 0.8) % 360;
        internalCenterAngle = (internalCenterAngle + wheelDt * 0.1) % 360;

        // Rotor gravity damping
        if (Math.abs(internalRotorVel) > 0.05) {
          internalRotorAngle += internalRotorVel * dt * 60;
          internalRotorVel *= 0.95; // Friction
        } else {
          // Subtle gentle floating pendulum motion
          internalRotorAngle = 35 + Math.sin(timeSec * 1.2) * 12;
        }

        setAngles({
          balance: balanceAngle,
          hairspringScale,
          palletAngle,
          escapeWheel: internalEscapeStep,
          fourthWheel: internalSecAngle,
          thirdWheel: internalThirdAngle,
          centerWheel: internalCenterAngle,
          barrel: (internalCenterAngle * 0.2) % 360,
          rotor: internalRotorAngle
        });

        // Power reserve slow natural consumption
        setPowerReserve(prev => Math.max(0.1, prev - (wheelDt * 0.0005)));
      }

      animRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, speed, soundEnabled]);

  // Manual Wind Action
  const handleWindWatch = () => {
    setIsWinding(true);
    setPowerReserve(48.0);
    // Give rotor energetic rotation burst
    setAngles(prev => ({
      ...prev,
      rotor: prev.rotor + 720
    }));
    playTickSound(true);
    setTimeout(() => {
      playTickSound(false);
      setIsWinding(false);
    }, 400);
  };

  // Interactive Rotor Spin on click / hover gesture
  const handleRotorSpin = () => {
    setAngles(prev => ({
      ...prev,
      rotor: prev.rotor + 360
    }));
    setPowerReserve(prev => Math.min(48, prev + 2.5));
    playTickSound(true);
  };

  // Generate Archimedean Hairspring Path (Spiral Breguet)
  const generateHairspringPath = (scale = 1) => {
    const turns = 6;
    const points = [];
    const totalAngle = turns * 2 * Math.PI;
    const steps = 180;
    const a = 1.6 * scale; // Spiral expansion rate
    const r0 = 4;

    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * totalAngle;
      const r = r0 + a * theta;
      const x = 250 + r * Math.cos(theta);
      const y = 295 + r * Math.sin(theta);
      points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
    }
    return points.join(' ');
  };

  const isCartier = watch?.brand === 'Cartier';
  const caliberName = watch?.movement || 'Calibre 3135 Manufacture';

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      
      {/* Upper Mode Banner */}
      <div className="w-full max-w-xl flex items-center justify-between pb-3 px-2 border-b border-obsidian-800 text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          <span className="text-ivory-100 font-semibold uppercase tracking-wider">
            {isPlaying ? 'Échappement Actif (En Mouvement)' : 'Stop-Seconde Engagé (Pause)'}
          </span>
        </div>
        <div className="text-brass-400 uppercase tracking-widest text-[10px]">
          {caliberName}
        </div>
      </div>

      {/* Main Caliber Mechanical Stage SVG */}
      <div className="relative w-full aspect-square max-w-[480px] flex items-center justify-center py-2">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full overflow-visible drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="calGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#faecd0" />
              <stop offset="40%" stopColor="#d4ba7d" />
              <stop offset="100%" stopColor="#7a5a22" />
            </linearGradient>

            <linearGradient id="calSteel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            <linearGradient id="calBluedSteel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>

            <radialGradient id="calRuby" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ff4d6d" />
              <stop offset="40%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#4c0519" />
            </radialGradient>

            <pattern id="calPerlage" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="8" cy="8" r="7" fill="none" stroke="#2a303c" strokeWidth="0.8" opacity="0.6" />
              <circle cx="0" cy="0" r="7" fill="none" stroke="#2a303c" strokeWidth="0.8" opacity="0.6" />
              <circle cx="16" cy="0" r="7" fill="none" stroke="#2a303c" strokeWidth="0.8" opacity="0.6" />
              <circle cx="0" cy="16" r="7" fill="none" stroke="#2a303c" strokeWidth="0.8" opacity="0.6" />
              <circle cx="16" cy="16" r="7" fill="none" stroke="#2a303c" strokeWidth="0.8" opacity="0.6" />
            </pattern>

            <pattern id="cotesDeGeneve" width="10" height="500" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="5" height="500" fill="#1b202a" opacity="0.35" />
              <rect x="5" y="0" width="5" height="500" fill="#0f131a" opacity="0.35" />
              <line x1="5" y1="0" x2="5" y2="500" stroke="#334155" strokeWidth="0.5" opacity="0.3" />
            </pattern>

            {/* Screws definition */}
            <g id="bluedScrew">
              <circle cx="0" cy="0" r="4.5" fill="url(#calBluedSteel)" stroke="#172554" strokeWidth="0.75" />
              <line x1="-3" y1="0" x2="3" y2="0" stroke="#ffffff" strokeWidth="0.9" opacity="0.8" />
            </g>

            {/* Chaton with synthetic ruby jewel */}
            <g id="rubyChaton">
              <circle cx="0" cy="0" r="7" fill="url(#calGold)" stroke="#6b4c19" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="4.2" fill="url(#calRuby)" />
              <circle cx="-1.2" cy="-1.2" r="1.2" fill="#ffffff" opacity="0.85" />
            </g>
          </defs>

          {/* ======================================================== */}
          {/* 1. PLATINE PRINCIPALE & PERLAGE DE MANUFACTURE           */}
          {/* ======================================================== */}
          <circle cx="250" cy="250" r="230" fill="#11151c" stroke="url(#calGold)" strokeWidth="3" />
          <circle cx="250" cy="250" r="224" fill="#0b0e14" />
          <circle cx="250" cy="250" r="224" fill="url(#calPerlage)" opacity="0.8" />

          {/* Outer movement teeth rim (engagement cranté) */}
          {[...Array(72)].map((_, i) => (
            <line
              key={`cal-rim-${i}`}
              x1="250"
              y1="22"
              x2="250"
              y2="28"
              stroke="#c5a059"
              strokeWidth="1.2"
              transform={`rotate(${i * 5} 250 250)`}
              opacity="0.45"
            />
          ))}

          {/* ======================================================== */}
          {/* 2. BARILLET DE RESSORT MOTEUR (10h-11h)                 */}
          {/* ======================================================== */}
          <g transform="translate(150, 150)">
            {/* Mainspring barrel gear teeth */}
            <g transform={`rotate(${angles.barrel})`}>
              <circle cx="0" cy="0" r="62" fill="#191e28" stroke="url(#calGold)" strokeWidth="2.5" />
              {[...Array(36)].map((_, i) => (
                <line
                  key={`barrel-t-${i}`}
                  x1="0"
                  y1="-62"
                  x2="0"
                  y2="-68"
                  stroke="#d4ba7d"
                  strokeWidth="2"
                  transform={`rotate(${i * 10})`}
                />
              ))}
              {/* Sunburst radial brushing */}
              <circle cx="0" cy="0" r="54" fill="none" stroke="#2d3748" strokeWidth="1" strokeDasharray="2 3" />
              <circle cx="0" cy="0" r="42" fill="none" stroke="#2d3748" strokeWidth="1" strokeDasharray="4 2" />
              {/* S-shaped mainspring coil inside view */}
              <path
                d="M -30 0 Q -25 35 0 35 Q 25 35 25 0 Q 25 -25 0 -25 Q -15 -25 -15 0"
                fill="none"
                stroke="#64748b"
                strokeWidth="2.5"
                opacity="0.5"
              />
            </g>
            {/* Ratchet Wheel & Center Arbour */}
            <circle cx="0" cy="0" r="18" fill="url(#calSteel)" stroke="#334155" strokeWidth="1" />
            <use href="#rubyChaton" x="0" y="0" />
            <use href="#bluedScrew" x="-26" y="24" />
            <use href="#bluedScrew" x="28" y="-22" />
          </g>

          {/* ======================================================== */}
          {/* 3. TRAIN DE ROUAGES : CENTRE & MOYENNE                    */}
          {/* ======================================================== */}
          {/* Center Wheel (Grande roue de centre, 12h) */}
          <g transform="translate(250, 175)">
            <g transform={`rotate(${angles.centerWheel})`}>
              <circle cx="0" cy="0" r="48" fill="none" stroke="url(#calGold)" strokeWidth="3" />
              {[...Array(30)].map((_, i) => (
                <line
                  key={`center-t-${i}`}
                  x1="0"
                  y1="-48"
                  x2="0"
                  y2="-53"
                  stroke="#c5a059"
                  strokeWidth="1.5"
                  transform={`rotate(${i * 12})`}
                />
              ))}
              {/* Spoke arms */}
              {[0, 72, 144, 216, 288].map(deg => (
                <path
                  key={`c-spoke-${deg}`}
                  d="M 0 0 L 0 -47"
                  stroke="#d4ba7d"
                  strokeWidth="2.5"
                  transform={`rotate(${deg})`}
                />
              ))}
            </g>
            <use href="#rubyChaton" x="0" y="0" />
          </g>

          {/* Third Wheel (Roue moyenne, 2h-3h) */}
          <g transform="translate(345, 205)">
            <g transform={`rotate(${angles.thirdWheel})`}>
              <circle cx="0" cy="0" r="38" fill="none" stroke="url(#calGold)" strokeWidth="2.5" />
              {[...Array(24)].map((_, i) => (
                <line
                  key={`third-t-${i}`}
                  x1="0"
                  y1="-38"
                  x2="0"
                  y2="-42"
                  stroke="#d4ba7d"
                  strokeWidth="1.5"
                  transform={`rotate(${i * 15})`}
                />
              ))}
              {[0, 90, 180, 270].map(deg => (
                <path
                  key={`th-spoke-${deg}`}
                  d="M 0 0 L 0 -37"
                  stroke="#d4ba7d"
                  strokeWidth="2"
                  transform={`rotate(${deg})`}
                />
              ))}
            </g>
            <use href="#rubyChaton" x="0" y="0" />
            <use href="#bluedScrew" x="-22" y="-18" />
          </g>

          {/* Fourth Wheel (Roue des secondes, 60s rotation) */}
          <g transform="translate(325, 290)">
            <g transform={`rotate(${angles.fourthWheel})`}>
              <circle cx="0" cy="0" r="32" fill="none" stroke="url(#calGold)" strokeWidth="2.2" />
              {[...Array(20)].map((_, i) => (
                <line
                  key={`sec-t-${i}`}
                  x1="0"
                  y1="-32"
                  x2="0"
                  y2="-36"
                  stroke="#c5a059"
                  strokeWidth="1.2"
                  transform={`rotate(${i * 18})`}
                />
              ))}
              {[0, 120, 240].map(deg => (
                <line
                  key={`sec-spoke-${deg}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="-31"
                  stroke="#faecd0"
                  strokeWidth="1.8"
                  transform={`rotate(${deg})`}
                />
              ))}
            </g>
            <use href="#rubyChaton" x="0" y="0" />
          </g>

          {/* ======================================================== */}
          {/* 4. ROUE D'ÉCHAPPEMENT & ANCRE SUISSE (Échappement libre) */}
          {/* ======================================================== */}
          {/* Escape Wheel (15 club-teeth in gold) */}
          <g transform="translate(265, 360)">
            <g transform={`rotate(${angles.escapeWheel})`} className="transition-transform duration-75">
              <circle cx="0" cy="0" r="24" fill="none" stroke="url(#calGold)" strokeWidth="1.8" />
              {/* 15 club-teeth horological escapement profile */}
              {[...Array(15)].map((_, i) => (
                <g key={`esc-tooth-${i}`} transform={`rotate(${i * 24})`}>
                  <path
                    d="M 0 -18 L 2 -24 L 6 -22 L 3 -18 Z"
                    fill="url(#calGold)"
                    stroke="#854d0e"
                    strokeWidth="0.5"
                  />
                </g>
              ))}
              <circle cx="0" cy="0" r="4" fill="url(#calSteel)" />
            </g>
            <use href="#rubyChaton" x="0" y="0" />
          </g>

          {/* Pallet Fork (Ancre suisse avec levées en rubis) */}
          <g transform={`translate(225, 345) rotate(${angles.palletAngle})`} className="transition-transform duration-75">
            {/* Pallet lever arms */}
            <path
              d="M 0 0 L 25 10 L 28 8 M 0 0 L 32 -4 L 35 -2 M 0 0 L -18 8"
              fill="none"
              stroke="url(#calSteel)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Entry Pallet Jewel (Levée d'entrée en rubis synthétique) */}
            <rect x="23" y="6" width="6" height="3" rx="0.5" fill="url(#calRuby)" stroke="#4c0519" strokeWidth="0.5" />
            {/* Exit Pallet Jewel (Levée de sortie en rubis synthétique) */}
            <rect x="30" y="-7" width="6" height="3" rx="0.5" fill="url(#calRuby)" stroke="#4c0519" strokeWidth="0.5" />
            {/* Fork notch & dart */}
            <circle cx="-18" cy="8" r="2.5" fill="url(#calSteel)" />
            {/* Pivot ruby */}
            <circle cx="0" cy="0" r="3.5" fill="url(#calRuby)" stroke="#78350f" strokeWidth="0.6" />
          </g>

          {/* ======================================================== */}
          {/* 5. BALANCIER & SPIRAL RÉGULATEUR (Cœur battant 4 Hz)    */}
          {/* ======================================================== */}
          {/* Breguet Hairspring (Spiral qui respire en temps réel) */}
          <g opacity="0.95">
            <path
              d={generateHairspringPath(angles.hairspringScale)}
              fill="none"
              stroke="url(#calBluedSteel)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            {/* Stud holder (Piton de spiral) */}
            <circle cx="282" cy="326" r="3" fill="url(#calGold)" stroke="#451a03" strokeWidth="0.6" />
            <line x1="282" y1="326" x2="288" y2="334" stroke="#d4ba7d" strokeWidth="1.5" />
          </g>

          {/* Balance Wheel (Grand balancier oscillant à 28 800 A/h) */}
          <g 
            transform={`translate(250, 295) rotate(${angles.balance})`}
            className="transition-transform ease-linear"
          >
            {/* Glucydur balance rim */}
            <circle cx="0" cy="0" r="68" fill="none" stroke="url(#calGold)" strokeWidth="3.8" />
            
            {/* 4 aerodynamic spokes */}
            {[0, 90, 180, 270].map(deg => (
              <path
                key={`bal-spoke-${deg}`}
                d="M 0 0 L 0 -66"
                stroke="url(#calGold)"
                strokeWidth="2.8"
                strokeLinecap="round"
                transform={`rotate(${deg})`}
              />
            ))}

            {/* Gold Microstella regulating screws along the rim */}
            {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg, i) => (
              <g key={`ms-${deg}`} transform={`rotate(${deg}) translate(0, -68)`}>
                <rect x="-1.8" y="-4.5" width="3.6" height="4.5" fill="#fef08a" stroke="#854d0e" strokeWidth="0.6" rx="0.4" />
                <line x1="-1.5" y1="-2.2" x2="1.5" y2="-2.2" stroke="#451a03" strokeWidth="0.6" />
              </g>
            ))}

            {/* Impulse roller & ruby pin (Cheville de plateau) */}
            <circle cx="0" cy="0" r="14" fill="url(#calSteel)" stroke="#475569" strokeWidth="1" />
            <circle cx="-6" cy="8" r="2.2" fill="url(#calRuby)" />
          </g>

          {/* ======================================================== */}
          {/* 6. PONT DE BALANCIER (COQ) & SYSTÈME ANTI-CHOC          */}
          {/* ======================================================== */}
          {/* Balance Bridge (Coq taillé dans la masse avec Côtes de Genève) */}
          <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.6))">
            <path
              d="M 170 295 C 190 270, 220 275, 250 275 C 275 275, 285 285, 285 295 C 285 315, 265 320, 250 320 C 215 320, 185 315, 170 295 Z"
              fill="#181d26"
              stroke="url(#calGold)"
              strokeWidth="2"
            />
            <path
              d="M 170 295 C 190 270, 220 275, 250 275 C 275 275, 285 285, 285 295 C 285 315, 265 320, 250 320 C 215 320, 185 315, 170 295 Z"
              fill="url(#cotesDeGeneve)"
              opacity="0.8"
            />

            {/* Incabloc shock absorber spring (Ressort lyre) */}
            <circle cx="250" cy="295" r="9" fill="url(#calGold)" stroke="#78350f" strokeWidth="0.8" />
            <circle cx="250" cy="295" r="5.5" fill="url(#calRuby)" />
            <circle cx="248.5" cy="293.5" r="1.6" fill="#ffffff" opacity="0.9" />

            {/* Gold Lyre spring shape */}
            <path
              d="M 244 291 C 244 287, 256 287, 256 291 C 256 297, 244 297, 244 291"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1"
            />

            {/* Fixing screws on balance bridge */}
            <use href="#bluedScrew" x="182" y="292" />
            <use href="#bluedScrew" x="195" y="304" />
          </g>

          {/* ======================================================== */}
          {/* 7. MASSE OSCILLANTE (ROTOR AUTOMATIQUE INTERACTIF)       */}
          {/* ======================================================== */}
          {showRotor && (
            <g
              transform={`rotate(${angles.rotor} 250 250)`}
              className="cursor-pointer transition-transform duration-300 ease-out origin-center"
              onClick={handleRotorSpin}
              filter="drop-shadow(0 15px 25px rgba(0,0,0,0.85))"
            >
              {/* Semicircular heavy tungsten segment */}
              <path
                d="M 50 250 A 200 200 0 0 1 450 250 L 370 250 A 120 120 0 0 0 130 250 Z"
                fill="#151922"
                stroke="url(#calGold)"
                strokeWidth="2.5"
              />
              <path
                d="M 50 250 A 200 200 0 0 1 450 250 L 370 250 A 120 120 0 0 0 130 250 Z"
                fill="url(#cotesDeGeneve)"
                opacity="0.9"
              />

              {/* Outer gold heavy rim weight */}
              <path
                d="M 55 250 A 195 195 0 0 1 445 250 L 430 250 A 180 180 0 0 0 70 250 Z"
                fill="url(#calGold)"
                stroke="#6b4c19"
                strokeWidth="1"
              />

              {/* Rotor skeletonized cutouts */}
              <path
                d="M 140 235 A 130 130 0 0 1 200 155 L 210 165 A 115 115 0 0 0 155 235 Z"
                fill="#0b0e14"
                stroke="url(#calGold)"
                strokeWidth="1.2"
              />
              <path
                d="M 360 235 A 130 130 0 0 0 300 155 L 290 165 A 115 115 0 0 1 345 235 Z"
                fill="#0b0e14"
                stroke="url(#calGold)"
                strokeWidth="1.2"
              />

              {/* Rotor Brand & Spec Engravings */}
              <text
                x="250"
                y="110"
                fill="#faecd0"
                fontSize="9"
                fontFamily="Cinzel, serif"
                fontWeight="bold"
                textAnchor="middle"
                letterSpacing="2.5"
              >
                {watch?.brand ? `${watch.brand.toUpperCase()} GENÈVE` : 'HAUTE HORLOGERIE'}
              </text>
              <text
                x="250"
                y="126"
                fill="#c5a059"
                fontSize="7"
                fontFamily="monospace"
                textAnchor="middle"
                letterSpacing="1.5"
              >
                31 JEWELS • PERPETUAL ROTOR • CHRONOMETER
              </text>

              {/* Central ceramic ball bearing */}
              <circle cx="250" cy="250" r="28" fill="#1b202a" stroke="url(#calSteel)" strokeWidth="2.5" />
              <circle cx="250" cy="250" r="18" fill="url(#calGold)" />
              {/* Ball bearings */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                <circle
                  key={`ball-${deg}`}
                  cx={250 + 12 * Math.cos((deg * Math.PI) / 180)}
                  cy={250 + 12 * Math.sin((deg * Math.PI) / 180)}
                  r="2.2"
                  fill="#ffffff"
                  stroke="#475569"
                  strokeWidth="0.5"
                />
              ))}
              <circle cx="250" cy="250" r="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            </g>
          )}

        </svg>
      </div>

      {/* Bench Instrument Telemetry Bar */}
      <div className="w-full max-w-xl grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 px-1">
        <div className="p-2.5 bg-obsidian-900/90 border border-obsidian-800 text-center">
          <div className="text-[9px] font-mono text-sand/60 uppercase">Fréquence</div>
          <div className="font-mono text-xs text-brass-400 font-semibold mt-0.5">
            28 800 A/h (4 Hz)
          </div>
        </div>
        <div className="p-2.5 bg-obsidian-900/90 border border-obsidian-800 text-center">
          <div className="text-[9px] font-mono text-sand/60 uppercase">Amplitude</div>
          <div className="font-mono text-xs text-ivory-100 font-semibold mt-0.5">
            {isPlaying ? `${telemetry.amplitude}°` : '0° (Stoppé)'}
          </div>
        </div>
        <div className="p-2.5 bg-obsidian-900/90 border border-obsidian-800 text-center">
          <div className="text-[9px] font-mono text-sand/60 uppercase">Repère (Beat)</div>
          <div className="font-mono text-xs text-emerald-400 font-semibold mt-0.5">
            {telemetry.beatError} ms
          </div>
        </div>
        <div className="p-2.5 bg-obsidian-900/90 border border-obsidian-800 text-center">
          <div className="text-[9px] font-mono text-sand/60 uppercase">Marche / Jour</div>
          <div className="font-mono text-xs text-brass-300 font-semibold mt-0.5">
            +{telemetry.dailyRate} s/j
          </div>
        </div>
      </div>

      {/* Power Reserve Gauge Bar */}
      <div className="w-full max-w-xl mt-3 p-3 bg-obsidian-900/80 border border-obsidian-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 text-sand/80">
            <Gauge className="w-3.5 h-3.5 text-brass-400" />
            <span className="uppercase text-[10px]">Réserve de marche :</span>
          </div>
          <span className="text-brass-300 font-bold text-xs">
            {powerReserve.toFixed(1)} h / 48 h
          </span>
        </div>
        {/* Progress meter */}
        <div className="w-full h-1.5 bg-obsidian-950 border border-obsidian-800/80 overflow-hidden rounded-full">
          <div 
            className="h-full bg-gradient-to-r from-amber-600 via-brass-500 to-brass-300 transition-all duration-300"
            style={{ width: `${(powerReserve / 48) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Interactive Controls Toolbar */}
      <div className="w-full max-w-xl mt-3 p-3 bg-obsidian-950 border border-brass-600/30 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        
        {/* Left: Play/Pause (Stop-Seconde) & Sound Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 flex items-center gap-1.5 text-xs font-mono uppercase font-bold transition-all cursor-pointer ${
              isPlaying
                ? 'bg-brass-500 text-obsidian-950 hover:bg-brass-400 shadow-md'
                : 'bg-emerald-600 text-ivory-100 hover:bg-emerald-500'
            }`}
            title={isPlaying ? "Tirer la couronne (Stop-seconde)" : "Pousser la couronne (Reprendre)"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Stop-Seconde' : 'Démarrer'}</span>
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-2.5 py-1.5 flex items-center gap-1 text-xs font-mono uppercase border transition-colors cursor-pointer ${
              soundEnabled
                ? 'border-brass-400 bg-brass-500/20 text-brass-300'
                : 'border-obsidian-800 bg-obsidian-900 text-sand/70 hover:text-ivory-100'
            }`}
            title="Activer ou désactiver le son acoustique du tic-tac"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-brass-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="text-[10px] hidden sm:inline">{soundEnabled ? 'Son ON' : 'Son OFF'}</span>
          </button>
        </div>

        {/* Center: Speed Multipliers */}
        <div className="flex items-center gap-1 bg-obsidian-900 border border-obsidian-800 p-0.5">
          {[
            { val: 0.25, label: '0.25x Ralenti' },
            { val: 1, label: '1x Réel' },
            { val: 2, label: '2x Rapide' }
          ].map((sp) => (
            <button
              key={sp.val}
              onClick={() => setSpeed(sp.val)}
              className={`px-2 py-1 text-[10px] font-mono uppercase transition-colors cursor-pointer ${
                speed === sp.val
                  ? 'bg-brass-500 text-obsidian-950 font-bold'
                  : 'text-sand hover:text-ivory-100'
              }`}
            >
              {sp.label}
            </button>
          ))}
        </div>

        {/* Right: Toggle Rotor & Manual Wind Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRotor(!showRotor)}
            className={`px-2.5 py-1.5 flex items-center gap-1 text-[10px] font-mono uppercase border transition-colors cursor-pointer ${
              showRotor 
                ? 'border-brass-500/40 bg-obsidian-900 text-brass-300' 
                : 'border-brass-400 bg-brass-500/20 text-ivory-100 font-bold'
            }`}
            title="Masquer le rotor pour voir les engrenages sous-jacents (vue squelette)"
          >
            {showRotor ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showRotor ? 'Sans Rotor' : 'Avec Rotor'}</span>
          </button>

          <button
            onClick={handleWindWatch}
            className={`px-3 py-1.5 flex items-center gap-1 text-[10px] font-mono uppercase font-bold bg-obsidian-900 hover:bg-obsidian-850 text-brass-300 border border-brass-600/40 transition-all cursor-pointer ${
              isWinding ? 'animate-pulse border-brass-400 text-ivory-100' : ''
            }`}
            title="Remonter le barillet et recharger la réserve de marche"
          >
            <RotateCw className={`w-3.5 h-3.5 text-brass-400 ${isWinding ? 'animate-spin' : ''}`} />
            <span>Remonter</span>
          </button>
        </div>

      </div>

      <p className="text-[10px] font-mono text-sand/60 text-center mt-2.5">
        💡 Astuce : Cliquez sur la masse oscillante (rotor) pour la faire pivoter, ou sur "0.25x Ralenti" pour observer l'ancre dent par dent.
      </p>

    </div>
  );
}
