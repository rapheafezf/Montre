import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, ChevronLeft, ChevronRight, Type, Compass, Eye } from 'lucide-react';

export const FONT_PAIRINGS = [
  {
    id: 'manufacture-royale',
    number: '01',
    name: 'Manufacture Royale',
    subtitle: 'L’Archétype de la Haute Horlogerie Genevoise',
    headingFont: 'Cormorant Garamond',
    bodyFont: 'Plus Jakarta Sans',
    houses: 'Patek Philippe • Vacheron Constantin • Breguet',
    vibe: 'Aristocratie & Héritage Éternel',
    description: 'Serif de haute tradition aristocratique, déliés affûtés au diamant et capitales monumentales équilibrées. Le choix par excellence pour asseoir une autorité séculaire.',
    headingPreviewStyle: { fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 600, letterSpacing: '0.07em' },
    bodyPreviewStyle: { fontFamily: '"Plus Jakarta Sans", sans-serif' }
  },
  {
    id: 'octo-architectural',
    number: '02',
    name: 'Octo Architectural',
    subtitle: 'Didone Sculpturale & Contraste Extrême',
    headingFont: 'Bodoni Moda',
    bodyFont: 'Plus Jakarta Sans',
    houses: 'Bvlgari Octo Finissimo • Cartier Haute Joaillerie',
    vibe: 'Modernité Radicale & Biseaux Miroir',
    description: 'Didone moderne à contraste spectaculaire entre pleins massifs et traits ultra-fins. Évoque la précision millimétrique des boîtiers facettés et des lunettes biseautées.',
    headingPreviewStyle: { fontFamily: '"Bodoni Moda", "Didot", serif', fontWeight: 600, letterSpacing: '0.09em' },
    bodyPreviewStyle: { fontFamily: '"Plus Jakarta Sans", sans-serif' }
  },
  {
    id: 'titanium-concept',
    number: '03',
    name: 'Titanium Concept',
    subtitle: 'Brutalisme High-Tech & Calibres Squelettes',
    headingFont: 'Syne (800 Extra-Bold)',
    bodyFont: 'Space Grotesk',
    houses: 'Richard Mille • Audemars Piguet Concept • Urwerk',
    vibe: 'Micro-Mécanique F1 & Futuriste',
    description: 'Typographie angulaire musclée aux incisions géométriques fortes. Incarne la rupture technique, les ponts en titane sablé et les alliages aérospatiaux d’avant-garde.',
    headingPreviewStyle: { fontFamily: '"Syne", sans-serif', fontWeight: 800, letterSpacing: '0.04em' },
    bodyPreviewStyle: { fontFamily: '"Space Grotesk", sans-serif' }
  },
  {
    id: 'chronometre-suisse',
    number: '04',
    name: 'Chronomètre Suisse',
    subtitle: 'Pureté Fonctionnelle & Style International',
    headingFont: 'Inter (800 Bold)',
    bodyFont: 'Inter',
    houses: 'Tudor • Rolex Tool Watches Modernes • Zenith Defy',
    vibe: 'Précision Industrielle & Lisibilité Militaire',
    description: 'Le fonctionnalisme suisse dans toute sa rigueur. Un condensé de robustesse et de lisibilité instantanée, taillé pour les instruments étanches et les chronographes de pointe.',
    headingPreviewStyle: { fontFamily: '"Inter", sans-serif', fontWeight: 800, letterSpacing: '0.01em' },
    bodyPreviewStyle: { fontFamily: '"Inter", sans-serif' }
  },
  {
    id: 'imperial-caesar',
    number: '05',
    name: 'Impérial César',
    subtitle: 'Capitales Lapidaires & Or Massif',
    headingFont: 'Cinzel',
    bodyFont: 'Plus Jakarta Sans',
    houses: 'Rolex Day-Date "President" • Cartier Tank Asymétrique',
    vibe: 'Puissance Statutaire & Gravure Burin',
    description: 'Inspirée des inscriptions triomphales romaines gravées dans la pierre. Confère un poids statutaire indéniable, comme frappé dans un lingot d’or massif 18 carats.',
    headingPreviewStyle: { fontFamily: '"Cinzel", serif', fontWeight: 700, letterSpacing: '0.14em' },
    bodyPreviewStyle: { fontFamily: '"Plus Jakarta Sans", sans-serif' }
  },
  {
    id: 'savile-row',
    number: '06',
    name: 'Savile Row Heritage',
    subtitle: 'Classicisme Sartorial & Club Privé',
    headingFont: 'Playfair Display',
    bodyFont: 'Plus Jakarta Sans',
    houses: 'Jaeger-LeCoultre Reverso • IWC Portofino • A. Lange & Söhne',
    vibe: 'Chaleur Gentleman & Élégance Feutrée',
    description: 'Élégance britannique sophistiquée, aux courbes douces et chaleureuses. Parfait pour les complications classiques, les cadrans soleillés et les bracelets en alligator.',
    headingPreviewStyle: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600, letterSpacing: '0.06em' },
    bodyPreviewStyle: { fontFamily: '"Plus Jakarta Sans", sans-serif' }
  },
  {
    id: 'art-deco',
    number: '07',
    name: 'Art Déco 1931',
    subtitle: 'Chic Parisien & Années Folles',
    headingFont: 'Italiana',
    bodyFont: 'Tenor Sans',
    houses: 'Cartier Tank Louis • Vacheron Constantin 1921',
    vibe: 'Raffinement Joaillier & Épure Géométrique',
    description: 'Lignes élancées et géométrie précieuse des années 1920-1930. Une signature intemporelle pour sublimer les boîtiers de forme et les cadrans guillochés argentés.',
    headingPreviewStyle: { fontFamily: '"Italiana", Georgia, serif', fontWeight: 400, letterSpacing: '0.15em' },
    bodyPreviewStyle: { fontFamily: '"Tenor Sans", sans-serif' }
  },
  {
    id: 'tool-watch',
    number: '08',
    name: 'Instrument Chrono',
    subtitle: 'Typographie Condensée d’Aviation & Plongée',
    headingFont: 'Barlow Condensed',
    bodyFont: 'Space Grotesk',
    houses: 'Omega Speedmaster "Moonwatch" • Breitling Navitimer • Sinn',
    vibe: 'Cockpit Aérospatial & Échelle Tachymétrique',
    description: 'Structure typographique resserrée et technique, directement empruntée aux instruments de vol et aux lunettes tachymétriques. Masculin, tranchant et sans concession.',
    headingPreviewStyle: { fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, letterSpacing: '0.08em' },
    bodyPreviewStyle: { fontFamily: '"Space Grotesk", sans-serif' }
  },
  {
    id: 'independent-atelier',
    number: '09',
    name: 'Atelier Indépendant',
    subtitle: 'Haute Bienfacture & Artisanat d’Auteur',
    headingFont: 'Prata',
    bodyFont: 'Plus Jakarta Sans',
    houses: 'F.P. Journe • Rexhep Rexhepi (Akrivia) • Laurent Ferrier',
    vibe: 'Atelier d’Exception & Fait Main',
    description: 'Didone poétique et nuancée aux empattements biseautés. Rappelle les gravures manuelles sur platines perlées et les finitions au bois de gentiane.',
    headingPreviewStyle: { fontFamily: '"Prata", serif', fontWeight: 400, letterSpacing: '0.08em' },
    bodyPreviewStyle: { fontFamily: '"Plus Jakarta Sans", sans-serif' }
  },
  {
    id: 'cyber-tourbillon',
    number: '10',
    name: 'Cyber Tourbillon',
    subtitle: 'Néo-Modernisme & Géométrie Pure',
    headingFont: 'Outfit (700 Bold)',
    bodyFont: 'Plus Jakarta Sans',
    houses: 'De Bethune DB28 • MB&F Horological Machines • H. Moser',
    vibe: 'Astronomie Moderne & Formes Organiques',
    description: 'Cercles parfaits et dessin minimaliste ultra-contemporain. Pour les collectionneurs attirés par l’ingénierie spatiale et les métaux aux reflets bleuis thermiques.',
    headingPreviewStyle: { fontFamily: '"Outfit", sans-serif', fontWeight: 700, letterSpacing: '0.06em' },
    bodyPreviewStyle: { fontFamily: '"Plus Jakarta Sans", sans-serif' }
  }
];

