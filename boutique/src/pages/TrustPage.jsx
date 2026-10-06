import React from 'react';
import { ShieldCheck, Check, Clock, Search, FileText, Lock } from 'lucide-react';

export default function TrustPage({ navigateTo }) {
  const protocolPoints = [
    { title: "Ouverture du boîtier", desc: "Inspection visuelle et mécanique du calibre en atelier horloger agréé." },
    { title: "Authenticité des pièces", desc: "Contrôle de conformité de chaque composant (masse oscillante, ponts, roue d'échappement)." },
    { title: "Numéros de série & Référence", desc: "Vérification de la concordance historique entre le millésime, le boîtier et les bases de données." },
    { title: "Contrôle de provenance", desc: "Validation de la légitimité de propriété et absence d'inscription sur les registres d'objets volés." },
    { title: "Intégrité du cadran", desc: "Examen à la loupe x10 : absence de retouche grossière, patine homogène des index et aiguilles." },
    { title: "Test sur chronocomparateur", desc: "Mesure de l'avance/retard quotidienne (précision réglée entre 0 et +8 secondes/jour)." },
    { title: "Mesure de l'amplitude", desc: "Vérification de l'angle d'oscillation du balancier (garantissant la santé du ressort de barillet)." },
    { title: "Repère (Beat Error)", desc: "Ajustement du point mort pour une pulsation symétrique et régulière du mouvement." },
    { title: "Réserve de marche", desc: "Contrôle continu de l'autonomie conforme aux normes d'origine de la manufacture." },
    { title: "Date rapide & Passage de minuit", desc: "Vérification du saut de date instantané et du réglage rapide (Quickset)." },
    { title: "Remontage & Friction de couronne", desc: "Test de la tige de remontoir, du vissage de la couronne et du débrayage automatique." },
    { title: "Jeu des aiguilles & Frottement", desc: "Contrôle de l'alignement vertical des aiguilles heures, minutes et seconde centrale." },
    { title: "Fixation du mouvement", desc: "Vérification des vis de bride de boîte et amortisseurs de choc (Incabloc / Kif)." },
    { title: "Chanfreins & Géométrie de boîte", desc: "Contrôle de l'épaisseur des cornes pour s'assurer que le boîtier n'a pas été sur-poli." },
    { title: "Lunette & Inserts", desc: "Intégrité de la lunette cannelée (or blanc/jaune) ou graduée, netteté des arêtes." },
    { title: "Verre saphir ou plexiglas", desc: "Examen sous plusieurs angles de lumière : clarté, absence de fêlure structurelle." },
    { title: "Tension du bracelet", desc: "Évaluation du stretch des maillons (Jubilé, Oyster, Grain de riz) et goupilles de sécurité." },
    { title: "Fermoir & Boucle déployante", desc: "Fermeture nette avec cran de sûreté ferme et gravures d'époque conformes." },
    { title: "Nettoyage ultrasonique", desc: "Bain de propreté externe pour la boîte et le bracelet métallique (sans solvant agressif)." },
    { title: "Pose du scellé de sécurité", desc: "Application d'un scellé inviolable numéroté garantissant l'intégrité avant expédition." },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] uppercase tracking-widest text-brass-400 font-bold">L'Exigence Technique</span>
        <h1 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal">
          Protocole en 20 Points & Authenticité
        </h1>
        <p className="text-xs sm:text-sm text-sand leading-relaxed">
          Acheter une montre de luxe d'occasion doit être une expérience sereine. Voici le protocole méthodique auquel chaque pièce est soumise avant d'intégrer notre collection.
        </p>
      </div>

      {/* 20 Points Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {protocolPoints.map((point, idx) => (
          <div key={idx} className="p-4 bg-obsidian-900 border border-obsidian-800 flex items-start gap-3 text-xs">
            <span className="w-6 h-6 rounded bg-obsidian-800 border border-obsidian-700 text-brass-400 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
              {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
            </span>
            <div>
              <h3 className="font-semibold text-ivory-100 text-xs">{point.title}</h3>
              <p className="text-sand/80 text-[11px] mt-0.5 leading-relaxed">{point.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* The 12-Month Guarantee */}
      <div className="p-8 bg-gradient-to-r from-obsidian-900 to-obsidian-850 border border-brass-600/30 space-y-4">
        <div className="flex items-center gap-2 text-brass-400 font-semibold text-xs uppercase tracking-wider">
          <Clock className="w-5 h-5" />
          La Garantie Commerciale 12 Mois
        </div>
        <h2 className="font-serif text-2xl text-ivory-100 font-normal">Notre Engagement Mécanique</h2>
        <p className="text-xs sm:text-sm text-sand leading-relaxed">
          Toutes nos montres bénéficient d’une garantie mécanique contractuelle de 12 mois à compter de la date de livraison. Cette garantie couvre le fonctionnement intégral du mouvement, la précision de marche et le mécanisme de calendrier.
        </p>
        <div className="pt-2 text-xs text-sand/80 space-y-1">
          <div>• <strong>Prise en charge :</strong> En cas d'anomalie mécanique couverte, la réparation est réalisée à nos frais par notre atelier partenaire.</div>
          <div>• <strong>Exclusions habituelles :</strong> Chocs violents, chutes, bris de verre ou dommage lié à l'eau (l'étanchéité n'étant jamais garantie sur les montres d'époque sauf révision contemporaine étanche mentionnée).</div>
        </div>
      </div>

    </div>
  );
}
