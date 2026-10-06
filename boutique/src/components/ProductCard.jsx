import React, { useState } from 'react';
import { Eye, ArrowRight } from 'lucide-react';

const getImageUrl = (url, width = 700) => {
  if (!url) return '';
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}width=${width}`;
};

export default function ProductCard({ product, onSelect }) {
  const [hovered, setHovered] = useState(false);

  // Fallback secondary image
  const rawPrimary = product.images && product.images.length > 0 
    ? product.images[0] 
    : product.featuredImage;
  const rawSecondary = product.images && product.images.length > 1 
    ? product.images[1] 
    : rawPrimary;

  const primaryImg = getImageUrl(rawPrimary, 700);
  const secondaryImg = getImageUrl(rawSecondary, 700);
  const hasSecondary = rawSecondary !== rawPrimary;

  // 3x Alma price calculation
  const almaPrice = product.price > 0 ? Math.round(product.price / 3) : 0;

  return (
    <div 
      className="group bg-obsidian-900/60 border border-obsidian-800 hover:border-brass-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer relative"
      onClick={() => onSelect(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top Status & Brand Badge */}
      <div className="relative aspect-[4/5] bg-obsidian-950 overflow-hidden select-none">
        {/* Availability Badge */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          {product.isSold ? (
            <span className="bg-obsidian-900/90 text-sand text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 border border-obsidian-700 backdrop-blur-sm">
              Pièce d'Archive (Vendue)
            </span>
          ) : (
            <span className="bg-obsidian-950/90 text-brass-300 text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 border border-brass-600/40 backdrop-blur-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              En stock
            </span>
          )}
        </div>

        {/* Year tag if present */}
        {product.year && (
          <div className="absolute top-3 right-3 z-10 pointer-events-none">
            <span className="bg-obsidian-900/80 text-sand/80 text-[10px] font-mono px-2 py-0.5 border border-obsidian-800 backdrop-blur-sm">
              {product.year}
            </span>
          </div>
        )}

        {/* Primary Watch Image */}
        <img
          src={primaryImg}
          alt={product.title}
          loading="lazy"
          className={`w-full h-full object-cover object-center transform transition-all duration-500 ease-out ${
            hovered && hasSecondary ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        {/* Secondary Watch Image (pre-rendered for zero-latency crossfade) */}
        {hasSecondary && (
          <img
            src={secondaryImg}
            alt={`${product.title} vue alternative`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover object-center transform transition-all duration-500 ease-out ${
              hovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100 pointer-events-none'
            }`}
          />
        )}

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-obsidian-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-4 py-2 bg-obsidian-900/90 text-ivory-100 text-xs uppercase tracking-widest border border-brass-500/60 flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform shadow-xl">
            <Eye className="w-3.5 h-3.5 text-brass-400" />
            Examiner la pièce
          </span>
        </div>
      </div>

      {/* Watch Info */}
      <div className="p-5 flex flex-col justify-between flex-1 border-t border-obsidian-800/80">
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-brass-400 uppercase tracking-widest font-semibold text-[11px]">
              {product.brand}
            </span>
            {product.diameter && (
              <span className="text-sand/70 text-[11px]">
                {product.diameter}
              </span>
            )}
          </div>

          <h3 className="font-serif text-base sm:text-lg text-ivory-100 font-medium group-hover:text-brass-300 transition-colors line-clamp-1">
            {product.title}
          </h3>

          <p className="text-sand/80 text-xs mt-1.5 line-clamp-2 leading-relaxed font-light">
            {product.materials || product.dial ? `${product.materials} • Cadran ${product.dial || 'd’origine'}` : product.description}
          </p>
        </div>

        {/* Price & Guarantee line */}
        <div className="mt-5 pt-3 border-t border-obsidian-800/50 flex items-end justify-between">
          <div>
            <div className="font-serif text-lg sm:text-xl font-bold text-ivory-100">
              {product.price > 0 ? `${product.price.toLocaleString('fr-FR')} €` : 'Prix sur demande'}
            </div>
            {product.price > 0 && !product.isSold && (
              <div className="text-[10px] text-sand/70 mt-0.5">
                ou 3x <span className="text-ivory-200 font-medium">{almaPrice.toLocaleString('fr-FR')} €</span> sans frais
              </div>
            )}
          </div>

          <div className="text-right">
            <span className="text-[11px] text-sand flex items-center gap-1 group-hover:text-brass-400 transition-colors">
              Détails <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
