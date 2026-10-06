import React from 'react';
import { ShieldCheck, Truck, Clock, RefreshCw, MapPin, Phone, Mail, Instagram, Lock } from 'lucide-react';

export default function Footer({ navigateTo }) {
  return (
    <footer className="bg-obsidian-900 border-t border-obsidian-800 text-sand pt-16 pb-12 mt-24">
      {/* 4 Pillars of Trust */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-obsidian-800/80">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-obsidian-800 border border-obsidian-700 text-brass-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-ivory-100 text-sm font-semibold tracking-wide uppercase">Contrôle 20 Points & Authenticité</h4>
              <p className="text-xs text-sand/80 mt-1 leading-relaxed">
                Chaque pièce est ouverte, authentifiée et testée chronométriquement. Certificat écrit fourni.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-obsidian-800 border border-obsidian-700 text-brass-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-ivory-100 text-sm font-semibold tracking-wide uppercase">Garantie Mécanique 12 Mois</h4>
              <p className="text-xs text-sand/80 mt-1 leading-relaxed">
                Toutes nos montres bénéficient d’une garantie totale sur le fonctionnement du calibre.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-obsidian-800 border border-obsidian-700 text-brass-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-ivory-100 text-sm font-semibold tracking-wide uppercase">Expédition Assurée sous 48h</h4>
              <p className="text-xs text-sand/80 mt-1 leading-relaxed">
                Envoi sécurisé en valeur déclarée avec remise contre signature en France et Union Européenne.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-obsidian-800 border border-obsidian-700 text-brass-400">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-ivory-100 text-sm font-semibold tracking-wide uppercase">Retours 14 Jours Sécurisés</h4>
              <p className="text-xs text-sand/80 mt-1 leading-relaxed">
                Droit de rétractation légal sous scellé de sécurité inviolable apposé sur chaque pièce.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-ivory-100 block">
              LE MOUVEMENT
            </span>
            <p className="text-xs text-sand leading-relaxed max-w-sm">
              Maison indépendante spécialisée dans la sélection, la transmission et le sourcing de montres de collection et vintage de prestige. Fondée par Nyle Abderrahman avec l’exigence du prêt-à-porter horloger.
            </p>
            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-ivory-200">
                <MapPin className="w-4 h-4 text-brass-400 shrink-0" />
                <span>2 Rue du Magnolia, 69360 Communay (Région Lyonnaise)</span>
              </div>
              <div className="flex items-center gap-2 text-ivory-200">
                <Phone className="w-4 h-4 text-brass-400 shrink-0" />
                <span>+33 7 56 99 89 76 (Appel & WhatsApp)</span>
              </div>
              <div className="flex items-center gap-2 text-ivory-200">
                <Mail className="w-4 h-4 text-brass-400 shrink-0" />
                <span>contact@lemouvement-watches.fr</span>
              </div>
            </div>
            <div className="pt-2 flex items-center gap-3">
              <a 
                href="https://www.instagram.com/lemouvement_0/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-obsidian-800 border border-obsidian-700 text-ivory-200 hover:text-brass-400 hover:border-brass-500 transition-colors inline-flex items-center gap-2 text-xs"
              >
                <Instagram className="w-4 h-4 text-brass-400" />
                <span>@lemouvement_0</span>
              </a>
            </div>
          </div>

          {/* Column 1: Collections */}
          <div>
            <h5 className="text-xs uppercase tracking-widest text-ivory-100 font-semibold mb-4">Garde-Temps</h5>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => navigateTo('catalogue')} className="hover:text-brass-400 transition-colors">Toutes les montres</button></li>
              <li><button onClick={() => navigateTo('catalogue-rolex')} className="hover:text-brass-400 transition-colors">Montres Rolex</button></li>
              <li><button onClick={() => navigateTo('catalogue-cartier')} className="hover:text-brass-400 transition-colors">Montres Cartier</button></li>
              <li><button onClick={() => navigateTo('catalogue-tudor')} className="hover:text-brass-400 transition-colors">Montres Tudor</button></li>
              <li><button onClick={() => navigateTo('catalogue-dispo')} className="hover:text-brass-400 transition-colors">Pièces disponibles de suite</button></li>
              <li><button onClick={() => navigateTo('catalogue-archives')} className="hover:text-brass-400 transition-colors">Archives des pièces vendues</button></li>
            </ul>
          </div>

          {/* Column 2: Services & Maison */}
          <div>
            <h5 className="text-xs uppercase tracking-widest text-ivory-100 font-semibold mb-4">Services & Maison</h5>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => navigateTo('vendre')} className="hover:text-brass-400 transition-colors text-brass-400">Vendre / Estimer sa montre</button></li>
              <li><button onClick={() => navigateTo('sourcing')} className="hover:text-brass-400 transition-colors">Sourcing sur-mesure</button></li>
              <li><button onClick={() => navigateTo('a-propos')} className="hover:text-brass-400 transition-colors">À Propos du fondateur</button></li>
              <li><button onClick={() => navigateTo('authenticite')} className="hover:text-brass-400 transition-colors">Protocole d'authenticité</button></li>
              <li><button onClick={() => navigateTo('showroom')} className="hover:text-brass-400 transition-colors">Showroom Privé Lyon</button></li>
              <li><button onClick={() => navigateTo('journal')} className="hover:text-brass-400 transition-colors">Journal & Guides d’achat</button></li>
            </ul>
          </div>

          {/* Column 3: Confiance & Légal */}
          <div>
            <h5 className="text-xs uppercase tracking-widest text-ivory-100 font-semibold mb-4">Informations</h5>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => navigateTo('faq')} className="hover:text-brass-400 transition-colors">Questions fréquentes (FAQ)</button></li>
              <li><button onClick={() => navigateTo('livraison-retours')} className="hover:text-brass-400 transition-colors">Livraison & Droit de retour 14j</button></li>
              <li><button onClick={() => navigateTo('cgv')} className="hover:text-brass-400 transition-colors">Conditions Générales de Vente</button></li>
              <li><button onClick={() => navigateTo('mentions-legales')} className="hover:text-brass-400 transition-colors">Mentions Légales (SIRET)</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-brass-400 transition-colors">Nous Contacter</button></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal & Payment badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-obsidian-800 text-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sand/70 text-[11px]">
          <span>© 2026 Le Mouvement (Nyle Abderrahman). Tous droits réservés.</span>
          <span>•</span>
          <span>SIRET : 883 775 017 00014</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-brass-400" /> Paiements 100% Chiffrés SSL 256 bits</span>
        </div>

        {/* Accepted Payment Icons */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-sand/60 mr-2">Paiements acceptés :</span>
          <span className="px-2 py-1 bg-obsidian-800 border border-obsidian-700 text-ivory-200 text-[10px] font-semibold rounded">CB</span>
          <span className="px-2 py-1 bg-obsidian-800 border border-obsidian-700 text-ivory-200 text-[10px] font-semibold rounded">Visa</span>
          <span className="px-2 py-1 bg-obsidian-800 border border-obsidian-700 text-ivory-200 text-[10px] font-semibold rounded">Mastercard</span>
          <span className="px-2 py-1 bg-obsidian-800 border border-obsidian-700 text-ivory-200 text-[10px] font-semibold rounded">Apple Pay</span>
          <span className="px-2 py-1 bg-obsidian-800 border border-obsidian-700 text-brass-400 text-[10px] font-semibold rounded">Alma 3x / 4x</span>
          <span className="px-2 py-1 bg-obsidian-800 border border-obsidian-700 text-ivory-200 text-[10px] font-semibold rounded">Virement</span>
        </div>
      </div>
    </footer>
  );
}
