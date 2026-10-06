import React, { useState, useRef, useEffect } from 'react';
import { 
  RotateCw, Eye, Sparkles, Compass, ShieldCheck, 
  Activity, ArrowRight, Layers, Maximize2, Check 
} from 'lucide-react';

const WATCH_MODELS = [
  {
    id: 'rolex-datejust',
    brand: 'Rolex',
    title: 'Datejust 36 Ref. 16234',
    year: '1995',
    image: 'https://lemouvement-watches.fr/cdn/shop/files/DSC02450.jpg?width=900',
    altImage: 'https://lemouvement-watches.fr/cdn/shop/files/DSC02451.jpg?width=900',
    calibre: 'Calibre Manufacture 3135',
    frequency: "28'800 A/h (4 Hz)",
    amplitude: '294°',
    rate: '+1.5 s/j',
    materials: 'Acier Oystersteel 904L & Or Blanc 18k',
    dial: 'Argent Soleillé d’origine',
    waterproof: '100 mètres (Twinlock)',
    hotspots: [
      {
        id: 'bezel',
        title: 'Lunette Cannelée en Or Blanc',
        desc: 'Façonnée en or gris massif 18 carats, ses facettes réfléchissent la lumière sous tous les angles avec une brillance incomparable.',
        x: 62,
        y: 28,
        spec: 'Or Gris 750‰ • Polissage Miroir'
      },
      {
        id: 'dial',
        title: 'Cadran Soleillé & Index Or',
        desc: 'Finition brossée radiale créant des reflets argentés changeants selon l’éclairage ambiant. Index appliqués à la main.',
        x: 48,
        y: 52,
        spec: 'Soleillé d’origine • Tritium T<25'
      },
      {
        id: 'cyclops',
        title: 'Loupe Cyclope 2.5x',
        desc: 'Grossissement optique iconique sur la date instantanée à 3 heures avec changement net à minuit précis.',
        x: 74,
        y: 48,
        spec: 'Glace Saphir Inrayable'
      },
      {
        id: 'crown',
        title: 'Couronne Vissée Twinlock',
        desc: 'Double zone d’étanchéité garantissant une étanchéité absolue à 100 mètres de profondeur.',
        x: 88,
        y: 50,
        spec: 'Système Twinlock Breveté'
      }
    ]
  },
  {
    id: 'cartier-santos',
    brand: 'Cartier',
    title: 'Santos Galbée Ref. 1564',
    year: '1998',
    image: 'https://lemouvement-watches.fr/cdn/shop/files/DSC02218.jpg?width=900',
    altImage: 'https://lemouvement-watches.fr/cdn/shop/files/DSC02219.jpg?width=900',
    calibre: 'Calibre Cartier Haute Précision',
    frequency: 'Quartz Régulé Thermocompensé',
    amplitude: 'N/A (Électromécanique)',
    rate: '+0.2 s/j',
    materials: 'Acier Inoxydable & Vis Or',
    dial: 'Gris Opalescent Chiffres Romains',
    waterproof: '30 mètres',
    hotspots: [
      {
        id: 'bezel',
        title: 'Lunette Galbée à Vis Apparentes',
        desc: 'Inspirée de l’architecture Eiffel de 1904, chaque vis en or est minutieusement alignée dans la masse.',
        x: 60,
        y: 30,
        spec: 'Design Historique 1904'
      },
      {
        id: 'hands',
        title: 'Aiguilles Glaive en Acier Bleui',
        desc: 'Trempées à la flamme à 290°C pour obtenir cet oxyde bleu cobalt naturel et protecteur.',
        x: 48,
        y: 46,
        spec: 'Bleuissement Thermique Traditionnel'
      },
      {
        id: 'crown',
        title: 'Couronne à Cabochon Spinelle Saphir',
        desc: 'La signature joaillière de Cartier : une pierre bleue taillée en cabochon sertie sur la couronne heptagonale.',
        x: 86,
        y: 50,
        spec: 'Cabochon Saphir Bleu Intense'
      }
    ]
  },
  {
    id: 'tudor-prince',
    brand: 'Tudor',
    title: 'Prince Oysterdate Ref. 74000',
    year: '1991',
    image: 'https://lemouvement-watches.fr/cdn/shop/files/DSC02321_b420a646-7d52-45a8-b037-791fd35659c9.jpg?width=900',
    altImage: 'https://lemouvement-watches.fr/cdn/shop/files/DSC02322_51578351-e7c6-47eb-ba6d-47ea79ca8433.jpg?width=900',
    calibre: 'Calibre ETA 2824-2 Finition Top',
    frequency: "28'800 A/h (4 Hz)",
    amplitude: '288°',
    rate: '+2.1 s/j',
    materials: 'Boîtier Oyster Rolex en Acier',
    dial: 'Cadran Lin Strié (Linen Dial)',
    waterproof: '100 mètres (Oyster Case)',
    hotspots: [
      {
        id: 'case',
        title: 'Boîtier Oyster By Rolex Geneva',
        desc: 'Gravé « Original Oyster Case By Rolex Geneva » au dos, ce boîtier légendaire est taillé dans un bloc d’acier massif.',
        x: 28,
        y: 40,
        spec: 'Brevet Oyster 1926'
      },
      {
        id: 'dial',
        title: 'Cadran Lin Haute Texture',
        desc: 'Un motif quadrillé micro-strié simulant le tissage d’une étoffe de lin noble, un des cadrans les plus recherchés des collectionneurs.',
        x: 50,
        y: 54,
        spec: 'Texture Tissée Vintage Réfractaire'
      },
      {
        id: 'movement',
        title: 'Rotor Auto-Prince',
        desc: 'Remontage automatique bidirectionnel haute efficacité avec réserve de marche de 38 heures.',
        x: 65,
        y: 65,
        spec: 'Calibre Robuste Révisé Atelier'
      }
    ]
  }
];

