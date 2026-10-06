import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ShowroomModal from './components/ShowroomModal';
import SearchModal from './components/SearchModal';
import CookieBanner from './components/CookieBanner';
import LuxuryTypographyToolbar from './components/LuxuryTypographyToolbar';

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

import { PRODUCTS } from './data/products';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [route, setRoute] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [showroomOpen, setShowroomOpen] = useState(false);
  const [showroomWatch, setShowroomWatch] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash || hash === '') {
        setRoute('home');
      } else if (hash.startsWith('produit/')) {
        const slug = hash.replace('produit/', '');
        const found = PRODUCTS.find(p => p.slug === slug || p.id === slug);
        if (found) {
          setSelectedProduct(found);
          setRoute('produit');
        } else {
          setRoute('catalogue');
        }
      } else {
        setRoute(hash);
      }
      window.scrollTo(0, 0);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (newRoute) => {
    window.location.hash = `#/${newRoute}`;
    setRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    window.location.hash = `#/produit/${product.slug}`;
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
      />

      {/* Main View Router */}
      <main className="flex-1">
        {route === 'home' && (
          <HomePage
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            navigateTo={navigateTo}
            openShowroomModal={() => handleOpenShowroom()}
          />
        )}

        {route === 'catalogue' && (
          <CatalogPage
            products={PRODUCTS}
            initialBrand="ALL"
            onSelectProduct={handleSelectProduct}
          />
        )}

        {route === 'catalogue-rolex' && (
          <CatalogPage
            products={PRODUCTS}
            initialBrand="Rolex"
            onSelectProduct={handleSelectProduct}
          />
        )}

        {route === 'catalogue-cartier' && (
          <CatalogPage
            products={PRODUCTS}
            initialBrand="Cartier"
            onSelectProduct={handleSelectProduct}
          />
        )}

        {route === 'catalogue-tudor' && (
          <CatalogPage
            products={PRODUCTS}
            initialBrand="Tudor"
            onSelectProduct={handleSelectProduct}
          />
        )}

        {route === 'catalogue-dispo' && (
          <CatalogPage
            products={PRODUCTS}
            initialFilter="dispo"
            onSelectProduct={handleSelectProduct}
          />
        )}

        {route === 'catalogue-archives' && (
          <CatalogPage
            products={PRODUCTS}
            initialFilter="archives"
            onSelectProduct={handleSelectProduct}
          />
        )}

        {route === 'produit' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={PRODUCTS}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onOpenShowroom={handleOpenShowroom}
            onSelectProduct={handleSelectProduct}
            navigateTo={navigateTo}
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
      />

      {/* Cookie RGPD Banner */}
      <CookieBanner onOpenPrivacy={() => navigateTo('rgpd')} />

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

      {/* Floating Interactive Luxury Typography Selector */}
      <LuxuryTypographyToolbar />

    </div>
  );
}
