import React, { useState, useEffect } from 'react';
import { Sparkles, Check, ChevronLeft, ChevronRight, X, Layers, Compass, Sliders, ExternalLink } from 'lucide-react';

export const MASTER_PAIRINGS = [
  {
    id: '01-saxon',
    num: '01',
    name: "L'Atelier Saxon",
    inspiration: 'A. Lange & Söhne • Glashütte Original',
    category: 'Impérial Lapidaire & Précision Germanique',
    headingFont: '"Castoro Titling", "Cinzel", Georgia, serif',
    bodyFont: '"Plus Jakarta Sans", system-ui, sans-serif',
    accentFont: '"JetBrains Mono", monospace',
    tracking: '0.14em',
    weight: '400',
    description: "Gravure lapidaire impériale inspirée des ponts en maillechort sculptés à la main à Glashütte. Puissance mécanique froide, masculine et souveraine.",
    badge: 'Noblesse Saxonne',
    previewHeadline: 'CHRONOMÈTRE DE PRÉCISION SAXONNE',
  },
  {
    id: '02-royal',
    num: '02',
    name: 'Le Chronographe Royal',
    inspiration: 'Audemars Piguet Royal Oak • Richard Mille',
    category: 'Architectural Brutaliste SOTA 2026',
    headingFont: '"Syne", sans-serif',
    bodyFont: '"Outfit", sans-serif',
    accentFont: '"Space Grotesk", monospace',
    tracking: '0.07em',
    weight: '700',
    description: "L'avant-garde du design horloger contemporain. Formes géométriques tendues, boîtier octogonal en céramique et titane brossé. Le look des pièces à 100k€.",
    badge: 'Design SOTA 2026',
    previewHeadline: 'CALIBRE TOURBILLON SQUELETTE OCTOGONAL',
  },
  {
    id: '03-vendome',
    num: '03',
    name: 'Place Vendôme Chrono',
    inspiration: 'Cartier Santos 100 • Tank MC • Blancpain',
    category: 'Didone Haute Joaillerie Masculine',
    headingFont: '"Bodoni Moda", "Didot", serif',
    bodyFont: '"Plus Jakarta Sans", system-ui, sans-serif',
    accentFont: '"JetBrains Mono", monospace',
    tracking: '0.10em',
    weight: '600',
    description: "La quintessence du luxe français. Fûts verticaux d'ébène et déliés hairlines d'une finesse chirurgicale. Distinction masculine absolue, or rose et vis acier.",
    badge: 'Luxe Français Pur',
    previewHeadline: 'HAUTE HORLOGERIE & COMPLICATIONS',
  },
  {
    id: '04-genevoise',
    num: '04',
    name: "L'Officine Genevoise",
    inspiration: 'Patek Philippe Nautilus • Vacheron Constantin',
    category: 'Capitales Romaines & Patrimoine Séculaire',
    headingFont: '"Cormorant SC", "Cormorant Garamond", serif',
    bodyFont: '"Plus Jakarta Sans", system-ui, sans-serif',
    accentFont: '"JetBrains Mono", monospace',
    tracking: '0.16em',
    weight: '500',
    description: "Petites capitales impériales aux proportions de la Renaissance. L'esprit de transmission patrimoniale familiale et de discrétion aristocratique des maîtres genevois.",
    badge: 'Transmission Patrimoniale',
    previewHeadline: 'POINÇON DE GENÈVE & RÉSERVE DE MARCHE',
  },
  {
    id: '05-explorateur',
    num: '05',
    name: "L'Explorateur Polaire",
    inspiration: 'Rolex Submariner • Explorer II • Sea-Dweller',
    category: 'Instrumental Monolithique Oystersteel',
    headingFont: '"Cinzel", Georgia, serif',
    bodyFont: '"Outfit", sans-serif',
    accentFont: '"JetBrains Mono", monospace',
    tracking: '0.14em',
    weight: '600',
    description: "Taillé dans l'acier Oystersteel 904L indestructible. L'autorité d'une montre de plongée professionnelle ayant conquis les abysses et les sommets polaires.",
    badge: 'Outil de Conquête',
    previewHeadline: 'OYSTER PERPETUAL ÉTANCHÉITÉ 300 MÈTRES',
  },
  {
    id: '06-suisse',
    num: '06',
    name: 'Le Chronomètre Suisse',
    inspiration: 'Bucherer • IWC Schaffhausen • Omega Speedmaster',
    category: 'Minimalisme Zurichois & Pureté Technique',
    headingFont: '"Tenor Sans", sans-serif',
    bodyFont: '"Outfit", sans-serif',
    accentFont: '"JetBrains Mono", monospace',
    tracking: '0.14em',
    weight: '400',
    description: "Fûts évasés sculpturaux sans empattements lourds. L'esthétique des plus prestigieux détaillants de la Bahnhofstrasse de Zurich et de la Rue du Rhône à Genève.",
    badge: 'Pureté Zurichoise',
    previewHeadline: 'CHRONOMÈTRE CERTIFIÉ OFFICIELLEMENT',
  },
  {
    id: '07-militaire',
    num: '07',
    name: 'La Manufacture Brute',
    inspiration: 'Panerai Submersible • Hublot Big Bang Meca-10',
    category: 'Technique Industriel & Cadrans Sandwich',
    headingFont: '"Space Grotesk", sans-serif',
    bodyFont: '"Plus Jakarta Sans", system-ui, sans-serif',
    accentFont: '"JetBrains Mono", monospace',
    tracking: '0.12em',
    weight: '600',
    description: "Caractère robuste et industriel. Chiffres techniques lisibles sous 300 mètres, pont protège-couronne massif et boîtier coussin de 44mm. Force brute assumée.",
    badge: 'Militaire Naval',
    previewHeadline: 'BOÎTIER COUSSIN 44MM & ACIER CARBOSTEEL',
  },
  {
    id: '08-heritage',
    num: '08',
    name: "L'Édition Héritage",
    inspiration: 'Tudor Black Bay • Jaeger-LeCoultre Reverso',
    category: 'Vintage Néo-Classique Ciselé',
    headingFont: '"Prata", "Bodoni Moda", serif',
    bodyFont: '"Outfit", sans-serif',
    accentFont: '"JetBrains Mono", monospace',
    tracking: '0.12em',
    weight: '400',
    description: "Empattements en gouttes acérées et chanfreins polis main. Évoque les cadrans gilt patinés, les aiguilles Snowflake et les pièces historiques de collectionneurs avertis.",
    badge: 'Patine Vintage Gilt',
    previewHeadline: 'CALIBRE MANUFACTURE RÉVISION ATELIER',
  },
  {
    id: '09-independant',
    num: '09',
    name: "L'Artisan Indépendant",
    inspiration: 'F.P. Journe Chronomètre Bleu • MB&F • Laurent Ferrier',
    category: 'Haute Tension Graphique & Création Pure',
    headingFont: '"Italiana", serif',
    bodyFont: '"Plus Jakarta Sans", system-ui, sans-serif',
    accentFont: '"JetBrains Mono", monospace',
    tracking: '0.14em',
    weight: '400',
    description: "Lignes d'une finesse aérienne et tension graphique sans compromis. L'audace des horlogers indépendants qui défient les conglomérats par la pureté de leur art.",
    badge: 'Horlogerie d’Auteur',
    previewHeadline: 'CADRAN TANTALE & BALANCIER MYSTÉRIEUX',
  },
  {
    id: '10-laboratoire',
    num: '10',
    name: 'Le Laboratoire Métrologique',
    inspiration: 'Contrôle Officiel Suisse des Chronomètres (COSC) • Zenith',
    category: 'Salle Blanche & Haute Fréquence 36 000 A/h',
    headingFont: '"Plus Jakarta Sans", sans-serif',
    bodyFont: '"Plus Jakarta Sans", sans-serif',
    accentFont: '"JetBrains Mono", monospace',
    tracking: '0.22em',
    weight: '800',
    description: "Typographie moderniste en capitales massives espacées au millième. Atmosphère de salle blanche stérile, de chronocomparateurs Witschi et de précision au 1/100e de seconde.",
    badge: 'Métrologie COSC',
    previewHeadline: 'FRÉQUENCE 36 000 A/H PRÉCISION ATELIER',
  },
];