export default function WatchInspectorShowcase({ onSelectProduct, navigateTo }) {
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const currentWatch = WATCH_MODELS[selectedModelIndex];
  
  const [activeHotspot, setActiveHotspot] = useState(currentWatch.hotspots[0]);
  const [rotationAngle, setRotationAngle] = useState(45);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeView, setActiveView] = useState('face'); // 'face' | 'macro'

  const containerRef = useRef(null);

  // Switch hotspot when watch model changes
  useEffect(() => {
    setActiveHotspot(currentWatch.hotspots[0]);
  }, [selectedModelIndex]);

  // 3D perspective mouse tilt calculation
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x, y });

    // Rotate conic angle gauge based on cursor position
    const angle = Math.round(((Math.atan2(y, x) * 180) / Math.PI + 180));
    setRotationAngle(angle);
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <section className="relative py-24 bg-obsidian-950 border-y border-obsidian-800/80 overflow-hidden select-none">
      
      {/* Background Radial Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brass-500/5 rounded-full blur-[180px] pointer-events-none"
        style={{
          transform: `translate(calc(-50% + ${mousePos.x * 40}px), calc(-50% + ${mousePos.y * 40}px))`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Cominvi-style micro-eyebrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-obsidian-800 gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brass-400 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-brass-400 font-bold">
                Atelier Métrologie • Inspection 3D
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal uppercase tracking-wide mt-2">
              L'Anatomie du Garde-Temps
            </h2>
            <p className="text-sand/80 text-xs sm:text-sm font-light mt-1 max-w-xl">
              Inspectez chaque composant au micron près. Du boîtier taillé dans la masse aux facettes de la lunette en or, découvrez l’exigence horlogère Le Mouvement.
            </p>
          </div>

          {/* Model Switcher Tabs (Cominvi-style pill buttons) */}
          <div className="flex items-center gap-1.5 p-1 bg-obsidian-900 border border-obsidian-800 self-start md:self-auto">
            {WATCH_MODELS.map((w, idx) => (
              <button
                key={w.id}
                onClick={() => setSelectedModelIndex(idx)}
                className={`px-3 sm:px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  selectedModelIndex === idx
                    ? 'bg-brass-500 text-obsidian-950 font-bold shadow-md'
                    : 'text-sand hover:text-ivory-100 hover:bg-obsidian-850'
                }`}
              >
                {w.brand}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12">
          
          {/* Left Telemetry HUD (3 cols) */}
          <div className="lg:col-span-3 space-y-4 order-2 lg:order-1">
            <div className="p-5 bg-obsidian-900/60 border border-obsidian-800 space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-sand/70 uppercase">
                <span>Rapport Chronocomparateur</span>
                <Activity className="w-3.5 h-3.5 text-brass-400 animate-pulse" />
              </div>
              
              <div className="space-y-2.5 pt-1">
                <div>
                  <div className="text-[10px] font-mono text-sand/60 uppercase">Fréquence Calibre</div>
                  <div className="font-serif text-base text-ivory-100 font-medium">{currentWatch.frequency}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-obsidian-850">
                  <div>
                    <div className="text-[10px] font-mono text-sand/60 uppercase">Amplitude</div>
                    <div className="font-mono text-xs text-emerald-400 font-semibold">{currentWatch.amplitude}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-sand/60 uppercase">Précision</div>
                    <div className="font-mono text-xs text-brass-400 font-semibold">{currentWatch.rate}</div>
                  </div>
                </div>

                <div className="pt-1 border-t border-obsidian-850">
                  <div className="text-[10px] font-mono text-sand/60 uppercase">Étanchéité Certifiée</div>
                  <div className="font-serif text-xs text-ivory-200">{currentWatch.waterproof}</div>
                </div>
              </div>
            </div>

            {/* Circular Conic-Gradient Angle Bezel Gauge (Signature Cominvi Animation) */}
            <div className="p-5 bg-obsidian-900/60 border border-obsidian-800 space-y-3 text-center">
              <div className="text-[10px] font-mono text-sand/70 uppercase tracking-wider flex items-center justify-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-brass-400" />
                Orientation & Axe Spatial
              </div>

              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                {/* Conic Gradient Track */}
                <div 
                  className="w-full h-full rounded-full transition-transform duration-300"
                  style={{
                    background: `conic-gradient(from ${rotationAngle}deg, rgba(212, 175, 55, 0.9) 0deg, rgba(212, 175, 55, 0.1) 180deg, transparent 360deg)`,
                    padding: '3px'
                  }}
                >
                  <div className="w-full h-full bg-obsidian-950 rounded-full flex flex-col items-center justify-center">
                    <span className="font-mono text-lg font-bold text-ivory-100">{rotationAngle}°</span>
                    <span className="text-[9px] font-mono uppercase text-brass-400">Azimut 3D</span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] font-mono text-sand/60">
                Déplacez la souris sur la pièce pour modifier l'angle d'incidence de la lumière.
              </p>
            </div>
          </div>

          {/* Center 3D Interactive Stage (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative order-1 lg:order-2">
            
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-md aspect-square bg-gradient-to-b from-obsidian-900/40 to-obsidian-950 border border-obsidian-800/80 p-6 flex items-center justify-center cursor-crosshair overflow-hidden group shadow-[0_20px_80px_rgba(0,0,0,0.9)]"
              style={{
                perspective: '1200px'
              }}
            >
              {/* Dynamic Reflection Glare that tracks cursor */}
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20"
                style={{
                  opacity: isHovered ? 0.45 : 0.15,
                  background: `radial-gradient(circle at ${(mousePos.x + 1) * 50}% ${(mousePos.y + 1) * 50}%, rgba(212, 175, 55, 0.35) 0%, transparent 60%)`
                }}
              />

              {/* Watch Display with 3D Transform */}
              <div
                className="relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out will-change-transform z-10"
                style={{
                  transform: `rotateY(${mousePos.x * 16}deg) rotateX(${-mousePos.y * 16}deg) scale3d(${isHovered ? 1.05 : 1}, ${isHovered ? 1.05 : 1}, 1)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <img
                  src={activeView === 'macro' ? currentWatch.altImage : currentWatch.image}
                  alt={currentWatch.title}
                  className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] select-none pointer-events-none"
                />

                {/* Interactive Inspection Hotspots Pins */}
                {currentWatch.hotspots.map((spot) => {
                  const isActive = activeHotspot.id === spot.id;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => setActiveHotspot(spot)}
                      className="absolute z-30 -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer focus:outline-none"
                      style={{
                        left: `${spot.x}%`,
                        top: `${spot.y}%`,
                        transform: 'translateZ(30px)'
                      }}
                      title={spot.title}
                    >
                      <div className="relative flex items-center justify-center">
                        <span className={`absolute w-7 h-7 rounded-full transition-all ${
                          isActive 
                            ? 'bg-brass-400/40 animate-ping' 
                            : 'bg-brass-500/20 group-hover/pin:bg-brass-500/40'
                        }`} />
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                          isActive 
                            ? 'bg-brass-400 border-ivory-100 shadow-[0_0_12px_rgba(212,175,55,1)] scale-125' 
                            : 'bg-obsidian-950 border-brass-400 group-hover/pin:scale-110'
                        }`}>
                          <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-obsidian-950' : 'bg-brass-400'}`} />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* View Angle Switcher Button (Face / Macro) */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-obsidian-950/90 border border-obsidian-750 p-1">
                <button
                  onClick={() => setActiveView('face')}
                  className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                    activeView === 'face' ? 'bg-brass-500 text-obsidian-950 font-bold' : 'text-sand hover:text-ivory-100'
                  }`}
                >
                  Vue Globale
                </button>
                <button
                  onClick={() => setActiveView('macro')}
                  className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                    activeView === 'macro' ? 'bg-brass-500 text-obsidian-950 font-bold' : 'text-sand hover:text-ivory-100'
                  }`}
                >
                  Gros Plan
                </button>
              </div>

            </div>

            {/* Stage Footer Watch Caption */}
            <div className="mt-4 text-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-brass-400 font-semibold">
                {currentWatch.brand} • Millésime {currentWatch.year}
              </span>
              <h3 className="font-serif text-xl text-ivory-100 font-normal uppercase mt-0.5">
                {currentWatch.title}
              </h3>
            </div>

          </div>

          {/* Right Hotspot Detail Card (3 cols) */}
          <div className="lg:col-span-3 space-y-4 order-3">
            <div className="p-6 bg-obsidian-900 border border-brass-600/40 shadow-xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brass-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-brass-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brass-400" />
                  Point Focal Sélectionné
                </span>
                <span>{activeHotspot.id.toUpperCase()}</span>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-lg text-ivory-100 font-medium">
                  {activeHotspot.title}
                </h4>
                <p className="text-sand/90 text-xs leading-relaxed font-light">
                  {activeHotspot.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-obsidian-800 space-y-1">
                <div className="text-[10px] font-mono text-sand/60 uppercase">Spécification Haute Horlogerie :</div>
                <div className="text-xs font-mono font-semibold text-brass-300">
                  {activeHotspot.spec}
                </div>
              </div>

              {/* Hotspots Quick Switcher Pills */}
              <div className="pt-2">
                <div className="text-[10px] font-mono text-sand/60 uppercase mb-2">Autres points à examiner :</div>
                <div className="flex flex-wrap gap-1.5">
                  {currentWatch.hotspots.map((spot) => (
                    <button
                      key={spot.id}
                      onClick={() => setActiveHotspot(spot)}
                      className={`px-2 py-1 text-[10px] font-mono uppercase border transition-colors cursor-pointer ${
                        activeHotspot.id === spot.id 
                          ? 'border-brass-400 bg-brass-500/20 text-brass-300 font-bold' 
                          : 'border-obsidian-750 bg-obsidian-950 text-sand hover:text-ivory-100'
                      }`}
                    >
                      {spot.title.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigateTo('catalogue')}
                  className="w-full py-2.5 bg-obsidian-950 hover:bg-brass-500 hover:text-obsidian-950 text-ivory-100 border border-obsidian-700 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  Voir dans le catalogue
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
