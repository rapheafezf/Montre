import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, ShieldCheck, Clock, MapPin, MessageCircle, ChevronDown, Sun, Moon } from 'lucide-react';

export default function Header({ currentRoute, navigateTo, cartCount, openCart, openShowroomModal, openSearchModal, theme = 'dark', toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleNav = (route) => {
    navigateTo(route);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-obsidian-950/95 backdrop-blur-md border-b border-obsidian-800 transition-all">
      {/* Top Pre-header Reassurance */}
      <div className="bg-obsidian-900 border-b border-obsidian-800/60 text-sand text-[11px] uppercase tracking-wider py-1.5 px-4 hidden md:block">
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
            <a 
              href="https://wa.me/33756998976" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-brass-400 hover:text-brass-300 transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              Conciergerie WhatsApp : +33 7 56 99 89 76
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-ivory-200 hover:text-brass-400 focus:outline-none"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={openSearchModal}
              className="p-2 text-ivory-200 hover:text-brass-400 ml-1"
              aria-label="Recherche"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Left Navigation */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-widest font-medium text-ivory-200">
            <button 
              onClick={() => handleNav('catalogue')}
              className={`hover:text-brass-400 transition-colors ${currentRoute === 'catalogue' ? 'text-brass-400 border-b border-brass-400 pb-1' : ''}`}
            >
              Toutes les montres
            </button>
            
            <button 
              onClick={() => handleNav('catalogue-rolex')}
              className="hover:text-brass-400 transition-colors"
            >
              Rolex
            </button>
            
            <button 
              onClick={() => handleNav('catalogue-cartier')}
              className="hover:text-brass-400 transition-colors"
            >
              Cartier
            </button>

            <button 
              onClick={() => handleNav('catalogue-tudor')}
              className="hover:text-brass-400 transition-colors"
            >
              Tudor
            </button>
          </nav>

          {/* Center Brand Identity with Animated Horlogerie Escapement SVG */}
          <div className="flex flex-col items-center cursor-pointer text-center group py-1" onClick={() => handleNav('home')}>
            <div className="flex items-center gap-2.5">
              {/* Animated Horlogerie Caliber Monogram SVG */}
              <svg 
                className="w-6 h-6 text-brass-400 group-hover:text-brass-300 transition-colors" 
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
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.22em] font-normal text-ivory-100 group-hover:text-brass-300 transition-colors uppercase">
                Le Mouvement
              </span>
            </div>
            <span className="text-[8.5px] tracking-[0.38em] text-sand/75 uppercase font-medium mt-0.5">
              Haute Horlogerie • Lyon
            </span>
          </div>

          {/* Desktop Right Navigation & Actions */}
          <div className="flex items-center space-x-6">
            <nav className="hidden lg:flex items-center space-x-6 text-xs uppercase tracking-widest font-medium text-ivory-200">
              <button 
                onClick={() => handleNav('vendre')}
                className={`hover:text-brass-400 transition-colors ${currentRoute === 'vendre' ? 'text-brass-400 border-b border-brass-400 pb-1' : ''}`}
              >
                Vendre ma montre
              </button>
              
              <button 
                onClick={() => handleNav('sourcing')}
                className={`hover:text-brass-400 transition-colors ${currentRoute === 'sourcing' ? 'text-brass-400 border-b border-brass-400 pb-1' : ''}`}
              >
                Sourcing
              </button>

              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 hover:text-brass-400 transition-colors py-2"
                >
                  <span>La Maison</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-obsidian-900 border border-obsidian-700 shadow-2xl py-2 z-50 text-left">
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
                )}
              </div>
            </nav>

            <button
              onClick={openSearchModal}
              className="hidden lg:block text-ivory-200 hover:text-brass-400 transition-colors p-1"
              title="Rechercher une montre"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle Button (Fond Blanc / Fond Noir) */}
            <button
              onClick={() => toggleTheme && toggleTheme()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border border-brass-600/40 bg-obsidian-900/90 hover:border-brass-400 text-ivory-100 transition-all cursor-pointer shadow-sm"
              title={theme === 'light' ? 'Basculer en Fond Noir Obsidian' : 'Basculer en Fond Blanc Lumineux'}
              aria-label="Basculer entre Fond Blanc et Fond Noir"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-brass-500" />
                  <span className="hidden sm:inline font-semibold">Fond Noir</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-brass-400" />
                  <span className="hidden sm:inline font-semibold">Fond Blanc</span>
                </>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 p-2 text-ivory-100 hover:text-brass-400 transition-colors group"
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
          <div className="pt-2 pb-1">
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
