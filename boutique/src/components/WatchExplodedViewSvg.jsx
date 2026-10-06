import React, { useState } from 'react';

export default function WatchExplodedViewSvg({
  watch,
  explosionLevel = 60, // 0 (assembled) to 100 (fully exploded)
  selectedLayerId = null,
  onSelectLayer = () => {},
  className = "w-full h-full"
}) {
  const [hoveredLayer, setHoveredLayer] = useState(null);

  // Normalize explosion (0 to 1)
  const exp = Math.max(0, Math.min(100, explosionLevel)) / 100;

  const isCartier = watch?.brand === 'Cartier';

  // 7 Exploded Layers Definition
  const LAYERS = [
    {
      id: 'crystal',
      order: 1,
      title: 'Glace Saphir & Loupe Cyclope',
      subtitle: 'Protection optique inrayable',
      material: 'Corindon synthétique cristallisé (Dureté 9 Mohs)',
      thickness: '1.8 mm d’épaisseur',
      desc: 'Taillée au diamant dans un bloc de saphir synthétique pur, traitée anti-reflets double face. Équipée de la loupe cyclope grossissement 2.5x pour la date.',
      color: '#a5f3fc',
      offsetY: -160 * exp,
      opacity: 0.85
    },
    {
      id: 'bezel',
      order: 2,
      title: isCartier ? 'Lunette Galbée à Vis Or' : 'Lunette Cannelée en Or Gris',
      subtitle: 'Signature esthétique de la manufacture',
      material: isCartier ? 'Or jaune 18k / Acier poli miroir' : 'Or gris 750‰ massif (18 carats)',
      thickness: 'Cannelure usinée au dixième de millimètre',
      desc: isCartier 
        ? 'Lunette vissée emblématique ornée de 8 vis or massif affleurantes inspirées des rivets de la Tour Eiffel.' 
        : 'Les cannelures prismatiques captent et renvoient les rayons lumineux selon chaque inclinaison du poignet.',
      color: '#d4ba7d',
      offsetY: -110 * exp,
      opacity: 0.95
    },
    {
      id: 'hands',
      order: 3,
      title: 'Jeu d’Aiguilles & Canon Central',
      subtitle: 'Heures, Minutes et Trotteuse centrale',
      material: isCartier ? 'Acier bleui thermique à la flamme (290°C)' : 'Or blanc 18k poli miroir & matière luminescente',
      thickness: 'Axe de chaussée ajusté à 0.005 mm',
      desc: 'Façonnées à la main, équilibrées au milligramme près pour minimiser la consommation d’énergie du rouage moteur.',
      color: isCartier ? '#3b82f6' : '#f8f6f0',
      offsetY: -65 * exp,
      opacity: 1
    },
    {
      id: 'dial',
      order: 4,
      title: watch?.dial ? `Cadran ${watch.dial}` : 'Cadran Métallique & Disque de Date',
      subtitle: 'Plaque de laiton émaillée avec index appliqués',
      material: 'Laiton noble, soleillage radial, index or massif',
      thickness: 'Disque de date instantané sous-jacent',
      desc: 'Le visage du garde-temps. Décoré d’un brossage soleillé ou guilloché, avec fenêtre de guichet de date taillée au biseau.',
      color: '#e5d1a4',
      offsetY: -20 * exp,
      opacity: 1
    },
    {
      id: 'case',
      order: 5,
      title: 'Boîtier Carrure & Couronne de Remontoir',
      subtitle: 'Structure porteuse hermétique taillée dans la masse',
      material: 'Acier Oystersteel 904L résistant aux acides marins',
      thickness: 'Éprouvé à 10 bars (100 mètres)',
      desc: 'Usiné dans un bloc d’acier massif ultra-dense. Intègre le tube de couronne fileté et les épaulements de protection étanches.',
      color: '#9ca3af',
      offsetY: 30 * exp,
      opacity: 1
    },
    {
      id: 'movement',
      order: 6,
      title: `Calibre Mécanique ${watch?.movement || 'Manufacture'}`,
      subtitle: 'Cœur battant : balancier, échappement et rouages',
      material: 'Platine perlée, ponts Côtes de Genève, 31 rubis synthétiques',
      thickness: 'Fréquence de 28 800 alternances par heure (4 Hz)',
      desc: 'Le moteur horloger intégral. Comprend le barillet de ressort, le train de rouage démultiplicateur, l’ancre suisse et le balancier régulateur.',
      color: '#c5a059',
      offsetY: 85 * exp,
      opacity: 1
    },
    {
      id: 'rotor',
      order: 7,
      title: 'Masse Oscillante & Fond de Boîte Vissé',
      subtitle: 'Système de remontage automatique perpétuel & étanchéité',
      material: 'Segment lourd en tungstène / or, joint torique synthétique',
      thickness: 'Roulement à billes céramique sans entretien',
      desc: 'Le rotor pivote librement sous l’effet de la gravité pour armer le ressort de marche. Le fond cannelé scelle hermétiquement l’atelier.',
      color: '#ab8441',
      offsetY: 145 * exp,
      opacity: 0.95
    }
  ];

  const activeLayer = LAYERS.find(l => l.id === (hoveredLayer || selectedLayerId)) || LAYERS[0];

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      
      {/* 3D Isometric Exploded Stage SVG */}
      <div className="relative w-full aspect-[4/3] max-w-lg flex items-center justify-center">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full overflow-visible drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
        >
          <defs>
            {/* Gradients for luxury metals */}
            <linearGradient id="expGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#faecd0" />
              <stop offset="45%" stopColor="#d4ba7d" />
              <stop offset="100%" stopColor="#785920" />
            </linearGradient>

            <linearGradient id="expSteel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f3f4f6" />
              <stop offset="50%" stopColor="#9ca3af" />
              <stop offset="100%" stopColor="#4b5563" />
            </linearGradient>

            <linearGradient id="expSapphire" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(165, 243, 252, 0.65)" />
              <stop offset="50%" stopColor="rgba(56, 189, 248, 0.3)" />
              <stop offset="100%" stopColor="rgba(14, 165, 233, 0.5)" />
            </linearGradient>

            <linearGradient id="expMovementGilt" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#713f12" />
            </linearGradient>

            <radialGradient id="expRubyGlow" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ff4d6d" />
              <stop offset="100%" stopColor="#590d22" />
            </radialGradient>

            {/* Drop shadow filter */}
            <filter id="layerShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.65" />
            </filter>
          </defs>

          {/* Central Vertical Alignment Guide Line when exploded */}
          {exp > 0.08 && (
            <g opacity={Math.min(0.6, exp * 0.8)} stroke="#c5a059" strokeWidth="1" strokeDasharray="3 4">
              <line x1="250" y1="60" x2="250" y2="440" />
              <circle cx="250" cy="60" r="3" fill="#c5a059" />
              <circle cx="250" cy="440" r="3" fill="#c5a059" />
            </g>
          )}

          {/* ======================================================== */}
          {/* LAYER 7 : MASSE OSCILLANTE (ROTOR) & FOND DE BOÎTE       */}
          {/* ======================================================== */}
          <g
            id="layer-rotor"
            transform={`translate(0, ${LAYERS[6].offsetY})`}
            filter="url(#layerShadow)"
            className="cursor-pointer transition-transform duration-300 ease-out"
            onClick={() => onSelectLayer(LAYERS[6])}
            onMouseEnter={() => setHoveredLayer(LAYERS[6].id)}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            {/* Caseback ring */}
            <ellipse cx="250" cy="250" rx="145" ry="58" fill="#13161c" stroke="url(#expSteel)" strokeWidth="4" />
            <ellipse cx="250" cy="250" rx="138" ry="55" fill="#0c0e12" stroke="#242730" strokeWidth="1.5" strokeDasharray="4 3" />
            
            {/* Caseback text engravings */}
            <ellipse cx="250" cy="250" rx="118" ry="46" fill="none" stroke="rgba(212,186,125,0.4)" strokeWidth="0.75" />
            
            {/* Automatic Half-moon Rotor */}
            <path
              d="M 175 250 A 75 30 0 0 1 325 250 A 75 30 0 0 1 175 250"
              fill="url(#expGold)"
              opacity="0.8"
            />
            {/* Rotor cutouts & Côtes de Genève */}
            <path
              d="M 195 248 A 55 22 0 0 1 305 248 L 290 250 A 40 16 0 0 0 210 250 Z"
              fill="#5c441b"
            />
            <circle cx="250" cy="250" r="10" fill="url(#expSteel)" stroke="#242730" strokeWidth="2" />
            <circle cx="250" cy="250" r="4" fill="url(#expRubyGlow)" />

            {/* Interactive Badge when hovered or selected */}
            {(hoveredLayer === 'rotor' || selectedLayerId === 'rotor') && (
              <g transform="translate(405, 250)">
                <line x1="-10" y1="0" x2="-45" y2="0" stroke="#d4ba7d" strokeWidth="1.5" />
                <rect x="0" y="-12" width="90" height="24" rx="2" fill="#0c0d10" stroke="#d4ba7d" strokeWidth="1" />
                <text x="45" y="4" textAnchor="middle" fill="#f8f6f0" fontSize="10" fontFamily="monospace" fontWeight="bold">07. ROTOR</text>
              </g>
            )}
          </g>

          {/* ======================================================== */}
          {/* LAYER 6 : CALIBRE MÉCANIQUE & ENGRENAGES VIVANTS         */}
          {/* ======================================================== */}
          <g
            id="layer-movement"
            transform={`translate(0, ${LAYERS[5].offsetY})`}
            filter="url(#layerShadow)"
            className="cursor-pointer transition-transform duration-300 ease-out"
            onClick={() => onSelectLayer(LAYERS[5])}
            onMouseEnter={() => setHoveredLayer(LAYERS[5].id)}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            {/* Mainplate (Platine principale perlée) */}
            <ellipse cx="250" cy="250" rx="138" ry="54" fill="#181a20" stroke="url(#expMovementGilt)" strokeWidth="3" />
            
            {/* Calibre bridges (Ponts de rouage satinés) */}
            <path
              d="M 140 250 C 140 220, 200 215, 270 215 C 340 215, 370 235, 370 250 C 370 265, 330 280, 260 280 C 180 280, 140 265, 140 250 Z"
              fill="#242730"
              stroke="#d4ba7d"
              strokeWidth="1.5"
            />

            {/* Golden Gear train wheels in isometric perspective */}
            {/* Gear 1: Barrel / Barillet */}
            <ellipse cx="195" cy="245" rx="35" ry="14" fill="url(#expGold)" opacity="0.85" stroke="#785920" strokeWidth="1" />
            <circle cx="195" cy="245" r="4" fill="url(#expRubyGlow)" />

            {/* Gear 2: Center wheel / Roue de centre */}
            <ellipse cx="250" cy="248" rx="28" ry="11" fill="url(#expGold)" opacity="0.9" stroke="#785920" strokeWidth="1" />
            <circle cx="250" cy="248" r="3.5" fill="url(#expRubyGlow)" />

            {/* Gear 3: Third & Fourth wheel / Roue de moyenne & seconde */}
            <ellipse cx="285" cy="243" rx="22" ry="9" fill="url(#expGold)" opacity="0.95" stroke="#785920" strokeWidth="1" />
            <circle cx="285" cy="243" r="3" fill="url(#expRubyGlow)" />

            {/* Balance wheel rim (Balancier spiral à vis) */}
            <g transform="translate(310, 252)">
              <ellipse cx="0" cy="0" rx="26" ry="10.5" fill="none" stroke="url(#expGold)" strokeWidth="2.5" />
              <ellipse cx="0" cy="0" rx="20" ry="8" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" strokeDasharray="3 3" />
              <circle cx="0" cy="0" r="3" fill="url(#expRubyGlow)" />
            </g>

            {/* Ruby jewels on bridges */}
            <circle cx="225" cy="235" r="3.5" fill="url(#expRubyGlow)" stroke="#785920" strokeWidth="0.5" />
            <circle cx="265" cy="260" r="3.5" fill="url(#expRubyGlow)" stroke="#785920" strokeWidth="0.5" />

            {/* Interactive Badge */}
            {(hoveredLayer === 'movement' || selectedLayerId === 'movement') && (
              <g transform="translate(5, 250)">
                <line x1="95" y1="0" x2="135" y2="0" stroke="#d4ba7d" strokeWidth="1.5" />
                <rect x="0" y="-12" width="95" height="24" rx="2" fill="#0c0d10" stroke="#d4ba7d" strokeWidth="1" />
                <text x="47" y="4" textAnchor="middle" fill="#f8f6f0" fontSize="10" fontFamily="monospace" fontWeight="bold">06. CALIBRE</text>
              </g>
            )}
          </g>

          {/* ======================================================== */}
          {/* LAYER 5 : BOÎTIER CARRURE & COURONNE TWINLOCK            */}
          {/* ======================================================== */}
          <g
            id="layer-case"
            transform={`translate(0, ${LAYERS[4].offsetY})`}
            filter="url(#layerShadow)"
            className="cursor-pointer transition-transform duration-300 ease-out"
            onClick={() => onSelectLayer(LAYERS[4])}
            onMouseEnter={() => setHoveredLayer(LAYERS[4].id)}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            {/* Watch Middle Case (Carrure avec 4 cornes) */}
            {isCartier ? (
              // Cartier Santos rectangular case
              <g>
                <path
                  d="M 140 220 L 360 220 L 375 280 L 125 280 Z"
                  fill="url(#expSteel)"
                  stroke="#242730"
                  strokeWidth="2"
                />
                <ellipse cx="250" cy="250" rx="110" ry="44" fill="#0c0d10" stroke="#4b5563" strokeWidth="2" />
              </g>
            ) : (
              // Round Oyster case with sculpted lugs
              <g>
                {/* Lugs Top Left, Top Right, Bottom Left, Bottom Right */}
                <path
                  d="M 125 210 Q 150 225, 170 235 L 155 265 Q 135 250, 115 230 Z"
                  fill="url(#expSteel)"
                  stroke="#4b5563"
                  strokeWidth="1"
                />
                <path
                  d="M 375 210 Q 350 225, 330 235 L 345 265 Q 365 250, 385 230 Z"
                  fill="url(#expSteel)"
                  stroke="#4b5563"
                  strokeWidth="1"
                />
                <path
                  d="M 120 270 Q 140 255, 160 250 L 145 280 Q 125 285, 110 275 Z"
                  fill="url(#expSteel)"
                  stroke="#4b5563"
                  strokeWidth="1"
                />
                <path
                  d="M 380 270 Q 360 255, 340 250 L 355 280 Q 375 285, 390 275 Z"
                  fill="url(#expSteel)"
                  stroke="#4b5563"
                  strokeWidth="1"
                />

                {/* Central Ring Body */}
                <ellipse cx="250" cy="250" rx="140" ry="55" fill="url(#expSteel)" stroke="#374151" strokeWidth="2" />
                <ellipse cx="250" cy="250" rx="122" ry="48" fill="#0c0e12" stroke="#4b5563" strokeWidth="1.5" />
              </g>
            )}

            {/* Screw-down Crown & Tube at 3 o'clock */}
            <g transform="translate(390, 250)">
              <rect x="0" y="-8" width="16" height="16" rx="2" fill="url(#expGold)" stroke="#785920" strokeWidth="1" />
              {/* Crown fluting */}
              <line x1="4" y1="-8" x2="4" y2="8" stroke="#5c441b" strokeWidth="1" />
              <line x1="8" y1="-8" x2="8" y2="8" stroke="#5c441b" strokeWidth="1" />
              <line x1="12" y1="-8" x2="12" y2="8" stroke="#5c441b" strokeWidth="1" />
              {isCartier && (
                <circle cx="16" cy="0" r="4" fill="#2563eb" />
              )}
            </g>

            {/* Interactive Badge */}
            {(hoveredLayer === 'case' || selectedLayerId === 'case') && (
              <g transform="translate(415, 250)">
                <line x1="-10" y1="0" x2="-20" y2="0" stroke="#d4ba7d" strokeWidth="1.5" />
                <rect x="0" y="-12" width="85" height="24" rx="2" fill="#0c0d10" stroke="#d4ba7d" strokeWidth="1" />
                <text x="42" y="4" textAnchor="middle" fill="#f8f6f0" fontSize="10" fontFamily="monospace" fontWeight="bold">05. BOÎTIER</text>
              </g>
            )}
          </g>

          {/* ======================================================== */}
          {/* LAYER 4 : CADRAN SOLEILLÉ & DISQUE DE DATE               */}
          {/* ======================================================== */}
          <g
            id="layer-dial"
            transform={`translate(0, ${LAYERS[3].offsetY})`}
            filter="url(#layerShadow)"
            className="cursor-pointer transition-transform duration-300 ease-out"
            onClick={() => onSelectLayer(LAYERS[3])}
            onMouseEnter={() => setHoveredLayer(LAYERS[3].id)}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            {/* Dial Base Disc with Sunburst Sheen */}
            <ellipse cx="250" cy="250" rx="122" ry="48" fill="#181a20" stroke="url(#expGold)" strokeWidth="1.5" />
            
            {/* Sunburst rays */}
            <g stroke="rgba(255,255,255,0.08)" strokeWidth="0.75">
              {[...Array(12)].map((_, i) => (
                <line
                  key={i}
                  x1="250"
                  y1="250"
                  x2={250 + Math.cos((i * 30 * Math.PI) / 180) * 115}
                  y2={250 + Math.sin((i * 30 * Math.PI) / 180) * 45}
                />
              ))}
            </g>

            {/* 12 Applied Gold Hour Markers */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x = 250 + Math.cos(angle) * 105;
              const y = 250 + Math.sin(angle) * 40;
              // Skip 3 o'clock for date window
              if (i === 3) return null;
              return (
                <rect
                  key={i}
                  x={x - 2}
                  y={y - 2.5}
                  width="4"
                  height="5"
                  rx="0.5"
                  fill="url(#expGold)"
                  stroke="#5c441b"
                  strokeWidth="0.5"
                />
              );
            })}

            {/* Date Window at 3 o'clock */}
            <rect x="330" y="246" width="16" height="10" fill="#ffffff" stroke="#d4ba7d" strokeWidth="1" rx="1" />
            <text x="338" y="254" textAnchor="middle" fill="#000000" fontSize="7" fontFamily="sans-serif" fontWeight="bold">28</text>

            {/* Brand Logo text on Dial at 12 o'clock */}
            <text x="250" y="228" textAnchor="middle" fill="#f8f6f0" fontSize="8" fontFamily="serif" letterSpacing="2">
              {watch?.brand?.toUpperCase() || 'LE MOUVEMENT'}
            </text>
            <text x="250" y="235" textAnchor="middle" fill="#989186" fontSize="5" fontFamily="monospace" letterSpacing="1">
              CHRONOMETRE
            </text>

            {/* Interactive Badge */}
            {(hoveredLayer === 'dial' || selectedLayerId === 'dial') && (
              <g transform="translate(10, 250)">
                <line x1="90" y1="0" x2="125" y2="0" stroke="#d4ba7d" strokeWidth="1.5" />
                <rect x="0" y="-12" width="90" height="24" rx="2" fill="#0c0d10" stroke="#d4ba7d" strokeWidth="1" />
                <text x="45" y="4" textAnchor="middle" fill="#f8f6f0" fontSize="10" fontFamily="monospace" fontWeight="bold">04. CADRAN</text>
              </g>
            )}
          </g>

          {/* ======================================================== */}
          {/* LAYER 3 : JEU D’AIGUILLES (HEURES, MINUTES, TROTTEUSE)   */}
          {/* ======================================================== */}
          <g
            id="layer-hands"
            transform={`translate(0, ${LAYERS[2].offsetY})`}
            filter="url(#layerShadow)"
            className="cursor-pointer transition-transform duration-300 ease-out"
            onClick={() => onSelectLayer(LAYERS[2])}
            onMouseEnter={() => setHoveredLayer(LAYERS[2].id)}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            {/* Center pinion / Canon */}
            <circle cx="250" cy="250" r="5" fill="url(#expGold)" stroke="#5c441b" strokeWidth="1" />

            {/* Hour hand (Aiguille des heures) pointing to ~10h10 */}
            <path
              d="M 250 250 L 190 230 L 195 228 L 250 248 Z"
              fill={isCartier ? '#2563eb' : 'url(#expGold)'}
              stroke="#5c441b"
              strokeWidth="0.5"
            />

            {/* Minute hand (Aiguille des minutes) pointing to ~2h10 */}
            <path
              d="M 250 250 L 325 232 L 323 230 L 250 248 Z"
              fill={isCartier ? '#2563eb' : 'url(#expGold)'}
              stroke="#5c441b"
              strokeWidth="0.5"
            />

            {/* Sweep second hand (Fine trotteuse centrale) */}
            <line x1="250" y1="250" x2="275" y2="280" stroke={isCartier ? '#1d4ed8' : '#e5d1a4'} strokeWidth="1" />
            <circle cx="250" cy="250" r="2.5" fill="#ffffff" />

            {/* Interactive Badge */}
            {(hoveredLayer === 'hands' || selectedLayerId === 'hands') && (
              <g transform="translate(400, 250)">
                <line x1="-10" y1="0" x2="-65" y2="0" stroke="#d4ba7d" strokeWidth="1.5" />
                <rect x="0" y="-12" width="95" height="24" rx="2" fill="#0c0d10" stroke="#d4ba7d" strokeWidth="1" />
                <text x="47" y="4" textAnchor="middle" fill="#f8f6f0" fontSize="10" fontFamily="monospace" fontWeight="bold">03. AIGUILLES</text>
              </g>
            )}
          </g>

          {/* ======================================================== */}
          {/* LAYER 2 : LUNETTE CANNELÉE EN OR / GALBÉE               */}
          {/* ======================================================== */}
          <g
            id="layer-bezel"
            transform={`translate(0, ${LAYERS[1].offsetY})`}
            filter="url(#layerShadow)"
            className="cursor-pointer transition-transform duration-300 ease-out"
            onClick={() => onSelectLayer(LAYERS[1])}
            onMouseEnter={() => setHoveredLayer(LAYERS[1].id)}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            {/* Outer Bezel Ring */}
            <ellipse cx="250" cy="250" rx="136" ry="53" fill="none" stroke="url(#expGold)" strokeWidth="9" />
            
            {/* Bezel fluting facets (Cannelures usinées) */}
            <g stroke="#785920" strokeWidth="1.2">
              {[...Array(40)].map((_, i) => {
                const angle = (i * 9 * Math.PI) / 180;
                const x1 = 250 + Math.cos(angle) * 131;
                const y1 = 250 + Math.sin(angle) * 50;
                const x2 = 250 + Math.cos(angle) * 141;
                const y2 = 250 + Math.sin(angle) * 55;
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
              })}
            </g>

            {/* Interactive Badge */}
            {(hoveredLayer === 'bezel' || selectedLayerId === 'bezel') && (
              <g transform="translate(10, 250)">
                <line x1="90" y1="0" x2="115" y2="0" stroke="#d4ba7d" strokeWidth="1.5" />
                <rect x="0" y="-12" width="90" height="24" rx="2" fill="#0c0d10" stroke="#d4ba7d" strokeWidth="1" />
                <text x="45" y="4" textAnchor="middle" fill="#f8f6f0" fontSize="10" fontFamily="monospace" fontWeight="bold">02. LUNETTE</text>
              </g>
            )}
          </g>

          {/* ======================================================== */}
          {/* LAYER 1 : GLACE SAPHIR & CYCLOPE                         */}
          {/* ======================================================== */}
          <g
            id="layer-crystal"
            transform={`translate(0, ${LAYERS[0].offsetY})`}
            filter="url(#layerShadow)"
            className="cursor-pointer transition-transform duration-300 ease-out"
            onClick={() => onSelectLayer(LAYERS[0])}
            onMouseEnter={() => setHoveredLayer(LAYERS[0].id)}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            {/* Sapphire disc with anti-reflective gleam */}
            <ellipse
              cx="250"
              cy="250"
              rx="128"
              ry="50"
              fill="url(#expSapphire)"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.5"
            />

            {/* Specular Light Reflection curve */}
            <path
              d="M 160 235 Q 250 215, 340 235"
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            {/* Cyclops 2.5x Lens over Date at 3 o'clock */}
            <ellipse
              cx="338"
              cy="248"
              rx="14"
              ry="7"
              fill="rgba(255, 255, 255, 0.4)"
              stroke="#ffffff"
              strokeWidth="1.2"
            />

            {/* Interactive Badge */}
            {(hoveredLayer === 'crystal' || selectedLayerId === 'crystal') && (
              <g transform="translate(400, 250)">
                <line x1="-10" y1="0" x2="-45" y2="0" stroke="#a5f3fc" strokeWidth="1.5" />
                <rect x="0" y="-12" width="95" height="24" rx="2" fill="#0c0d10" stroke="#a5f3fc" strokeWidth="1" />
                <text x="47" y="4" textAnchor="middle" fill="#a5f3fc" fontSize="10" fontFamily="monospace" fontWeight="bold">01. SAPHIR</text>
              </g>
            )}
          </g>

        </svg>
      </div>

      {/* Explosion Interactive Slider Controls */}
      <div className="w-full max-w-md mt-4 p-4 bg-obsidian-900 border border-obsidian-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-sand/80 uppercase">Degré d'éclatement 3D :</span>
          <span className="text-brass-400 font-bold">{Math.round(exp * 100)}%</span>
        </div>

        {/* Range Slider */}
        <div className="relative flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round(exp * 100)}
            onChange={(e) => onSelectLayer(null, parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-obsidian-950 rounded-lg appearance-none cursor-pointer accent-brass-500 focus:outline-none"
          />
        </div>

        {/* Quick state buttons: 0% Assemblée vs 60% Éclatée vs 100% Décomposition Max */}
        <div className="flex items-center justify-between text-[10px] font-mono gap-2 pt-1">
          <button
            onClick={() => onSelectLayer(null, 0)}
            className={`px-2.5 py-1 border transition-colors cursor-pointer ${
              exp === 0 
                ? 'border-brass-400 bg-brass-500/20 text-brass-300 font-bold' 
                : 'border-obsidian-750 bg-obsidian-950 text-sand hover:text-ivory-100'
            }`}
          >
            0% Assemblée
          </button>
          <button
            onClick={() => onSelectLayer(null, 55)}
            className={`px-2.5 py-1 border transition-colors cursor-pointer ${
              exp > 0.4 && exp < 0.7 
                ? 'border-brass-400 bg-brass-500/20 text-brass-300 font-bold' 
                : 'border-obsidian-750 bg-obsidian-950 text-sand hover:text-ivory-100'
            }`}
          >
            55% Vue Éclatée
          </button>
          <button
            onClick={() => onSelectLayer(null, 100)}
            className={`px-2.5 py-1 border transition-colors cursor-pointer ${
              exp === 1 
                ? 'border-brass-400 bg-brass-500/20 text-brass-300 font-bold' 
                : 'border-obsidian-750 bg-obsidian-950 text-sand hover:text-ivory-100'
            }`}
          >
            100% Décomposition Totale
          </button>
        </div>
      </div>

    </div>
  );
}
