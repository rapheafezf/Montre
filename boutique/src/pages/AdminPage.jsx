import React, { useState, useEffect } from 'react';
import { 
  Lock, Unlock, ShieldCheck, Check, Clock, Package, DollarSign, 
  Plus, Edit3, Trash2, Eye, EyeOff, Search, Filter, RefreshCw, 
  Download, ArrowLeft, CheckCircle2, AlertCircle, ShoppingBag, 
  Calendar, MessageCircle, Settings, X, ExternalLink, SlidersHorizontal 
} from 'lucide-react';
import HorlogerieMechanismSvg from '../components/HorlogerieMechanismSvg';
import { PRODUCTS } from '../data/products';

// Safe image helper
const getImageUrl = (url, width = 400) => {
  if (!url) return '';
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}width=${width}`;
};

export default function AdminPage({ 
  products, 
  onUpdateProducts, 
  navigateTo, 
  onSelectProduct 
}) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('lemouvement_admin_session') === '3105';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState('catalog');

  // Catalog Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBrand, setFilterBrand] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Edit / Add Watch Modal State
  const [editingProduct, setEditingProduct] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [formData, setFormData] = useState({});
  const [notification, setNotification] = useState(null);

  // Orders, Showroom & Leads state (stored in localStorage)
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('lemouvement_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'CMD-2026-084',
        date: '06/10/2026',
        clientName: 'Alexandre de Montmirail',
        clientEmail: 'a.montmirail@collection.fr',
        clientPhone: '+33 6 12 34 56 78',
        watchTitle: 'Rolex Datejust 16234 Cadran Argent',
        amount: 5900,
        paymentMethod: 'Alma 3x (1 966 €/mois)',
        deliveryType: 'Valeur Déclarée Sécurisée 48h',
        status: 'En préparation atelier',
        trackingNumber: 'FD-7492-FR'
      },
      {
        id: 'CMD-2026-083',
        date: '04/10/2026',
        clientName: 'Jean-Christophe Bernard',
        clientEmail: 'jc.bernard@lux.com',
        clientPhone: '+33 6 98 76 54 32',
        watchTitle: 'Cartier Santos Galbée 1564',
        amount: 3850,
        paymentMethod: 'Virement Bancaire SEPA',
        deliveryType: 'Retrait Showroom Lyon',
        status: 'Paiement Reçu - En attente essayage',
        trackingNumber: 'SHOWROOM-LYON'
      }
    ];
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('lemouvement_appointments');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'RDV-101',
        date: '08/10/2026 à 14h30',
        clientName: 'Dr. Laurent Vaneck',
        clientPhone: '+33 6 44 22 11 00',
        clientEmail: 'l.vaneck@cabinet-lyon.fr',
        watchInterest: 'Rolex Oyster Precision 6694',
        status: 'Confirmé'
      },
      {
        id: 'RDV-102',
        date: '10/10/2026 à 11h00',
        clientName: 'Marc Alcantara',
        clientPhone: '+33 7 88 99 00 11',
        clientEmail: 'm.alcantara@geneva.ch',
        watchInterest: 'Tudor Prince Oysterdate 74000',
        status: 'À rappeler'
      }
    ];
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('lemouvement_site_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      bannerText: 'Expédition sécurisée sous 48h en valeur déclarée • Showroom privé région lyonnaise',
      whatsappNumber: '+33 7 56 99 89 76',
      contactEmail: 'contact@lemouvement-watches.fr',
      showroomAddress: '2 Rue du Magnolia, 69360 Communay (Région Lyonnaise)',
      warrantyMonths: '12'
    };
  });

  // Handle Login Authentication
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput.trim() === '3105') {
      setIsAuthenticated(true);
      sessionStorage.setItem('lemouvement_admin_session', '3105');
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('lemouvement_admin_session');
    navigateTo('home');
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Toggle Watch Status (In stock <-> Sold)
  const handleToggleSold = (watchId) => {
    const updated = products.map((p) => {
      if (p.id === watchId) {
        const nextStatus = !p.isSold;
        showNotification(`${p.title.trim()} est maintenant ${nextStatus ? 'MARQUÉE COMME VENDUE (ARCHIVE)' : 'REMISE EN STOCK DISPONIBLE'}`);
        return { ...p, isSold: nextStatus };
      }
      return p;
    });
    onUpdateProducts(updated);
  };

  // Open Edit Modal
  const handleStartEdit = (product) => {
    setIsCreatingNew(false);
    setEditingProduct(product);
    setFormData({
      ...product,
      imagesString: (product.images || []).join('\n')
    });
  };

  // Open Add New Watch Modal
  const handleStartCreate = () => {
    setIsCreatingNew(true);
    setEditingProduct(null);
    const newId = `montre-${Date.now()}`;
    setFormData({
      id: newId,
      slug: newId,
      title: '',
      brand: 'Rolex',
      price: 4500,
      priceFormatted: '4 500 €',
      isSold: false,
      year: '1995',
      diameter: '36 mm',
      movement: 'Automatique',
      materials: 'Acier & Or',
      dial: 'Argent soleillé d’origine',
      revision: 'Révisée en atelier 2024 • Garantie 12 mois',
      boxPapers: 'Écrin Le Mouvement & Certificat d’authenticité',
      description: 'Superbe exemplaire révisé et garanti 12 mois.',
      images: [
        'https://lemouvement-watches.fr/cdn/shop/files/DSC02450.jpg'
      ],
      featuredImage: 'https://lemouvement-watches.fr/cdn/shop/files/DSC02450.jpg',
      imagesString: 'https://lemouvement-watches.fr/cdn/shop/files/DSC02450.jpg'
    });
  };

  // Save Edit / Create Watch
  const handleSaveProduct = (e) => {
    e.preventDefault();
    const imagesList = formData.imagesString
      ? formData.imagesString.split('\n').map(s => s.trim()).filter(Boolean)
      : (formData.images || []);

    const productPayload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      priceFormatted: `${(parseFloat(formData.price) || 0).toLocaleString('fr-FR')} €`,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      images: imagesList.length > 0 ? imagesList : ['https://lemouvement-watches.fr/cdn/shop/files/DSC02450.jpg'],
      featuredImage: imagesList[0] || 'https://lemouvement-watches.fr/cdn/shop/files/DSC02450.jpg'
    };

    delete productPayload.imagesString;

    let updated;
    if (isCreatingNew) {
      updated = [productPayload, ...products];
      showNotification(`Nouvelle montre « ${productPayload.title} » ajoutée avec succès au catalogue.`);
    } else {
      updated = products.map(p => p.id === productPayload.id ? productPayload : p);
      showNotification(`Montre « ${productPayload.title} » mise à jour avec succès.`);
    }

    onUpdateProducts(updated);
    setEditingProduct(null);
    setIsCreatingNew(false);
  };

  // Delete Watch
  const handleDeleteProduct = (productId, title) => {
    if (window.confirm(`Confirmez-vous la suppression définitive de la montre : « ${title.trim()} » ?`)) {
      const updated = products.filter(p => p.id !== productId);
      onUpdateProducts(updated);
      showNotification(`La pièce a été retirée du catalogue.`);
    }
  };

  // Export JSON Backup
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `lemouvement-stock-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification("Fichier JSON de sauvegarde du catalogue téléchargé.");
  };

  // Reset to Factory Default
  const handleResetCatalog = () => {
    if (window.confirm("Voulez-vous rétablir le catalogue initial complet de la boutique ? Toutes vos modifications locales non exportées seront réinitialisées.")) {
      onUpdateProducts(PRODUCTS);
      showNotification("Catalogue réinitialisé à l'état d'origine.");
    }
  };

  // Save Settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('lemouvement_site_settings', JSON.stringify(settings));
    showNotification("Paramètres de la boutique mis à jour.");
  };

  // Stats computation
  const totalWatches = products.length;
  const inStockWatches = products.filter(p => !p.isSold);
  const soldWatches = products.filter(p => p.isSold);
  const stockValuation = inStockWatches.reduce((acc, p) => acc + (p.price || 0), 0);

  // Filtered List
  const filteredProducts = products.filter(p => {
    const matchesSearch = searchQuery === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.year && p.year.includes(searchQuery));
    const matchesBrand = filterBrand === 'ALL' || p.brand.toLowerCase() === filterBrand.toLowerCase();
    const matchesStatus = filterStatus === 'ALL' || 
      (filterStatus === 'instock' && !p.isSold) || 
      (filterStatus === 'sold' && p.isSold);
    return matchesSearch && matchesBrand && matchesStatus;
  });

  const uniqueBrands = ['ALL', ...Array.from(new Set(products.map(p => p.brand))).filter(Boolean)];

  // --- 1. LOGIN SCREEN (PIN: 3105) ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-radial-subtle">
        <div className="w-full max-w-md bg-obsidian-900 border border-brass-600/50 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-center space-y-6">
          
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-obsidian-950 border border-brass-500/40 flex items-center justify-center text-brass-400 shadow-xl">
              <Lock className="w-7 h-7" />
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brass-400 font-bold block">
              Espace Réservé • Direction Atelier
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-ivory-100 font-normal uppercase tracking-wide">
              Accès Administration
            </h1>
            <p className="text-xs text-sand/80 font-light leading-relaxed">
              Veuillez saisir votre code d'accès confidentiel pour déverrouiller la gestion du stock et du site.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="space-y-2">
              <input
                type="password"
                inputMode="numeric"
                autoFocus
                placeholder="Code d'accès PIN"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                className={`w-full py-3.5 px-4 bg-obsidian-950 border text-center text-xl tracking-[0.4em] font-mono text-ivory-100 focus:outline-none transition-colors ${
                  pinError 
                    ? 'border-red-500 focus:border-red-500 text-red-400' 
                    : 'border-obsidian-700 focus:border-brass-400'
                }`}
              />
              {pinError && (
                <div className="text-xs text-red-400 flex items-center justify-center gap-1.5 font-mono">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Code erroné. Accès strictement réservé.
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brass-500 hover:bg-brass-400 text-obsidian-950 text-xs font-mono uppercase tracking-[0.2em] font-bold shadow-xl transition-all cursor-pointer"
            >
              Déverrouiller l'Espace Direction
            </button>
          </form>

          <div className="pt-4 border-t border-obsidian-800 text-xs">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="text-sand/70 hover:text-ivory-100 flex items-center justify-center gap-1.5 mx-auto transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Retourner à la boutique publique
            </button>
          </div>

        </div>
      </div>
    );
  }

  // --- 2. AUTHENTICATED ADMIN DASHBOARD ---
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 select-none">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-brass-500 text-obsidian-950 font-mono text-xs px-4 py-3 shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <Check className="w-4 h-4 font-bold" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-obsidian-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-brass-400 font-bold">
              Session Authentifiée • Nyle Abderrahman
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl text-ivory-100 font-normal uppercase tracking-wide mt-1">
            Direction Atelier & Gestion du Site
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="px-4 py-2 bg-obsidian-900 hover:bg-obsidian-850 text-ivory-100 border border-obsidian-700 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-brass-400" />
            Voir Boutique Publique
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/60 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            Verrouiller & Déconnexion
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-obsidian-900 border border-obsidian-800 space-y-1">
          <div className="text-[10px] font-mono text-sand uppercase tracking-wider">Total Catalogue</div>
          <div className="font-serif text-2xl text-ivory-100 font-semibold">{totalWatches} pièces</div>
          <div className="text-[10px] text-brass-400 font-mono">{inStockWatches.length} disponibles • {soldWatches.length} archives</div>
        </div>

        <div className="p-4 bg-obsidian-900 border border-obsidian-800 space-y-1">
          <div className="text-[10px] font-mono text-sand uppercase tracking-wider">Valeur Stock en Vente</div>
          <div className="font-serif text-2xl text-ivory-100 font-semibold">{stockValuation.toLocaleString('fr-FR')} €</div>
          <div className="text-[10px] text-emerald-400 font-mono">Marché certifié révisé</div>
        </div>

        <div className="p-4 bg-obsidian-900 border border-obsidian-800 space-y-1">
          <div className="text-[10px] font-mono text-sand uppercase tracking-wider">Commandes & Ventes</div>
          <div className="font-serif text-2xl text-ivory-100 font-semibold">{orders.length} dossiers</div>
          <div className="text-[10px] text-brass-400 font-mono">Paiements CB / Alma / Virement</div>
        </div>

        <div className="p-4 bg-obsidian-900 border border-obsidian-800 space-y-1">
          <div className="text-[10px] font-mono text-sand uppercase tracking-wider">Rendez-vous Showroom</div>
          <div className="font-serif text-2xl text-ivory-100 font-semibold">{appointments.length} séances</div>
          <div className="text-[10px] text-sand/80 font-mono">Communay / Région Lyonnaise</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-obsidian-800 overflow-x-auto text-xs font-mono uppercase tracking-wider gap-1">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-5 py-3 border-b-2 font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'catalog' 
              ? 'border-brass-400 text-brass-400 bg-obsidian-900/60' 
              : 'border-transparent text-sand hover:text-ivory-100'
          }`}
        >
          <Package className="w-4 h-4" />
          Catalogue Montres ({totalWatches})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-3 border-b-2 font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'orders' 
              ? 'border-brass-400 text-brass-400 bg-obsidian-900/60' 
              : 'border-transparent text-sand hover:text-ivory-100'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Commandes ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-5 py-3 border-b-2 font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'appointments' 
              ? 'border-brass-400 text-brass-400 bg-obsidian-900/60' 
              : 'border-transparent text-sand hover:text-ivory-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Showroom Privé ({appointments.length})
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-5 py-3 border-b-2 font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'settings' 
              ? 'border-brass-400 text-brass-400 bg-obsidian-900/60' 
              : 'border-transparent text-sand hover:text-ivory-100'
          }`}
        >
          <Settings className="w-4 h-4" />
          Paramètres du Site
        </button>
      </div>

      {/* --- TAB 1: CATALOG MANAGEMENT --- */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          
          {/* Action & Filter Toolbar */}
          <div className="p-4 bg-obsidian-900 border border-obsidian-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search & Filters */}
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <div className="relative min-w-[220px] flex-1">
                <Search className="w-4 h-4 text-sand absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher par modèle, marque, millésime..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-obsidian-950 border border-obsidian-750 text-xs text-ivory-100 focus:outline-none focus:border-brass-400"
                />
              </div>

              <select
                value={filterBrand}
                onChange={(e) => setFilterBrand(e.target.value)}
                className="py-2 px-3 bg-obsidian-950 border border-obsidian-750 text-xs text-ivory-100 focus:outline-none font-mono"
              >
                {uniqueBrands.map(b => (
                  <option key={b} value={b}>{b === 'ALL' ? 'Toutes les marques' : b}</option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="py-2 px-3 bg-obsidian-950 border border-obsidian-750 text-xs text-ivory-100 focus:outline-none font-mono"
              >
                <option value="ALL">Tous les statuts</option>
                <option value="instock">En stock uniquement</option>
                <option value="sold">Archives vendues</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleStartCreate}
                className="px-4 py-2 bg-brass-500 hover:bg-brass-400 text-obsidian-950 text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Ajouter une Montre
              </button>

              <button
                type="button"
                onClick={handleExportJson}
                className="p-2 bg-obsidian-950 hover:bg-obsidian-850 text-sand hover:text-ivory-100 border border-obsidian-750 text-xs cursor-pointer"
                title="Exporter sauvegarde JSON"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleResetCatalog}
                className="p-2 bg-obsidian-950 hover:bg-obsidian-850 text-sand hover:text-amber-400 border border-obsidian-750 text-xs cursor-pointer"
                title="Rétablir catalogue usine initial"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Watches Table */}
          <div className="border border-obsidian-800 bg-obsidian-900/40 overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-obsidian-800">
              <thead className="bg-obsidian-900 text-sand font-mono uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Visuel</th>
                  <th className="py-3 px-4">Garde-Temps & Référence</th>
                  <th className="py-3 px-4">Marque</th>
                  <th className="py-3 px-4">Prix (€)</th>
                  <th className="py-3 px-4">Année / Diamètre</th>
                  <th className="py-3 px-4 text-center">Statut de Vente</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-obsidian-850">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-obsidian-850/60 transition-colors">
                    {/* Thumbnail */}
                    <td className="py-2.5 px-4 w-16">
                      <div className="w-12 h-14 bg-obsidian-950 border border-obsidian-800 overflow-hidden">
                        <img
                          src={getImageUrl(p.images?.[0] || p.featuredImage, 100)}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Title */}
                    <td className="py-2.5 px-4">
                      <div className="font-serif text-sm text-ivory-100 font-medium">
                        {p.title.trim()}
                      </div>
                      <div className="text-[11px] text-sand/70 font-mono mt-0.5">
                        {p.movement || 'Calibre mécanique'} • {p.materials || 'Acier'}
                      </div>
                    </td>

                    {/* Brand */}
                    <td className="py-2.5 px-4 font-mono font-semibold text-brass-400">
                      {p.brand}
                    </td>

                    {/* Price */}
                    <td className="py-2.5 px-4 font-serif text-sm font-semibold text-ivory-100">
                      {p.price > 0 ? `${p.price.toLocaleString('fr-FR')} €` : 'Sur demande'}
                    </td>

                    {/* Year / Specs */}
                    <td className="py-2.5 px-4 font-mono text-[11px] text-sand">
                      {p.year ? `Millésime ${p.year}` : 'Vintage'} • {p.diameter || 'Standard'}
                    </td>

                    {/* In-stock / Sold 1-click Toggle Switch */}
                    <td className="py-2.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleSold(p.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-mono uppercase tracking-wider font-bold transition-all cursor-pointer ${
                          p.isSold 
                            ? 'bg-obsidian-950 text-sand/70 border border-obsidian-750 hover:bg-emerald-950/60 hover:text-emerald-300 hover:border-emerald-500' 
                            : 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/50 hover:bg-obsidian-950 hover:text-sand/70 hover:border-obsidian-700'
                        }`}
                        title={p.isSold ? "Cliquer pour remettre en stock disponible" : "Cliquer pour marquer comme vendue"}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${p.isSold ? 'bg-sand/40' : 'bg-emerald-400 animate-pulse'}`} />
                        {p.isSold ? 'Archive Vendue' : 'En Stock (Vente)'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-2.5 px-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(p)}
                        className="p-1.5 bg-obsidian-800 hover:bg-brass-500 hover:text-obsidian-950 text-ivory-200 transition-colors border border-obsidian-700"
                        title="Modifier cette montre"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(p.id, p.title)}
                        className="p-1.5 bg-obsidian-800 hover:bg-red-600 hover:text-white text-sand transition-colors border border-obsidian-700"
                        title="Supprimer du catalogue"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-right text-[11px] font-mono text-sand/60">
            Affichage de {filteredProducts.length} sur {products.length} montres
          </div>

        </div>
      )}

      {/* --- TAB 2: ORDERS & SALES --- */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="p-4 bg-obsidian-900 border border-obsidian-800 flex justify-between items-center text-xs">
            <span className="font-mono text-brass-400 uppercase tracking-wider font-semibold">
              Historique des Commandes & Factures
            </span>
            <span className="text-sand/70 font-mono">
              Total facturé : {orders.reduce((acc, o) => acc + o.amount, 0).toLocaleString('fr-FR')} €
            </span>
          </div>

          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="p-5 bg-obsidian-900/60 border border-obsidian-800 flex flex-col md:flex-row justify-between gap-4 text-xs">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-brass-400 text-sm">{o.id}</span>
                    <span className="text-sand font-mono">{o.date}</span>
                    <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-[10px]">
                      {o.status}
                    </span>
                  </div>
                  <div className="font-serif text-base text-ivory-100 font-medium">
                    {o.watchTitle}
                  </div>
                  <div className="text-sand leading-relaxed">
                    Client : <strong className="text-ivory-200">{o.clientName}</strong> • {o.clientEmail} • {o.clientPhone}
                  </div>
                </div>

                <div className="text-right space-y-1 md:self-center">
                  <div className="font-serif text-xl font-bold text-ivory-100">
                    {o.amount.toLocaleString('fr-FR')} €
                  </div>
                  <div className="text-[11px] text-brass-400 font-mono">
                    {o.paymentMethod}
                  </div>
                  <div className="text-[10px] text-sand/70 font-mono">
                    Expédition : {o.trackingNumber}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 3: SHOWROOM APPOINTMENTS --- */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          <div className="p-4 bg-obsidian-900 border border-obsidian-800 flex justify-between items-center text-xs">
            <span className="font-mono text-brass-400 uppercase tracking-wider font-semibold">
              Demandes de Rendez-vous au Showroom de Communay (Lyon)
            </span>
            <span className="text-sand/70 font-mono">
              {appointments.length} séances planifiées
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map((a) => (
              <div key={a.id} className="p-5 bg-obsidian-900/60 border border-obsidian-800 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-brass-400">{a.id}</span>
                  <span className="px-2 py-0.5 bg-obsidian-950 border border-brass-600/30 text-brass-300 font-mono text-[10px]">
                    {a.status}
                  </span>
                </div>
                <div>
                  <div className="font-serif text-base text-ivory-100">{a.clientName}</div>
                  <div className="text-sand font-mono text-[11px] mt-0.5">{a.clientPhone} • {a.clientEmail}</div>
                </div>
                <div className="p-2.5 bg-obsidian-950 border border-obsidian-850 space-y-1">
                  <div className="text-sand/70 text-[10px] font-mono uppercase">Date & Heure :</div>
                  <div className="text-ivory-100 font-semibold">{a.date}</div>
                  <div className="text-sand/70 text-[10px] font-mono uppercase pt-1">Montre ciblée :</div>
                  <div className="text-brass-300 font-serif">{a.watchInterest}</div>
                </div>
                <div className="flex gap-2 pt-1">
                  <a
                    href={`https://wa.me/${a.clientPhone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-600/40 text-emerald-300 text-center font-mono text-[11px] flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Contacter WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 4: SITE SETTINGS --- */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="p-6 bg-obsidian-900 border border-obsidian-800 max-w-2xl space-y-5 text-xs">
          <div className="border-b border-obsidian-800 pb-3">
            <h3 className="font-serif text-lg text-ivory-100 font-normal uppercase">
              Configuration de la Maison
            </h3>
            <p className="text-sand/80 text-[11px]">
              Modifiez les coordonnées publiques affichées sur l'ensemble de la boutique.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-sand font-mono uppercase text-[10px]">Bandeau d'Annonce Supérieur :</label>
            <input
              type="text"
              value={settings.bannerText}
              onChange={(e) => setSettings({ ...settings, bannerText: e.target.value })}
              className="w-full p-2.5 bg-obsidian-950 border border-obsidian-750 text-ivory-100 focus:outline-none focus:border-brass-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sand font-mono uppercase text-[10px]">Téléphone & WhatsApp Conciergerie :</label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full p-2.5 bg-obsidian-950 border border-obsidian-750 text-ivory-100 focus:outline-none focus:border-brass-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sand font-mono uppercase text-[10px]">Email Officiel :</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full p-2.5 bg-obsidian-950 border border-obsidian-750 text-ivory-100 focus:outline-none focus:border-brass-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sand font-mono uppercase text-[10px]">Adresse du Showroom Privé :</label>
            <input
              type="text"
              value={settings.showroomAddress}
              onChange={(e) => setSettings({ ...settings, showroomAddress: e.target.value })}
              className="w-full p-2.5 bg-obsidian-950 border border-obsidian-750 text-ivory-100 focus:outline-none focus:border-brass-400"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-brass-500 hover:bg-brass-400 text-obsidian-950 font-mono text-xs uppercase tracking-wider font-bold shadow-lg transition-all cursor-pointer"
          >
            Enregistrer les Paramètres
          </button>
        </form>
      )}

      {/* --- MODAL: EDIT OR ADD WATCH --- */}
      {(editingProduct || isCreatingNew) && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-obsidian-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-obsidian-900 border border-brass-600/60 p-6 sm:p-8 shadow-2xl my-8 text-xs space-y-6">
            
            <button
              onClick={() => {
                setEditingProduct(null);
                setIsCreatingNew(false);
              }}
              className="absolute top-5 right-5 text-sand hover:text-ivory-100 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-obsidian-800 pb-3">
              <span className="text-[10px] font-mono text-brass-400 uppercase tracking-widest font-bold">
                {isCreatingNew ? 'Nouveau Garde-Temps' : 'Modification Fiche Horlogère'}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl text-ivory-100 uppercase tracking-wide mt-1">
                {isCreatingNew ? 'Ajouter une pièce au catalogue' : formData.title}
              </h2>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              
              {/* Row 1: Title & Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-sand font-mono uppercase text-[10px]">Titre / Modèle :</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Rolex Datejust 16014 Cadran Lin"
                    className="w-full p-2.5 bg-obsidian-950 border border-obsidian-750 text-ivory-100 focus:outline-none focus:border-brass-400 font-serif"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sand font-mono uppercase text-[10px]">Manufacture / Marque :</label>
                  <select
                    value={formData.brand || 'Rolex'}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full p-2.5 bg-obsidian-950 border border-obsidian-750 text-ivory-100 focus:outline-none focus:border-brass-400 font-mono"
                  >
                    <option value="Rolex">Rolex</option>
                    <option value="Cartier">Cartier</option>
                    <option value="Tudor">Tudor</option>
                    <option value="Omega">Omega</option>
                    <option value="TAG Heuer">TAG Heuer</option>
                    <option value="Patek Philippe">Patek Philippe</option>
                    <option value="Audemars Piguet">Audemars Piguet</option>
                    <option value="Jaeger-LeCoultre">Jaeger-LeCoultre</option>
                    <option value="Autre">Autre Manufacture</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Price & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-sand font-mono uppercase text-[10px]">Prix (€) :</label>
                  <input
                    type="number"
                    required
                    value={formData.price || 0}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-2.5 bg-obsidian-950 border border-obsidian-750 text-ivory-100 focus:outline-none focus:border-brass-400 font-mono font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sand font-mono uppercase text-[10px]">Statut Stock :</label>
                  <select
                    value={formData.isSold ? 'sold' : 'instock'}
                    onChange={(e) => setFormData({ ...formData, isSold: e.target.value === 'sold' })}
                    className="w-full p-2.5 bg-obsidian-950 border border-obsidian-750 text-ivory-100 focus:outline-none focus:border-brass-400 font-mono"
                  >
                    <option value="instock">🟢 En Stock (Disponible à la vente)</option>
                    <option value="sold">⚪ Archive Vendue</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sand font-mono uppercase text-[10px]">Millésime / Année :</label>
                  <input
                    type="text"
                    value={formData.year || ''}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="Ex: 1989"
                    className="w-full p-2.5 bg-obsidian-950 border border-obsidian-750 text-ivory-100 focus:outline-none focus:border-brass-400 font-mono"
                  />
                </div>
              </div>

              {/* Row 3: Technical Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-sand font-mono uppercase text-[10px]">Diamètre de boîte :</label>
                  <input
                    type="text"
                    value={formData.diameter || ''}
                    onChange={(e) => setFormData({ ...formData, diameter: e.target.value })}
                    placeholder="Ex: 36 mm"
                    className="w-full p-2.5 bg-obsidian-950 border border-obsidian-750 text-ivory-100 focus:outline-none focus:border-brass-400 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sand font-mono uppercase text-[10px]">Mouvement / Calibre :</label>
                  <input
                    type="text"
                    value={formData.movement || ''}
                    onChange={(e) => setFormData({ ...formData, movement: e.target.value })}
                    placeholder="Ex: Automatique Calibre 3135"
                    className="w-full p-2.5 bg-obsidian-950 border border-obsidian-750 text-ivory-100 focus:outline-none focus:border-brass-400 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sand font-mono uppercase text-[10px]">Cadran :</label>
                  <input
                    type="text"
                    value={formData.dial || ''}
                    onChange={(e) => setFormData({ ...formData, dial: e.target.value })}
                    placeholder="Ex: Argent soleillé d'origine"
                    className="w-full p-2.5 bg-obsidian-950 border border-obsidian-750 text-ivory-100 focus:outline-none focus:border-brass-400"
                  />
                </div>
              </div>

              {/* Row 4: Materials & Box/Papers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sand font-mono uppercase text-[10px]">Matière & Boîtier :</label>
                  <input
                    type="text"
                    value={formData.materials || ''}
                    onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                    placeholder="Ex: Acier 904L & Lunette or blanc"
                    className="w-full p-2.5 bg-obsidian-950 border border-obsidian-750 text-ivory-100 focus:outline-none focus:border-brass-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sand font-mono uppercase text-[10px]">Écrin & Documents :</label>
                  <input
                    type="text"
                    value={formData.boxPapers || ''}
                    onChange={(e) => setFormData({ ...formData, boxPapers: e.target.value })}
                    placeholder="Ex: Boîte et papiers d’origine"
                    className="w-full p-2.5 bg-obsidian-950 border border-obsidian-750 text-ivory-100 focus:outline-none focus:border-brass-400"
                  />
                </div>
              </div>

              {/* Photos URLs */}
              <div className="space-y-1">
                <label className="text-sand font-mono uppercase text-[10px]">
                  URLs des photographies (1 lien par ligne) :
                </label>
                <textarea
                  rows={3}
                  value={formData.imagesString || ''}
                  onChange={(e) => setFormData({ ...formData, imagesString: e.target.value })}
                  placeholder="https://...jpg"
                  className="w-full p-2.5 bg-obsidian-950 border border-obsidian-750 text-ivory-100 font-mono text-[11px] focus:outline-none focus:border-brass-400"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-sand font-mono uppercase text-[10px]">Description & Histoire :</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 bg-obsidian-950 border border-obsidian-750 text-ivory-100 text-xs focus:outline-none focus:border-brass-400 leading-relaxed font-light"
                />
              </div>

              {/* Form Buttons */}
              <div className="pt-3 border-t border-obsidian-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsCreatingNew(false);
                  }}
                  className="px-5 py-2.5 bg-obsidian-950 border border-obsidian-750 text-sand hover:text-ivory-100 text-xs font-mono uppercase cursor-pointer"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brass-500 hover:bg-brass-400 text-obsidian-950 font-mono text-xs uppercase tracking-wider font-bold shadow-xl transition-all cursor-pointer"
                >
                  {isCreatingNew ? 'Publier la Montre au Catalogue' : 'Enregistrer les Modifications'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