export default function LuxuryTypographyToolbar() {
  const [activePairingId, setActivePairingId] = useState('02-royal');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lemouvement_master_pairing_v3') || '02-royal';
    applyPairing(saved);
  }, []);

  // Keyboard navigation: 1-9 & 0 for instant pairing selection, arrows for cycle
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      if (e.key >= '1' && e.key <= '9') {
        const idx = parseInt(e.key) - 1;
        if (MASTER_PAIRINGS[idx]) applyPairing(MASTER_PAIRINGS[idx].id);
      } else if (e.key === '0') {
        applyPairing(MASTER_PAIRINGS[9].id);
      } else if (e.key === 'ArrowRight' && e.altKey) {
        cycleNext();
      } else if (e.key === 'ArrowLeft' && e.altKey) {
        cyclePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePairingId]);

  const applyPairing = (id) => {
    const pairing = MASTER_PAIRINGS.find(p => p.id === id) || MASTER_PAIRINGS[0];
    setActivePairingId(pairing.id);

    // Apply live CSS custom properties on root
    const root = document.documentElement;
    root.style.setProperty('--font-luxury-heading', pairing.headingFont);
    root.style.setProperty('--font-luxury-body', pairing.bodyFont);
    root.style.setProperty('--font-luxury-accent', pairing.accentFont);
    root.style.setProperty('--luxury-heading-tracking', pairing.tracking);
    root.style.setProperty('--luxury-heading-weight', pairing.weight);

    localStorage.setItem('lemouvement_master_pairing_v3', pairing.id);
  };

  const currentIndex = MASTER_PAIRINGS.findIndex(p => p.id === activePairingId);
  const currentPairing = MASTER_PAIRINGS[currentIndex] >= 0 ? MASTER_PAIRINGS[currentIndex] : MASTER_PAIRINGS[0];

  const cycleNext = () => {
    const nextIdx = (currentIndex + 1) % MASTER_PAIRINGS.length;
    applyPairing(MASTER_PAIRINGS[nextIdx].id);
  };

  const cyclePrev = () => {
    const prevIdx = (currentIndex - 1 + MASTER_PAIRINGS.length) % MASTER_PAIRINGS.length;
    applyPairing(MASTER_PAIRINGS[prevIdx].id);
  };

  return (
    <>
      {/* Floating Bottom Control Bar */}
      <aside 
        aria-label="Sélecteur typographique de luxe"
        className="fixed bottom-5 left-5 z-50 select-none flex items-center gap-1.5 shadow-[0_12px_45px_rgba(0,0,0,0.85)] bg-obsidian-950/95 border border-brass-500/50 backdrop-blur-xl p-1.5 transition-all group"
      >
        {/* Quick Cycle Prev Button */}
        <button
          type="button"
          onClick={cyclePrev}
          aria-label="Pairing typographique précédent"
          className="p-2 hover:bg-obsidian-850 text-brass-400 hover:text-ivory-100 transition-colors border border-obsidian-800 cursor-pointer"
          title="Pairing précédent (Alt + Flèche Gauche)"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Main Trigger & Indicator Button */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 px-3.5 py-1.5 hover:bg-obsidian-900/80 transition-all text-left cursor-pointer"
          title="Ouvrir le banc d'essai typographique SOTA 2026"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brass-400 animate-ping inline-block" />
            <span className="font-mono text-[10px] text-brass-300 font-bold uppercase tracking-wider">
              {currentPairing.num} / 10
            </span>
          </div>

          <div className="border-l border-obsidian-800 pl-3">
            <div className="text-[11px] font-semibold text-ivory-100 flex items-center gap-2">
              <span>{currentPairing.name}</span>
              <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 bg-obsidian-900 border border-brass-600/30 text-brass-400 font-normal">
                {currentPairing.badge}
              </span>
            </div>
            <div className="text-[9px] text-sand/75 font-mono">
              {currentPairing.inspiration.split('•')[0].trim()}
            </div>
          </div>

          <span className="ml-2 px-2 py-0.5 bg-brass-500/15 border border-brass-500/40 text-brass-300 text-[10px] uppercase font-mono tracking-wider font-semibold">
            Tester les 10 ▾
          </span>
        </button>

        {/* Quick Cycle Next Button */}
        <button
          type="button"
          onClick={cycleNext}
          aria-label="Pairing typographique suivant"
          className="p-2 hover:bg-obsidian-850 text-brass-400 hover:text-ivory-100 transition-colors border border-obsidian-800 cursor-pointer"
          title="Pairing suivant (Alt + Flèche Droite)"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </aside>

      {/* Full Haute Horlogerie Typography Specimen Modal */}
      {isOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label="Banc d'essai typographique SOTA 2026"
          className="fixed inset-0 z-50 bg-obsidian-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none animate-in fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-obsidian-950 border border-brass-600/60 max-w-5xl w-full max-h-[92vh] flex flex-col shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-obsidian-800 flex items-center justify-between bg-obsidian-900/60">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase font-mono tracking-[0.25em] text-brass-400 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Direction Artistique Haute Horlogerie • SOTA 2026
                </div>
                <h2 className="font-serif text-xl sm:text-2xl text-ivory-100 font-normal tracking-wide uppercase">
                  10 Master Pairings Typographiques de Prestige
                </h2>
                <p className="text-xs text-sand/80 font-light">
                  Cliquez sur un pairing pour métamorphoser instantanément l'intégralité de la boutique à l'écran. Raccourcis clavier : touches 1 à 0.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Fermer le banc d'essai"
                className="p-2 text-sand hover:text-ivory-100 bg-obsidian-900 border border-obsidian-700 hover:border-brass-500/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Grid of 10 Pairings with Live Specimen */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MASTER_PAIRINGS.map((pairing) => {
                  const isSelected = activePairingId === pairing.id;
                  return (
                    <div
                      key={pairing.id}
                      onClick={() => applyPairing(pairing.id)}
                      className={`p-4 sm:p-5 border transition-all cursor-pointer relative flex flex-col justify-between group ${
                        isSelected 
                          ? 'bg-brass-500/10 border-brass-400 ring-1 ring-brass-400 shadow-[0_0_30px_rgba(197,160,89,0.2)]' 
                          : 'bg-obsidian-900/60 border-obsidian-800 hover:border-brass-600/50 hover:bg-obsidian-900'
                      }`}
                    >
                      {/* Top Meta */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded bg-obsidian-950 border border-obsidian-700 text-brass-400 font-mono text-[11px] font-bold flex items-center justify-center">
                              {pairing.num}
                            </span>
                            <span className="font-serif uppercase text-sm sm:text-base font-semibold text-ivory-100">
                              {pairing.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-obsidian-950 border border-brass-600/30 text-brass-300">
                              {pairing.badge}
                            </span>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-brass-400 text-obsidian-950 flex items-center justify-center text-xs font-bold">
                                ✓
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Maison inspiration */}
                        <div className="text-[11px] font-mono text-sand/80 flex items-center gap-1.5">
                          <span className="text-brass-400 font-semibold">Maison :</span>
                          <span>{pairing.inspiration}</span>
                        </div>

                        {/* Curatorial note */}
                        <p className="text-[11px] text-sand/80 font-light leading-relaxed">
                          {pairing.description}
                        </p>
                      </div>

                      {/* Live Specimen Preview Box */}
                      <div className="mt-4 pt-3 border-t border-obsidian-800/80 bg-obsidian-950/80 p-3">
                        <div className="text-[9px] font-mono text-sand/60 uppercase tracking-wider mb-1 flex justify-between">
                          <span>Spécimen En Direct</span>
                          <span className="text-brass-400">{pairing.category}</span>
                        </div>
                        <div
                          style={{
                            fontFamily: pairing.headingFont,
                            letterSpacing: pairing.tracking,
                            fontWeight: pairing.weight,
                          }}
                          className="text-base sm:text-lg text-ivory-100 uppercase leading-snug line-clamp-1"
                        >
                          {pairing.previewHeadline}
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-obsidian-850 text-[10px] font-mono text-sand/75">
                          <span>Titres: {pairing.headingFont.split(',')[0].replace(/"/g, '')}</span>
                          <span>Corps: {pairing.bodyFont.split(',')[0].replace(/"/g, '')}</span>
                          <span>Specs: {pairing.accentFont.split(',')[0].replace(/"/g, '')}</span>
                        </div>
                      </div>

                      {/* Select Action Button */}
                      <div className="mt-3 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            applyPairing(pairing.id);
                          }}
                          className={`text-xs font-mono uppercase tracking-wider px-3 py-1.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-brass-400 text-obsidian-950 font-bold'
                              : 'bg-obsidian-850 hover:bg-brass-500 hover:text-obsidian-950 text-ivory-100 border border-obsidian-700'
                          }`}
                        >
                          {isSelected ? '✓ Actif à l’écran' : 'Activer ce pairing'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-obsidian-900 border-t border-obsidian-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-sand">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Pairing actif : <strong className="text-ivory-100">{currentPairing.name}</strong> ({currentPairing.inspiration.split('•')[0].trim()})</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sand/60">Astuce : Utilisez les touches 1 à 0 pour basculer en direct</span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 bg-brass-500 hover:bg-brass-400 text-obsidian-950 font-bold uppercase tracking-widest text-[11px] cursor-pointer"
                >
                  Valider & Tester sur le site
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
