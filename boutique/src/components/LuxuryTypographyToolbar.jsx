import React, { useState, useEffect } from 'react';
import { Type, Sparkles, Check } from 'lucide-react';

const TYPO_STYLES = [
  {
    id: 'bodoni',
    name: 'Place Vendôme',
    subtitle: 'Bodoni & Didot',
    fontFamily: '"Bodoni Moda", "Didot", "Prata", Georgia, serif',
    description: 'L’élégance suprême du luxe français (Cartier, Vogue, Dior)',
  },
  {
    id: 'prata',
    name: 'Haute Couture',
    subtitle: 'Prata',
    fontFamily: '"Prata", "Bodoni Moda", Georgia, serif',
    description: 'Lignes racées, courbures délicates et empattements ciselés',
  },
  {
    id: 'cormorant',
    name: 'Grandes Complications',
    subtitle: 'Cormorant',
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    description: 'Tradition horlogère genevoise (Patek Philippe, Vacheron Constantin)',
  },
  {
    id: 'tenor',
    name: 'Chic Épuré',
    subtitle: 'Tenor Sans',
    fontFamily: '"Tenor Sans", sans-serif',
    description: 'Minimalisme moderne aux fûts évasés sans empattement',
  },
  {
    id: 'syne',
    name: 'Manufacture Contemporaine',
    subtitle: 'Syne',
    fontFamily: '"Syne", sans-serif',
    description: 'Design architectural puissant (Audemars Piguet, Richard Mille)',
  },
];

export default function LuxuryTypographyToolbar() {
  const [activeStyle, setActiveStyle] = useState('bodoni');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lemouvement_typo_v2') || 'bodoni';
    applyStyle(saved);
  }, []);

  const applyStyle = (styleId) => {
    const styleObj = TYPO_STYLES.find(s => s.id === styleId) || TYPO_STYLES[0];
    setActiveStyle(styleObj.id);
    document.documentElement.style.setProperty('--font-luxury-heading', styleObj.fontFamily);
    localStorage.setItem('lemouvement_typo_v2', styleObj.id);
  };

  const currentStyleObj = TYPO_STYLES.find(s => s.id === activeStyle) || TYPO_STYLES[0];

  return (
    <div className="fixed bottom-4 left-4 z-50 select-none">
      {/* Trigger pill */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 bg-obsidian-950/95 hover:bg-obsidian-900 border border-brass-600/50 hover:border-brass-400 text-ivory-100 shadow-[0_8px_30px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all cursor-pointer group"
          title="Choisir le style typographique de luxe"
        >
          <Sparkles className="w-3.5 h-3.5 text-brass-400 animate-pulse" />
          <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-sand group-hover:text-ivory-100">
            Typo Luxe : <strong className="text-brass-300 font-semibold">{currentStyleObj.name}</strong>
          </span>
        </button>
      ) : (
        <div className="bg-obsidian-950/98 border border-brass-600/60 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.9)] backdrop-blur-xl w-80 space-y-3 transition-all animate-in fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-obsidian-800">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-brass-400" />
              <span className="text-[11px] uppercase font-mono tracking-[0.2em] text-ivory-100 font-semibold">
                Typographies de Luxe
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-sand/70 hover:text-ivory-100 text-xs px-1 cursor-pointer font-mono"
            >
              ✕
            </button>
          </div>

          <div className="text-[10px] text-sand/80 leading-relaxed font-light">
            Testez en direct les différentes polices de prestige adaptées aux maisons d'horlogerie :
          </div>

          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {TYPO_STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => applyStyle(style.id)}
                className={`w-full text-left p-2.5 border transition-all flex items-start justify-between cursor-pointer ${
                  activeStyle === style.id
                    ? 'bg-brass-500/10 border-brass-400 text-ivory-100'
                    : 'bg-obsidian-900/60 border-obsidian-800 text-sand/90 hover:border-obsidian-700 hover:text-ivory-100'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-sm font-medium"
                      style={{ fontFamily: style.fontFamily }}
                    >
                      {style.name}
                    </span>
                    <span className="text-[9px] uppercase font-mono tracking-wider px-1.5 py-0.2 bg-obsidian-950 border border-obsidian-700 text-brass-400">
                      {style.subtitle}
                    </span>
                  </div>
                  <div className="text-[10px] text-sand/70 mt-0.5 font-light">
                    {style.description}
                  </div>
                </div>
                {activeStyle === style.id && (
                  <Check className="w-4 h-4 text-brass-400 shrink-0 mt-0.5" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-obsidian-850 flex items-center justify-between text-[9px] font-mono text-sand/60">
            <span>Rendu 100% vectoriel</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-brass-400 hover:underline cursor-pointer"
            >
              Fermer le panneau
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
