import React, { useState } from 'react';
import { 
  ShoppingBag, Search, Menu, X, ShieldCheck, Clock, MapPin, 
  MessageCircle, ChevronDown, ChevronLeft, ChevronRight, Sun, Moon, Type 
} from 'lucide-react';
import { FONT_PAIRINGS } from './FontPairingModal';

export default function Header({ 
  currentRoute, 
  navigateTo, 
  cartCount, 
  openCart, 
  openShowroomModal, 
  openSearchModal, 
  theme = 'dark', 
  toggleTheme,
  fontPairing = 'manufacture-royale',
  onCycleFontPairing,
  onOpenFontModal
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const activePairingIndex = FONT_PAIRINGS.findIndex(p => p.id === fontPairing);
  const activePairing = activePairingIndex >= 0 ? FONT_PAIRINGS[activePairingIndex] : FONT_PAIRINGS[0];

  const handleNav = (route) => {
    navigateTo(route);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-obsidian-950/95 backdrop-blur-md border-b border-obsidian-800 transition-all">
      {/* Top Pre-header Reassurance */}
      <div className="bg-obsidian-900 border-b border-obsidian-800/60 text-sand text-[11px] uppercase tracking-wider py-2.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-ivory-200">
              <Clock className="w-3 h-3 text-brass-400" />
              Expédition assurée ad valorem sous 48h
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-brass-400" />
              Garantie mécanique 12 mois & 100% Authentique
            </span>
            <button 
              onClick={openShowroomModal}
              className="flex items-center gap-1.5 hover:text-brass-300 transition-colors"
            >
              <MapPin className="w-3 h-3 text-brass-400" />
              Showroom privé région lyonnaise (sur RDV)
            </button>
          </div>
          <div className="flex items-center gap-4">
            {/* Theme Toggle in top utility bar */}
            <button
              onClick={() => toggleTheme && toggleTheme()}
              className="flex items-center gap-1.5 text-sand hover:text-ivory-100 transition-colors cursor-pointer text-[10px] tracking-wider"
              title={theme === 'light' ? 'Basculer en Fond Noir Obsidian' : 'Basculer en Fond Blanc'}
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-3 h-3 text-brass-400" />
                  <span>Fond Noir</span>
                </>
              ) : (
                <>
                  <Sun className="w-3 h-3 text-brass-400" />
                  <span>Fond Blanc</span>
                </>
              )}
            </button>

            <span className="text-obsidian-700">|</span>

            {/* Typography Trigger in top utility bar */}
            {onOpenFontModal && (
              <>
                <button
                  onClick={onOpenFontModal}
                  className="flex items-center gap-1.5 text-sand hover:text-ivory-100 transition-colors cursor-pointer text-[10px] tracking-wider"
                  title="Studio Typographie Haute Horlogerie"
                >
                  <Type className="w-3 h-3 text-brass-400" />
                  <span>Police ({activePairingIndex + 1}/10)</span>
                </button>
                <span className="text-obsidian-700">|</span>
              </>
            )}

            <a 
              href="https://wa.me/33756998976" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-brass-400 hover:text-brass-300 transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              WhatsApp : 07 56 99 89 76
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Navbar with Guaranteed 3-Zone Architecture */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center min-h-[96px] sm:min-h-[104px] py-3 sm:py-4 gap-2 sm:gap-4">
          
          {/* Left Column: Desktop Navigation / Mobile Menu & Search */}
          <div className="flex items-center justify-start min-w-0">
            {/* Mobile menu and search buttons */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-ivory-200 hover:text-brass-400 focus:outline-none cursor-pointer"
                aria-label="Ouvrir le menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <button
                onClick={openSearchModal}
                className="p-2 text-ivory-200 hover:text-brass-400 ml-1 cursor-pointer"
                aria-label="Recherche"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Desktop Left Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-7 text-[11px] xl:text-xs uppercase tracking-wider xl:tracking-widest font-medium text-ivory-200">
              <button 
                onClick={() => handleNav('catalogue')}
                className={`whitespace-nowrap hover:text-brass-400 transition-colors py-1 cursor-pointer ${currentRoute === 'catalogue' ? 'text-brass-400 border-b border-brass-400' : ''}`}
              >
                Toutes les montres
              </button>
              
              <button 
                onClick={() => handleNav('catalogue-rolex')}
                className="whitespace-nowrap hover:text-brass-400 transition-colors py-1 cursor-pointer"
              >
                Rolex
              </button>
              
              <button 
                onClick={() => handleNav('catalogue-cartier')}
                className="whitespace-nowrap hover:text-brass-400 transition-colors py-1 cursor-pointer"
              >
                Cartier
              </button>

              <button 
                onClick={() => handleNav('catalogue-tudor')}
                className="whitespace-nowrap hover:text-brass-400 transition-colors py-1 cursor-pointer"
              >
                Tudor
              </button>
            </nav>
          </div>

          {/* Center Column: Brand Identity (Mathematically isolated, cannot be overlapped) */}
          <div 
            className="flex flex-col items-center justify-center cursor-pointer text-center group py-2 px-2 sm:px-6 shrink-0 transition-transform hover:scale-[1.01]" 
            onClick={() => handleNav('home')}
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Animated Horlogerie Caliber Monogram SVG */}
              <svg 
                className="w-5 h-5 sm:w-6 sm:h-6 text-brass-400 group-hover:text-brass-300 transition-colors shrink-0" 
                viewBox="0 0 44 44" 
                fill="none"
              >
                <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
                <circle cx="22" cy="22" r="16" stroke="currentColor" strokeWidth="0.8" opacity="0.8" />
                {/* Oscillating balance wheel inside logo */}
                <g className="animate-balance">
                  <circle cx="22" cy="22" r="10" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  <line x1="22" y1="12" x2="22" y2="32" stroke="currentColor" strokeWidth="1" />
                  <line x1="12" y1="22" x2="32" y2="22" stroke="currentColor" strokeWidth="1" />
                </g>
                <circle cx="22" cy="22" r="2.5" fill="currentColor" />
              </svg>
              <span className="whitespace-nowrap font-serif text-xl sm:text-2xl lg:text-[28px] xl:text-[31px] tracking-[0.2em] sm:tracking-[0.24em] font-normal text-ivory-100 group-hover:text-brass-300 transition-colors uppercase leading-none">
                Le Mouvement
              </span>
            </div>
            <span className="whitespace-nowrap text-[8.5px] sm:text-[9.5px] tracking-[0.35em] sm:tracking-[0.42em] text-sand/80 uppercase font-medium mt-1.5 sm:mt-2">
              Haute Horlogerie • Lyon
            </span>
          </div>

          {/* Right Column: Desktop Navigation & Actions */}
          <div className="flex items-center justify-end space-x-3 sm:space-x-5 min-w-0">
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-7 text-[11px] xl:text-xs uppercase tracking-wider xl:tracking-widest font-medium text-ivory-200">
              <button 
                onClick={() => handleNav('vendre')}
                className={`whitespace-nowrap hover:text-brass-400 transition-colors py-1 cursor-pointer ${currentRoute === 'vendre' ? 'text-brass-400 border-b border-brass-400' : ''}`}
              >
                Vendre ma montre
              </button>
              
              <button 
                onClick={() => handleNav('sourcing')}
                className={`whitespace-nowrap hover:text-brass-400 transition-colors py-1 cursor-pointer ${currentRoute === 'sourcing' ? 'text-brass-400 border-b border-brass-400' : ''}`}
              >
                Sourcing
              </button>

              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="whitespace-nowrap flex items-center gap-1 hover:text-brass-400 transition-colors py-1 cursor-pointer"
                >
                  <span>La Maison</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {dropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setDropdownOpen(false)} 
                    />
                    <div className="absolute right-0 mt-3 w-52 bg-obsidian-900 border border-obsidian-700 shadow-2xl py-2 z-50 text-left">
                      <button 
                        onClick={() => handleNav('a-propos')}
                        className="w-full text-left px-4 py-2 text-xs uppercase tracking-wider text-ivory-200 hover:bg-obsidian-800 hover:text-brass-400"
                      >
                        À Propos & Histoire
                      </button>
                      <button 
                        onClick={() => handleNav('authenticite')}
                        className="w-full text-left px-4 py-2 text-xs uppercase tracking-wider text-ivory-200 hover:bg-obsidian-800 hover:text-brass-400"
                      >
                        Authenticité & Garantie
                      </button>
                      <button 
                        onClick={() => handleNav('showroom')}
                        className="w-full text-left px-4 py-2 text-xs uppercase tracking-wider text-ivory-200 hover:bg-obsidian-800 hover:text-brass-400"
                      >
                        Showroom Privé Lyon
                      </button>
                      <button 
                        onClick={() => handleNav('journal')}
                        className="w-full text-left px-4 py-2 text-xs uppercase tracking-wider text-ivory-200 hover:bg-obsidian-800 hover:text-brass-400"
                      >
                        Journal & Guides
                      </button>
                    </div>
                  </>
                )}
              </div>
            </nav>

            {/* Quick Search Button */}
            <button
              onClick={openSearchModal}
              className="hidden lg:flex items-center text-ivory-200 hover:text-brass-400 transition-colors p-1.5 cursor-pointer"
              title="Rechercher une montre"
              aria-label="Rechercher une montre"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 p-2 text-ivory-100 hover:text-brass-400 transition-colors cursor-pointer group"
              aria-label="Voir le panier"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brass-500 text-obsidian-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-obsidian-950 border-b border-obsidian-800 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-3 pb-4 border-b border-obsidian-800">
            <button
              onClick={() => handleNav('catalogue')}
              className="text-left py-2 text-sm font-medium tracking-wider uppercase text-brass-400"
            >
              Toutes les montres
            </button>
            <button
              onClick={() => handleNav('catalogue-rolex')}
              className="text-left py-2 text-sm font-medium tracking-wider uppercase text-ivory-200 hover:text-brass-400"
            >
              Rolex
            </button>
            <button
              onClick={() => handleNav('catalogue-cartier')}
              className="text-left py-2 text-sm font-medium tracking-wider uppercase text-ivory-200 hover:text-brass-400"
            >
              Cartier
            </button>
            <button
              onClick={() => handleNav('catalogue-tudor')}
              className="text-left py-2 text-sm font-medium tracking-wider uppercase text-ivory-200 hover:text-brass-400"
            >
              Tudor
            </button>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => handleNav('vendre')}
              className="block w-full text-left py-1 text-sm tracking-wider uppercase text-ivory-200 hover:text-brass-400"
            >
              Vendre / Estimer ma montre
            </button>
            <button
              onClick={() => handleNav('sourcing')}
              className="block w-full text-left py-1 text-sm tracking-wider uppercase text-ivory-200 hover:text-brass-400"
            >
              Sourcing & Chasse personnalisée
            </button>
            <button
              onClick={() => handleNav('a-propos')}
              className="block w-full text-left py-1 text-sm tracking-wider uppercase text-ivory-200 hover:text-brass-400"
            >
              À Propos & Vision
            </button>
            <button
              onClick={() => handleNav('authenticite')}
              className="block w-full text-left py-1 text-sm tracking-wider uppercase text-ivory-200 hover:text-brass-400"
            >
              Garantie & 20 Points de Contrôle
            </button>
            <button
              onClick={() => handleNav('showroom')}
              className="block w-full text-left py-1 text-sm tracking-wider uppercase text-ivory-200 hover:text-brass-400"
            >
              Showroom privé à Lyon
            </button>
            <button
              onClick={() => handleNav('journal')}
              className="block w-full text-left py-1 text-sm tracking-wider uppercase text-ivory-200 hover:text-brass-400"
            >
              Journal & Guides Horlogers
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="block w-full text-left py-1 text-sm tracking-wider uppercase text-ivory-200 hover:text-brass-400"
            >
              Contact & Accès
            </button>
          </div>

          {/* Mobile Theme Switcher */}
          <div className="pt-2 pb-1 space-y-2">
            <button
              onClick={() => toggleTheme && toggleTheme()}
              className="w-full flex items-center justify-between px-3 py-2 border border-brass-600/40 bg-obsidian-900 text-xs font-mono uppercase tracking-wider text-ivory-100"
            >
              <span className="flex items-center gap-2">
                {theme === 'light' ? <Moon className="w-4 h-4 text-brass-500" /> : <Sun className="w-4 h-4 text-brass-400" />}
                <span>Thème d'affichage :</span>
              </span>
              <span className="font-bold text-brass-300">
                {theme === 'light' ? 'Fond Blanc (Actif)' : 'Fond Noir (Actif)'}
              </span>
            </button>

            {/* Mobile Font Studio Trigger */}
            <button
              onClick={() => {
                if (onOpenFontModal) onOpenFontModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 border border-brass-600/40 bg-obsidian-900 text-xs font-mono uppercase tracking-wider text-ivory-100"
            >
              <span className="flex items-center gap-2">
                <Type className="w-4 h-4 text-brass-400" />
                <span>Typographie ({activePairingIndex + 1}/10) :</span>
              </span>
              <span className="font-bold text-brass-300">
                {activePairing?.name}
              </span>
            </button>
          </div>

          <div className="pt-4 border-t border-obsidian-800 text-xs text-sand flex flex-col gap-2">
            <a 
              href="https://wa.me/33756998976" 
              className="flex items-center gap-2 text-brass-400"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp direct : 07 56 99 89 76
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brass-400" />
              Lyon / Communay (sur rendez-vous)
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
