export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string[];
}

export const GUIDES: Guide[] = [
  {
    slug: 'guide-rolex-datejust-vintage',
    title: 'Rolex Datejust Vintage : Le Guide Complet des Références 16014 vs 16234',
    excerpt: 'Verre plexiglas ou saphir, calibre 3035 ou 3135, patine des index : tout ce qu’il faut vérifier avant d’acquérir une Datejust.',
    date: '15 Septembre 2026',
    readTime: '6 min',
    category: 'Guide d’Achat',
    image: 'https://lemouvement-watches.fr/cdn/shop/files/DSC02450.jpg?width=1000',
    content: [
      'La Rolex Datejust est sans doute le garde-temps le plus emblématique de la manufacture genevoise. Lancée en 1945 pour le quarantième anniversaire de Rolex, elle a posé les bases de l’élégance sportive moderne.',
      'Parmi les déclinaisons les plus recherchées aujourd’hui sur le marché des collectionneurs, les références à cinq chiffres occupent une place d’honneur. Elles combinent la fiabilité d’une montre moderne au charme inimitable de l’époque néo-vintage.',
      'La référence 16014 (produite de la fin des années 1970 jusqu’à 1988) se caractérise par son verre plexiglas bombé et son calibre 3035 à passage de date rapide (quickset). Son cadran possède une profondeur visuelle incomparable.',
      'La référence 16234 (introduite en 1988) modernise la formule avec l’adoption du verre saphir inrayable et du légendaire calibre 3135, souvent considéré comme l’un des mouvements les plus robustes jamais conçus par Rolex.',
      'Chez Le Mouvement, chaque Datejust est rigoureusement auscultée : intégrité de la boîte, alignement de la lunette cannelée en or blanc 18 carats, tension du bracelet Jubilé et test chronométrique du mouvement.'
    ]
  },
  {
    slug: 'le-charme-des-cadrans-lin',
    title: 'Les Cadrans « Lin » (Linen Dial) : Pourquoi les Collectionneurs s’arrachent cette Texture',
    excerpt: 'Zoom sur l’une des finitions de cadrans les plus poétiques des années 1970 et 1980.',
    date: '28 Août 2026',
    readTime: '4 min',
    category: 'Décryptage',
    image: 'https://lemouvement-watches.fr/cdn/shop/files/DSC02457.jpg?width=1000',
    content: [
      'Dans le monde de l’horlogerie ancienne, le cadran est l’âme de la montre. Il concentre l’émotion, la lumière et la singularité de chaque pièce.',
      'Le cadran dit « Lin » (ou Linen Dial) est un chef-d’œuvre d’usinage délicat. Sa surface est texturée selon un maillage croisé ultra-fin qui rappelle le tissage d’un tissu de lin naturel.',
      'Sous la lumière naturelle, le cadran s’anime d’un relief chatoyant, oscillant entre reflets argentés soyeux et reflets opalescents. Contrairement aux cadrans soleillés classiques, le cadran lin ne ressemble à aucun autre et confère à la montre une présence feutrée et aristocratique.'
    ]
  },
  {
    slug: 'investir-dans-cartier-vintage',
    title: 'Cartier Santos & Tank : Pourquoi le Vintage Féminin et Masculin Explose',
    excerpt: 'Santos Galbée, Tank Must Vermeil, cadrans bordeaux : la réinvention du chic horloger.',
    date: '10 Août 2026',
    readTime: '5 min',
    category: 'Marché Horloger',
    image: 'https://lemouvement-watches.fr/cdn/shop/files/DSC02218.jpg?width=1000',
    content: [
      'Cartier n’est pas seulement un joaillier de génie, c’est le précurseur absolu de la montre-bracelet pour homme avec la Santos créée en 1904 pour l’aviateur Alberto Santos-Dumont.',
      'Depuis plusieurs saisons, l’intérêt pour les modèles Cartier des années 1980 et 1990 — notamment la Santos Galbée et les Tank Must — connaît une accélération phénoménale.',
      'Leurs proportions mesurées, leurs vis apparentes et leurs cadrans laqués (bordeaux, onyx ou chiffres romains classiques) séduisent une génération d’amateurs lassée des montres surdimensionnées.'
    ]
  }
];
