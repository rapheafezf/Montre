import React from 'react';
import { X, Trash2, ShieldCheck, Truck, ArrowRight, Lock } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem, onProceedToCheckout }) {
  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);
  const almaInstallment = Math.round(total / 3);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-obsidian-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-obsidian-900 border-l border-obsidian-800 text-ivory-100 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-obsidian-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-lg tracking-wider uppercase text-ivory-100">Votre Sélection</h2>
              <span className="text-xs bg-obsidian-800 text-brass-400 px-2 py-0.5 rounded-full border border-obsidian-700">
                {cartItems.length}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 text-sand hover:text-ivory-100 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-sand">
                <div className="w-16 h-16 rounded-full bg-obsidian-800 flex items-center justify-center text-brass-500">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-serif text-base text-ivory-100">Votre panier est actuellement vide.</p>
                  <p className="text-xs mt-1">Explorez nos garde-temps d’exception certifiés et garantis.</p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-obsidian-800 text-brass-400 text-xs uppercase tracking-widest border border-brass-600/30 hover:border-brass-400 transition-colors"
                >
                  Découvrir la collection
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="p-4 bg-obsidian-950/70 border border-obsidian-800 flex gap-4 relative group"
                >
                  <img
                    src={`${item.images[0] || item.featuredImage}?width=200`}
                    alt={item.title}
                    className="w-20 h-24 object-cover border border-obsidian-800"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-brass-400 font-semibold">
                        {item.brand}
                      </div>
                      <h4 className="font-serif text-sm text-ivory-100 line-clamp-1">{item.title}</h4>
                      <p className="text-[11px] text-sand mt-0.5">{item.diameter} • Année {item.year}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-obsidian-800/60">
                      <div className="font-serif text-base font-semibold text-ivory-100">
                        {item.price.toLocaleString('fr-FR')} €
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-sand/60 hover:text-red-400 transition-colors p-1"
                        title="Retirer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-obsidian-800 bg-obsidian-950/60 space-y-4">
              
              {/* Shipping & Reassurance check */}
              <div className="space-y-1.5 text-xs text-sand/90 pb-2 border-b border-obsidian-800/80">
                <div className="flex items-center justify-between">
                  <span>Expédition sécurisée (Valeur déclarée) :</span>
                  <span className="text-emerald-400 font-medium">Offerte</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Garantie mécanique 12 mois :</span>
                  <span className="text-emerald-400 font-medium">Incluse</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Délai de rétractation (avec scellé) :</span>
                  <span className="text-ivory-200">14 jours</span>
                </div>
              </div>

              {/* Total & Installments */}
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-widest text-sand font-medium">Total Commande :</span>
                  <span className="font-serif text-2xl font-bold text-ivory-100">
                    {total.toLocaleString('fr-FR')} €
                  </span>
                </div>
                <div className="text-xs text-sand/80 mt-1 flex items-center justify-between">
                  <span>Option Alma :</span>
                  <span className="text-brass-300 font-medium">ou 3x {almaInstallment.toLocaleString('fr-FR')} € sans frais</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-4 bg-brass-500 hover:bg-brass-400 text-obsidian-950 font-semibold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Lock className="w-4 h-4" />
                Commander en toute sécurité
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-sand/60">
                Paiement chiffré SSL 256 bits • Rendez-vous possible à Lyon avant expédition
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
