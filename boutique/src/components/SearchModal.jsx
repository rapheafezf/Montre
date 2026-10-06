import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function SearchModal({ isOpen, onClose, onSelectProduct, products = PRODUCTS, navigateTo }) {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const currentCatalog = products && products.length > 0 ? products : PRODUCTS;
  const filtered = query.trim() === '' ? [] : currentCatalog.filter(p => {
    const q = query.toLowerCase();
    return p.title.toLowerCase().includes(q) ||
           p.brand.toLowerCase().includes(q) ||
           (p.dial && p.dial.toLowerCase().includes(q)) ||
           (p.materials && p.materials.toLowerCase().includes(q)) ||
           (p.year && p.year.includes(q));
  }).slice(0, 6);

  const quickTerms = ['Rolex Datejust', 'Cartier Santos', 'Tudor Prince', 'Cadran Lin', 'Or 18k', '1989'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-obsidian-950/90 backdrop-blur-md flex items-start justify-center pt-20 px-4">
      <div className="relative w-full max-w-2xl bg-obsidian-900 border border-obsidian-700 text-ivory-100 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sand hover:text-ivory-100 p-2"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-obsidian-700 pb-3">
          <Search className="w-5 h-5 text-brass-400" />
          <input
            type="text"
            autoFocus
            placeholder="Rechercher un modèle, une maison, un calibre, une année..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (query.trim().toLowerCase() === 'admin' || query.trim() === '3105')) {
                onClose();
                if (navigateTo) navigateTo('admin');
              }
            }}
            className="w-full bg-transparent text-sm sm:text-base text-ivory-100 focus:outline-none placeholder:text-sand/50"
          />
        </div>

        {/* Quick searches */}
        {query.trim() === '' && (
          <div className="pt-4 space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-sand/70">Recherches fréquentes :</span>
            <div className="flex flex-wrap gap-2">
              {quickTerms.map(term => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-2.5 py-1 bg-obsidian-950 border border-obsidian-800 hover:border-brass-500/50 text-xs text-sand hover:text-brass-300 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {filtered.length > 0 && (
          <div className="mt-4 divide-y divide-obsidian-800">
            {filtered.map(product => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="py-3 flex items-center justify-between hover:bg-obsidian-800/60 px-3 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`${product.images[0] || product.featuredImage}?width=120`}
                    alt={product.title}
                    className="w-12 h-14 object-cover border border-obsidian-800"
                  />
                  <div>
                    <div className="text-[10px] text-brass-400 uppercase tracking-widest font-semibold">
                      {product.brand} • {product.year}
                    </div>
                    <div className="font-serif text-sm text-ivory-100">{product.title}</div>
                    <div className="text-xs text-sand/70">{product.diameter} • {product.dial}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-serif text-sm font-semibold text-ivory-100">
                    {product.price > 0 ? `${product.price.toLocaleString('fr-FR')} €` : 'Sur demande'}
                  </div>
                  <span className="text-[10px] text-brass-400 flex items-center justify-end gap-1 mt-0.5">
                    Voir <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {query.trim() !== '' && filtered.length === 0 && (
          <div className="py-8 text-center text-xs text-sand">
            Aucun garde-temps ne correspond à votre recherche "{query}". Contactez notre service sourcing pour le trouver.
          </div>
        )}
      </div>
    </div>
  );
}
