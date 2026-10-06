import React from 'react';
import { ShieldCheck, Check, Clock, Search, FileText, Lock, Award, Wrench } from 'lucide-react';
import CertificationStampSvg from '../components/CertificationStampSvg';
import ChronocomparateurSvg from '../components/ChronocomparateurSvg';
import HorlogerieMechanismSvg from '../components/HorlogerieMechanismSvg';

export default function TrustPage({ navigateTo }) {
  const protocolPoints = [
    { title: "Ouverture du boîtier", desc: "Inspection visuelle et mécanique du calibre en atelier horloger sous binoculaire haute définition." },
    { title: "Authenticité des pièces", desc: "Contrôle de conformité de chaque composant : masse oscillante, ponts, coq, roue d'échappement et chatons." },
    { title: "Numéros de série & Concordance", desc: "Vérification rigoureuse du numéro de série gravé entre les cornes, concordance millésime et base constructeur." },
    { title: "Contrôle de légitimité & Registres", desc: "Validation de la chaîne de propriété légale et interrogation des bases de données internationales d'objets volés (The Watch Register)." },
    { title: "Intégrité du cadran & Aiguilles", desc: "Examen à la loupe x10 : authenticité de la typographie, absence de repeint maladroit, patine homogène au tritium ou luminova." },
    { title: "Banc de mesure chronocomparateur", desc: "Mesure acoustique de la marche diurne (dérive réglée entre 0 et +6 secondes/jour selon les standards COSC)." },
    { title: "Mesure de l'amplitude du balancier", desc: "Vérification de l'angle d'oscillation (270° à 315°), attestant de la tonicité du ressort de barillet et de la lubrification." },
    { title: "Repère d'échappement (Beat Error)", desc: "Ajustement du point mort (inférieur à 0.4 ms) pour une alternance symétrique et une régularité chronométrique sans à-coups." },
    { title: "Autonomie & Réserve de marche", desc: "Contrôle en continu de la réserve de marche (40h à 72h selon manufacture) conforme aux spécifications d'origine." },
    { title: "Mécanisme de date & Passage minuit", desc: "Test du saut instantané ou progressif du guichet de date et du correcteur rapide à la couronne (Quickset)." },
    { title: "Axe de remontoir & Friction couronne", desc: "Contrôle du débrayage du rotor automatique, de la douceur du remontage manuel et de l'intégrité du pas de vis." },
    { title: "Alignement vertical des aiguilles", desc: "Contrôle micrométrique du jeu de hauteur entre heure, minute et trotteuse centrale pour éliminer tout frottement." },
    { title: "Bridage de mouvement & Antichoc", desc: "Vérification du serrage des vis de bride de boîte et de l'état des ressorts amortisseurs (Incabloc, Paraflex ou Kif)." },
    { title: "Arêtes, chanfreins & Boîtier", desc: "Inspection scrupuleuse des volumes de boîte : absence de polissage excessif, préservation des biseaux et satinés d'usine." },
    { title: "Lunette & Inserts d'époque", desc: "Contrôle de la clarté des cannelures (or 18k) ou de la rotation unidirectionnelle franche des lunettes de plongée." },
    { title: "Glace saphir ou Plexiglas cyclo-pôle", desc: "Examen sous lumière rasante : étanchéité structurelle du joint de glace, absence d'ébréchure ou de micro-fissure." },
    { title: "Tension & Stretch du bracelet", desc: "Mesure de la tenue des maillons métalliques (Jubilé, Oyster, Grain de riz) et contrôle des goupilles de maillons vissés." },
    { title: "Fermoir, lames & Boucle déployante", desc: "Fermeture audible et sécurisée de la boucle avec cran de sûreté franc et gravures de codes fermoir d'époque." },
    { title: "Décontamination & Nettoyage externe", desc: "Passage aux ultrasons de la carrure nue et du bracelet dans un bain dégraissant doux spécifique à l'horlogerie." },
    { title: "Scellé d'inviolabilité & Passeport", desc: "Pose d'un scellé de sécurité numéroté et émission du certificat d'authenticité et de garantie 12 mois Le Mouvement." },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Header with Official Animated Hallmark Stamp */}
      <div className="relative text-center max-w-3xl mx-auto space-y-4">
        <div className="flex justify-center mb-2">
          <CertificationStampSvg className="w-24 h-24 sm:w-28 sm:h-28" />
        </div>
        <div className="inline-flex items-center gap-2 text-[10px] uppercase font-mono tracking-[0.25em] text-brass-400 font-semibold px-3 py-1 bg-obsidian-900 border border-brass-600/30">
          <ShieldCheck className="w-3.5 h-3.5" />
          Protocole Officiel de Contrôle Horloger
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal tracking-[0.03em] uppercase leading-tight">
          Protocole 20 Points & Certification d'Authenticité
        </h1>
        <p className="text-xs sm:text-sm text-sand leading-relaxed font-light max-w-2xl mx-auto">
          Chaque montre de notre collection fait l'objet d'un examen méthodique exhaustif. De l'auscultation du balancier au contrôle de provenance sur registres internationaux, nous engageons notre responsabilité écrite sur chaque pièce.
        </p>
      </div>

      {/* Interactive Atelier Demonstration: Chronocomparateur & Live Calibre */}
      <section className="bg-obsidian-900 border border-obsidian-800 p-6 sm:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brass-400 font-semibold">
            Banc de Mesure Métrologique
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-ivory-100 font-normal uppercase tracking-wide">
            Test Acoustique & Chronométrie en Atelier
          </h2>
          <p className="text-xs text-sand/80 font-light">
            Capture en temps réel des battements de l'ancre suisse (28 800 A/h) par microphone piézoélectrique.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Live SVG Chronocomparateur */}
          <div className="lg:col-span-7">
            <ChronocomparateurSvg className="w-full shadow-2xl" rate="+02" amplitude="295°" beatError="0.1ms" />
          </div>

          {/* Right: Live Mechanical Movement Caliber */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-obsidian-950 border border-obsidian-800 text-center">
            <HorlogerieMechanismSvg className="w-48 h-48 sm:w-56 sm:h-56" />
            <div className="mt-4 pt-3 border-t border-obsidian-850 w-full">
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-brass-400 font-medium block">
                Oscillation Harmonique
              </span>
              <span className="font-serif text-xs text-ivory-200 mt-0.5 block">
                Balancier Glucydur • Spirale Nivarox • 4 Hz
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 20 Points Inspection Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-obsidian-800 pb-4">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brass-400 font-semibold">
              Inspection Exhaustive
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ivory-100 font-normal uppercase tracking-wide mt-1">
              Les 20 Points du Protocole d'Atelier
            </h2>
          </div>
          <span className="text-xs text-sand/70 font-mono mt-2 sm:mt-0">
            20 / 20 VALIDÉS AVANT MISE EN VENTE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {protocolPoints.map((point, idx) => (
            <div key={idx} className="p-4 bg-obsidian-900 border border-obsidian-800 flex items-start gap-3.5 hover:border-brass-600/40 transition-colors">
              <span className="w-7 h-7 rounded bg-obsidian-950 border border-brass-600/40 text-brass-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </span>
              <div className="space-y-1">
                <h3 className="font-serif uppercase tracking-wide text-xs text-ivory-100 font-normal">
                  {point.title}
                </h3>
                <p className="text-sand/80 text-[11px] leading-relaxed font-light">
                  {point.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The 12-Month Guarantee Banner */}
      <section className="p-8 sm:p-12 bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-brass-600/40 space-y-6 relative overflow-hidden">
        <div className="flex items-center gap-2 text-brass-400 font-mono font-semibold text-xs uppercase tracking-widest">
          <Clock className="w-4 h-4" />
          Garantie Commerciale & Sérénité
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl text-ivory-100 font-normal uppercase tracking-wide">
          Garantie Mécanique Contractuelle de 12 Mois
        </h2>

        <p className="text-xs sm:text-sm text-sand leading-relaxed font-light max-w-3xl">
          Toutes nos montres bénéficient d’une garantie mécanique contractuelle de 12 mois à compter de la date de livraison. Cette garantie couvre le fonctionnement intégral du mouvement, la régularité chronométrique et le mécanisme de calendrier.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-sand/85 font-light">
          <div className="p-4 bg-obsidian-950 border border-obsidian-800 space-y-1">
            <strong className="text-ivory-100 font-medium block uppercase text-[11px] font-mono text-brass-300">
              Prise en charge intégrale
            </strong>
            <p className="text-[11px] leading-relaxed">
              En cas d'anomalie mécanique couverte durant 1 an, la remise en état est effectuée sans frais dans notre atelier horloger de référence.
            </p>
          </div>
          <div className="p-4 bg-obsidian-950 border border-obsidian-800 space-y-1">
            <strong className="text-ivory-100 font-medium block uppercase text-[11px] font-mono text-brass-300">
              Scellé de sécurité Le Mouvement
            </strong>
            <p className="text-[11px] leading-relaxed">
              La montre vous est livrée scellée. Vous disposez de 14 jours légaux pour la faire expertiser chez l'artisan horloger indépendant de votre choix.
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigateTo('catalogue')}
            className="px-8 py-3.5 bg-brass-500 hover:bg-brass-400 text-obsidian-950 font-semibold text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer"
          >
            Explorer les pièces certifiées
          </button>
          <button
            onClick={() => navigateTo('contact')}
            className="px-8 py-3.5 bg-obsidian-950 hover:bg-obsidian-900 text-ivory-100 border border-obsidian-700 text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
          >
            Contacter notre atelier
          </button>
        </div>
      </section>

    </div>
  );
}