export default function FontPairingModal({
  isOpen,
  onClose,
  currentPairingId,
  onSelectPairing
}) {
  if (!isOpen) return null;

  const currentIndex = FONT_PAIRINGS.findIndex(p => p.id === currentPairingId);
  const activeIndex = currentIndex >= 0 ? currentIndex : 0;
  const current = FONT_PAIRINGS[activeIndex];

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % FONT_PAIRINGS.length;
    onSelectPairing(FONT_PAIRINGS[nextIdx].id);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + FONT_PAIRINGS.length) % FONT_PAIRINGS.length;
    onSelectPairing(FONT_PAIRINGS[prevIdx].id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-obsidian-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-obsidian-900 border border-brass-600/40 w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl z-10 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-obsidian-800 bg-obsidian-950/70">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-brass-400 animate-pulse" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-brass-400 font-bold block">
                Studio Typographique SOTA 2026 • 10 Pairings Haute Horlogerie
              </span>
              <h3 className="font-serif text-lg text-ivory-100 font-normal uppercase tracking-wide">
                Choisir la Signature Typographique du Site
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Prev / Next Arrows */}
            <div className="flex items-center border border-obsidian-800 bg-obsidian-900 p-0.5">
              <button
                onClick={handlePrev}
                className="p-1.5 text-sand hover:text-ivory-100 hover:bg-obsidian-800 transition-colors cursor-pointer"
                title="Pairing précédent (flèche gauche)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono px-2 text-brass-300 font-bold">
                {activeIndex + 1} / 10
              </span>
              <button
                onClick={handleNext}
                className="p-1.5 text-sand hover:text-ivory-100 hover:bg-obsidian-800 transition-colors cursor-pointer"
                title="Pairing suivant (flèche droite)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-sand hover:text-ivory-100 border border-obsidian-800 hover:bg-obsidian-800 transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Active Preview Banner */}
        <div className="p-6 bg-obsidian-950 border-b border-obsidian-800/80">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-sand/70 mb-2">
            <span>Rendu En Direct Sur L’Écran ({current.name})</span>
            <span className="text-emerald-400 font-bold">● ACTIF IMMÉDIATEMENT</span>
          </div>

          <div className="space-y-2">
            <div 
              style={current.headingPreviewStyle}
              className="text-2xl sm:text-4xl text-ivory-100 transition-all uppercase"
            >
              L’Art du Temps & Haute Horlogerie
            </div>
            <p 
              style={current.bodyPreviewStyle}
              className="text-xs sm:text-sm text-sand/90 font-light leading-relaxed max-w-2xl"
            >
              Rolex Datejust 16234 Cadran Lin • Calibre Manufacture 3135 à 28 800 A/h • Certifié et Garanti 12 Mois.
            </p>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] font-mono">
            <span className="px-2 py-0.5 bg-obsidian-900 border border-brass-600/30 text-brass-300">
              Titres : <strong>{current.headingFont}</strong>
            </span>
            <span className="px-2 py-0.5 bg-obsidian-900 border border-obsidian-800 text-sand">
              Corps : <strong>{current.bodyFont}</strong>
            </span>
            <span className="text-sand/70 hidden sm:inline">
              Inspiration : {current.houses}
            </span>
          </div>
        </div>

        {/* Scrollable Grid of 10 Pairings */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {FONT_PAIRINGS.map((pairing) => {
              const isSelected = pairing.id === currentPairingId;
              return (
                <div
                  key={pairing.id}
                  onClick={() => onSelectPairing(pairing.id)}
                  className={`p-4 border transition-all cursor-pointer relative group flex flex-col justify-between ${
                    isSelected
                      ? 'border-brass-400 bg-brass-500/10 shadow-lg'
                      : 'border-obsidian-800 bg-obsidian-900/60 hover:border-brass-600/50 hover:bg-obsidian-850'
                  }`}
                >
                  {/* Top Bar of card */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-brass-400 font-bold">
                          #{pairing.number}
                        </span>
                        <span className="text-xs font-mono uppercase tracking-wider text-sand">
                          {pairing.vibe}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-ivory-100 mt-0.5">
                        {pairing.name}
                      </h4>
                    </div>

                    {isSelected ? (
                      <span className="flex items-center gap-1 text-[10px] font-mono uppercase font-bold text-obsidian-950 bg-brass-400 px-2 py-0.5">
                        <Check className="w-3 h-3" />
                        Actif
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono uppercase text-sand group-hover:text-brass-300 transition-colors">
                        Tester ➔
                      </span>
                    )}
                  </div>

                  {/* Typography Live Preview */}
                  <div className="py-3 my-2 border-y border-obsidian-800/60">
                    <div 
                      style={pairing.headingPreviewStyle}
                      className="text-lg text-ivory-100 uppercase truncate"
                    >
                      {pairing.headingFont}
                    </div>
                    <div 
                      style={pairing.bodyPreviewStyle}
                      className="text-xs text-sand/80 mt-1 line-clamp-1"
                    >
                      {pairing.bodyFont} • Chronomètre Superlatif
                    </div>
                  </div>

                  {/* Description & Houses */}
                  <div className="space-y-1">
                    <p className="text-[11px] text-sand/80 font-light leading-relaxed">
                      {pairing.description}
                    </p>
                    <div className="text-[9px] font-mono text-brass-400/80 pt-1">
                      {pairing.houses}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-4 border-t border-obsidian-800 bg-obsidian-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="text-sand/70 text-[11px]">
            💡 En cliquant sur un style, toute la boutique (titres, boutons, fiches et calibres) bascule instantanément.
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-brass-500 hover:bg-brass-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
          >
            Conserver ce style
          </button>
        </div>

      </div>
    </div>
  );
}
