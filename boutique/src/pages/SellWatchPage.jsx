import React, { useState } from 'react';
import { Upload, CheckCircle2, ShieldCheck, Clock, Landmark, ArrowRight, ArrowLeft } from 'lucide-react';

export default function SellWatchPage() {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    brand: 'Rolex',
    model: '',
    year: '',
    condition: 'Très bon état',
    hasBox: true,
    hasPapers: false,
    revisionHistory: '',
    expectedPrice: '',
    name: '',
    phone: '',
    email: '',
    city: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] uppercase tracking-widest text-brass-400 font-bold">Rachat Cash & Dépôt-Vente</span>
        <h1 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal">
          Transmettez Votre Montre au Juste Prix
        </h1>
        <p className="text-xs sm:text-sm text-sand leading-relaxed">
          Nous étudions l’ensemble des pièces d’horlogerie de prestige (Rolex, Cartier, Tudor, Omega, TAG Heuer...). Estimation gratuite et confidentielle sous 48 heures.
        </p>
      </div>

      {/* 2 Formulas Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-obsidian-900 border border-obsidian-800 space-y-3">
          <div className="flex items-center gap-2 text-brass-400 font-semibold text-xs uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            Option 1 : Rachat Comptant Immédiat
          </div>
          <h3 className="font-serif text-lg text-ivory-100">Liquidité Rapide & Sécurisée</h3>
          <p className="text-xs text-sand/80 leading-relaxed">
            Idéal si vous souhaitez une transaction immédiate. Après validation de l'état mécanique et esthétique en atelier ou à notre showroom de Lyon, le virement instantané est exécuté sous 24h.
          </p>
        </div>

        <div className="p-6 bg-obsidian-900 border border-obsidian-800 space-y-3">
          <div className="flex items-center gap-2 text-brass-400 font-semibold text-xs uppercase tracking-wider">
            <Landmark className="w-4 h-4" />
            Option 2 : Dépôt-Vente Optimisé
          </div>
          <h3 className="font-serif text-lg text-ivory-100">Prix Net Vendeur Maximal</h3>
          <p className="text-xs text-sand/80 leading-relaxed">
            Votre garde-temps est photographié en studio haute résolution, révisé si nécessaire et exposé à notre réseau de collectionneurs. Commission transparente convenue dès le départ.
          </p>
        </div>
      </div>

      {/* Form Wizard */}
      <div className="bg-obsidian-900 border border-obsidian-800 p-8 shadow-2xl relative">
        
        {isSuccess ? (
          <div className="text-center py-12 space-y-5">
            <div className="w-20 h-20 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-3xl text-ivory-100 font-medium">Demande d'Estimation Envoyée</h2>
            <p className="text-xs sm:text-sm text-sand max-w-md mx-auto leading-relaxed">
              Merci <strong className="text-ivory-100">{formData.name}</strong>. Nyle Abderrahman étudie personnellement votre dossier et vous fera parvenir une proposition détaillée par téléphone ou e-mail sous 48 heures ouvrées.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setStep(1);
                }}
                className="px-6 py-2.5 bg-obsidian-950 text-sand hover:text-ivory-100 border border-obsidian-700 text-xs uppercase tracking-widest"
              >
                Soumettre une autre pièce
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Steps indicator */}
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4 text-xs">
              <span className={`uppercase tracking-wider ${step >= 1 ? 'text-brass-400 font-semibold' : 'text-sand/50'}`}>
                1. La Montre
              </span>
              <span className="text-obsidian-700">•</span>
              <span className={`uppercase tracking-wider ${step >= 2 ? 'text-brass-400 font-semibold' : 'text-sand/50'}`}>
                2. Boîte & Papiers
              </span>
              <span className="text-obsidian-700">•</span>
              <span className={`uppercase tracking-wider ${step >= 3 ? 'text-brass-400 font-semibold' : 'text-sand/50'}`}>
                3. Photos
              </span>
              <span className="text-obsidian-700">•</span>
              <span className={`uppercase tracking-wider ${step >= 4 ? 'text-brass-400 font-semibold' : 'text-sand/50'}`}>
                4. Coordonnées
              </span>
            </div>

            {/* Step 1: The Watch */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-serif text-xl text-ivory-100 font-medium">1. Informations sur la montre</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Marque / Manufacture *</label>
                    <select
                      value={formData.brand}
                      onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                    >
                      <option value="Rolex">Rolex</option>
                      <option value="Cartier">Cartier</option>
                      <option value="Tudor">Tudor</option>
                      <option value="Omega">Omega</option>
                      <option value="TAG Heuer">TAG Heuer</option>
                      <option value="Jaeger-LeCoultre">Jaeger-LeCoultre</option>
                      <option value="Breitling">Breitling</option>
                      <option value="Autre">Autre manufacture de luxe</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Modèle / Référence *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Datejust 16234, Santos Galbée 1564..."
                      value={formData.model}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Année approximative ou exacte</label>
                    <input
                      type="text"
                      placeholder="Ex: 1989, 1995, 2010..."
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">État esthétique général</label>
                    <select
                      value={formData.condition}
                      onChange={(e) => setFormData({...formData, condition: e.target.value})}
                      className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                    >
                      <option value="Comme neuf / Parfait">Comme neuf / Très peu portée</option>
                      <option value="Très bon état">Très bon état (micro-rayures d'usage normales)</option>
                      <option value="Bon état vintage">Bon état vintage avec patine</option>
                      <option value="À réviser / Polissage à prévoir">Nécessite une révision ou un polissage</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 bg-brass-500 hover:bg-brass-400 text-obsidian-950 text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
                  >
                    Suivant <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Box & Papers */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-serif text-xl text-ivory-100 font-medium">2. Écrin & Documents d'origine</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-obsidian-950 border border-obsidian-800 space-y-2">
                    <span className="text-sand/80 uppercase text-[10px] tracking-wider font-semibold block">Boîte / Écrin</span>
                    <label className="flex items-center gap-2 text-ivory-100 cursor-pointer">
                      <input
                        type="radio"
                        name="box"
                        checked={formData.hasBox}
                        onChange={() => setFormData({...formData, hasBox: true})}
                        className="accent-brass-500"
                      />
                      <span>Oui, j'ai la boîte / sur-boîte d'origine</span>
                    </label>
                    <label className="flex items-center gap-2 text-sand cursor-pointer">
                      <input
                        type="radio"
                        name="box"
                        checked={!formData.hasBox}
                        onChange={() => setFormData({...formData, hasBox: false})}
                        className="accent-brass-500"
                      />
                      <span>Non, montre seule</span>
                    </label>
                  </div>

                  <div className="p-4 bg-obsidian-950 border border-obsidian-800 space-y-2">
                    <span className="text-sand/80 uppercase text-[10px] tracking-wider font-semibold block">Papiers & Garantie d'origine</span>
                    <label className="flex items-center gap-2 text-ivory-100 cursor-pointer">
                      <input
                        type="radio"
                        name="papers"
                        checked={formData.hasPapers}
                        onChange={() => setFormData({...formData, hasPapers: true})}
                        className="accent-brass-500"
                      />
                      <span>Oui, carte de garantie / certificat perforé</span>
                    </label>
                    <label className="flex items-center gap-2 text-sand cursor-pointer">
                      <input
                        type="radio"
                        name="papers"
                        checked={!formData.hasPapers}
                        onChange={() => setFormData({...formData, hasPapers: false})}
                        className="accent-brass-500"
                      />
                      <span>Non (ou facture de révision ultérieure)</span>
                    </label>
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Historique d'entretien / Révisions connues</label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Révisée chez horloger agréé en 2024, étanchéité refaite..."
                    value={formData.revisionHistory}
                    onChange={(e) => setFormData({...formData, revisionHistory: e.target.value})}
                    className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-2.5 bg-obsidian-950 text-sand hover:text-ivory-100 border border-obsidian-700 text-xs uppercase tracking-widest flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Précédent
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 bg-brass-500 hover:bg-brass-400 text-obsidian-950 text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
                  >
                    Suivant <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Photos */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-serif text-xl text-ivory-100 font-medium">3. Photographies de votre garde-temps</h3>
                <p className="text-xs text-sand">
                  Pour une estimation précise, 3 ou 4 clichés sous éclairage naturel suffisent (cadran, boucle, fond de boîte).
                </p>

                <div className="border-2 border-dashed border-obsidian-700 hover:border-brass-500/60 bg-obsidian-950 p-8 text-center cursor-pointer space-y-3">
                  <Upload className="w-8 h-8 text-brass-400 mx-auto" />
                  <div className="text-xs text-ivory-100 font-medium">
                    Glissez-déposez vos photos ici ou cliquez pour parcourir
                  </div>
                  <div className="text-[10px] text-sand/60">
                    Formats acceptés : JPG, PNG, HEIC (jusqu’à 15 Mo par photo)
                  </div>
                </div>

                <div className="p-4 bg-obsidian-950 border border-obsidian-800 text-xs text-sand flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brass-400 shrink-0" />
                  <span>Si vous préférez, vous pouvez nous transmettre vos photos directement par WhatsApp au <strong>07 56 99 89 76</strong>.</span>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 bg-obsidian-950 text-sand hover:text-ivory-100 border border-obsidian-700 text-xs uppercase tracking-widest flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Précédent
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="px-6 py-2.5 bg-brass-500 hover:bg-brass-400 text-obsidian-950 text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
                  >
                    Suivant <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Contact & Target Price */}
            {step === 4 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-serif text-xl text-ivory-100 font-medium">4. Vos coordonnées & Montant souhaité</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Prix net espéré (€)</label>
                    <input
                      type="text"
                      placeholder="Ex: 4 500 € (laisser vide si vous souhaitez notre avis)"
                      value={formData.expectedPrice}
                      onChange={(e) => setFormData({...formData, expectedPrice: e.target.value})}
                      className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Nom & Prénom *</label>
                    <input
                      type="text"
                      required
                      placeholder="Votre nom complet"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Téléphone mobile *</label>
                    <input
                      type="tel"
                      required
                      placeholder="06 •• •• •• ••"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Adresse e-mail *</label>
                    <input
                      type="email"
                      required
                      placeholder="votre.email@exemple.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-sand/80 uppercase text-[10px] tracking-wider mb-1">Précisions supplémentaires pour l’horloger</label>
                  <textarea
                    rows={3}
                    placeholder="Précisez tout détail : boucle d'origine, rayure spécifique, montre de famille..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-obsidian-950 border border-obsidian-700 px-3 py-2 text-ivory-100 focus:border-brass-400 focus:outline-none"
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 bg-obsidian-950 text-sand hover:text-ivory-100 border border-obsidian-700 text-xs uppercase tracking-widest flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Précédent
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-brass-500 hover:bg-brass-400 text-obsidian-950 text-xs uppercase tracking-widest font-bold shadow-xl transition-colors"
                  >
                    Envoyer ma demande d'estimation gratuite
                  </button>
                </div>
              </div>
            )}

          </form>
        )}

      </div>

    </div>
  );
}
