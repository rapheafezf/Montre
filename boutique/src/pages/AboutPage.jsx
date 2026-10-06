import React from 'react';
import { ShieldCheck, Heart, Clock, Award, ArrowRight } from 'lucide-react';

export default function AboutPage({ navigateTo, openShowroomModal }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-[10px] uppercase tracking-widest text-brass-400 font-bold">La Maison & Son Fondateur</span>
        <h1 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal">
          L'Horlogerie avec une Âme
        </h1>
        <p className="text-xs sm:text-sm text-sand max-w-xl mx-auto leading-relaxed">
          "Une montre vintage ne se résume pas à un mécanisme : c'est un fragment d'histoire, un témoin du temps qui mérite d'être préservé et transmis."
        </p>
      </div>

      {/* Main Story Image */}
      <div className="relative border border-obsidian-800 bg-obsidian-950 overflow-hidden shadow-2xl">
        <img
          src="https://lemouvement-watches.fr/cdn/shop/files/DSC02450.jpg?width=1400"
          alt="Atelier Le Mouvement"
          className="w-full h-80 sm:h-96 object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-xs text-sand">
          <div className="font-serif text-lg text-ivory-100 font-medium">Nyle Abderrahman</div>
          <div>Fondateur de la Maison Le Mouvement — Communay, Région Lyonnaise</div>
        </div>
      </div>

      {/* Story Text */}
      <div className="space-y-6 text-xs sm:text-sm text-sand/90 leading-relaxed font-light">
        <h2 className="font-serif text-2xl text-ivory-100 font-normal">Pourquoi Le Mouvement ?</h2>
        <p>
          Le nom <strong className="text-ivory-100">Le Mouvement</strong> incarne ma double passion. Il rend hommage au cœur battant de chaque garde-temps — cette mécanique complexe, fascinante et séculaire — mais il symbolise aussi ma volonté de faire bouger les lignes du marché vintage.
        </p>
        <p>
          Je ne me contente pas de proposer des montres : je sélectionne des pièces qui possèdent un caractère propre et une intégrité rare. Des cadrans « Lin » aux reflets tramés, des patines dorées chaleureuses, des boîtiers aux chanfreins nets et des configurations historiques qui continuent d'émouvoir des décennies après leur sortie de manufacture.
        </p>

        <h2 className="font-serif text-2xl text-ivory-100 font-normal pt-4">Les 3 Piliers de Confiance</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="p-5 bg-obsidian-900 border border-obsidian-800 space-y-2">
            <ShieldCheck className="w-5 h-5 text-brass-400" />
            <h3 className="font-serif text-base text-ivory-100 font-medium">Sélection Personnelle</h3>
            <p className="text-xs text-sand leading-relaxed">
              Si je ne la porterais pas moi-même avec fierté, je ne la propose pas à la vente. Chaque pièce est choisie avec le regard d'un passionné.
            </p>
          </div>

          <div className="p-5 bg-obsidian-900 border border-obsidian-800 space-y-2">
            <Clock className="w-5 h-5 text-brass-400" />
            <h3 className="font-serif text-base text-ivory-100 font-medium">Exigence Prêt-à-Porter</h3>
            <p className="text-xs text-sand leading-relaxed">
              La majorité de nos montres sont révisées ou contrôlées chronométriquement afin de garantir une fiabilité quotidienne irréprochable.
            </p>
          </div>

          <div className="p-5 bg-obsidian-900 border border-obsidian-800 space-y-2">
            <Award className="w-5 h-5 text-brass-400" />
            <h3 className="font-serif text-base text-ivory-100 font-medium">Garantie 12 Mois</h3>
            <p className="text-xs text-sand leading-relaxed">
              Nous engageons notre responsabilité écrite : 12 mois de garantie mécanique sur le bon fonctionnement du calibre.
            </p>
          </div>
        </div>

        <h2 className="font-serif text-2xl text-ivory-100 font-normal pt-4">Une Relation Directe et Indépendante</h2>
        <p>
          Basé dans la région lyonnaise, j’accueille les passionnés dans mon showroom privé sur rendez-vous et j’assure un accompagnement sur-mesure à distance pour chaque amateur. Je prépare et scelle personnellement chaque envoi avec le plus grand soin, sécurisé et assuré à 100% de la valeur de la pièce.
        </p>

        <div className="p-8 bg-obsidian-900 border border-brass-600/30 text-center space-y-3 my-8">
          <p className="font-serif text-base sm:text-lg text-ivory-100 font-normal uppercase tracking-wide leading-relaxed">
            « Derrière chaque montre se cache une histoire. Ma mission est de vous aider à transmettre la vôtre. »
          </p>
          <div className="text-[11px] font-mono text-brass-400 uppercase tracking-[0.25em] font-semibold">
            — Nyle Abderrahman • Fondateur
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigateTo('catalogue')}
            className="px-8 py-3.5 bg-brass-500 hover:bg-brass-400 text-obsidian-950 text-xs uppercase tracking-widest font-semibold"
          >
            Voir les montres disponibles
          </button>
          <button
            onClick={openShowroomModal}
            className="px-8 py-3.5 bg-obsidian-900 text-ivory-100 border border-obsidian-700 hover:border-brass-400 text-xs uppercase tracking-widest"
          >
            Prendre rendez-vous à Lyon
          </button>
        </div>

      </div>

    </div>
  );
}
