import React, { useState } from 'react';
import { Search, ShieldCheck, CheckCircle2, Clock, Globe, ArrowRight, MessageCircle } from 'lucide-react';

export default function SourcingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    watchWanted: '',
    budget: '',
    preferredYear: '',
    fullSetRequired: 'Indifférent',
    name: '',
    phone: '',
    email: '',
    details: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] uppercase tracking-widest text-brass-400 font-bold">Conciergerie Privée</span>
        <h1 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal">
          Sourcing & Chasse Horlogère Sur-Mesure
        </h1>
        <p className="text-xs sm:text-sm text-sand leading-relaxed">
          Vous cherchez une montre de votre année de naissance, une Rolex Datejust à cadran lin immaculé ou une Cartier rare ? Confiez-nous votre recherche.
        </p>
      </div>

      {/* 3 Steps Process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-obsidian-900 border border-obsidian-800 space-y-3 text-xs">
          <div className="w-8 h-8 rounded bg-obsidian-800 border border-obsidian-700 text-brass-400 font-serif font-bold text-sm flex items-center justify-center">
            01
          </div>
          <h3 className="font-serif text-base text-ivory-100 font-medium">Définition du Cahier des Charges</h3>
          <p className="text-sand/80 leading-relaxed">
            Nous échangeons ensemble sur vos critères précis : référence, état du boîtier, type de cadran, boîte/papiers et budget cible.
          </p>
        </div>

        <div className="p-6 bg-obsidian-900 border border-obsidian-800 space-y-3 text-xs">
          <div className="w-8 h-8 rounded bg-obsidian-800 border border-obsidian-700 text-brass-400 font-serif font-bold text-sm flex items-center justify-center">
            02
          </div>
          <h3 className="font-serif text-base text-ivory-100 font-medium">Activation du Réseau Européen</h3>
          <p className="text-sand/80 leading-relaxed">
            Nous sollicitons nos confrères marchands, collectionneurs privés et enchères spécialisées en France, Suisse, Allemagne et Italie.
          </p>
        </div>

        <div className="p-6 bg-obsidian-900 border border-obsidian-800 space-y-3 text-xs">
          <div className="w-8 h-8 rounded bg-obsidian-800 border border-obsidian-700 text-brass-400 font-serif font-bold text-sm flex items-center justify-center">
            03
          </div>
          <h3 className="font-serif text-base text-ivory-100 font-medium">Contrôle en Atelier & Garantie</h3>
          <p className="text-sand/80 leading-relaxed">
            Dès la pièce trouvée, elle passe nos 20 points de contrôle. Vous la recevez avec sa garantie 12 mois ou vous venez l’essayer à Lyon.
          </p>
        </div>
      </div>

      {/* Request Form */}
      <div className="bg-obsidian-900 border border-obsidian-800 p-8 shadow-2xl">
        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl text-ivory-100 font-medium">Mandat de Recherche Enregistré</h3>
            <p className="text-xs sm:text-sm text-sand max-w-md mx-auto leading-relaxed">
              Nyle Abderrahman a bien reçu votre demande pour la pièce <strong className="text-ivory-100">{formData.watchWanted}</strong>. Un premier point de situation vous sera adressé sous 24 à 48 heures.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-brass-400 font-bold">Formulaire de Mandat</span>
              <h2 className="font-serif text-xl sm:text-2xl text-ivory-100 font-medium mt-1">
                Quelle pièce recherchez-vous ?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Modèle ou Référence recherchée *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Rolex Datejust 16014 cadran bleu, Cartier Santos 1564..."
                  value={formData.watchWanted}
                  onChange={(e) => setFormData({...formData, watchWanted: e.target.value})}
                  className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Fourchette de budget indicatif (€) *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 3 000 € à 5 500 €"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Année souhaitée (si applicable)</label>
                <input
                  type="text"
                  placeholder="Ex: 1988, 1990 ou indifférent"
                  value={formData.preferredYear}
                  onChange={(e) => setFormData({...formData, preferredYear: e.target.value})}
                  className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Présence boîte et papiers</label>
                <select
                  value={formData.fullSetRequired}
                  onChange={(e) => setFormData({...formData, fullSetRequired: e.target.value})}
                  className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                >
                  <option value="Indifférent">Indifférent (montre seule ou avec écrin)</option>
                  <option value="Boîte uniquement">Avec boîte d'origine</option>
                  <option value="Full Set obligatoire">Full Set impératif (Boîte & Papiers d'origine)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-obsidian-800">
              <div>
                <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Votre Nom & Prénom *</label>
                <input
                  type="text"
                  required
                  placeholder="Nom complet"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Téléphone mobile *</label>
                <input
                  type="tel"
                  required
                  placeholder="06 •• •• •• ••"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="contact@exemple.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Remarques ou détails spécifiques</label>
              <textarea
                rows={3}
                placeholder="Précisez tout critère particulier : bracelet jubilé, cadran spécifique..."
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
                className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-brass-500 hover:bg-brass-400 text-obsidian-950 font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-xl"
            >
              Lancer la recherche personnalisée
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
