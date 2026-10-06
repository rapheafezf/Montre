import React, { useState } from 'react';

export default function LegalPage({ initialTab = 'cgv' }) {
  const [tab, setTab] = useState(initialTab);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Tab Switcher */}
      <div className="flex border-b border-obsidian-800 text-xs uppercase tracking-wider">
        <button
          onClick={() => setTab('cgv')}
          className={`pb-3 px-4 transition-colors ${tab === 'cgv' ? 'text-brass-400 border-b-2 border-brass-400 font-bold' : 'text-sand hover:text-ivory-100'}`}
        >
          Conditions Générales de Vente (CGV)
        </button>
        <button
          onClick={() => setTab('mentions')}
          className={`pb-3 px-4 transition-colors ${tab === 'mentions' ? 'text-brass-400 border-b-2 border-brass-400 font-bold' : 'text-sand hover:text-ivory-100'}`}
        >
          Mentions Légales
        </button>
        <button
          onClick={() => setTab('rgpd')}
          className={`pb-3 px-4 transition-colors ${tab === 'rgpd' ? 'text-brass-400 border-b-2 border-brass-400 font-bold' : 'text-sand hover:text-ivory-100'}`}
        >
          Confidentialité & RGPD
        </button>
      </div>

      {tab === 'cgv' && (
        <div className="space-y-6 text-xs sm:text-sm text-sand leading-relaxed">
          <h1 className="font-serif text-2xl sm:text-3xl text-ivory-100 font-normal">
            Conditions Générales de Vente
          </h1>
          <p>
            Les présentes Conditions Générales de Vente régissent l'ensemble des transactions effectuées sur le site <strong>lemouvement-watches.fr</strong>. Toute commande passée implique l'acceptation sans réserve de ces conditions.
          </p>

          <h3 className="font-serif text-lg text-ivory-100 font-medium pt-2">Article 1 : Identité du Vendeur</h3>
          <p>
            Le site est édité par l'entreprise individuelle Le Mouvement, représentée par M. Nyle ABDERRAHMAN, SIRET : 883 775 017 00014, ayant son siège social au 2 RUE DU MAGNOLIA, 69360 COMMUNAY (France).
          </p>

          <h3 className="font-serif text-lg text-ivory-100 font-medium pt-2">Article 2 : Produits & Caractère Vintage</h3>
          <p>
            Les produits proposés sont des montres d'occasion, de collection et vintage. Par leur nature et leur millésime, ces pièces peuvent présenter de légères traces d'usage normales qui sont détaillées avec transparence dans les photographies et la fiche technique. L'étanchéité d'époque n'est jamais garantie pour une immersion aquatique.
          </p>

          <h3 className="font-serif text-lg text-ivory-100 font-medium pt-2">Article 3 : Prix & Modalités de Règlement</h3>
          <p>
            Les prix sont libellés en Euros (€) toutes taxes comprises. Le paiement peut s'effectuer en ligne par Carte Bancaire sécurisée (3D Secure), Apple Pay, facilités de paiement échelonné en 3x ou 4x sans frais via Alma, ou par virement bancaire instantané SEPA.
          </p>

          <h3 className="font-serif text-lg text-ivory-100 font-medium pt-2">Article 4 : Délais de Livraison & Transport Sécurisé</h3>
          <p>
            Les commandes sont préparées et expédiées sous un délai maximum de <strong>2 jours ouvrés (48 heures)</strong>. L'expédition s'effectue en valeur déclarée (assurée à 100% de la valeur de la montre) avec remise exclusive contre signature du destinataire.
          </p>

          <h3 className="font-serif text-lg text-ivory-100 font-medium pt-2">Article 5 : Droit de Rétractation (14 jours) & Scellé de Sécurité</h3>
          <p>
            Conformément à l’article L221-18 du Code de la consommation, l'acheteur dispose d'un délai de 14 jours calendaires à compter de la réception pour exercer son droit de rétractation.
            <br />
            <strong>Condition impérative :</strong> Un scellé de sécurité numéroté est apposé sur chaque montre. Pour que le retour soit validé et remboursé, ce scellé doit être strictement intact et non manipulé. Tout scellé rompu interdira le retour pour prévenir toute altération ou substitution mécanique.
          </p>

          <h3 className="font-serif text-lg text-ivory-100 font-medium pt-2">Article 6 : Garantie Commerciale 12 Mois</h3>
          <p>
            Chaque montre bénéficie d'une garantie mécanique contractuelle de 12 mois à compter de la date de livraison, couvrant le fonctionnement correct du mouvement. Les chocs, chutes et immersions aquatiques en sont exclus.
          </p>
        </div>
      )}

      {tab === 'mentions' && (
        <div className="space-y-6 text-xs sm:text-sm text-sand leading-relaxed">
          <h1 className="font-serif text-2xl sm:text-3xl text-ivory-100 font-normal">
            Mentions Légales
          </h1>
          <p>
            Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l’économie numérique (L.C.E.N.) :
          </p>

          <div className="p-6 bg-obsidian-900 border border-obsidian-800 space-y-2 text-xs">
            <div><strong>Dénomination sociale :</strong> Le Mouvement (Entreprise Individuelle)</div>
            <div><strong>Représentant légal :</strong> M. Nyle ABDERRAHMAN</div>
            <div><strong>Siège social & Showroom :</strong> 2 RUE DU MAGNOLIA, 69360 COMMUNAY (France)</div>
            <div><strong>Numéro SIRET :</strong> 883 775 017 00014</div>
            <div><strong>Directeur de la publication :</strong> Nyle ABDERRAHMAN</div>
            <div><strong>Contact e-mail :</strong> contact@lemouvement-watches.fr</div>
            <div><strong>Téléphone :</strong> +33 7 56 99 89 76</div>
          </div>

          <h3 className="font-serif text-lg text-ivory-100 font-medium pt-2">Hébergement</h3>
          <p>
            Le site est hébergé sur une infrastructure cloud haute performance sécurisée garantissant le chiffrement SSL 256 bits et la conformité aux normes PCI-DSS de niveau 1.
          </p>
        </div>
      )}

      {tab === 'rgpd' && (
        <div className="space-y-6 text-xs sm:text-sm text-sand leading-relaxed">
          <h1 className="font-serif text-2xl sm:text-3xl text-ivory-100 font-normal">
            Politique de Confidentialité & RGPD
          </h1>
          <p>
            Le Mouvement s'engage à respecter scrupuleusement la vie privée de ses clients et utilisateurs, conformément au Règlement Général sur la Protection des Données (RGPD 2016/679) et à la loi Informatique et Libertés.
          </p>

          <h3 className="font-serif text-lg text-ivory-100 font-medium pt-2">Collecte & Finalités</h3>
          <p>
            Les informations collectées (nom, adresse de livraison, email, téléphone) sont strictement destinées au traitement des commandes, à la transmission des numéros de suivi du transporteur sécurisé et au suivi de la garantie 12 mois. Vos données ne sont jamais cédées ni vendues à aucun tiers.
          </p>

          <h3 className="font-serif text-lg text-ivory-100 font-medium pt-2">Vos Droits</h3>
          <p>
            Vous disposez d'un droit d'accès, de rectification, de portabilité et de suppression de vos données personnelles sur simple demande par email à : <strong>contact@lemouvement-watches.fr</strong>.
          </p>
        </div>
      )}

    </div>
  );
}
