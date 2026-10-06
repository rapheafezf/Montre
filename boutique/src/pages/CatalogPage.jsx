import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';

export default function CatalogPage({ products, initialBrand, initialFilter, onSelectProduct }) {
  const [selectedBrand, setSelectedBrand] = useState(initialBrand || 'ALL');
  const [availability, setAvailability] = useState(initialFilter === 'dispo' ? 'instock' : initialFilter === 'archives' ? 'sold' : 'all');
  const [selectedDiameter, setSelectedDiameter] = useState('ALL');
  const [selectedMovement, setSelectedMovement] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState(15000);
  const [sortBy, setSortBy] = useState('default');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available brands in the collection
  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map(p => p.brand))).filter(Boolean);
    return ['ALL', ...list];
  }, [products]);

  // Available diameters
  const diameters = useMemo(() => {
    const list = Array.from(new Set(products.map(p => p.diameter))).filter(Boolean);
    return ['ALL', ...list];
  }, [products]);

  // Available movements
  const movements = useMemo(() => {
    return ['ALL', 'Automatique', 'Manuel', 'Quartz'];
  }, []);

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Brand filter
      if (selectedBrand !== 'ALL' && product.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }
      // Availability filter
      if (availability === 'instock' && product.isSold) {
        return false;
      }
      if (availability === 'sold' && !product.isSold) {
        return false;
      }
      // Diameter filter
      if (selectedDiameter !== 'ALL' && product.diameter !== selectedDiameter) {
        return false;
      }
      // Movement filter
      if (selectedMovement !== 'ALL') {
        if (!product.movement.toLowerCase().includes(selectedMovement.toLowerCase())) {
          return false;
        }
      }
      // Price filter
      if (product.price > 0 && product.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'year-desc') return (parseInt(b.year) || 0) - (parseInt(a.year) || 0);
      if (sortBy === 'in-stock') return (a.isSold ? 1 : 0) - (b.isSold ? 1 : 0);
      return 0;
    });
  }, [products, selectedBrand, availability, selectedDiameter, selectedMovement, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedBrand('ALL');
    setAvailability('all');
    setSelectedDiameter('ALL');
    setSelectedMovement('ALL');
    setMaxPrice(15000);
    setSortBy('default');
  };

  const hasActiveFilters = selectedBrand !== 'ALL' || availability !== 'all' || selectedDiameter !== 'ALL' || selectedMovement !== 'ALL' || maxPrice < 15000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Title & Description */}
      <div className="border-b border-obsidian-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-brass-400 font-semibold">Catalogue de la Maison</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal mt-1">
            Garde-Temps & Pièces de Collection
          </h1>
          <p className="text-xs sm:text-sm text-sand mt-2 max-w-xl">
            Découvrez nos montres sélectionnées, photographiées sous tous les angles, contrôlées en atelier et garanties 12 mois.
          </p>
        </div>

        {/* Sort & Mobile filter trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden px-4 py-2 bg-obsidian-900 border border-obsidian-700 text-ivory-100 text-xs flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-brass-400" />
            Filtres
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-obsidian-900 border border-obsidian-700 text-ivory-100 px-3 py-2 text-xs focus:border-brass-400 focus:outline-none"
          >
            <option value="default">Tri : Sélection par défaut</option>
            <option value="in-stock">En stock en premier</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="year-desc">Année (plus récente)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Sidebar Filters */}
        <aside className={`md:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden md:block'} bg-obsidian-900/60 p-6 border border-obsidian-800 text-xs`}>
          <div className="flex items-center justify-between pb-3 border-b border-obsidian-800">
            <span className="font-serif text-sm uppercase tracking-wider text-ivory-100 font-semibold flex items-center gap-2">
              <Filter className="w-4 h-4 text-brass-400" />
              Filtres
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-brass-400 hover:text-brass-300 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Réinitialiser
              </button>
            )}
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-sand font-semibold block">Disponibilité</label>
            <div className="space-y-1.5">
              {[
                { id: 'all', label: 'Toutes les montres' },
                { id: 'instock', label: 'En stock disponible' },
                { id: 'sold', label: 'Pièces d’archive (Vendues)' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setAvailability(opt.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded transition-colors flex items-center justify-between ${
                    availability === opt.id ? 'bg-obsidian-800 text-brass-400 font-semibold' : 'text-sand hover:text-ivory-100'
                  }`}
                >
                  <span>{opt.label}</span>
                  {availability === opt.id && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="space-y-2 pt-3 border-t border-obsidian-800/80">
            <label className="text-[10px] uppercase tracking-wider text-sand font-semibold block">Manufacture / Marque</label>
            <div className="space-y-1">
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`w-full text-left px-2.5 py-1.5 rounded transition-colors flex items-center justify-between ${
                    selectedBrand === brand ? 'bg-obsidian-800 text-brass-400 font-semibold' : 'text-sand hover:text-ivory-100'
                  }`}
                >
                  <span>{brand === 'ALL' ? 'Toutes les marques' : brand}</span>
                  {selectedBrand === brand && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2 pt-3 border-t border-obsidian-800/80">
            <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-sand font-semibold">
              <span>Budget maximum</span>
              <span className="text-ivory-100 font-serif font-bold text-xs">{maxPrice.toLocaleString('fr-FR')} €</span>
            </div>
            <input
              type="range"
              min="1000"
              max="15000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brass-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-sand/60">
              <span>1 000 €</span>
              <span>15 000 €+</span>
            </div>
          </div>

          {/* Movement */}
          <div className="space-y-2 pt-3 border-t border-obsidian-800/80">
            <label className="text-[10px] uppercase tracking-wider text-sand font-semibold block">Mouvement</label>
            <div className="space-y-1">
              {movements.map(mvt => (
                <button
                  key={mvt}
                  onClick={() => setSelectedMovement(mvt)}
                  className={`w-full text-left px-2.5 py-1.5 rounded transition-colors flex items-center justify-between ${
                    selectedMovement === mvt ? 'bg-obsidian-800 text-brass-400 font-semibold' : 'text-sand hover:text-ivory-100'
                  }`}
                >
                  <span>{mvt === 'ALL' ? 'Tous les calibres' : mvt}</span>
                  {selectedMovement === mvt && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Diameter */}
          <div className="space-y-2 pt-3 border-t border-obsidian-800/80">
            <label className="text-[10px] uppercase tracking-wider text-sand font-semibold block">Diamètre de boîte</label>
            <div className="flex flex-wrap gap-1.5">
              {diameters.map(diam => (
                <button
                  key={diam}
                  onClick={() => setSelectedDiameter(diam)}
                  className={`px-2 py-1 text-[11px] border transition-colors ${
                    selectedDiameter === diam
                      ? 'border-brass-400 bg-obsidian-800 text-brass-300 font-bold'
                      : 'border-obsidian-700 bg-obsidian-950 text-sand hover:text-ivory-100'
                  }`}
                >
                  {diam === 'ALL' ? 'Tous' : diam}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* Product Grid */}
        <main className="md:col-span-9 space-y-6">
          <div className="flex items-center justify-between text-xs text-sand">
            <span>
              Affichage de <strong className="text-ivory-100">{filteredProducts.length}</strong> garde-temps
            </span>
            {hasActiveFilters && (
              <span className="text-brass-400">Filtres personnalisés actifs</span>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center border border-obsidian-800 bg-obsidian-900/40 p-8 space-y-4">
              <p className="font-serif text-lg text-ivory-100">Aucune pièce ne correspond précisément à ces critères.</p>
              <p className="text-xs text-sand max-w-md mx-auto">
                Modifiez vos filtres ou sollicitez notre service de sourcing sur-mesure pour trouver votre référence idéale.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-brass-500 hover:bg-brass-400 text-obsidian-950 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
