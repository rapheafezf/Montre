import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, Clock, Truck, RefreshCw, MessageCircle, MapPin, 
  ChevronRight, ChevronLeft, Lock, CheckCircle2, Maximize2, X, 
  ArrowLeft 
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CertificationStampSvg from '../components/CertificationStampSvg';
import ChronocomparateurSvg from '../components/ChronocomparateurSvg';
import HorlogerieMechanismSvg from '../components/HorlogerieMechanismSvg';

// Safe image URL builder with width parameter
const getImageUrl = (url, width = 1000) => {
  if (!url) return '';
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}width=${width}`;
};

export default function ProductDetailPage({ 
  product, 
  allProducts, 
  onAddToCart, 
  onBuyNow, 
  onOpenShowroom, 
  onSelectProduct, 
  navigateTo 
}) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState('howtobuy');

  // Drag & Swipe states for Main Viewer
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const isMovedRef = useRef(false);

  // Drag & Swipe states for Lightbox
  const [lbDragOffset, setLbDragOffset] = useState(0);
  const [isLbDragging, setIsLbDragging] = useState(false);
  const lbStartXRef = useRef(0);
  const lbCurrentXRef = useRef(0);

  const thumbnailContainerRef = useRef(null);

  if (!product) return null;

  const images = product.images && product.images.length > 0 ? product.images : [product.featuredImage];

  // Reset photo index when product changes
  useEffect(() => {
    setSelectedImageIdx(0);
    setDragOffset(0);
  }, [product.id]);

  // Preload all images of the current watch in the background for instant rendering
  useEffect(() => {
    if (!images || images.length === 0) return;
    images.forEach((img) => {
      const preloadImg = new Image();
      preloadImg.src = getImageUrl(img, 1000);
    });
  }, [product.id, images]);

  // Auto-scroll ONLY the horizontal thumbnail strip without moving the page/window
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      const activeEl = container.children[selectedImageIdx];
      if (activeEl) {
        const containerWidth = container.offsetWidth;
        const elOffsetLeft = activeEl.offsetLeft;
        const elWidth = activeEl.offsetWidth;
        // Scroll the container's internal scrollLeft ONLY, zero window scroll
        container.scrollTo({
          left: elOffsetLeft - (containerWidth / 2) + (elWidth / 2),
          behavior: 'smooth'
        });
      }
    }
  }, [selectedImageIdx]);

  // Keyboard navigation for gallery & lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'Escape' && lightboxOpen) {
        setLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, selectedImageIdx, images.length]);

  const handleNextImage = () => {
    if (selectedImageIdx < images.length - 1) {
      setSelectedImageIdx((prev) => prev + 1);
    } else {
      setSelectedImageIdx(0);
    }
  };

  const handlePrevImage = () => {
    if (selectedImageIdx > 0) {
      setSelectedImageIdx((prev) => prev - 1);
    } else {
      setSelectedImageIdx(images.length - 1);
    }
  };

  // --- Main Viewer Mouse & Touch Drag Handlers ---
  const handleTouchStart = (e) => {
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = e.touches[0].clientX;
    isMovedRef.current = false;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    currentXRef.current = e.touches[0].clientX;
    const diff = currentXRef.current - startXRef.current;
    if (Math.abs(diff) > 5) {
      isMovedRef.current = true;
    }
    // Rubber-band resistance on boundary edges
    if ((selectedImageIdx === 0 && diff > 0) || (selectedImageIdx === images.length - 1 && diff < 0)) {
      setDragOffset(diff * 0.35);
    } else {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = currentXRef.current - startXRef.current;
    const threshold = 50;

    if (diff < -threshold && selectedImageIdx < images.length - 1) {
      setSelectedImageIdx((prev) => prev + 1);
    } else if (diff > threshold && selectedImageIdx > 0) {
      setSelectedImageIdx((prev) => prev - 1);
    }
    setDragOffset(0);
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    startXRef.current = e.clientX;
    currentXRef.current = e.clientX;
    isMovedRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    currentXRef.current = e.clientX;
    const diff = currentXRef.current - startXRef.current;
    if (Math.abs(diff) > 5) {
      isMovedRef.current = true;
    }
    if ((selectedImageIdx === 0 && diff > 0) || (selectedImageIdx === images.length - 1 && diff < 0)) {
      setDragOffset(diff * 0.35);
    } else {
      setDragOffset(diff);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = currentXRef.current - startXRef.current;
    const threshold = 55;

    if (diff < -threshold && selectedImageIdx < images.length - 1) {
      setSelectedImageIdx((prev) => prev + 1);
    } else if (diff > threshold && selectedImageIdx > 0) {
      setSelectedImageIdx((prev) => prev - 1);
    }
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  const handleSlideClick = () => {
    if (!isMovedRef.current) {
      setLightboxOpen(true);
    }
  };

  // --- Lightbox Touch & Mouse Handlers ---
  const handleLbTouchStart = (e) => {
    setIsLbDragging(true);
    lbStartXRef.current = e.touches[0].clientX;
    lbCurrentXRef.current = e.touches[0].clientX;
  };

  const handleLbTouchMove = (e) => {
    if (!isLbDragging) return;
    lbCurrentXRef.current = e.touches[0].clientX;
    const diff = lbCurrentXRef.current - lbStartXRef.current;
    if ((selectedImageIdx === 0 && diff > 0) || (selectedImageIdx === images.length - 1 && diff < 0)) {
      setLbDragOffset(diff * 0.35);
    } else {
      setLbDragOffset(diff);
    }
  };

  const handleLbTouchEnd = () => {
    if (!isLbDragging) return;
    setIsLbDragging(false);
    const diff = lbCurrentXRef.current - lbStartXRef.current;
    const threshold = 50;

    if (diff < -threshold && selectedImageIdx < images.length - 1) {
      setSelectedImageIdx((prev) => prev + 1);
    } else if (diff > threshold && selectedImageIdx > 0) {
      setSelectedImageIdx((prev) => prev - 1);
    }
    setLbDragOffset(0);
  };

  const handleLbMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsLbDragging(true);
    lbStartXRef.current = e.clientX;
    lbCurrentXRef.current = e.clientX;
  };

  const handleLbMouseMove = (e) => {
    if (!isLbDragging) return;
    lbCurrentXRef.current = e.clientX;
    const diff = lbCurrentXRef.current - lbStartXRef.current;
    if ((selectedImageIdx === 0 && diff > 0) || (selectedImageIdx === images.length - 1 && diff < 0)) {
      setLbDragOffset(diff * 0.35);
    } else {
      setLbDragOffset(diff);
    }
  };

  const handleLbMouseUp = () => {
    if (!isLbDragging) return;
    setIsLbDragging(false);
    const diff = lbCurrentXRef.current - lbStartXRef.current;
    const threshold = 55;

    if (diff < -threshold && selectedImageIdx < images.length - 1) {
      setSelectedImageIdx((prev) => prev + 1);
    } else if (diff > threshold && selectedImageIdx > 0) {
      setSelectedImageIdx((prev) => prev - 1);
    }
    setLbDragOffset(0);
  };

  const alma3x = product.price > 0 ? Math.round(product.price / 3) : 0;
  const alma4x = product.price > 0 ? Math.round(product.price / 4) : 0;

  // Related watches from same brand or similar
  const relatedWatches = allProducts
    .filter((p) => p.id !== product.id && (p.brand === product.brand || !p.isSold))
    .slice(0, 3);

  const whatsappMessage = encodeURIComponent(
    `Bonjour Nyle, je suis intéressé(e) par la montre ${product.title} (Réf : ${product.id}). Est-elle disponible pour un échange ou des photographies complémentaires ?`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-sand/80">
        <button onClick={() => navigateTo('home')} className="hover:text-brass-300 transition-colors">
          Accueil
        </button>
        <ChevronRight className="w-3 h-3 text-obsidian-700" />
        <button onClick={() => navigateTo('catalogue')} className="hover:text-brass-300 transition-colors">
          Catalogue
        </button>
        <ChevronRight className="w-3 h-3 text-obsidian-700" />
        <span className="text-brass-400">{product.brand}</span>
        <ChevronRight className="w-3 h-3 text-obsidian-700" />
        <span className="text-ivory-100 truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Image Gallery with Seamless Horizontal Sliding Track (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Viewer with Continuous Slide Track & Drag Support */}
          <div 
            className="relative aspect-[4/5] bg-obsidian-950 border border-obsidian-800 overflow-hidden group select-none cursor-grab active:cursor-grabbing"
            style={{ touchAction: 'pan-y' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* The Horizontal Filmstrip Slider Track */}
            <div 
              className="flex h-full w-full"
              style={{
                transform: `translateX(calc(-${selectedImageIdx * 100}% + ${dragOffset}px))`,
                transition: isDragging ? 'none' : 'transform 450ms cubic-bezier(0.25, 1, 0.5, 1)',
                willChange: 'transform'
              }}
            >
              {images.map((img, idx) => (
                <div 
                  key={idx}
                  className="min-w-full h-full relative shrink-0 overflow-hidden"
                  onClick={handleSlideClick}
                >
                  <img
                    src={getImageUrl(img, 1100)}
                    alt={`${product.title} - Vue ${idx + 1}`}
                    draggable={false}
                    loading={idx <= 2 ? "eager" : "lazy"}
                    className="w-full h-full object-cover object-center pointer-events-none select-none"
                  />
                </div>
              ))}
            </div>

            {/* Availability Badge */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              {product.isSold ? (
                <span className="bg-obsidian-950/90 text-sand text-xs tracking-wider uppercase font-semibold px-3 py-1.5 border border-obsidian-700 backdrop-blur-sm">
                  Pièce d'Archive (Vendue)
                </span>
              ) : (
                <span className="bg-obsidian-950/90 text-brass-300 text-xs tracking-wider uppercase font-semibold px-3 py-1.5 border border-brass-600/40 backdrop-blur-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Disponible immédiatement
                </span>
              )}
            </div>

            {/* Photo Counter Badge */}
            <div className="absolute top-4 right-4 z-10 pointer-events-none">
              <span className="bg-obsidian-950/80 text-sand/90 text-[11px] font-mono px-2.5 py-1 border border-obsidian-800/80 backdrop-blur-sm">
                {selectedImageIdx + 1} / {images.length}
              </span>
            </div>

            {/* Navigation Arrows on Main Viewer */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-obsidian-950/85 hover:bg-obsidian-900 text-ivory-100 hover:text-brass-400 border border-obsidian-700/80 rounded-full transition-all shadow-xl opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                  aria-label="Photo précédente"
                  title="Photo précédente"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-obsidian-950/85 hover:bg-obsidian-900 text-ivory-100 hover:text-brass-400 border border-obsidian-700/80 rounded-full transition-all shadow-xl opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                  aria-label="Photo suivante"
                  title="Photo suivante"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Bottom Slider Indicator Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-6 right-6 z-10 pointer-events-none flex items-center justify-center gap-1.5">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      selectedImageIdx === idx 
                        ? 'w-6 bg-brass-400 shadow-sm' 
                        : 'w-1.5 bg-obsidian-700/70'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Zoom Lightbox Trigger Button */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute bottom-4 right-4 z-10 p-2.5 bg-obsidian-900/90 text-ivory-100 hover:text-brass-400 border border-obsidian-700 backdrop-blur-sm transition-colors opacity-90 group-hover:opacity-100 flex items-center gap-1.5 text-xs cursor-pointer shadow-lg"
              title="Agrandir en haute définition"
            >
              <Maximize2 className="w-4 h-4 text-brass-400" />
              <span className="hidden sm:inline text-[11px] font-medium">Zoomer</span>
            </button>
          </div>

          {/* Smooth Thumbnails Strip */}
          {images.length > 1 && (
            <div 
              ref={thumbnailContainerRef}
              className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin select-none"
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative w-20 h-24 shrink-0 bg-obsidian-950 border overflow-hidden transition-all duration-200 cursor-pointer ${
                    selectedImageIdx === idx 
                      ? 'border-brass-400 ring-2 ring-brass-500/50 opacity-100 scale-100' 
                      : 'border-obsidian-800 opacity-60 hover:opacity-100 hover:border-obsidian-600'
                  }`}
                  aria-label={`Afficher la photo ${idx + 1}`}
                >
                  <img
                    src={getImageUrl(img, 200)}
                    alt={`${product.title} vignette ${idx + 1}`}
                    loading="lazy"
                    draggable={false}
                    className="w-full h-full object-cover"
                  />
                  {selectedImageIdx === idx && (
                    <div className="absolute inset-0 bg-brass-500/10 pointer-events-none" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Guarantee Pill Under Gallery */}
          <div className="p-4 bg-obsidian-900/60 border border-obsidian-800 text-xs flex items-center justify-between">
            <span className="flex items-center gap-2 text-ivory-200">
              <ShieldCheck className="w-4 h-4 text-brass-400 shrink-0" />
              Chaque détail photographié est authentique et d'époque.
            </span>
            <span className="text-sand/80 text-[11px] hidden sm:inline font-mono">
              Glissez la souris ou votre doigt pour faire défiler
            </span>
          </div>

          {/* Atelier Horloger Telemetry & Inspection SVG Showcase */}
          <div className="mt-6 border border-obsidian-800 bg-obsidian-900/40 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brass-400 font-semibold block">
                  Contrôle Métrologique Atelier
                </span>
                <h3 className="font-serif text-lg text-ivory-100 font-normal uppercase tracking-wide mt-0.5">
                  Rapport Chronocomparateur & Précision
                </h3>
              </div>
              <CertificationStampSvg className="w-16 h-16 sm:w-20 sm:h-20 shrink-0" />
            </div>

            {/* Live Chronocomparateur SVG Waveform Display */}
            <ChronocomparateurSvg className="w-full" rate="+02" amplitude="295°" beatError="0.1ms" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-[11px] text-sand/80 font-light border-t border-obsidian-800/60">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brass-400" />
                <span>Amplitude saine : barillet & ressort vérifiés</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brass-400" />
                <span>Balancier réglé sur 5 positions d'atelier</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Watch Details & Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Header */}
          <div className="space-y-3 pb-6 border-b border-obsidian-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-brass-400 font-mono uppercase tracking-[0.25em] font-semibold text-[11px]">
                {product.brand}
              </span>
              {product.year && (
                <span className="text-sand/80 font-mono text-xs tracking-wider">
                  MILLÉSIME {product.year}
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-ivory-100 font-normal leading-tight tracking-[0.03em] uppercase">
              {product.title}
            </h1>

            {/* Price */}
            <div className="pt-2">
              <div className="font-serif text-3xl sm:text-4xl font-normal tracking-wide text-ivory-100">
                {product.price > 0 ? `${product.price.toLocaleString('fr-FR')} €` : 'Prix sur demande'}
              </div>
              {product.price > 0 && !product.isSold && (
                <div className="text-xs text-sand/80 mt-1.5 flex items-center gap-2 font-mono text-[11px]">
                  <span>FACILITÉS :</span>
                  <span className="text-brass-300 font-semibold">3x {alma3x.toLocaleString('fr-FR')} €</span>
                  <span>ou 4x {alma4x.toLocaleString('fr-FR')} € sans frais</span>
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3">
            {!product.isSold ? (
              <>
                <button
                  type="button"
                  onClick={() => onBuyNow(product)}
                  className="w-full py-4 bg-brass-500 hover:bg-brass-400 text-obsidian-950 font-bold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Acquérir cette pièce — {product.price.toLocaleString('fr-FR')} €
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`https://wa.me/33756998976?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-3 bg-obsidian-900 hover:bg-obsidian-850 text-ivory-100 border border-obsidian-700 hover:border-brass-500/50 text-xs font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-2 text-center"
                  >
                    <MessageCircle className="w-4 h-4 text-brass-400 shrink-0" />
                    Poser une question
                  </a>

                  <button
                    type="button"
                    onClick={() => onOpenShowroom(product)}
                    className="py-3 px-3 bg-obsidian-900 hover:bg-obsidian-850 text-ivory-100 border border-obsidian-700 hover:border-brass-500/50 text-xs font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-2 text-center"
                  >
                    <MapPin className="w-4 h-4 text-brass-400 shrink-0" />
                    Essai au Showroom
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div className="p-4 bg-obsidian-900 border border-obsidian-800 text-xs text-sand">
                  Cette pièce a trouvé son nouveau propriétaire. Notre atelier recherche régulièrement des exemplaires identiques ou équivalents.
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('sourcing')}
                  className="w-full py-4 bg-brass-500 hover:bg-brass-400 text-obsidian-950 font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  Demander une pièce similaire (Sourcing)
                </button>
                <a
                  href={`https://wa.me/33756998976?text=${encodeURIComponent(
                    `Bonjour Nyle, j'ai vu que la montre ${product.title} a été vendue. Avez-vous une pièce similaire en cours de sourcing ?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-obsidian-900 text-ivory-100 border border-obsidian-700 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-brass-400" />
                  Contacter Nyle sur WhatsApp
                </a>
              </div>
            )}
          </div>

          {/* 3 Pillars Reassurance Block */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-obsidian-900/60 border border-obsidian-800 text-center text-xs">
            <div className="space-y-1">
              <Clock className="w-4 h-4 text-brass-400 mx-auto" />
              <div className="font-semibold text-ivory-100 text-[11px]">Garantie 12 Mois</div>
              <div className="text-[10px] text-sand">Mécanique incluse</div>
            </div>
            <div className="space-y-1 border-x border-obsidian-800">
              <Truck className="w-4 h-4 text-brass-400 mx-auto" />
              <div className="font-semibold text-ivory-100 text-[11px]">Expédition 48h</div>
              <div className="text-[10px] text-sand">100% Assurée</div>
            </div>
            <div className="space-y-1">
              <RefreshCw className="w-4 h-4 text-brass-400 mx-auto" />
              <div className="font-semibold text-ivory-100 text-[11px]">Retours 14 Jours</div>
              <div className="text-[10px] text-sand">Sous scellé</div>
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg text-ivory-100 font-medium">Caractéristiques Horlogères</h3>
            
            <div className="bg-obsidian-950 border border-obsidian-800 divide-y divide-obsidian-850 text-xs">
              <div className="flex justify-between py-2.5 px-4">
                <span className="text-sand/80">Modèle / Référence</span>
                <span className="font-medium text-ivory-100">{product.title}</span>
              </div>
              {product.diameter && (
                <div className="flex justify-between py-2.5 px-4">
                  <span className="text-sand/80">Diamètre du boîtier</span>
                  <span className="font-medium text-ivory-100">{product.diameter}</span>
                </div>
              )}
              {product.movement && (
                <div className="flex justify-between py-2.5 px-4">
                  <span className="text-sand/80">Mouvement & Calibre</span>
                  <span className="font-medium text-ivory-100">{product.movement}</span>
                </div>
              )}
              {product.dial && (
                <div className="flex justify-between py-2.5 px-4">
                  <span className="text-sand/80">Cadran</span>
                  <span className="font-medium text-ivory-100">{product.dial}</span>
                </div>
              )}
              {product.materials && (
                <div className="flex justify-between py-2.5 px-4">
                  <span className="text-sand/80">Matériaux & Boîtier</span>
                  <span className="font-medium text-ivory-100">{product.materials}</span>
                </div>
              )}
              {product.year && (
                <div className="flex justify-between py-2.5 px-4">
                  <span className="text-sand/80">Année</span>
                  <span className="font-medium text-ivory-100">{product.year}</span>
                </div>
              )}
              {product.boxPapers && (
                <div className="flex justify-between py-2.5 px-4">
                  <span className="text-sand/80">Contenu</span>
                  <span className="font-medium text-ivory-100">{product.boxPapers}</span>
                </div>
              )}
              {product.revision && (
                <div className="flex justify-between py-2.5 px-4 bg-emerald-950/20 text-emerald-300">
                  <span className="font-medium">Révision horlogère</span>
                  <span className="font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {product.revision}
                  </span>
                </div>
              )}
            </div>

            {/* Calibre Architecture Interactive Accordion with Animated SVG */}
            <div className="border border-obsidian-800 bg-obsidian-950 mt-3">
              <button
                type="button"
                onClick={() => setActiveAccordion(activeAccordion === 'caliber_view' ? '' : 'caliber_view')}
                className="w-full text-left p-3.5 font-medium text-ivory-100 flex justify-between items-center hover:bg-obsidian-900 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brass-400 animate-pulse" />
                  <span className="font-serif uppercase tracking-wider text-xs text-brass-300">
                    Vue Animée du Calibre Mécanique en Atelier
                  </span>
                </div>
                <span className="text-sand font-mono text-sm">{activeAccordion === 'caliber_view' ? '−' : '+'}</span>
              </button>
              {activeAccordion === 'caliber_view' && (
                <div className="p-6 pt-3 text-center border-t border-obsidian-850 bg-obsidian-900/40 space-y-4">
                  <div className="flex justify-center py-2">
                    <HorlogerieMechanismSvg className="w-56 h-56 sm:w-64 sm:h-64" />
                  </div>
                  <div className="text-[11px] text-sand/80 max-w-sm mx-auto leading-relaxed font-light">
                    Balancier-spiral avec réglage d'inertie, échappement à ancre suisse 28 800 alternances/heure, amortisseurs antichoc et rubis synthétiques d'origine inspectés en atelier.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description narrative */}
          <div className="space-y-3 pt-2">
            <h3 className="font-serif text-lg text-ivory-100 font-normal uppercase tracking-wide">L'Avis de la Maison</h3>
            <p className="text-xs sm:text-sm text-sand/90 leading-relaxed font-light">
              {product.description}
            </p>
          </div>

          {/* Accordion Questions */}
          <div className="space-y-2 pt-4 border-t border-obsidian-800 text-xs">
            
            <div className="border border-obsidian-800 bg-obsidian-950">
              <button
                type="button"
                onClick={() => setActiveAccordion(activeAccordion === 'howtobuy' ? '' : 'howtobuy')}
                className="w-full text-left p-3.5 font-medium text-ivory-100 flex justify-between items-center"
              >
                <span>Comment se déroule l’achat ?</span>
                <span>{activeAccordion === 'howtobuy' ? '−' : '+'}</span>
              </button>
              {activeAccordion === 'howtobuy' && (
                <div className="p-3.5 pt-0 text-sand leading-relaxed border-t border-obsidian-850">
                  Le règlement s’effectue en ligne en 1 clic par Carte Bancaire sécurisée (3D Secure), Apple Pay, ou en 3x/4x avec Alma. Pour les montres de très forte valeur, un virement bancaire SEPA ou un règlement direct au showroom de Lyon peut être convenu.
                </div>
              )}
            </div>

            <div className="border border-obsidian-800 bg-obsidian-950">
              <button
                type="button"
                onClick={() => setActiveAccordion(activeAccordion === 'visit' ? '' : 'visit')}
                className="w-full text-left p-3.5 font-medium text-ivory-100 flex justify-between items-center"
              >
                <span>Puis-je voir la pièce avant de commander ?</span>
                <span>{activeAccordion === 'visit' ? '−' : '+'}</span>
              </button>
              {activeAccordion === 'visit' && (
                <div className="p-3.5 pt-0 text-sand leading-relaxed border-t border-obsidian-850">
                  Oui, un rendez-vous peut être réservé dans nos locaux à Communay (Région lyonnaise). Si vous résidez à distance, nous réalisons sur simple demande WhatsApp des vidéos macro sous éclairage naturel et des mesures au chronocomparateur.
                </div>
              )}
            </div>

            <div className="border border-obsidian-800 bg-obsidian-950">
              <button
                type="button"
                onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? '' : 'shipping')}
                className="w-full text-left p-3.5 font-medium text-ivory-100 flex justify-between items-center"
              >
                <span>Expédition, transport sécurisé et retours</span>
                <span>{activeAccordion === 'shipping' ? '−' : '+'}</span>
              </button>
              {activeAccordion === 'shipping' && (
                <div className="p-3.5 pt-0 text-sand leading-relaxed border-t border-obsidian-850">
                  Expédition assurée ad valorem sous 48h ouvrées avec remise contre signature. Vous disposez de 14 jours légaux pour faire inspecter la pièce chez l'horloger de votre choix. La montre est envoyée sous scellé de sécurité numéroté pour garantir son intégrité.
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Fullscreen Modal with Complete Sliding Track Carousel */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-obsidian-950/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 select-none"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Top Bar */}
          <div className="w-full flex items-center justify-between text-xs text-sand z-10" onClick={(e) => e.stopPropagation()}>
            <div className="font-serif text-sm text-ivory-100">
              {product.title} — <span className="text-brass-400">{selectedImageIdx + 1} / {images.length}</span>
            </div>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2 text-sand hover:text-ivory-100 bg-obsidian-900 border border-obsidian-700 transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Main Lightbox Image with Seamless Slide Track */}
          <div 
            className="relative flex-1 w-full max-h-[75vh] overflow-hidden select-none cursor-grab active:cursor-grabbing my-4 flex items-center"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleLbMouseDown}
            onMouseMove={handleLbMouseMove}
            onMouseUp={handleLbMouseUp}
            onMouseLeave={handleLbMouseUp}
            onTouchStart={handleLbTouchStart}
            onTouchMove={handleLbTouchMove}
            onTouchEnd={handleLbTouchEnd}
          >
            <div 
              className="flex h-full w-full"
              style={{
                transform: `translateX(calc(-${selectedImageIdx * 100}% + ${lbDragOffset}px))`,
                transition: isLbDragging ? 'none' : 'transform 450ms cubic-bezier(0.25, 1, 0.5, 1)',
                willChange: 'transform'
              }}
            >
              {images.map((img, idx) => (
                <div 
                  key={idx}
                  className="min-w-full h-full flex items-center justify-center shrink-0 p-2"
                >
                  <img
                    src={getImageUrl(img, 1600)}
                    alt={`${product.title} vue zoomée ${idx + 1}`}
                    draggable={false}
                    loading={Math.abs(selectedImageIdx - idx) <= 1 ? "eager" : "lazy"}
                    className="max-w-full max-h-full object-contain shadow-2xl pointer-events-none select-none"
                  />
                </div>
              ))}
            </div>

            {/* Arrows */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 bg-obsidian-900/90 hover:bg-obsidian-850 text-ivory-100 hover:text-brass-400 border border-obsidian-700 rounded-full transition-all shadow-2xl cursor-pointer"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 bg-obsidian-900/90 hover:bg-obsidian-850 text-ivory-100 hover:text-brass-400 border border-obsidian-700 rounded-full transition-all shadow-2xl cursor-pointer"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Bottom Thumbnails */}
          {images.length > 1 && (
            <div 
              className="w-full max-w-2xl flex gap-2 overflow-x-auto justify-center py-2 z-10" 
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-14 h-16 shrink-0 bg-obsidian-950 border overflow-hidden transition-all cursor-pointer ${
                    selectedImageIdx === idx 
                      ? 'border-brass-400 ring-2 ring-brass-500/50 opacity-100 scale-105' 
                      : 'border-obsidian-800 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img
                    src={getImageUrl(img, 150)}
                    alt=""
                    draggable={false}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Related Watches */}
      {relatedWatches.length > 0 && (
        <div className="pt-16 border-t border-obsidian-800 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-ivory-100 font-normal">
              Autres Pièces Disponibles
            </h2>
            <button
              onClick={() => navigateTo('catalogue')}
              className="text-xs uppercase tracking-widest text-brass-400 hover:text-brass-300"
            >
              Voir tout le catalogue →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedWatches.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                onSelect={(p) => {
                  onSelectProduct(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
