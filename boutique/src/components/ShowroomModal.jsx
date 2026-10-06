import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, User, Phone, Mail } from 'lucide-react';

export default function ShowroomModal({ isOpen, onClose, preselectedWatch }) {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    timeSlot: '14:00 - 15:30',
    watchInterest: preselectedWatch ? preselectedWatch.title : 'Montre à préciser'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-obsidian-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-obsidian-900 border border-obsidian-700 text-ivory-100 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sand hover:text-ivory-100 p-2"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950/50 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl text-ivory-100 font-medium">
              Rendez-vous Pré-réservé
            </h3>
            <p className="text-sand text-xs leading-relaxed max-w-sm mx-auto">
              Nyle Abderrahman vous recontactera sous 2 heures ouvrées par téléphone ou WhatsApp pour confirmer la mise à disposition de la pièce et l'horaire précis.
            </p>
            <div className="p-4 bg-obsidian-950 border border-obsidian-800 text-xs text-left space-y-2 mt-4">
              <div className="flex items-center gap-2 text-ivory-200">
                <MapPin className="w-4 h-4 text-brass-400 shrink-0" />
                <span>Showroom Le Mouvement : 2 Rue du Magnolia, 69360 Communay</span>
              </div>
              <div className="flex items-center gap-2 text-ivory-200">
                <Clock className="w-4 h-4 text-brass-400 shrink-0" />
                <span>Créneau : {formData.date || 'Date convenue'} ({formData.timeSlot})</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-brass-500 hover:bg-brass-400 text-obsidian-950 text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Fermer
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-brass-400 font-bold">Privatisation & Essayage</span>
              <h3 className="font-serif text-2xl text-ivory-100 font-medium mt-1">
                Rendez-vous au Showroom Privé
              </h3>
              <p className="text-sand text-xs mt-1 leading-relaxed">
                Situé en région lyonnaise (Communay), notre showroom privé vous accueille dans un cadre confidentiel pour admirer, passer au poignet et vérifier la montre de votre choix.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Pièce souhaitée en présentation</label>
                <input
                  type="text"
                  value={formData.watchInterest}
                  onChange={(e) => setFormData({...formData, watchInterest: e.target.value})}
                  className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                  placeholder="Ex: Rolex Datejust 16234 Linen Dial..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Date souhaitée</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Créneau horaire</label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
                    className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                  >
                    <option value="10:00 - 11:30">Matinée (10:00 - 11:30)</option>
                    <option value="14:00 - 15:30">Début d'après-midi (14:00 - 15:30)</option>
                    <option value="16:00 - 17:30">Fin d'après-midi (16:00 - 17:30)</option>
                    <option value="18:00 - 19:30">Soirée sur demande (18:00 - 19:30)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Votre Nom & Prénom</label>
                  <input
                    type="text"
                    required
                    placeholder="Nom & Prénom"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Téléphone mobile</label>
                  <input
                    type="tel"
                    required
                    placeholder="06 •• •• •• ••"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Adresse e-mail</label>
                <input
                  type="email"
                  required
                  placeholder="contact@exemple.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-brass-500 hover:bg-brass-400 text-obsidian-950 font-bold text-xs uppercase tracking-widest transition-colors mt-2"
              >
                Confirmer la demande de rendez-vous
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
