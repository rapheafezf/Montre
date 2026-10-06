import React from 'react';
import { MapPin, Clock, Calendar, ShieldCheck, Car, Train, ArrowRight } from 'lucide-react';

export default function ShowroomPage({ openShowroomModal }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] uppercase tracking-widest text-brass-400 font-bold">Accueil Privé & Confidentiel</span>
        <h1 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal">
          Le Showroom de Lyon
        </h1>
        <p className="text-xs sm:text-sm text-sand leading-relaxed">
          Pour apprécier le relief d’un cadran lin, la chaleur d’une patine ou la perfection des maillons, rien ne remplace le contact direct avec la pièce.
        </p>
      </div>

      {/* Main Visual */}
      <div className="relative border border-obsidian-800 bg-obsidian-950 overflow-hidden shadow-2xl">
        <img
          src="https://lemouvement-watches.fr/cdn/shop/files/DSC02470.jpg?width=1400"
          alt="Showroom Le Mouvement Lyon"
          className="w-full h-80 sm:h-96 object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-brass-400 text-xs font-bold uppercase tracking-wider">Maison Le Mouvement</div>
            <div className="font-serif text-xl sm:text-2xl text-ivory-100 mt-1">2 Rue du Magnolia, 69360 Communay</div>
            <div className="text-xs text-sand/80">Région lyonnaise • Accueil exclusivement sur rendez-vous préalable</div>
          </div>
          <button
            onClick={openShowroomModal}
            className="px-6 py-3 bg-brass-500 hover:bg-brass-400 text-obsidian-950 text-xs font-semibold uppercase tracking-widest transition-colors shadow-lg"
          >
            Réserver un créneau privé
          </button>
        </div>
      </div>

      {/* Experience pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-obsidian-900 border border-obsidian-800 space-y-3 text-xs">
          <ShieldCheck className="w-5 h-5 text-brass-400" />
          <h3 className="font-serif text-base text-ivory-100 font-medium">Cadre Serein & Sécurisé</h3>
          <p className="text-sand/80 leading-relaxed">
            Un espace discret et privé pour examiner vos montres favorites en toute tranquillité, sans bruit ni passage d'une boutique conventionnelle.
          </p>
        </div>

        <div className="p-6 bg-obsidian-900 border border-obsidian-800 space-y-3 text-xs">
          <Clock className="w-5 h-5 text-brass-400" />
          <h3 className="font-serif text-base text-ivory-100 font-medium">Temps d'Échange Dédié</h3>
          <p className="text-sand/80 leading-relaxed">
            Chaque séance dure environ 1h à 1h30. Nyle vous présente l’histoire de la pièce, son calibre et son état sans aucune pression d'achat.
          </p>
        </div>

        <div className="p-6 bg-obsidian-900 border border-obsidian-800 space-y-3 text-xs">
          <Calendar className="w-5 h-5 text-brass-400" />
          <h3 className="font-serif text-base text-ivory-100 font-medium">Flexibilité Horaires</h3>
          <p className="text-sand/80 leading-relaxed">
            Créneaux disponibles du lundi au samedi, en journée ou en fin d'après-midi, pour s'adapter à votre agenda.
          </p>
        </div>
      </div>

      {/* Access Information */}
      <div className="p-8 bg-obsidian-900 border border-obsidian-800 space-y-6 text-xs">
        <h3 className="font-serif text-xl text-ivory-100 font-medium">Comment Nous Rejoindre ?</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sand">
          <div className="flex items-start gap-3">
            <Car className="w-5 h-5 text-brass-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-ivory-100 block mb-1">En Voiture (Accès autoroutier immédiat) :</strong>
              <p className="leading-relaxed">
                À 20 minutes du centre de Lyon via l'A7 ou la Rocade Est (sortie Feyzin / Communay). Parking privé et sécurisé à votre disposition sur place.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Train className="w-5 h-5 text-brass-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-ivory-100 block mb-1">En Train / Avion :</strong>
              <p className="leading-relaxed">
                À 25 minutes de l'aéroport et gare TGV de Lyon Saint-Exupéry. Gare TER de Sérézin-du-Rhône à 5 minutes (liaison directe depuis Lyon Part-Dieu en 12 minutes).
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-obsidian-800 flex justify-center">
          <button
            onClick={openShowroomModal}
            className="px-8 py-3.5 bg-brass-500 hover:bg-brass-400 text-obsidian-950 font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
          >
            Prendre rendez-vous au showroom privé
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
