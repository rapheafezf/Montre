import React from 'react';
import { ArrowRight, ShieldCheck, Clock, MapPin, Truck, Check, Star, MessageCircle } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import HorlogerieMechanismSvg from '../components/HorlogerieMechanismSvg';
import WatchDialClockSvg from '../components/WatchDialClockSvg';
import CertificationStampSvg from '../components/CertificationStampSvg';

export default function HomePage({ products, onSelectProduct, navigateTo, openShowroomModal }) {
  // Extract in-stock and featured items
  const inStockWatches = products.filter(p => !p.isSold).slice(0, 4);
  const rolexWatches = products.filter(p => p.brand === 'Rolex').slice(0, 3);
  const cartierWatches = products.filter(p => p.brand === 'Cartier').slice(0, 3);
  const tudorWatches = products.filter(p => p.brand === 'Tudor').slice(0, 3);

  return (
    <div className="space-y-28">
      
      {/* Hero Section with Live Mechanical Caliber & Watch Dial Clock */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-radial-subtle pt-8 pb-16">
        {/* Subtle ambient light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brass-500/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-obsidian-900 border border-brass-600/30 text-brass-300 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-brass-400 animate-pulse"></span>
                Maison d'Horlogerie Indépendante • Lyon
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ivory-100 font-normal tracking-[0.03em] leading-[1.18] uppercase">
                Garde-Temps d'Exception & Pièces Certifiées
              </h1>

              <p className="text-xs sm:text-sm text-sand/90 font-light leading-relaxed max-w-xl">
                Sélection exigeante de montres de collection, vintage et contemporaines de prestige. Chaque pièce est ouverte en atelier, auscultée au chronocomparateur et garantie 12 mois. Rolex, Cartier, Tudor, Omega.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => navigateTo('catalogue')}
                  className="px-8 py-4 bg-brass-500 hover:bg-brass-400 text-obsidian-950 text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Explorer la collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigateTo('vendre')}
                  className="px-8 py-4 bg-obsidian-900/90 hover:bg-obsidian-850 text-ivory-100 border border-obsidian-700 hover:border-brass-500/50 text-xs uppercase tracking-[0.2em] font-medium transition-all cursor-pointer"
                >
                  Faire estimer une pièce
                </button>
              </div>

              {/* 4 Pillars Metrics with SVG micro-hallmarks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-obsidian-800/80">
                <div className="space-y-1">
                  <div className="font-serif text-xl sm:text-2xl text-ivory-100 font-semibold tracking-wider">100%</div>
                  <div className="text-[11px] text-sand/75 tracking-wider uppercase font-medium">Authentifié par écrit</div>
                </div>
                <div className="space-y-1">
                  <div className="font-serif text-xl sm:text-2xl text-ivory-100 font-semibold tracking-wider">12 Mois</div>
                  <div className="text-[11px] text-sand/75 tracking-wider uppercase font-medium">Garantie mécanique</div>
                </div>
                <div className="space-y-1">
                  <div className="font-serif text-xl sm:text-2xl text-ivory-100 font-semibold tracking-wider">48 Heures</div>
                  <div className="text-[11px] text-sand/75 tracking-wider uppercase font-medium">Expédition assurée</div>
                </div>
                <div className="space-y-1">
                  <div className="font-serif text-xl sm:text-2xl text-ivory-100 font-semibold tracking-wider">Lyon</div>
                  <div className="text-[11px] text-sand/75 tracking-wider uppercase font-medium">Showroom privé</div>
                </div>
              </div>

            </div>

            {/* Right Showcase: Real-time Mechanical Caliber & Dial (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative p-6 sm:p-8 bg-gradient-to-b from-obsidian-900/90 to-obsidian-950 border border-obsidian-800 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                
                {/* SVG Live Horlogerie Calibre Animation */}
                <div className="relative flex items-center justify-center">
                  <HorlogerieMechanismSvg className="w-64 h-64 sm:w-72 sm:h-72" />
                  
                  {/* Floating Live Real-time Clock Dial */}
                  <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 p-1.5 bg-obsidian-950 border border-brass-600/40 shadow-2xl rounded-full">
                    <WatchDialClockSvg className="w-24 h-24 sm:w-28 sm:h-28" />
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-obsidian-800/80 text-center">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-brass-400 font-semibold">
                    Calibre Mécanique Vivant
                  </div>
                  <div className="font-serif text-xs text-ivory-200 mt-1">
                    Balancier spiral 28'800 A/h • Échappement à ancre suisse
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* In-Stock Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-obsidian-800">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-brass-400 font-semibold">
              Disponibilité Immédiate
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-ivory-100 font-normal tracking-wide uppercase mt-1">
              Les Dernières Nouveautés
            </h2>
          </div>
          <button
            onClick={() => navigateTo('catalogue-dispo')}
            className="mt-4 md:mt-0 text-xs uppercase tracking-[0.2em] text-brass-300 hover:text-brass-400 flex items-center gap-1.5 cursor-pointer"
          >
            Consulter les pièces disponibles ({products.filter(p => !p.isSold).length})
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {inStockWatches.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* Manufactures (Rolex, Cartier, Tudor) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brass-400 font-semibold">
            Les Grandes Signatures
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ivory-100 font-normal tracking-wide uppercase">
            Manufactures Horlogères
          </h2>
          <p className="text-xs sm:text-sm text-sand/80 font-light">
            Cadrans rares, patines authentiques, boîtiers affûtés et calibres révisés.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Rolex card */}
          <div 
            onClick={() => navigateTo('catalogue-rolex')}
            className="group relative h-96 bg-obsidian-900 border border-obsidian-800 hover:border-brass-500/60 overflow-hidden cursor-pointer flex flex-col justify-end p-8 transition-all"
          >
            <img
              src="https://lemouvement-watches.fr/cdn/shop/files/DSC02450.jpg?width=1000"
              alt="Rolex Vintage"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brass-400 font-bold">Manufacture Genevoise</span>
              <h3 className="font-serif text-2xl text-ivory-100 font-normal tracking-wide uppercase">Rolex</h3>
              <p className="text-xs text-sand/80 mt-1 font-light">Datejust 16014, 16234, Oyster Precision, Yacht-Master...</p>
              <span className="inline-flex items-center gap-1.5 text-xs text-brass-300 font-medium mt-3 group-hover:translate-x-1 transition-transform">
                Explorer les pièces ({rolexWatches.length > 0 ? '12 pièces' : ''}) <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Cartier card */}
          <div 
            onClick={() => navigateTo('catalogue-cartier')}
            className="group relative h-96 bg-obsidian-900 border border-obsidian-800 hover:border-brass-500/60 overflow-hidden cursor-pointer flex flex-col justify-end p-8 transition-all"
          >
            <img
              src="https://lemouvement-watches.fr/cdn/shop/files/DSC02218.jpg?width=1000"
              alt="Cartier Vintage"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brass-400 font-bold">L'Élégance Parisienne</span>
              <h3 className="font-serif text-2xl text-ivory-100 font-normal tracking-wide uppercase">Cartier</h3>
              <p className="text-xs text-sand/80 mt-1 font-light">Santos Galbée, Ballon Bleu, Tank Must Vermeil...</p>
              <span className="inline-flex items-center gap-1.5 text-xs text-brass-300 font-medium mt-3 group-hover:translate-x-1 transition-transform">
                Explorer les pièces ({cartierWatches.length > 0 ? '8 pièces' : ''}) <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Tudor card */}
          <div 
            onClick={() => navigateTo('catalogue-tudor')}
            className="group relative h-96 bg-obsidian-900 border border-obsidian-800 hover:border-brass-500/60 overflow-hidden cursor-pointer flex flex-col justify-end p-8 transition-all"
          >
            <img
              src="https://lemouvement-watches.fr/cdn/shop/files/DSC02321_b420a646-7d52-45a8-b037-791fd35659c9.jpg?width=1000"
              alt="Tudor Vintage"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brass-400 font-bold">L'Héritage Robuste</span>
              <h3 className="font-serif text-2xl text-ivory-100 font-normal tracking-wide uppercase">Tudor</h3>
              <p className="text-xs text-sand/80 mt-1 font-light">Prince Oysterdate 74000, Big Rose, Black Bay...</p>
              <span className="inline-flex items-center gap-1.5 text-xs text-brass-300 font-medium mt-3 group-hover:translate-x-1 transition-transform">
                Explorer les pièces ({tudorWatches.length > 0 ? '8 pièces' : ''}) <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story & The 20 Points Protocol with Animated SVG Seal */}
      <section className="bg-obsidian-900 border-y border-obsidian-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 text-brass-400 text-xs uppercase tracking-[0.25em] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                L’Exigence Technique Sans Compromis
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-ivory-100 font-normal leading-snug tracking-wide uppercase">
                "Une montre vintage est un fragment d'histoire qui mérite d'être porté avec fierté."
              </h2>

              <p className="text-sand text-xs sm:text-sm leading-relaxed font-light">
                J’ai fondé <strong className="text-ivory-100 font-medium">Le Mouvement</strong> avec une conviction inaltérable : le marché du vintage doit conjuguer la sensibilité des détails à la rigueur technique la plus intransigeante. Pour moi, le prêt-à-porter horloger est la règle absolue. Aucune pièce n'est mise en vente sans avoir été ouverte, diagnostiquée au binoculaire et testée chronométriquement.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brass-500/20 text-brass-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs text-sand leading-relaxed">
                    <strong className="text-ivory-100 font-medium">Ouverture & Vérification Calibre :</strong> Contrôle des numéros de série, de la conformité d'époque et de l'authenticité de chaque rouage.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brass-500/20 text-brass-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs text-sand leading-relaxed">
                    <strong className="text-ivory-100 font-medium">Précision Chronométrique :</strong> Mesure de l'amplitude du balancier, de la dérive quotidienne et de la réserve de marche.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brass-500/20 text-brass-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs text-sand leading-relaxed">
                    <strong className="text-ivory-100 font-medium">Garantie Mécanique 12 Mois :</strong> Engagement contractuel écrit sur le parfait fonctionnement du mouvement.
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-6">
                <div>
                  <div className="font-serif text-base text-ivory-100 font-normal tracking-wider uppercase">Nyle Abderrahman</div>
                  <div className="text-[10px] text-brass-400 uppercase tracking-[0.25em] font-medium">Fondateur • Le Mouvement</div>
                </div>
                <button
                  onClick={() => navigateTo('authenticite')}
                  className="ml-auto text-xs uppercase tracking-[0.2em] text-ivory-200 hover:text-brass-300 underline transition-colors cursor-pointer"
                >
                  Découvrir les 20 points de contrôle →
                </button>
              </div>
            </div>

            {/* Right: Atelier photography with Animated SVG Certification Stamp Overlay */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative border border-obsidian-700 bg-obsidian-950 p-2 shadow-2xl w-full">
                <img
                  src="https://lemouvement-watches.fr/cdn/shop/files/DSC02470.jpg?width=1000"
                  alt="Détail horloger Le Mouvement"
                  className="w-full h-auto object-cover"
                />
                
                {/* SVG Official Certification Stamp Overlay */}
                <div className="absolute top-6 right-6 p-2 bg-obsidian-950/85 border border-brass-600/40 rounded-full backdrop-blur-md shadow-2xl">
                  <CertificationStampSvg className="w-24 h-24 sm:w-28 sm:h-28" />
                </div>

                <div className="p-4 bg-obsidian-900 border-t border-obsidian-800 text-xs">
                  <div className="text-brass-400 uppercase tracking-[0.25em] font-semibold text-[10px]">Showroom Privé & Atelier</div>
                  <div className="text-ivory-100 font-serif text-sm mt-0.5 tracking-wide">Accueil sur rendez-vous à Communay (Région Lyonnaise)</div>
                  <button
                    onClick={openShowroomModal}
                    className="mt-2 text-[11px] text-brass-300 hover:text-brass-200 underline font-medium cursor-pointer"
                  >
                    Réserver une séance d'essayage privé →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Consignment & Buying Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-brass-600/30 p-8 sm:p-14 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brass-400 font-bold">Rachat Cash & Dépôt-Vente</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ivory-100 font-normal tracking-wide uppercase mt-1">
              Transmettez Votre Montre au Juste Prix
            </h2>
            <p className="text-sand text-xs sm:text-sm mt-3 leading-relaxed font-light">
              Nous étudions toute proposition de rachat direct ou de mandat de vente sur les manufactures Rolex, Cartier, Tudor, Omega et Jaeger-LeCoultre. Estimation gratuite et sans engagement sous 48 heures.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigateTo('vendre')}
                className="px-8 py-3.5 bg-brass-500 hover:bg-brass-400 text-obsidian-950 font-semibold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Faire estimer ma pièce
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/33756998976?text=Bonjour%20Nyle,%20je%20souhaiterais%20faire%20estimer%20une%20montre"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-obsidian-950 hover:bg-obsidian-800 text-ivory-100 border border-obsidian-700 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-brass-400" />
                Estimation par WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-1">
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brass-400 font-semibold">Témoignages Vérifiés</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ivory-100 font-normal tracking-[0.03em] uppercase">
            Les Mots de nos Collectionneurs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-obsidian-900/60 border border-obsidian-800 p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex gap-1 text-brass-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <p className="text-sm text-ivory-100/90 leading-relaxed font-light pl-3 border-l border-brass-600/50">
                « J’ai bien reçu l’Omega, qui est encore plus belle en vrai que sur les photographies. Merci pour cet envoi rapide, soigné et parfaitement sécurisé. »
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-obsidian-800/60">
              <div className="text-xs font-mono uppercase tracking-wider text-ivory-100">Florian B.</div>
              <div className="text-[10px] text-sand/80 font-mono mt-0.5">Acquéreur d'une Omega Seamaster Vintage</div>
            </div>
          </div>

          <div className="bg-obsidian-900/60 border border-obsidian-800 p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex gap-1 text-brass-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <p className="text-sm text-ivory-100/90 leading-relaxed font-light pl-3 border-l border-brass-600/50">
                « Un accompagnement exceptionnel avant l'achat. Nyle m’a envoyé des vidéos macro et le rapport du chronocomparateur le jour même. Une confiance totale. »
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-obsidian-800/60">
              <div className="text-xs font-mono uppercase tracking-wider text-ivory-100">Sophie M.</div>
              <div className="text-[10px] text-sand/80 font-mono mt-0.5">Acquéreuse d'une Cartier Santos Galbée</div>
            </div>
          </div>

          <div className="bg-obsidian-900/60 border border-obsidian-800 p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex gap-1 text-brass-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <p className="text-sm text-ivory-100/90 leading-relaxed font-light pl-3 border-l border-brass-600/50">
                « Montre conforme à la description dans les moindres détails. Réglée à la seconde près, scellé de sécurité impeccable et certificat d'authenticité fourni. »
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-obsidian-800/60">
              <div className="text-xs font-mono uppercase tracking-wider text-ivory-100">Enzo R.</div>
              <div className="text-[10px] text-sand/80 font-mono mt-0.5">Acquéreur d'une Rolex Datejust 16234</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center mb-10 space-y-1">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brass-400 font-semibold">Réassurance</span>
          <h2 className="font-serif text-3xl text-ivory-100 font-normal tracking-wide uppercase">Questions Fréquentes</h2>
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-5 bg-obsidian-900/70 border border-obsidian-800 space-y-2">
            <h4 className="font-semibold text-ivory-100 text-sm">Comment garantissez-vous l'authenticité de vos pièces ?</h4>
            <p className="text-sand leading-relaxed font-light">
              Chaque montre fait l'objet d'une ouverture systématique pour examiner le calibre, contrôler les gravures de référence et de numéro de série, et vérifier l'intégrité esthétique de chaque composant d'époque. Une facture détaillée attestant de l'authenticité juridique et un certificat sont fournis.
            </p>
          </div>

          <div className="p-5 bg-obsidian-900/70 border border-obsidian-800 space-y-2">
            <h4 className="font-semibold text-ivory-100 text-sm">Puis-je voir et essayer la montre avant de régler ?</h4>
            <p className="text-sand leading-relaxed font-light">
              Absolument. Un rendez-vous peut être organisé dans notre showroom privé à Communay, aux portes de Lyon. Pour les acquéreurs distants, nous réalisons sur simple demande des vidéos haute définition et des gros plans en lumière naturelle.
            </p>
          </div>

          <div className="p-5 bg-obsidian-900/70 border border-obsidian-800 space-y-2">
            <h4 className="font-semibold text-ivory-100 text-sm">Quels sont les délais et conditions d'expédition ?</h4>
            <p className="text-sand leading-relaxed font-light">
              Nos commandes sont préparées et expédiées sous 48 heures ouvrées via un transporteur spécialisé en valeur déclarée (assuré à 100% de la valeur de la montre), avec remise en mains propres exclusive contre signature.
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigateTo('faq')}
            className="text-xs uppercase tracking-[0.2em] text-brass-400 hover:text-brass-300 underline cursor-pointer"
          >
            Consulter toutes les questions fréquentes →
          </button>
        </div>
      </section>

    </div>
  );
}
