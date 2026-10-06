import React, { useState } from 'react';
import { GUIDES } from '../data/guides';
import { Clock, ArrowRight, X, ArrowLeft } from 'lucide-react';

export default function JournalPage() {
  const [selectedGuide, setSelectedGuide] = useState(null);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase tracking-widest text-brass-400 font-bold">Culture & Conseils</span>
        <h1 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal">
          Le Journal Horloger
        </h1>
        <p className="text-xs sm:text-sm text-sand leading-relaxed max-w-lg mx-auto">
          Analyses de références cultes, histoires de manufactures, patines et conseils de collectionneurs rédigés par Le Mouvement.
        </p>
      </div>

      {selectedGuide ? (
        <div className="bg-obsidian-900 border border-obsidian-800 p-6 sm:p-10 space-y-8 animate-in fade-in duration-200">
          <button
            onClick={() => setSelectedGuide(null)}
            className="text-xs uppercase tracking-widest text-brass-400 hover:text-brass-300 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Retour aux articles
          </button>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs text-sand">
              <span className="px-2 py-0.5 bg-obsidian-800 border border-obsidian-700 text-brass-400 font-semibold uppercase text-[10px]">
                {selectedGuide.category}
              </span>
              <span>•</span>
              <span>{selectedGuide.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {selectedGuide.readTime}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-ivory-100 font-normal leading-snug">
              {selectedGuide.title}
            </h2>
          </div>

          <div className="aspect-[16/9] max-h-96 w-full overflow-hidden border border-obsidian-800 bg-obsidian-950">
            <img
              src={selectedGuide.image}
              alt={selectedGuide.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-sand/90 leading-relaxed font-light">
            {selectedGuide.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-6 border-t border-obsidian-800 flex justify-between items-center">
            <button
              onClick={() => setSelectedGuide(null)}
              className="text-xs text-sand hover:text-ivory-100"
            >
              ← Retour au sommaire
            </button>
            <div className="text-xs text-brass-400 font-serif italic">
              Rédigé par la rédaction Le Mouvement
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GUIDES.map(guide => (
            <div
              key={guide.slug}
              onClick={() => setSelectedGuide(guide)}
              className="group bg-obsidian-900 border border-obsidian-800 hover:border-brass-500/50 transition-all cursor-pointer flex flex-col justify-between overflow-hidden shadow-lg"
            >
              <div className="aspect-[16/10] overflow-hidden bg-obsidian-950 relative">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-obsidian-950/90 text-brass-400 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 border border-obsidian-700">
                  {guide.category}
                </span>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-sand/70">
                    <span>{guide.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {guide.readTime}</span>
                  </div>
                  <h3 className="font-serif text-lg text-ivory-100 font-medium group-hover:text-brass-300 transition-colors line-clamp-2">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-sand/80 line-clamp-3 leading-relaxed">
                    {guide.excerpt}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1 text-xs text-brass-400 font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>Lire l'article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
