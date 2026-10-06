import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, CreditCard, Landmark, Smartphone, Truck, MapPin, ArrowRight } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, cartItems, onOrderCompleted }) {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [deliveryType, setDeliveryType] = useState('shipping');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    notes: ''
  });

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);
  const alma3x = Math.round(total / 3);
  const alma4x = Math.round(total / 4);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save order into localStorage for Admin Panel
    const newOrderId = `CMD-2026-${Math.floor(100 + Math.random() * 900)}`;
    const watchTitles = cartItems.map(item => item.title).join(', ');
    const newOrder = {
      id: newOrderId,
      date: new Date().toLocaleDateString('fr-FR'),
      clientName: `${formData.firstName} ${formData.lastName}`.trim() || 'Client Privé',
      clientEmail: formData.email || 'contact@client.fr',
      clientPhone: formData.phone || 'Non renseigné',
      watchTitle: watchTitles || 'Sélection Horlogère',
      amount: total,
      paymentMethod: paymentMethod === 'card' ? 'Carte Bancaire Sécurisée' : paymentMethod === 'alma' ? 'Alma 3x / 4x Garanti' : 'Virement Bancaire SEPA',
      deliveryType: deliveryType === 'shipping' ? 'Valeur Déclarée Sécurisée 48h' : 'Remise Privée Showroom Lyon',
      status: 'Paiement Validé - En préparation atelier',
      trackingNumber: `LM-${Math.floor(1000 + Math.random() * 9000)}-FR`
    };

    try {
      const existing = localStorage.getItem('lemouvement_orders');
      const ordersList = existing ? JSON.parse(existing) : [];
      localStorage.setItem('lemouvement_orders', JSON.stringify([newOrder, ...ordersList]));
    } catch (err) {
      console.error('Erreur sauvegarde commande:', err);
    }

    // Simulate secure transaction
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onOrderCompleted) onOrderCompleted();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-obsidian-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-obsidian-900 border border-obsidian-700 text-ivory-100 shadow-2xl overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sand hover:text-ivory-100 z-10 p-2"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-950/50 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-brass-400 font-semibold">Confirmation de Commande</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-ivory-100 font-medium">
                Merci pour votre confiance
              </h2>
              <p className="text-sand text-sm max-w-md mx-auto">
                Votre commande n° <span className="text-ivory-100 font-mono font-bold">LM-2026-9481</span> a été enregistrée avec succès.
              </p>
            </div>

            <div className="bg-obsidian-950 p-6 border border-obsidian-800 text-left max-w-md mx-auto text-xs space-y-3">
              <div className="flex items-center gap-2 text-ivory-200">
                <ShieldCheck className="w-4 h-4 text-brass-400" />
                <span>Garantie mécanique 12 mois activée avec certificat.</span>
              </div>
              <div className="flex items-center gap-2 text-ivory-200">
                <Truck className="w-4 h-4 text-brass-400" />
                <span>Colis préparé sous scellé de sécurité inviolable.</span>
              </div>
              <p className="text-sand/80 pt-2 border-t border-obsidian-800">
                Un e-mail de confirmation complet ainsi que les coordonnées du transporteur sécurisé et le numéro de suivi vous ont été transmis à <span className="text-ivory-100 font-medium">{formData.email || 'votre adresse e-mail'}</span>.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-brass-500 hover:bg-brass-400 text-obsidian-950 text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                Retourner à la boutique
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Form & Payment */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-obsidian-800">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-brass-400" />
                <h3 className="font-serif text-xl text-ivory-100 font-medium">
                  Règlement Sécurisé & Coordonnées
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Contact */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-sand font-semibold mb-3">1. Vos Coordonnées</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Prénom *"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-xs text-ivory-100 focus:border-brass-400 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Nom *"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-xs text-ivory-100 focus:border-brass-400 focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Adresse e-mail *"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-xs text-ivory-100 focus:border-brass-400 focus:outline-none"
                    />
                    <input
                      type="tel"
                      placeholder="Téléphone mobile (suivi livraison) *"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-xs text-ivory-100 focus:border-brass-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Delivery Mode */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-sand font-semibold mb-3">2. Mode de Réception</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('shipping')}
                      className={`p-3 text-left border transition-colors flex items-start gap-2.5 ${
                        deliveryType === 'shipping' 
                          ? 'border-brass-400 bg-obsidian-800 text-ivory-100' 
                          : 'border-obsidian-800 bg-obsidian-950 text-sand hover:border-obsidian-700'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-brass-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold">Expédition Sécurisée 48h</div>
                        <div className="text-[10px] text-sand/80">Valeur déclarée, signature requise</div>
                        <span className="text-[10px] text-emerald-400 font-medium">Offerte</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryType('showroom')}
                      className={`p-3 text-left border transition-colors flex items-start gap-2.5 ${
                        deliveryType === 'showroom' 
                          ? 'border-brass-400 bg-obsidian-800 text-ivory-100' 
                          : 'border-obsidian-800 bg-obsidian-950 text-sand hover:border-obsidian-700'
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-brass-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold">Retrait Showroom Lyon</div>
                        <div className="text-[10px] text-sand/80">Communay (69360) sur RDV</div>
                        <span className="text-[10px] text-emerald-400 font-medium">Sur rendez-vous</span>
                      </div>
                    </button>
                  </div>

                  {deliveryType === 'shipping' && (
                    <div className="mt-3 space-y-3">
                      <input
                        type="text"
                        placeholder="Adresse postale de livraison *"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-xs text-ivory-100 focus:border-brass-400 focus:outline-none"
                      />
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Code postal *"
                          required
                          value={formData.postalCode}
                          onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                          className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-xs text-ivory-100 focus:border-brass-400 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Ville *"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-xs text-ivory-100 focus:border-brass-400 focus:outline-none"
                        />
                        <select
                          value={formData.country}
                          onChange={(e) => setFormData({...formData, country: e.target.value})}
                          className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-xs text-ivory-100 focus:border-brass-400 focus:outline-none col-span-2 sm:col-span-1"
                        >
                          <option value="France">France</option>
                          <option value="Suisse">Suisse</option>
                          <option value="Belgique">Belgique</option>
                          <option value="Monaco">Monaco</option>
                          <option value="Luxembourg">Luxembourg</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment Selection */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-sand font-semibold mb-3">3. Choix du Paiement</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 text-center border text-xs flex flex-col items-center justify-center gap-1.5 transition-colors ${
                        paymentMethod === 'card' 
                          ? 'border-brass-400 bg-obsidian-800 text-ivory-100' 
                          : 'border-obsidian-800 bg-obsidian-950 text-sand hover:border-obsidian-700'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-brass-400" />
                      <span className="text-[11px] font-medium">Carte CB / Visa</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('applepay')}
                      className={`p-2.5 text-center border text-xs flex flex-col items-center justify-center gap-1.5 transition-colors ${
                        paymentMethod === 'applepay' 
                          ? 'border-brass-400 bg-obsidian-800 text-ivory-100' 
                          : 'border-obsidian-800 bg-obsidian-950 text-sand hover:border-obsidian-700'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 text-brass-400" />
                      <span className="text-[11px] font-medium">Apple / Google</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('alma')}
                      className={`p-2.5 text-center border text-xs flex flex-col items-center justify-center gap-1.5 transition-colors ${
                        paymentMethod === 'alma' 
                          ? 'border-brass-400 bg-obsidian-800 text-ivory-100' 
                          : 'border-obsidian-800 bg-obsidian-950 text-sand hover:border-obsidian-700'
                      }`}
                    >
                      <span className="font-bold text-brass-400 text-xs">Alma</span>
                      <span className="text-[11px] font-medium">3x / 4x</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('transfer')}
                      className={`p-2.5 text-center border text-xs flex flex-col items-center justify-center gap-1.5 transition-colors ${
                        paymentMethod === 'transfer' 
                          ? 'border-brass-400 bg-obsidian-800 text-ivory-100' 
                          : 'border-obsidian-800 bg-obsidian-950 text-sand hover:border-obsidian-700'
                      }`}
                    >
                      <Landmark className="w-4 h-4 text-brass-400" />
                      <span className="text-[11px] font-medium">Virement SEPA</span>
                    </button>
                  </div>

                  {/* Payment Details Container */}
                  <div className="p-4 bg-obsidian-950 border border-obsidian-800 text-xs space-y-3">
                    {paymentMethod === 'card' && (
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Numéro de carte (4242 •••• •••• ••••)"
                          required
                          className="w-full bg-obsidian-900 border border-obsidian-700 px-3 py-2 text-xs text-ivory-100 font-mono focus:border-brass-400 focus:outline-none"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="MM / AA"
                            required
                            className="bg-obsidian-900 border border-obsidian-700 px-3 py-2 text-xs text-ivory-100 font-mono focus:border-brass-400 focus:outline-none"
                          />
                          <input
                            type="text"
                            placeholder="CVC"
                            required
                            className="bg-obsidian-900 border border-obsidian-700 px-3 py-2 text-xs text-ivory-100 font-mono focus:border-brass-400 focus:outline-none"
                          />
                        </div>
                        <div className="text-[10px] text-sand/70 flex items-center gap-1.5 pt-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          Authentification 3D-Secure 2.0 certifiée par votre banque.
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'applepay' && (
                      <div className="text-center py-3 space-y-2">
                        <p className="text-xs text-ivory-200">
                          Paiement biométrique immédiat avec Touch ID ou Face ID.
                        </p>
                        <div className="inline-block px-6 py-2 bg-white text-black font-semibold text-xs rounded-full">
                          Payer avec Apple Pay
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'alma' && (
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center py-1 border-b border-obsidian-800">
                          <span>Échéance 1 (Aujourd'hui) :</span>
                          <span className="font-semibold text-ivory-100">{alma3x.toLocaleString('fr-FR')} €</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-obsidian-800">
                          <span>Échéance 2 (dans 30 jours) :</span>
                          <span className="font-semibold text-ivory-100">{alma3x.toLocaleString('fr-FR')} €</span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span>Échéance 3 (dans 60 jours) :</span>
                          <span className="font-semibold text-ivory-100">{alma3x.toLocaleString('fr-FR')} €</span>
                        </div>
                        <p className="text-[10px] text-brass-400 pt-1">
                          0% de frais pour l’acheteur • Accord immédiat sans justificatif lourd.
                        </p>
                      </div>
                    )}

                    {paymentMethod === 'transfer' && (
                      <div className="space-y-1.5 text-xs text-sand">
                        <p className="text-ivory-200 font-medium">Virement bancaire direct sécurisé :</p>
                        <p>La pièce vous est immédiatement réservée pendant 48 heures. Le RIB officiel Le Mouvement vous sera envoyé instantanément par email et SMS.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-brass-500 hover:bg-brass-400 text-obsidian-950 font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Traitement sécurisé en cours...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Valider & Régler la commande ({total.toLocaleString('fr-FR')} €)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-obsidian-950/70 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="font-serif text-lg text-ivory-100 font-medium mb-4">
                  Votre Garde-Temps
                </h3>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 bg-obsidian-900 border border-obsidian-800">
                      <img
                        src={`${item.images[0] || item.featuredImage}?width=200`}
                        alt={item.title}
                        className="w-16 h-20 object-cover border border-obsidian-800"
                      />
                      <div className="flex-1 text-xs">
                        <span className="text-[10px] uppercase text-brass-400 font-bold">{item.brand}</span>
                        <h4 className="font-serif text-sm text-ivory-100 font-medium line-clamp-1">{item.title}</h4>
                        <p className="text-sand/80 text-[11px] mt-0.5">{item.diameter} • Année {item.year}</p>
                        <div className="font-serif text-sm font-semibold text-ivory-100 mt-2">
                          {item.price.toLocaleString('fr-FR')} €
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-obsidian-800 space-y-2 text-xs">
                  <div className="flex justify-between text-sand">
                    <span>Sous-total garde-temps :</span>
                    <span className="text-ivory-100">{total.toLocaleString('fr-FR')} €</span>
                  </div>
                  <div className="flex justify-between text-sand">
                    <span>Livraison sécurisée avec assurance :</span>
                    <span className="text-emerald-400 font-medium">Offerte</span>
                  </div>
                  <div className="flex justify-between text-sand">
                    <span>Certificat d’authenticité & révision :</span>
                    <span className="text-emerald-400 font-medium">Inclus</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-ivory-100 pt-3 border-t border-obsidian-800">
                    <span>Total TTC :</span>
                    <span>{total.toLocaleString('fr-FR')} €</span>
                  </div>
                </div>
              </div>

              {/* Security Seal Reminder */}
              <div className="p-4 bg-obsidian-900 border border-brass-600/30 text-xs space-y-2">
                <div className="flex items-center gap-2 text-brass-400 font-semibold text-[11px] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  Scellé de Sécurité & Garantie
                </div>
                <p className="text-[11px] text-sand/90 leading-relaxed">
                  Chaque montre est envoyée sous scellé numéroté. Vous disposez de 14 jours pour admirer et faire vérifier la montre chez l'horloger de votre choix. Le remboursement intégral s'applique tant que le scellé reste intact.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
