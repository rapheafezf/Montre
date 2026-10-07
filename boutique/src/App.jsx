import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ShowroomModal from './components/ShowroomModal';
import SearchModal from './components/SearchModal';
import CookieBanner from './components/CookieBanner';

import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SellWatchPage from './pages/SellWatchPage';
import SourcingPage from './pages/SourcingPage';
import AboutPage from './pages/AboutPage';
import TrustPage from './pages/TrustPage';
import ShowroomPage from './pages/ShowroomPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import DeliveryReturnsPage from './pages/DeliveryReturnsPage';
import JournalPage from './pages/JournalPage';
import LegalPage from './pages/LegalPage';
import AdminPage from './pages/AdminPage';
import useLenisSmoothScroll from './hooks/useLenisSmoothScroll';

import FontPairingModal, { FONT_PAIRINGS } from './components/FontPairingModal';
import { PRODUCTS } from './data/products';
import { MessageCircle } from 'lucide-react';

export default function App() {
  // Activate Cominvi-style momentum smooth scroll engine
  useLenisSmoothScroll();

  const [route, setRoute] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [showroomOpen, setShowroomOpen] = useState(false);
  const [showroomWatch, setShowroomWatch] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Studio Theme State: 'dark' (Fond Noir) | 'light' (Fond Blanc)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('lemouvement_theme') || 'dark';
  });

  const handleToggleTheme = (specificTheme) => {
    const nextTheme = specificTheme || (theme === 'dark' ? 'light' : 'dark');
    setTheme(nextTheme);
    try {
      localStorage.setItem('lemouvement_theme', nextTheme);
    } catch (e) {
      console.error('Failed to save theme preference:', e);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // 10 SOTA Haute Horlogerie Font Pairings State
  const [fontPairing, setFontPairing] = useState(() => {
    return localStorage.getItem('lemouvement_font_pairing') || 'manufacture-royale';
  });
  const [fontModalOpen, setFontModalOpen] = useState(false);

  const handleSelectFontPairing = (pairingId) => {
    setFontPairing(pairingId);
    try {
      localStorage.setItem('lemouvement_font_pairing', pairingId);
    } catch (e) {
      console.error('Failed to save font pairing:', e);
    }
  };

  const handleCycleFontPairing = (direction = 1) => {
    const currentIndex = FONT_PAIRINGS.findIndex(p => p.id === fontPairing);
    const safeIndex = currentIndex >= 0 ? currentIndex : 0;
    const nextIndex = (safeIndex + direction + FONT_PAIRINGS.length) % FONT_PAIRINGS.length;
    handleSelectFontPairing(FONT_PAIRINGS[nextIndex].id);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-font-pairing', fontPairing);
  }, [fontPairing]);

  // Reactive products catalog state synced with localStorage
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('lemouvement_custom_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Error loading custom products:', e);
      }
    }
    return PRODUCTS;
  });

  const handleUpdateProducts = (newProducts) => {
    setProducts(newProducts);
    try {
      localStorage.setItem('lemouvement_custom_products', JSON.stringify(newProducts));
    } catch (e) {
      console.error('Failed to save products to localStorage:', e);
    }
    if (selectedProduct) {
      const updatedCurrent = newProducts.find(p => p.id === selectedProduct.id);
      if (updatedCurrent) setSelectedProduct(updatedCurrent);
    }
  };

  // Helper to extract route from current URL (pathname or hash)
  const getRouteInfo = (productsList) => {
    // 1. Check pathname: e.g. /admin, /catalogue, /produit/rolex-16234
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
    // 2. Fallback to hash if pathname is empty (e.g. #/admin)
    const hash = window.location.hash.replace(/^#\/?/, '');
    const target = path || hash || '';

    if (!target || target === '') {
      return { route: 'home', product: null };
    }
    if (target === 'admin') {
      return { route: 'admin', product: null };
    }
    if (target.startsWith('produit/')) {
      const slug = target.replace('produit/', '');
      const found = productsList.find(p => p.slug === slug || p.id === slug);
      if (found) {
        return { route: 'produit', product: found };
      }
      return { route: 'catalogue', product: null };
    }
    return { route: target, product: null };
  };

  // Sync routing on load and on back/forward browser navigation
  useEffect(() => {
    const handleUrlSync = () => {
      const { route: newRoute, product } = getRouteInfo(products);
      setRoute(newRoute);
      if (product) setSelectedProduct(product);

      // Clean up hash in address bar to clean pathname if hash was used
      if (window.location.hash) {
        const cleanPath = newRoute === 'home' 
          ? '/' 
          : newRoute === 'produit' && product 
            ? `/produit/${product.slug}` 
            : `/${newRoute}`;
        window.history.replaceState(null, '', cleanPath);
      }
    };

    handleUrlSync();
    window.addEventListener('popstate', handleUrlSync);
    window.addEventListener('hashchange', handleUrlSync);
    return () => {
      window.removeEventListener('popstate', handleUrlSync);
      window.removeEventListener('hashchange', handleUrlSync);
    };
  }, [products]);

  const navigateTo = (newRoute) => {
    const cleanPath = newRoute === 'home' ? '/' : `/${newRoute}`;
    if (window.location.pathname !== cleanPath) {
      window.history.pushState(null, '', cleanPath);
    }
    if (window.location.hash) {
      window.history.replaceState(null, '', cleanPath);
    }
    setRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    const cleanPath = `/produit/${product.slug}`;
    if (window.location.pathname !== cleanPath) {
      window.history.pushState(null, '', cleanPath);
    }
    if (window.location.hash) {
      window.history.replaceState(null, '', cleanPath);
    }
    setRoute('produit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (product) => {
    if (!cart.some(item => item.id === product.id)) {
      setCart([...cart, product]);
    }
    setCartOpen(true);
  };

  const handleBuyNow = (product) => {
    if (!cart.some(item => item.id === product.id)) {
      setCart([...cart, product]);
    }
    setCheckoutOpen(true);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleProceedToCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleOpenShowroom = (watch = null) => {
    setShowroomWatch(watch);
    setShowroomOpen(true);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-ivory-100 flex flex-col font-sans selection:bg-brass-500 selection:text-obsidian-950">
      
      {/* Global Header */}
      <Header
        currentRoute={route}
        navigateTo={navigateTo}
        cartCount={cart.length}
        openCart={() => setCartOpen(true)}
        openShowroomModal={() => handleOpenShowroom()}
        openSearchModal={() => setSearchOpen(true)}
        theme={theme}
        toggleTheme={handleToggleTheme}
        fontPairing={fontPairing}
        onCycleFontPairing={handleCycleFontPairing}
        onOpenFontModal={() => setFontModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {route === 'home' && (
          <HomePage
            products={products}
            onSelectProduct={handleSelectProduct}
            navigateTo={navigateTo}
            openShowroomModal={() => handleOpenShowroom()}
            theme={theme}
            toggleTheme={handleToggleTheme}
            fontPairing={fontPairing}
            onCycleFontPairing={handleCycleFontPairing}
            onOpenFontModal={() => setFontModalOpen(true)}
          />
        )}

        {route === 'catalogue' && (
          <CatalogPage
            products={products}
            initialBrand="ALL"
            onSelectProduct={handleSelectProduct}
          />
        )}

        {route === 'catalogue-rolex' && (
          <CatalogPage
            products={products}
            initialBrand="Rolex"
            onSelectProduct={handleSelectProduct}
          />
        )}

        {route === 'catalogue-cartier' && (
          <CatalogPage
            products={products}
            initialBrand="Cartier"
            onSelectProduct={handleSelectProduct}
          />
        )}

        {route === 'catalogue-tudor' && (
          <CatalogPage
            products={products}
            initialBrand="Tudor"
            onSelectProduct={handleSelectProduct}
          />
        )}

        {route === 'catalogue-dispo' && (
          <CatalogPage
            products={products}
            initialFilter="dispo"
            onSelectProduct={handleSelectProduct}
          />
        )}

        {route === 'catalogue-archives' && (
          <CatalogPage
            products={products}
            initialFilter="archives"
            onSelectProduct={handleSelectProduct}
          />
        )}

        {route === 'produit' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={products}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onOpenShowroom={handleOpenShowroom}
            onSelectProduct={handleSelectProduct}
            navigateTo={navigateTo}
          />
        )}

        {route === 'admin' && (
          <AdminPage
            products={products}
            onUpdateProducts={handleUpdateProducts}
            navigateTo={navigateTo}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {route === 'vendre' && <SellWatchPage />}
        {route === 'sourcing' && <SourcingPage />}
        {route === 'a-propos' && <AboutPage navigateTo={navigateTo} openShowroomModal={() => handleOpenShowroom()} />}
        {route === 'authenticite' && <TrustPage navigateTo={navigateTo} />}
        {route === 'showroom' && <ShowroomPage openShowroomModal={() => handleOpenShowroom()} />}
        {route === 'faq' && <FaqPage />}
        {route === 'contact' && <ContactPage />}
        {route === 'livraison-retours' && <DeliveryReturnsPage />}
        {route === 'journal' && <JournalPage />}
        {route === 'cgv' && <LegalPage initialTab="cgv" />}
        {route === 'mentions-legales' && <LegalPage initialTab="mentions" />}
        {route === 'rgpd' && <LegalPage initialTab="rgpd" />}
      </main>

      {/* Global Footer */}
      <Footer navigateTo={navigateTo} />

      {/* Slide-in Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* One-Page Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cart}
        onOrderCompleted={() => setCart([])}
      />

      {/* Showroom Private Appointment Modal */}
      <ShowroomModal
        isOpen={showroomOpen}
        onClose={() => setShowroomOpen(false)}
        preselectedWatch={showroomWatch}
      />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
        products={products}
        navigateTo={navigateTo}
      />

      {/* Cookie RGPD Banner */}
      <CookieBanner onOpenPrivacy={() => navigateTo('rgpd')} />

      {/* SOTA 2026 Haute Horlogerie Typography Studio Modal */}
      <FontPairingModal
        isOpen={fontModalOpen}
        onClose={() => setFontModalOpen(false)}
        currentPairingId={fontPairing}
        onSelectPairing={handleSelectFontPairing}
      />

      {/* Floating Concierge WhatsApp Button */}
      <a
        href="https://wa.me/33756998976?text=Bonjour%20Nyle,%20je%20vous%20contacte%20depuis%20le%20site%20Le%20Mouvement"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-30 p-3.5 bg-emerald-700/90 hover:bg-emerald-600 text-white rounded-full shadow-2xl backdrop-blur-sm border border-emerald-500/40 hover:scale-105 transition-all flex items-center gap-2 group"
        aria-label="Contacter sur WhatsApp"
        title="Parler à Nyle Abderrahman sur WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-semibold pr-1">
          Conciergerie WhatsApp
        </span>
      </a>

    </div>
  );
}
