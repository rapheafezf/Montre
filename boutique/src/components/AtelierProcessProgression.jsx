import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, CheckCircle2, Activity, PenTool, Award, Clock, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROTOCOL_STEPS = [
  {
    number: '01',
    phase: 'Phase 01 • Traçabilité & Légalité',
    title: 'Sourcing Rigoureux & Contrôle Registres',
    desc: 'Chaque montre acquise fait l’objet d’une vérification systématique auprès de la base de données internationale The Watch Register contre le vol et la contrefaçon. Contrôle physique au binoculaire des gravures de boîte et de fond.',
    stats: '100% Vérifié Perte & Vol',
    badge: 'Traçabilité Certifiée',
    image: 'https://lemouvement-watches.fr/cdn/shop/files/DSC02450.jpg?width=900',
    icon: ShieldCheck
  },
  {
    number: '02',
    phase: 'Phase 02 • Métrologie Horlogère',
    title: 'Auscultation au Chronocomparateur',
    desc: 'Mesure de l’amplitude du balancier dans les 5 positions horlogères traditionnelles (Cadran Haut, Bas, Couronne Gauche, Droite, Bas). Contrôle de l’erreur de repère (Beat Error < 0.3 ms) et test d’étanchéité à la cloche sous dépression.',
    stats: "Amplitude > 280° • Dérive ±2 s/j",
    badge: 'Chronométrie Optimale',
    image: 'https://lemouvement-watches.fr/cdn/shop/files/DSC02470.jpg?width=900',
    icon: Activity
  },
  {
    number: '03',
    phase: 'Phase 03 • Haute Précision Atelier',
    title: 'Démontage Soigné & Lubrification Moebius',
    desc: 'Si l’amplitude le nécessite, le mouvement est démonté pièce par pièce pour nettoyage aux ultrasons. Remontage et micro-huilage spécifique aux normes suisses avec les lubrifiants synthétiques Moebius 9010 et HP-1300.',
    stats: 'Huiles Suisses Moebius 100% Neuves',
    badge: 'Mécanique Restaurée',
    image: 'https://lemouvement-watches.fr/cdn/shop/files/DSC02218.jpg?width=900',
    icon: PenTool
  },
  {
    number: '04',
    phase: 'Phase 04 • Engagement & Transmission',
    title: 'Scellé Inviolable & Garantie 12 Mois',
    desc: 'Une fois validée, la pièce reçoit son scellé d’authenticité inviolable. Elle est livrée avec son certificat d’authenticité nominatif signé, sa facture d’achat détaillée avec TVA sur marge et sa garantie mécanique de 12 mois.',
    stats: 'Garantie 12 Mois Pièces & Main d’Œuvre',
    badge: 'Prêt-à-Porter Immédiat',
    image: 'https://lemouvement-watches.fr/cdn/shop/files/DSC02321_b420a646-7d52-45a8-b037-791fd35659c9.jpg?width=900',
    icon: Award
  }
];

export default function AtelierProcessProgression({ navigateTo }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Use ScrollTrigger to calculate progress and activate steps
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 30%',
      end: 'bottom 80%',
      onUpdate: (self) => {
        const step = Math.min(
          PROTOCOL_STEPS.length - 1,
          Math.floor(self.progress * PROTOCOL_STEPS.length)
        );
        setActiveStepIndex(step);
      }
    });

    return () => st.kill();
  }, []);

  const currentStep = PROTOCOL_STEPS[activeStepIndex];

  return (
    <section ref={sectionRef} className="py-24 bg-obsidian-900 border-t border-obsidian-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Top Header */}
        <div className="max-w-2xl mb-16 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brass-400" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-brass-400 font-bold">
              Protocole d'Excellence • 4 Étapes
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal uppercase tracking-wide">
            Le Parcours d'une Montre en Atelier
          </h2>
          <p className="text-sand/80 text-xs sm:text-sm font-light">
            Découvrez comment chaque garde-temps est expertisé, fiabilisé et préparé avant de rejoindre votre poignet.
          </p>
        </div>

        {/* Progression Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Vertical Progress Rail (Cominvi process-progression style) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative pl-8 border-l border-obsidian-750 space-y-10">
              
              {/* Dynamic Golden Progress Indicator on the Rail */}
              <div 
                className="absolute left-[-1.5px] top-0 w-[3px] bg-brass-400 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                style={{
                  height: `${((activeStepIndex + 1) / PROTOCOL_STEPS.length) * 100}%`
                }}
              />

              {PROTOCOL_STEPS.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                const IconComponent = step.icon;

                return (
                  <div 
                    key={step.number}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`cursor-pointer transition-all duration-300 group ${
                      isActive ? 'opacity-100 scale-[1.02]' : 'opacity-40 hover:opacity-75'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`font-mono text-xs font-bold tracking-widest ${
                        isActive ? 'text-brass-400' : 'text-sand'
                      }`}>
                        {step.number}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-sand/60">
                        {step.phase}
                      </span>
                    </div>

                    <h3 className={`font-serif text-xl sm:text-2xl transition-colors ${
                      isActive ? 'text-ivory-100 font-normal' : 'text-sand group-hover:text-ivory-200'
                    }`}>
                      {step.title}
                    </h3>

                    {isActive && (
                      <p className="text-xs text-sand/80 font-light mt-2 leading-relaxed animate-in fade-in duration-300">
                        {step.desc}
                      </p>
                    )}
                  </div>
                );
              })}

            </div>

            <div className="pt-6">
              <button
                onClick={() => navigateTo('authenticite')}
                className="text-xs font-mono uppercase tracking-[0.2em] text-brass-300 hover:text-brass-200 flex items-center gap-2 cursor-pointer transition-colors"
              >
                Consulter les 20 points de contrôle atelier
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Synchronized Stage Card */}
          <div className="lg:col-span-7">
            <div className="relative bg-obsidian-950 border border-obsidian-800 p-3 sm:p-4 shadow-2xl overflow-hidden group">
              
              {/* Active Step Visual Image with Smooth Crossfade */}
              <div className="relative aspect-[16/10] overflow-hidden bg-obsidian-900">
                <img
                  src={currentStep.image}
                  alt={currentStep.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />

                {/* Floating Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-obsidian-950/90 border border-brass-600/40 text-brass-300 font-mono text-[10px] uppercase tracking-widest font-semibold backdrop-blur-md">
                    {currentStep.badge}
                  </span>
                </div>

                {/* Step Number Watermark */}
                <div className="absolute bottom-4 right-4 z-10">
                  <span className="font-serif text-6xl sm:text-8xl font-bold text-ivory-100/10 select-none">
                    {currentStep.number}
                  </span>
                </div>
              </div>

              {/* Active Step Diagnostic Box */}
              <div className="p-6 bg-obsidian-900/90 border-t border-obsidian-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-sand/70 uppercase">Relevé & Garantie Atelier :</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Conforme aux standards d’origine
                  </span>
                </div>

                <div className="p-3 bg-obsidian-950 border border-obsidian-800 text-xs font-mono text-brass-300">
                  {currentStep.stats}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
