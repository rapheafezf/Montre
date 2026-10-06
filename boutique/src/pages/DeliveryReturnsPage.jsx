import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Lock, CheckCircle2 } from 'lucide-react';

export default function DeliveryReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase tracking-widest text-brass-400 font-bold">Sécurité & Transparence</span>
        <h1 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal">
          Livraison & Droit de Retour
        </h1>
        <p className="text-xs sm:text-sm text-sand leading-relaxed max-w-lg mx-auto">
          L'envoi d'une montre de luxe requiert un protocole d'emballage et de transport hautement sécurisé.
        </p>
      </div>

      {/* Shipping details */}
      <div className="p-8 bg-obsidian-900 border border-obsidian-800 space-y-4 text-xs sm:text-sm text-sand leading-relaxed">
        <div className="flex items-center gap-2 text-brass-400 font-semibold text-xs uppercase tracking-wider">
          <Truck className="w-5 h-5" />
          1. Expédition Sous 48 Heures (Valeur Déclarée)
        </div>
        <h2 className="font-serif text-2xl text-ivory-100 font-normal">Transporteur Dédié & Suivi en Temps Réel</h2>
        <p>
          Toutes les commandes sont emballées avec le plus grand soin dans un emballage neutre et discret, scellé sous contrôle vidéo. L'expédition s'effectue sous 48 heures ouvrées après validation du paiement.
        </p>
        <ul className="space-y-2 pt-1 text-xs">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Assurance 100% Ad Valorem :</strong> Votre garde-temps est intégralement assuré à hauteur de sa valeur d'achat jusqu'à la remise physique entre vos mains.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Remise contre signature :</strong> Le livreur exige la présentation d'une pièce d'identité en cours de validité pour la remise du colis.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Destinations couvertes :</strong> France métropolitaine, Monaco, Suisse et l'ensemble de l'Union Européenne.</span>
          </li>
        </ul>
      </div>

      {/* Return policy & Security seal */}
      <div className="p-8 bg-obsidian-900 border border-obsidian-800 space-y-4 text-xs sm:text-sm text-sand leading-relaxed">
        <div className="flex items-center gap-2 text-brass-400 font-semibold text-xs uppercase tracking-wider">
          <RefreshCw className="w-5 h-5" />
          2. Droit de Rétractation de 14 Jours & Scellé de Sécurité
        </div>
        <h2 className="font-serif text-2xl text-ivory-100 font-normal">Achetez en Toute Sérénité</h2>
        <p>
          Conformément à l’article L221-18 du Code de la consommation, vous disposez d'un délai légal de 14 jours calendaires à compter de la réception de votre montre pour exercer votre droit de rétractation sans avoir à justifier de motif.
        </p>

        <div className="p-4 bg-obsidian-950 border border-brass-600/30 text-xs space-y-2 text-ivory-200">
          <div className="flex items-center gap-2 text-brass-400 font-semibold text-[11px] uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            Condition Impérative du Scellé Inviolable
          </div>
          <p className="leading-relaxed text-sand text-[11px]">
            Pour protéger l'acheteur comme le vendeur contre toute altération ou substitution de calibre, chaque montre est expédiée avec un scellé de sécurité scellé numéroté apposé sur le boîtier ou le bracelet.
            <br />
            <strong>Vous pouvez manipuler, admirer et faire expertiser la montre par l'horloger de votre choix avec ce scellé en place.</strong> En revanche, tout scellé rompu, coupé ou ré-assemblé annulera définitivement la faculté de retour.
          </p>
        </div>

        <p className="text-xs">
          En cas de retour conforme, le remboursement intégral est exécuté sous 48h ouvrées suivant la réception et la ré-inspection en atelier, via le même moyen de paiement utilisé lors de l'achat initial.
        </p>
      </div>

    </div>
  );
}
