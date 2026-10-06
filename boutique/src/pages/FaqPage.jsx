import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';

export default function FaqPage() {
  const [openItems, setOpenItems] = useState({});

  const toggle = (id) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [
    {
      title: "Authenticité & Contrôle Technique",
      questions: [
        {
          id: 'auth-1',
          q: "Comment garantissez-vous l'authenticité de vos montres ?",
          a: "Chaque pièce est systématiquement ouverte dans notre atelier d'horlogerie. Nous examinons le calibre au binoculaire, vérifions l'alignement des gravures et des numéros de série avec les archives de la manufacture, et validons la cohérence d'époque de chaque élément (cadran, aiguilles, lunette, fond de boîte). Une facture détaillée attestant de l'authenticité juridique vous est délivrée."
        },
        {
          id: 'auth-2',
          q: "Les montres sont-elles toutes révisées avant la mise en vente ?",
          a: "Oui, la majorité de nos pièces bénéficient d'une révision complète ou d'un contrôle rigoureux incluant le diagnostic d'amplitude, de précision chronométrique et de réserve de marche. La date de dernière révision est systématiquement indiquée sur la fiche de la montre."
        },
        {
          id: 'auth-3',
          q: "L'étanchéité est-elle garantie sur vos montres vintage ?",
          a: "Sur les garde-temps anciens (vintage et néo-vintage), l'étanchéité d'origine ne peut jamais être garantie pour un usage aquatique régulier, les boîtiers et joints d'époque n'étant pas conçus pour supporter la baignade moderne. Nous vous recommandons de préserver ces pièces historiques de tout contact avec l'eau."
        }
      ]
    },
    {
      title: "Commandes & Moyens de Paiement",
      questions: [
        {
          id: 'pay-1',
          q: "Quels sont les modes de règlement acceptés ?",
          a: "Vous pouvez régler votre commande directement sur notre site par Carte Bancaire (Visa, Mastercard avec 3D-Secure), Apple Pay, Google Pay, en paiement échelonné en 3x ou 4x sans frais via Alma, ou par virement bancaire instantané SEPA."
        },
        {
          id: 'pay-2',
          q: "Comment fonctionne le paiement en 3x ou 4x avec Alma ?",
          a: "Au moment du paiement, sélectionnez l'option Alma. La première mensualité est prélevée immédiatement, et les suivantes à 30, 60 et 90 jours. La décision est instantanée et sans formalité administrative lourde."
        },
        {
          id: 'pay-3',
          q: "Puis-je régler sur place lors d'un rendez-vous au showroom de Lyon ?",
          a: "Absolument. Lors de votre visite à Communay (région lyonnaise), vous pouvez régler par carte bancaire ou virement instantané validé sur place après avoir essayé la montre."
        }
      ]
    },
    {
      title: "Livraison Sécurisée & Assurance",
      questions: [
        {
          id: 'ship-1',
          q: "Quels sont les délais d'expédition ?",
          a: "Les commandes sont expédiées sous 48 heures ouvrées après validation du paiement. Vous recevez immédiatement par email et SMS le lien de suivi sécurisé en temps réel."
        },
        {
          id: 'ship-2',
          q: "Le colis est-il assuré en cas de perte ou de dommage ?",
          a: "Oui, à 100% de la valeur de la montre. Nous faisons appel à des transporteurs de sécurité spécialisés avec remise en main propre exclusive contre signature et vérification d'identité. Le colis est anonymisé pour des raisons de discrétion absolue."
        },
        {
          id: 'ship-3',
          q: "Livrez-vous à l'international ?",
          a: "Nous livrons en France métropolitaine, en Corse, à Monaco, ainsi que dans l'ensemble des pays de l'Union Européenne et en Suisse."
        }
      ]
    },
    {
      title: "Garantie 12 Mois & Retours",
      questions: [
        {
          id: 'gar-1',
          q: "Que couvre exactement la garantie mécanique de 12 mois ?",
          a: "Notre garantie couvre l'ensemble des dysfonctionnements mécaniques imputables au calibre (arrêt anormal, dérive excessive de précision, dysfonctionnement du remontoir ou de la date rapide). Elle exclut les dégradations liées aux chocs, chutes, ouverture par un tiers non agréé ou immersion aquatique."
        },
        {
          id: 'gar-2',
          q: "Comment s'applique le droit de rétractation de 14 jours ?",
          a: "Conformément à la loi, vous disposez d'un délai de 14 jours calendaires dès réception du colis pour retourner la pièce. Chaque montre est munie d'un scellé de sécurité numéroté : pour que le retour et le remboursement intégral soient accordés, ce scellé doit être rigoureusement intact et non retiré."
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase tracking-widest text-brass-400 font-bold">Foire Aux Questions</span>
        <h1 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal">
          Questions Fréquentes
        </h1>
        <p className="text-xs sm:text-sm text-sand leading-relaxed max-w-lg mx-auto">
          Toutes les réponses à vos interrogations sur l'authenticité, la garantie, le paiement en plusieurs fois et la livraison sécurisée.
        </p>
      </div>

      {/* Accordion Categories */}
      <div className="space-y-10">
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="font-serif text-xl text-ivory-100 font-medium border-b border-obsidian-800 pb-2">
              {cat.title}
            </h2>
            <div className="space-y-2.5">
              {cat.questions.map(q => {
                const isOpen = openItems[q.id];
                return (
                  <div key={q.id} className="bg-obsidian-900 border border-obsidian-800 transition-colors">
                    <button
                      onClick={() => toggle(q.id)}
                      className="w-full text-left p-4 flex items-center justify-between gap-4 text-xs sm:text-sm font-medium text-ivory-100 hover:text-brass-300 transition-colors"
                    >
                      <span>{q.q}</span>
                      <ChevronDown className={`w-4 h-4 text-brass-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 text-xs sm:text-sm text-sand/90 leading-relaxed border-t border-obsidian-800/60 mt-1">
                        {q.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Need more help */}
      <div className="p-8 bg-obsidian-900 border border-obsidian-800 text-center space-y-4">
        <h3 className="font-serif text-xl text-ivory-100">Vous avez une question spécifique sur un modèle ?</h3>
        <p className="text-xs text-sand max-w-md mx-auto">
          Nyle Abderrahman vous répond directement par WhatsApp pour toute demande d'information ou photo complémentaire.
        </p>
        <a
          href="https://wa.me/33756998976"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brass-500 hover:bg-brass-400 text-obsidian-950 font-semibold text-xs uppercase tracking-widest transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Échanger sur WhatsApp (+33 7 56 99 89 76)
        </a>
      </div>

    </div>
  );
}
