import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Sparkles, Compass, ShieldCheck, Activity, ArrowRight, 
  ChevronLeft, ChevronRight, Eye, EyeOff, Layers, Disc, 
  Cpu, Wrench, CheckCircle2, Zap, Sliders, Sun, Moon, Type
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import WatchExplodedViewSvg from './WatchExplodedViewSvg';
import CalibreMovementSimulator from './CalibreMovementSimulator';
import { FONT_PAIRINGS } from './FontPairingModal';

// Clean title helper
const cleanTitle = (str) => (str || '').replace(/\s+/g, ' ').trim();

export default function WatchInspectorShowcase({ 
  onSelectProduct, 
  navigateTo, 
  theme = 'dark', 
  toggleTheme,
  fontPairing = 'manufacture-royale',
  onCycleFontPairing,
  onOpenFontModal
}) {
  // All 30 watches with transparent cutout fallback
  const allWatches = useMemo(() => {
    return PRODUCTS.map(p => {
      const slug = p.slug || p.id;
      return {
        ...p,
        cleanTitle: cleanTitle(p.title),
        cutoutImage: `/cutouts/${slug}.png`,
        fallbackImage: p.featuredImage || (p.images && p.images[0])
      };
    });
  }, []);

  // Brands list
  const brands = useMemo(() => {
    const list = ['TOUTES'];
    const brandCounts = {};
    allWatches.forEach(w => {
      const b = w.brand || 'Autre';
      brandCounts[b] = (brandCounts[b] || 0) + 1;
    });
    Object.keys(brandCounts).sort().forEach(b => list.push(b));
    return list;
  }, [allWatches]);

  const [selectedBrand, setSelectedBrand] = useState('TOUTES');
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3 Modes: 'inspection' (3D Azimut), 'exploded' (Décomposition 7 composants), 'simulation' (Calibre vivant)
  const [viewMode, setViewMode] = useState('inspection');

  // Mode 1: Inspection states
  const [showHotspots, setShowHotspots] = useState(true);
  const [activeHotspotId, setActiveHotspotId] = useState('dial');
  const [rotationAngle, setRotationAngle] = useState(45);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Mode 2: Exploded view states
  const [explosionLevel, setExplosionLevel] = useState(55);
  const [selectedLayerId, setSelectedLayerId] = useState('movement');
  const [selectedLayerData, setSelectedLayerData] = useState(null);

  // Calibre simulation active topic
  const [activeCalibreTopic, setActiveCalibreTopic] = useState('escapement');

  const activePairingIndex = FONT_PAIRINGS.findIndex(p => p.id === fontPairing);
  const activePairing = activePairingIndex >= 0 ? FONT_PAIRINGS[activePairingIndex] : FONT_PAIRINGS[0];

  const containerRef = useRef(null);

  // Filtered list
  const filteredWatches = useMemo(() => {
    if (selectedBrand === 'TOUTES') return allWatches;
    return allWatches.filter(w => w.brand === selectedBrand);
  }, [allWatches, selectedBrand]);

  // Current active watch (guaranteed 1 single watch displayed)
  const currentWatch = filteredWatches[currentIndex] || filteredWatches[0] || allWatches[0];

  // Reset index when brand changes so the watch changes immediately
  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    setCurrentIndex(0);
    setZoomLevel(1);
  };

  // Next watch
  const handleNext = () => {
    setCurrentIndex(prev => (prev < filteredWatches.length - 1 ? prev + 1 : 0));
    setZoomLevel(1);
  };

  // Previous watch
  const handlePrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : filteredWatches.length - 1));
    setZoomLevel(1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredWatches.length]);

  // 3D perspective mouse tilt calculation
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x, y });

    const angle = Math.round(((Math.atan2(y, x) * 180) / Math.PI + 180));
    setRotationAngle(angle);
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Dynamic hotspots centered on the watch head
  const hotspots = useMemo(() => {
    const b = currentWatch.brand || 'Horlogerie';
    return [
      {
        id: 'dial',
        title: currentWatch.dial ? `Cadran ${currentWatch.dial}` : 'Cadran & Aiguilles',
        desc: `Cadran de manufacture d'origine certifié non retouché. Index appliqués à la main et patine historique préservée.`,
        spec: `Millésime ${currentWatch.year || 'Vintage'} • 100% Authentique`,
        x: 50,
        y: 50
      },
      {
        id: 'bezel',
        title: `Boîtier ${currentWatch.diameter || '36mm'}`,
        desc: `Boîtier ${currentWatch.materials || 'en acier'} aux lignes affûtées et brossages de manufacture intacts, sans sur-polissage.`,
        spec: `${currentWatch.materials || 'Acier Inoxydable'} • Diamètre ${currentWatch.diameter || 'Origine'}`,
        x: 50,
        y: 34
      },
      {
        id: 'crown',
        title: b === 'Cartier' ? 'Cabochon Saphir' : (b === 'Rolex' ? 'Couronne Twinlock' : 'Couronne de Remontoir'),
        desc: b === 'Cartier' 
          ? 'Couronne ornée du cabochon de spinelle bleu signature de la maison Cartier.' 
          : (b === 'Rolex' ? 'Couronne vissée brevetée Twinlock garantissant une étanchéité absolue.' : 'Couronne d’origine assurant le remontage mécanique.'),
        spec: b === 'Cartier' ? 'Cabochon Bleu Nuit' : (b === 'Rolex' ? 'Brevet Twinlock 100m' : 'Couronne Signée'),
        x: 68,
        y: 50
      },
      {
        id: 'movement',
        title: `Calibre ${currentWatch.movement || 'Mécanique'}`,
        desc: `${currentWatch.revision || 'Entièrement révisé dans notre atelier avec lubrification synthétique.'} Marche et amplitude contrôlées sur chronocomparateur.`,
        spec: `${currentWatch.movement || 'Automatique'} • Garantie 12 mois`,
        x: 50,
        y: 66
      }
    ];
  }, [currentWatch]);

  const activeHotspot = hotspots.find(h => h.id === activeHotspotId) || hotspots[0];

  // Exploded layer definitions for fallback / sync
  const isCartier = currentWatch.brand === 'Cartier';
  const explodedLayersCatalog = useMemo(() => [
    {
      id: 'crystal',
      order: 1,
      title: 'Glace Saphir & Loupe Cyclope',
      subtitle: 'Protection optique inrayable',
      material: 'Corindon synthétique pur (Dureté 9 Mohs)',
      thickness: '1.8 mm d’épaisseur, biseau poli',
      desc: 'Taillée au diamant dans un bloc de corindon cristallisé. Traitée anti-reflets double face, elle protège le cadran des chocs tout en assurant une clarté optique parfaite.',
      color: '#a5f3fc'
    },
    {
      id: 'bezel',
      order: 2,
      title: isCartier ? 'Lunette Galbée à Vis Or' : 'Lunette Cannelée en Or Gris',
      subtitle: 'Signature esthétique de la manufacture',
      material: isCartier ? 'Or jaune 18k / Acier poli miroir' : 'Or gris 750‰ massif (18 carats)',
      thickness: 'Cannelure usinée au centième de millimètre',
      desc: isCartier 
        ? 'Lunette vissée emblématique ornée de 8 vis or massif affleurantes inspirées des rivets de la Tour Eiffel.' 
        : 'Les cannelures prismatiques captent et renvoient les rayons lumineux selon chaque inclinaison du poignet.',
      color: '#d4ba7d'
    },
    {
      id: 'hands',
      order: 3,
      title: 'Jeu d’Aiguilles & Canon Central',
      subtitle: 'Heures, Minutes et Trotteuse centrale',
      material: isCartier ? 'Acier bleui thermique à la flamme (290°C)' : 'Or blanc 18k poli miroir & Chromalight',
      thickness: 'Axe de chaussée ajusté à 0.005 mm',
      desc: 'Façonnées à la main, équilibrées au milligramme près pour minimiser la consommation d’énergie du rouage moteur et assurer une lisibilité instantanée.',
      color: isCartier ? '#3b82f6' : '#f8f6f0'
    },
    {
      id: 'dial',
      order: 4,
      title: currentWatch.dial ? `Cadran ${currentWatch.dial}` : 'Cadran Métallique & Disque de Date',
      subtitle: 'Plaque de laiton noble émaillée',
      material: 'Laiton brossé soleillé, index en or massif appliqués',
      thickness: 'Disque de date instantané sous-jacent (saut à minuit)',
      desc: 'Le visage du garde-temps. Décoré d’un brossage soleillé ou d’un guilloché profond, avec guichet de date taillé au biseau à 3 heures.',
      color: '#e5d1a4'
    },
    {
      id: 'case',
      order: 5,
      title: 'Boîtier Carrure & Couronne Hermétique',
      subtitle: 'Structure porteuse taillée dans la masse',
      material: 'Acier Oystersteel 904L résistant aux acides marins',
      thickness: 'Herméticité éprouvée à 100 mètres (10 bars)',
      desc: 'Usiné dans un bloc d’acier massif ultra-dense. Intègre le tube de couronne fileté à joints toriques et les épaulements de protection étanches.',
      color: '#9ca3af'
    },
    {
      id: 'movement',
      order: 6,
      title: `Calibre Mécanique ${currentWatch.movement || 'Manufacture'}`,
      subtitle: 'Cœur battant : balancier, ancre et rouages',
      material: 'Platine perlée, ponts Côtes de Genève, 31 rubis synthétiques',
      thickness: 'Fréquence de régulation de 28 800 A/h (4 Hz)',
      desc: 'Le moteur horloger intégral. Comprend le barillet de ressort moteur, le train de rouage démultiplicateur, l’ancre suisse et le balancier régulateur thermocompensé.',
      color: '#c5a059'
    },
    {
      id: 'rotor',
      order: 7,
      title: 'Masse Oscillante & Fond de Boîte Vissé',
      subtitle: 'Remontage automatique perpétuel & scellement',
      material: 'Segment lourd en tungstène / or, joint de fond synthétique',
      thickness: 'Roulement à micro-billes céramique sans lubrification',
      desc: 'Le rotor pivote librement au moindre mouvement du poignet pour armer le ressort de marche. Le fond cannelé scelle hermétiquement l’atelier intérieur.',
      color: '#ab8441'
    }
  ], [currentWatch, isCartier]);

  // Current active exploded layer
  const activeExplodedLayer = useMemo(() => {
    if (selectedLayerData) return selectedLayerData;
    return explodedLayersCatalog.find(l => l.id === selectedLayerId) || explodedLayersCatalog[5];
  }, [selectedLayerData, selectedLayerId, explodedLayersCatalog]);

  const handleSelectExplodedLayer = (layer, newLevel) => {
    if (newLevel !== undefined && newLevel !== null) {
      setExplosionLevel(newLevel);
    }
    if (layer) {
      setSelectedLayerId(layer.id);
      setSelectedLayerData(layer);
    }
  };

  // Calibre Simulation Topics
  const calibreTopics = useMemo(() => [
    {
      id: 'escapement',
      title: 'Échappement Libre à Ancre Suisse',
      desc: 'L’ancre suisse transforme la force continue du ressort en impulsions rythmées. À chaque alternance, ses palettes en rubis bloquent puis libèrent la roue d’échappement dent par dent.',
      spec: 'Levées en corindon rouge synthétique • 8 battements / sec'
    },
    {
      id: 'balance',
      title: 'Balancier Glucydur & Spiral Breguet',
      desc: 'Le régulateur suprême. Le balancier oscille avec un mouvement sinusoïdal harmonique d’amplitude 300°, régulé au milliseconde par le spiral bleuissant qui respire à 28 800 alternances/heure.',
      spec: 'Alliage antimagnétique Glucydur • Vis de réglage Microstella'
    },
    {
      id: 'train',
      title: 'Train de Rouages & Barillet Moteur',
      desc: 'Du barillet à la roue des secondes, 4 engrenages démultiplient le couple avec un rendement de 98%, pivotant sur des chatons d’or sertis de rubis sans frottement.',
      spec: 'Denture épicycloïdale polie miroir • Réserve 48 heures'
    },
    {
      id: 'rotor',
      title: 'Masse Oscillante Bidirectionnelle',
      desc: 'Le rotor perpétuel arme le ressort dans les deux sens de rotation grâce à ses inverseurs à cliquet. Un simple port de 8 heures garantit 48 heures de marche ininterrompue.',
      spec: 'Segment périphérique lourd en tungstène • Roulement céramique'
    }
  ], []);

  const activeCalibreTopicData = calibreTopics.find(t => t.id === activeCalibreTopic) || calibreTopics[0];

  return (
    <section className="relative py-20 bg-obsidian-950 overflow-hidden select-none">
      
      {/* Background Soft Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-brass-500/5 rounded-full blur-[200px] pointer-events-none"
        style={{
          transform: `translate(calc(-50% + ${mousePos.x * 40}px), calc(-50% + ${mousePos.y * 40}px))`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header & Brand Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 border-b border-obsidian-850 gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brass-400 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-brass-400 font-bold">
                Atelier Métrologie • Studio d'Inspection & Simulation
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal uppercase tracking-wide mt-2">
              L'Anatomie du Garde-Temps
            </h2>
            <p className="text-sand/80 text-xs sm:text-sm font-light mt-1 max-w-xl">
              Inspectez la montre sous tous ses angles, décomposez chacun de ses composants en vue éclatée, ou observez son calibre tourner en temps réel.
            </p>
          </div>

          {/* Brand Switcher Pills */}
          <div className="flex items-center flex-wrap gap-1.5 p-1 bg-obsidian-900/80 border border-obsidian-800 self-start lg:self-auto">
            {brands.map((b) => {
              const count = b === 'TOUTES' ? allWatches.length : allWatches.filter(w => w.brand === b).length;
              return (
                <button
                  key={b}
                  onClick={() => handleBrandChange(b)}
                  className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    selectedBrand === b
                      ? 'bg-brass-500 text-obsidian-950 font-bold shadow-md'
                      : 'text-sand hover:text-ivory-100 hover:bg-obsidian-850'
                  }`}
                >
                  {b} <span className="opacity-70 text-[9px]">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Mode Studio Tabs Switcher */}
        <div className="pt-6 pb-2 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-obsidian-850">
          
          {/* Tabs */}
          <div className="flex items-center flex-wrap gap-2 p-1 bg-obsidian-900 border border-brass-600/30">
            <button
              onClick={() => setViewMode('inspection')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'inspection'
                  ? 'bg-brass-500 text-obsidian-950 font-bold shadow-lg'
                  : 'text-sand hover:text-ivory-100 hover:bg-obsidian-850'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>1. Inspection 3D & Azimut</span>
            </button>

            <button
              onClick={() => setViewMode('exploded')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'exploded'
                  ? 'bg-brass-500 text-obsidian-950 font-bold shadow-lg'
                  : 'text-sand hover:text-ivory-100 hover:bg-obsidian-850'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>2. Vue Éclatée (Décomposition)</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded ${viewMode === 'exploded' ? 'bg-obsidian-950 text-brass-300' : 'bg-obsidian-800 text-sand'}`}>
                7 Couches
              </span>
            </button>

            <button
              onClick={() => setViewMode('simulation')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'simulation'
                  ? 'bg-brass-500 text-obsidian-950 font-bold shadow-lg'
                  : 'text-sand hover:text-ivory-100 hover:bg-obsidian-850'
              }`}
            >
              <Disc className="w-4 h-4" />
              <span>3. Simulation Calibre Vivant</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded ${viewMode === 'simulation' ? 'bg-obsidian-950 text-emerald-400' : 'bg-obsidian-800 text-sand'}`}>
                Voir tourner
              </span>
            </button>
          </div>

          {/* Studio Controls: Fond Noir / Fond Blanc Switcher + Model Selector */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Background Studio Theme Switcher: Fond Noir vs Fond Blanc */}
            <div className="flex items-center p-0.5 bg-obsidian-900 border border-brass-600/40">
              <button
                onClick={() => toggleTheme && toggleTheme('dark')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-brass-500 text-obsidian-950 font-bold shadow-md'
                    : 'text-sand hover:text-ivory-100 hover:bg-obsidian-850'
                }`}
                title="Afficher en Studio Fond Noir Obsidian"
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Fond Noir</span>
              </button>
              <button
                onClick={() => toggleTheme && toggleTheme('light')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'bg-brass-500 text-obsidian-950 font-bold shadow-md'
                    : 'text-sand hover:text-ivory-100 hover:bg-obsidian-850'
                }`}
                title="Afficher en Studio Fond Blanc Épuré"
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Fond Blanc</span>
              </button>
            </div>

            {/* SOTA 2026 Typography Studio Switcher Pill */}
            <div className="flex items-center p-0.5 bg-obsidian-900 border border-brass-600/40">
              <button
                onClick={() => onCycleFontPairing && onCycleFontPairing(-1)}
                className="p-1 text-sand hover:text-ivory-100 hover:bg-obsidian-850 transition-colors cursor-pointer"
                title="Typographie précédente"
                aria-label="Typographie précédente"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenFontModal}
                className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-ivory-100 hover:text-brass-300 transition-colors cursor-pointer"
                title="Ouvrir le studio des 10 typographies de haute horlogerie"
              >
                <Type className="w-3.5 h-3.5 text-brass-400" />
                <span className="font-semibold hidden lg:inline">{activePairing?.name}</span>
                <span className="text-brass-400 font-bold text-[10px]">({activePairingIndex + 1}/10)</span>
              </button>
              <button
                onClick={() => onCycleFontPairing && onCycleFontPairing(1)}
                className="p-1 text-sand hover:text-ivory-100 hover:bg-obsidian-850 transition-colors cursor-pointer"
                title="Typographie suivante"
                aria-label="Typographie suivante"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Model Selector Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-sand/70 hidden xl:inline">
                Modèle ({currentIndex + 1}/{filteredWatches.length}) :
              </span>

              <select
                value={currentIndex}
                onChange={(e) => {
                  setCurrentIndex(Number(e.target.value));
                  setZoomLevel(1);
                }}
                className="bg-obsidian-900 border border-brass-600/40 text-ivory-100 font-serif text-sm px-3 py-1.5 cursor-pointer focus:outline-none focus:border-brass-400"
              >
                {filteredWatches.map((w, idx) => (
                  <option key={w.id || idx} value={idx} className="bg-obsidian-950 text-ivory-100 font-sans">
                    {w.brand} — {w.cleanTitle} ({w.priceFormatted})
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Mode-Specific Sub-toolbar (Hotspots/Zoom for Mode 1, Hint for others) */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="text-sand/80 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brass-400" />
            {viewMode === 'inspection' && (
              <span>Survolez la montre pour orienter la réflexion lumineuse • Cliquez sur les repères</span>
            )}
            {viewMode === 'exploded' && (
              <span>Ajustez le curseur pour séparer les 7 couches de la montre dans l'espace</span>
            )}
            {viewMode === 'simulation' && (
              <span>Cinématique mécanique en temps réel (28 800 A/h) • Réglez la vitesse et testez le stop-seconde</span>
            )}
          </div>

          {/* Mode 1 Controls */}
          {viewMode === 'inspection' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHotspots(!showHotspots)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase border transition-all cursor-pointer ${
                  showHotspots
                    ? 'border-brass-500/60 bg-brass-500/10 text-brass-300'
                    : 'border-obsidian-750 bg-obsidian-900 text-sand hover:text-ivory-100'
                }`}
                title="Afficher ou masquer les repères"
              >
                {showHotspots ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{showHotspots ? 'Repères Activés' : 'Repères Masqués'}</span>
              </button>

              <div className="flex items-center border border-obsidian-800 bg-obsidian-900/80 p-0.5">
                {[1, 1.35, 1.7].map((z) => (
                  <button
                    key={z}
                    onClick={() => setZoomLevel(z)}
                    className={`px-2 py-1 text-[10px] font-mono transition-colors cursor-pointer ${
                      zoomLevel === z ? 'bg-brass-500 text-obsidian-950 font-bold' : 'text-sand hover:text-ivory-100'
                    }`}
                  >
                    {z === 1 ? '1x' : `${z}x`}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Giant Main Stage (12 columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
          
          {/* ======================================================== */}
          {/* LEFT HUD : SPECIFICATIONS ADAPTATIVES (3 cols)          */}
          {/* ======================================================== */}
          <div className="lg:col-span-3 space-y-4 order-2 lg:order-1">
            
            {/* HUD 1: INSPECTION MODE */}
            {viewMode === 'inspection' && (
              <>
                <div className="p-5 bg-obsidian-900/40 border border-obsidian-850/80 backdrop-blur-sm space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono text-sand/70 uppercase">
                    <span>Fiche d'Inspection</span>
                    <Activity className="w-3.5 h-3.5 text-brass-400 animate-pulse" />
                  </div>
                  
                  <div className="space-y-2.5 pt-1">
                    <div>
                      <div className="text-[10px] font-mono text-sand/60 uppercase">Mouvement</div>
                      <div className="font-serif text-base text-ivory-100 font-medium truncate">
                        {currentWatch.movement || 'Mécanique'}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-obsidian-850">
                      <div>
                        <div className="text-[10px] font-mono text-sand/60 uppercase">Diamètre</div>
                        <div className="font-mono text-xs text-brass-300 font-semibold">
                          {currentWatch.diameter || '36mm'}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-sand/60 uppercase">Année</div>
                        <div className="font-mono text-xs text-ivory-200 font-semibold">
                          {currentWatch.year || 'Authentifié'}
                        </div>
                      </div>
                    </div>

                    <div className="pt-1 border-t border-obsidian-850">
                      <div className="text-[10px] font-mono text-sand/60 uppercase">Matériaux</div>
                      <div className="font-serif text-xs text-ivory-200">
                        {currentWatch.materials || 'Acier Inoxydable'}
                      </div>
                    </div>

                    <div className="pt-1 border-t border-obsidian-850">
                      <div className="text-[10px] font-mono text-sand/60 uppercase">Écrin & Certificat</div>
                      <div className="text-[11px] font-sans text-sand/90">
                        {currentWatch.boxPapers || 'Certificat d’authenticité Le Mouvement'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-obsidian-900/40 border border-obsidian-850/80 backdrop-blur-sm space-y-2 text-center">
                  <div className="text-[10px] font-mono text-sand/70 uppercase tracking-wider flex items-center justify-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-brass-400" />
                    Orientation 3D : {rotationAngle}°
                  </div>
                  <p className="text-[10px] font-mono text-sand/60">
                    Bougez la souris sur la montre pour faire varier la lumière.
                  </p>
                </div>
              </>
            )}

            {/* HUD 2: EXPLODED VIEW MODE */}
            {viewMode === 'exploded' && (
              <div className="p-5 bg-obsidian-900/40 border border-obsidian-850/80 backdrop-blur-sm space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-sand/70 uppercase">
                  <span>Architecture Éclatée</span>
                  <Layers className="w-3.5 h-3.5 text-brass-400" />
                </div>

                <div className="space-y-3 pt-1">
                  <div>
                    <div className="text-[10px] font-mono text-sand/60 uppercase">État de décomposition</div>
                    <div className="font-serif text-base text-brass-300 font-medium">
                      {explosionLevel === 0 ? 'Complètement Assemblée' : explosionLevel < 50 ? 'Séparation Délicate' : explosionLevel < 85 ? 'Vue Éclatée Standard' : 'Décomposition Totale'} ({explosionLevel}%)
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-obsidian-850">
                    <div>
                      <div className="text-[10px] font-mono text-sand/60 uppercase">Sous-ensembles</div>
                      <div className="font-mono text-xs text-ivory-100 font-semibold">
                        7 Couches
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-sand/60 uppercase">Précision</div>
                      <div className="font-mono text-xs text-brass-300 font-semibold">
                        ± 0.002 mm
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-obsidian-850">
                    <div className="text-[10px] font-mono text-sand/60 uppercase">Contrôle de montage</div>
                    <div className="text-xs text-sand/90 font-sans mt-0.5 leading-relaxed">
                      Chaque couche s’assemble sans contrainte mécanique grâce au taillage de précision des pas de vis et épaulements.
                    </div>
                  </div>

                  <div className="pt-2 border-t border-obsidian-850">
                    <div className="text-[10px] font-mono text-sand/60 uppercase">Composant actif</div>
                    <div className="font-serif text-sm text-ivory-100 font-medium mt-0.5">
                      {activeExplodedLayer.title}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* HUD 3: CALIBRE SIMULATION MODE */}
            {viewMode === 'simulation' && (
              <div className="p-5 bg-obsidian-900/40 border border-obsidian-850/80 backdrop-blur-sm space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-sand/70 uppercase">
                  <span>Cinématique Horlogère</span>
                  <Disc className="w-3.5 h-3.5 text-brass-400 animate-spin" />
                </div>

                <div className="space-y-2.5 pt-1">
                  <div>
                    <div className="text-[10px] font-mono text-sand/60 uppercase">Calibre</div>
                    <div className="font-serif text-base text-ivory-100 font-medium">
                      {currentWatch.movement || 'Manufacture 3135'}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-obsidian-850">
                    <div>
                      <div className="text-[10px] font-mono text-sand/60 uppercase">Fréquence</div>
                      <div className="font-mono text-xs text-brass-300 font-semibold">
                        28 800 A/h
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-sand/60 uppercase">Rubis</div>
                      <div className="font-mono text-xs text-ivory-200 font-semibold">
                        31 Synthétiques
                      </div>
                    </div>
                  </div>

                  <div className="pt-1 border-t border-obsidian-850">
                    <div className="text-[10px] font-mono text-sand/60 uppercase">Organe Régulateur</div>
                    <div className="text-xs text-sand/90 font-serif">
                      Balancier Glucydur avec spiral Breguet thermocompensé
                    </div>
                  </div>

                  <div className="pt-1 border-t border-obsidian-850">
                    <div className="text-[10px] font-mono text-sand/60 uppercase">Échappement</div>
                    <div className="text-xs text-sand/90 font-serif">
                      Ancre suisse avec palettes en rubis à blocage micrométrique
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ======================================================== */}
          {/* CENTER STAGE : 3 MODES (6 cols)                         */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative order-1 lg:order-2">
            
            {/* Direct Prev / Next Big Arrow Buttons positioned on sides */}
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              className="relative w-full flex items-center justify-center cursor-crosshair py-2"
              style={{
                perspective: '1400px',
                minHeight: '640px'
              }}
            >
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 z-40 p-3.5 bg-obsidian-900/90 hover:bg-brass-500 hover:text-obsidian-950 text-ivory-100 border border-brass-600/30 rounded-full shadow-2xl backdrop-blur-md transition-all cursor-pointer hover:scale-110 group"
                title="Montre précédente (flèche gauche)"
                aria-label="Montre précédente"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 z-40 p-3.5 bg-obsidian-900/90 hover:bg-brass-500 hover:text-obsidian-950 text-ivory-100 border border-brass-600/30 rounded-full shadow-2xl backdrop-blur-md transition-all cursor-pointer hover:scale-110 group"
                title="Montre suivante (flèche droite)"
                aria-label="Montre suivante"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Dynamic Light Sheen tracking cursor in Mode 1 */}
              {viewMode === 'inspection' && (
                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20"
                  style={{
                    opacity: isHovered ? 0.35 : 0.08,
                    background: `radial-gradient(circle at ${(mousePos.x + 1) * 50}% ${(mousePos.y + 1) * 50}%, rgba(212, 175, 55, 0.3) 0%, transparent 60%)`
                  }}
                />
              )}

              {/* -------------------------------------------------- */}
              {/* MODE 1: INSPECTION 3D ESTHÉTIQUE                   */}
              {/* -------------------------------------------------- */}
              {viewMode === 'inspection' && (
                <div
                  className="relative flex items-center justify-center transition-transform duration-200 ease-out will-change-transform z-10"
                  style={{
                    transform: `rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg) scale3d(${zoomLevel * (isHovered ? 1.03 : 1)}, ${zoomLevel * (isHovered ? 1.03 : 1)}, 1)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <img
                    src={currentWatch.cutoutImage}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = currentWatch.fallbackImage;
                      e.currentTarget.style.maskImage = 'radial-gradient(ellipse 75% 85% at 50% 50%, black 50%, transparent 95%)';
                      e.currentTarget.style.webkitMaskImage = 'radial-gradient(ellipse 75% 85% at 50% 50%, black 50%, transparent 95%)';
                    }}
                    alt={currentWatch.cleanTitle}
                    className="h-[520px] sm:h-[620px] lg:h-[680px] w-auto max-w-full object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)] select-none pointer-events-none transition-all duration-300"
                  />

                  {/* Hotspots */}
                  {showHotspots && hotspots.map((spot) => {
                    const isActive = activeHotspotId === spot.id;
                    return (
                      <button
                        key={spot.id}
                        onClick={() => setActiveHotspotId(spot.id)}
                        className="absolute z-30 -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer focus:outline-none"
                        style={{
                          left: `${spot.x}%`,
                          top: `${spot.y}%`,
                          transform: 'translateZ(35px)'
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
                              ? 'bg-brass-400 border-ivory-100 shadow-[0_0_15px_rgba(212,175,55,1)] scale-125' 
                              : 'bg-obsidian-950/90 border-brass-400 group-hover/pin:scale-115'
                          }`}>
                            <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-obsidian-950' : 'bg-brass-400'}`} />
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* -------------------------------------------------- */}
              {/* MODE 2: VUE ÉCLATÉE DÉCOMPOSITION (7 COMPOSANTS)    */}
              {/* -------------------------------------------------- */}
              {viewMode === 'exploded' && (
                <div className="w-full z-10 flex flex-col items-center justify-center">
                  <WatchExplodedViewSvg
                    watch={currentWatch}
                    explosionLevel={explosionLevel}
                    selectedLayerId={selectedLayerId}
                    onSelectLayer={handleSelectExplodedLayer}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* -------------------------------------------------- */}
              {/* MODE 3: SIMULATION DU CALIBRE VIVANT (VOIR TOURNER) */}
              {/* -------------------------------------------------- */}
              {viewMode === 'simulation' && (
                <div className="w-full z-10 flex flex-col items-center justify-center">
                  <CalibreMovementSimulator
                    watch={currentWatch}
                    className="w-full h-auto"
                  />
                </div>
              )}

            </div>

            {/* Watch Brand, Title & Reference Caption */}
            <div className="mt-3 text-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-brass-400 font-semibold block">
                {currentWatch.brand} • {currentWatch.year || 'Vintage'} • {currentIndex + 1} / {filteredWatches.length}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-ivory-100 font-normal uppercase mt-0.5">
                {currentWatch.cleanTitle}
              </h3>
              <p className="text-sand/70 text-xs font-mono mt-1">
                {currentWatch.priceFormatted} {currentWatch.isSold && <span className="text-amber-400/80">(Vendu)</span>}
              </p>
            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT DETAIL CARD : CONTEXTUEL DU MODE (3 cols)         */}
          {/* ======================================================== */}
          <div className="lg:col-span-3 space-y-4 order-3">
            <div className="p-6 bg-obsidian-900/90 border border-brass-600/40 shadow-2xl space-y-4 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-28 h-28 bg-brass-500/5 rounded-full blur-2xl pointer-events-none" />

              {/* -------------------------------------------------- */}
              {/* RIGHT CARD 1 : INSPECTION                          */}
              {/* -------------------------------------------------- */}
              {viewMode === 'inspection' && (
                <>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase text-brass-400 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brass-400" />
                      Point Focal
                    </span>
                    <span className="text-sand/60">DÉTAIL</span>
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
                    <div className="text-[10px] font-mono text-sand/60 uppercase">Spécification Horlogère :</div>
                    <div className="text-xs font-mono font-semibold text-brass-300">
                      {activeHotspot.spec}
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="text-[10px] font-mono text-sand/60 uppercase mb-2">Composants à examiner :</div>
                    <div className="flex flex-wrap gap-1.5">
                      {hotspots.map((spot) => (
                        <button
                          key={spot.id}
                          onClick={() => setActiveHotspotId(spot.id)}
                          className={`px-2.5 py-1 text-[10px] font-mono uppercase border transition-colors cursor-pointer ${
                            activeHotspotId === spot.id 
                              ? 'border-brass-400 bg-brass-500/20 text-brass-300 font-bold' 
                              : 'border-obsidian-750 bg-obsidian-950/80 text-sand hover:text-ivory-100'
                          }`}
                        >
                          {spot.title.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* -------------------------------------------------- */}
              {/* RIGHT CARD 2 : VUE ÉCLATÉE DÉCOMPOSÉE              */}
              {/* -------------------------------------------------- */}
              {viewMode === 'exploded' && (
                <>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase text-brass-400 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-brass-400" />
                      Couche {activeExplodedLayer.order} / 7
                    </span>
                    <span className="text-sand/60">COMPOSANT</span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-serif text-lg text-ivory-100 font-medium">
                      {activeExplodedLayer.title}
                    </h4>
                    <p className="text-sand/90 text-xs leading-relaxed font-light">
                      {activeExplodedLayer.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-obsidian-800 space-y-2">
                    <div>
                      <div className="text-[10px] font-mono text-sand/60 uppercase">Matériau noble :</div>
                      <div className="text-xs font-serif font-medium text-brass-300">
                        {activeExplodedLayer.material}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-sand/60 uppercase">Tolérance & Rôle :</div>
                      <div className="text-xs font-mono text-ivory-200">
                        {activeExplodedLayer.thickness}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="text-[10px] font-mono text-sand/60 uppercase mb-2">Choisir une couche :</div>
                    <div className="flex flex-wrap gap-1.5">
                      {explodedLayersCatalog.map((layer) => (
                        <button
                          key={layer.id}
                          onClick={() => handleSelectExplodedLayer(layer)}
                          className={`px-2 py-1 text-[10px] font-mono uppercase border transition-colors cursor-pointer ${
                            activeExplodedLayer.id === layer.id 
                              ? 'border-brass-400 bg-brass-500/20 text-brass-300 font-bold' 
                              : 'border-obsidian-750 bg-obsidian-950/80 text-sand hover:text-ivory-100'
                          }`}
                        >
                          {layer.order}. {layer.title.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* -------------------------------------------------- */}
              {/* RIGHT CARD 3 : SIMULATION DU MOUVEMENT             */}
              {/* -------------------------------------------------- */}
              {viewMode === 'simulation' && (
                <>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase text-brass-400 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-brass-400" />
                      Analyse Mécanique
                    </span>
                    <span className="text-emerald-400">EN DIRECT</span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-serif text-lg text-ivory-100 font-medium">
                      {activeCalibreTopicData.title}
                    </h4>
                    <p className="text-sand/90 text-xs leading-relaxed font-light">
                      {activeCalibreTopicData.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-obsidian-800 space-y-1">
                    <div className="text-[10px] font-mono text-sand/60 uppercase">Donnée Constructeur :</div>
                    <div className="text-xs font-mono font-semibold text-brass-300">
                      {activeCalibreTopicData.spec}
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="text-[10px] font-mono text-sand/60 uppercase mb-2">Organes du mouvement :</div>
                    <div className="flex flex-wrap gap-1.5">
                      {calibreTopics.map((top) => (
                        <button
                          key={top.id}
                          onClick={() => setActiveCalibreTopic(top.id)}
                          className={`px-2.5 py-1 text-[10px] font-mono uppercase border transition-colors cursor-pointer ${
                            activeCalibreTopic === top.id 
                              ? 'border-brass-400 bg-brass-500/20 text-brass-300 font-bold' 
                              : 'border-obsidian-750 bg-obsidian-950/80 text-sand hover:text-ivory-100'
                          }`}
                        >
                          {top.title.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Direct Link to Product */}
              <div className="pt-3 border-t border-obsidian-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-sand/70">Prix</span>
                  <span className="font-mono text-sm font-semibold text-ivory-100">{currentWatch.priceFormatted}</span>
                </div>

                <button
                  onClick={() => {
                    if (onSelectProduct) {
                      onSelectProduct(currentWatch);
                    } else if (navigateTo) {
                      navigateTo(`produit/${currentWatch.slug || currentWatch.id}`);
                    }
                  }}
                  className="w-full py-2.5 bg-brass-500 hover:bg-brass-400 text-obsidian-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg"
                >
                  Découvrir la fiche produit
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
