# Le Mouvement — Refonte E-Commerce & Haute Horlogerie

> **Refonte globale de la boutique [lemouvement-watches.fr](https://lemouvement-watches.fr/)**  
> Maison indépendante d'achat, vente et sourcing de montres de collection et vintage de prestige (Rolex, Cartier, Tudor, TAG Heuer...). Fondée par Nyle Abderrahman (Région lyonnaise).

---

## 🌟 Fonctionnalités & Innovations Implémentées

### 1. Galerie Photo Haute Fidélité (Fluidité 60 fps)
- **Carrousel physique continu** : Défilement fluide avec courbe de décélération `cubic-bezier(0.25, 1, 0.5, 1)`.
- **Drag & Swipe natif** : Balayage tactile sur mobile et glisser-déposer à la souris sur ordinateur.
- **Zéro saut de page** : Isolation stricte du défilement des vignettes (`container.scrollTo`) et `touch-action: pan-y`.
- **Mode Zoom Plein Écran (Lightbox)** : Visionneuse grand format avec commandes clavier (flèches, Échap) et ruban de navigation.

### 2. Parcours E-Commerce & Conversion (CRO)
- **Panier Tiroir (Slide-in Cart)** : Accès instantané à la sélection, calcul immédiat des facilités de paiement échelonné Alma (3x / 4x sans frais).
- **Checkout One-Page Sécurisé** : Paiement par Carte Bancaire (3D Secure), Apple Pay / Google Pay, Alma ou virement instantané avec confirmation de commande.
- **Canal Hybride Conciergerie** : Bouton WhatsApp direct avec message pré-rempli (référence et titre du modèle).
- **Module Showroom Privé (Lyon / Communay)** : Réservation de créneaux d'essayage privé en tête-à-tête avec Nyle.

### 3. Confiance & Services d'Acquisition
- **Module Rachat & Dépôt-Vente** (`/vendre`) : Formulaire d'estimation guidé en 4 étapes avec téléversement de photographies.
- **Sourcing & Chasse Personnalisée** (`/sourcing`) : Mandat de recherche sur-mesure sur le réseau horloger européen.
- **Protocole en 20 Points** (`/authenticite`) : Détail de l'inspection horlogère, révisions certifiées et garantie 12 mois.
- **Journal Horloger** (`/journal`) : Articles d'autorité (Guides Rolex Datejust, Cadrans Lin, Cartier vintage).

---

## 🛠️ Stack Technique

- **Framework :** React 19 + Vite 6
- **Styles :** Tailwind CSS v4 avec design tokens de luxe (Obsidian `#070809`, Laiton doux `#c5a059`, Ivoire `#f8f5ee`)
- **Icônes :** Lucide React
- **Typographie :** Google Fonts *Playfair Display* & *Inter*
- **Catalogue :** Base de données de 30 garde-temps authentiques avec photos HD hébergées

---

## 🚀 Démarrage en Local

### Prérequis
- Node.js (v18+)
- npm ou pnpm

### Installation et Lancement

```bash
# Accéder au dossier de la boutique
cd boutique

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

L'application est accessible sur : **[http://localhost:5173/](http://localhost:5173/)**

### Build de Production

```bash
cd boutique
npm run build
```

---

## 📄 Licence & Propriété

© 2026 Le Mouvement (Nyle Abderrahman) — SIRET 883 775 017 00014. Tous droits réservés.
