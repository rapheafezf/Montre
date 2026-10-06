import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'Renseignement sur une montre en stock',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase tracking-widest text-brass-400 font-bold">Nous Contacter</span>
        <h1 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal">
          Échangez Avec Notre Équipe
        </h1>
        <p className="text-xs sm:text-sm text-sand leading-relaxed max-w-lg mx-auto">
          Une question sur une pièce, une recherche sur-mesure ou une prise de rendez-vous ? Nous vous répondons avec la réactivité d'une maison indépendante.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Info Card (5 cols) */}
        <div className="md:col-span-5 bg-obsidian-900 border border-obsidian-800 p-6 sm:p-8 space-y-6 text-xs text-sand">
          <div>
            <h3 className="font-serif text-xl text-ivory-100 font-medium">Coordonnées Directes</h3>
            <p className="text-xs text-sand/80 mt-1">Interlocuteur unique : Nyle Abderrahman, fondateur.</p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-brass-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-ivory-100 block">Téléphone & WhatsApp :</strong>
                <a href="tel:+33756998976" className="hover:text-brass-300 transition-colors">+33 7 56 99 89 76</a>
                <div className="text-[10px] text-sand/60">Disponible 7j/7 pour vos demandes urgentes</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-brass-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-ivory-100 block">Courrier électronique :</strong>
                <a href="mailto:contact@lemouvement-watches.fr" className="hover:text-brass-300 transition-colors">contact@lemouvement-watches.fr</a>
                <div className="text-[10px] text-sand/60">Réponse sous 2 à 4 heures ouvrées</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-brass-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-ivory-100 block">Showroom Privé :</strong>
                <span>2 Rue du Magnolia, 69360 Communay</span>
                <div className="text-[10px] text-sand/60">Région lyonnaise • Sur rendez-vous uniquement</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-brass-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-ivory-100 block">Horaires de réception :</strong>
                <span>Lundi au Samedi : 09h00 – 19h30</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-obsidian-800">
            <a
              href="https://wa.me/33756998976"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-obsidian-950 hover:bg-obsidian-800 text-ivory-100 border border-obsidian-700 hover:border-brass-400 text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-brass-400" />
              Démarrer une conversation WhatsApp
            </a>
          </div>
        </div>

        {/* Right Form (7 cols) */}
        <div className="md:col-span-7 bg-obsidian-900 border border-obsidian-800 p-6 sm:p-8 shadow-2xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-ivory-100 font-medium">Message Bien Transmis</h3>
              <p className="text-xs sm:text-sm text-sand max-w-sm mx-auto">
                Merci {formData.firstName}. Nous traitons votre demande et reviendrons vers vous dans les plus brefs délais.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="font-serif text-xl text-ivory-100 font-medium mb-2">Envoyez-nous un message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Prénom *</label>
                  <input
                    type="text"
                    required
                    placeholder="Votre prénom"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Nom *</label>
                  <input
                    type="text"
                    required
                    placeholder="Votre nom"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">E-mail *</label>
                  <input
                    type="email"
                    required
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Téléphone mobile</label>
                  <input
                    type="tel"
                    placeholder="06 •• •• •• ••"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Objet de votre demande</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                >
                  <option value="Renseignement sur une montre en stock">Renseignement sur une montre en stock</option>
                  <option value="Réservation d'un essai au showroom Lyon">Réservation d'un essai au showroom Lyon</option>
                  <option value="Proposition de rachat ou dépôt-vente">Proposition de rachat ou dépôt-vente</option>
                  <option value="Demande de sourcing personnalisé">Demande de sourcing personnalisé</option>
                  <option value="Autre demande">Autre demande</option>
                </select>
              </div>

              <div>
                <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Votre message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Décrivez votre projet ou posez vos questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-brass-500 hover:bg-brass-400 text-obsidian-950 font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                Envoyer le message
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
