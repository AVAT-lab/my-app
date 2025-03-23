import { type Recipe } from "./schema";

export const recipeData: Recipe[] = [
  {
    id: 1,
    title: "Salade fraîcheur",
    description: "Une salade légère et pleine de vitamines, parfaite pour l'été.",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    prepTimeMinutes: 15,
    calories: 320,
    difficulty: "Facile",
    categories: ["Rapide", "Facile", "Végétarien"],
    ingredients: [
      { name: "Laitue", quantity: "1", unit: "pièce" },
      { name: "Tomate", quantity: "2", unit: "pièces" },
      { name: "Concombre", quantity: "1/2", unit: "pièce" },
      { name: "Avocat", quantity: "1", unit: "pièce" },
      { name: "Feta", quantity: "100", unit: "g" },
      { name: "Huile d'olive", quantity: "2", unit: "cuillères à soupe" },
      { name: "Vinaigre balsamique", quantity: "1", unit: "cuillère à soupe" }
    ],
    instructions: [
      "Laver et couper la laitue en morceaux.",
      "Couper les tomates et le concombre en dés.",
      "Éplucher et couper l'avocat en tranches.",
      "Émietter la feta.",
      "Disposer tous les ingrédients dans un saladier.",
      "Préparer la vinaigrette avec l'huile d'olive et le vinaigre.",
      "Assaisonner selon votre goût et mélanger."
    ],
    isVegetarian: true,
    isEconomic: true
  },
  {
    id: 2,
    title: "Pasta Carbonara",
    description: "Un plat italien simple et savoureux.",
    imageUrl: "https://images.unsplash.com/photo-1617093727343-374698b1b08d",
    prepTimeMinutes: 20,
    calories: 580,
    difficulty: "Facile",
    categories: ["Classique", "Rapide"],
    ingredients: [
      { name: "Spaghetti", quantity: "200", unit: "g" },
      { name: "Lardons", quantity: "100", unit: "g" },
      { name: "Œufs", quantity: "2", unit: "pièces" },
      { name: "Parmesan", quantity: "50", unit: "g" },
      { name: "Ail", quantity: "1", unit: "gousse" },
      { name: "Sel", quantity: "1", unit: "pincée" },
      { name: "Poivre", quantity: "1", unit: "pincée" }
    ],
    instructions: [
      "Faire cuire les pâtes dans de l'eau bouillante salée.",
      "Faire revenir les lardons avec l'ail écrasé.",
      "Battre les œufs avec le parmesan, le sel et le poivre.",
      "Égoutter les pâtes, les remettre dans la casserole et y ajouter les lardons.",
      "Hors du feu, incorporer le mélange d'œufs et de parmesan en remuant rapidement.",
      "Servir immédiatement avec un peu de parmesan supplémentaire."
    ],
    isVegetarian: false,
    isEconomic: true
  },
  {
    id: 3,
    title: "Soupe au potiron",
    description: "Une soupe réconfortante pour les soirées d'automne.",
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
    prepTimeMinutes: 35,
    calories: 210,
    difficulty: "Facile",
    categories: ["Végétarien", "Économique"],
    ingredients: [
      { name: "Potiron", quantity: "500", unit: "g" },
      { name: "Pommes de terre", quantity: "2", unit: "pièces" },
      { name: "Oignon", quantity: "1", unit: "pièce" },
      { name: "Bouillon de légumes", quantity: "1", unit: "litre" },
      { name: "Crème fraîche", quantity: "2", unit: "cuillères à soupe" },
      { name: "Sel", quantity: "1", unit: "pincée" },
      { name: "Poivre", quantity: "1", unit: "pincée" }
    ],
    instructions: [
      "Éplucher et couper le potiron, les pommes de terre et l'oignon en morceaux.",
      "Dans une grande casserole, faire revenir l'oignon dans un peu d'huile d'olive.",
      "Ajouter le potiron et les pommes de terre, puis verser le bouillon.",
      "Laisser cuire 25 minutes jusqu'à ce que les légumes soient tendres.",
      "Mixer la soupe jusqu'à obtenir une texture lisse.",
      "Ajouter la crème fraîche, le sel et le poivre.",
      "Servir chaud avec des croûtons si désiré."
    ],
    isVegetarian: true,
    isEconomic: true
  },
  {
    id: 4,
    title: "Buddha bowl",
    description: "Un repas équilibré et coloré dans un bol.",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    prepTimeMinutes: 15,
    calories: 380,
    difficulty: "Facile",
    categories: ["Végétarien", "Facile", "Équilibré"],
    ingredients: [
      { name: "Quinoa", quantity: "100", unit: "g" },
      { name: "Avocat", quantity: "1", unit: "pièce" },
      { name: "Carottes", quantity: "2", unit: "pièces" },
      { name: "Pois chiches", quantity: "100", unit: "g" },
      { name: "Épinards", quantity: "50", unit: "g" },
      { name: "Graines de sésame", quantity: "1", unit: "cuillère à soupe" },
      { name: "Huile d'olive", quantity: "1", unit: "cuillère à soupe" },
      { name: "Jus de citron", quantity: "1", unit: "cuillère à soupe" }
    ],
    instructions: [
      "Cuire le quinoa selon les instructions sur l'emballage.",
      "Éplucher et râper les carottes.",
      "Rincer et égoutter les pois chiches.",
      "Couper l'avocat en tranches.",
      "Disposer tous les ingrédients dans un bol.",
      "Arroser d'huile d'olive et de jus de citron.",
      "Parsemer de graines de sésame."
    ],
    isVegetarian: true,
    isEconomic: false
  },
  {
    id: 5,
    title: "Wrap au poulet",
    description: "Un repas rapide et pratique à emporter.",
    imageUrl: "https://images.unsplash.com/photo-1607532941433-304659e8198a",
    prepTimeMinutes: 10,
    calories: 420,
    difficulty: "Facile",
    categories: ["Rapide", "Facile"],
    ingredients: [
      { name: "Tortillas", quantity: "2", unit: "pièces" },
      { name: "Poulet cuit", quantity: "150", unit: "g" },
      { name: "Salade", quantity: "30", unit: "g" },
      { name: "Tomate", quantity: "1", unit: "pièce" },
      { name: "Concombre", quantity: "1/2", unit: "pièce" },
      { name: "Fromage râpé", quantity: "30", unit: "g" },
      { name: "Sauce au yaourt", quantity: "2", unit: "cuillères à soupe" }
    ],
    instructions: [
      "Couper le poulet cuit en lanières.",
      "Laver et couper les légumes en fines tranches.",
      "Disposer les ingrédients au centre de chaque tortilla.",
      "Ajouter le fromage râpé et la sauce au yaourt.",
      "Replier les bords de la tortilla vers le centre puis rouler fermement.",
      "Couper en deux si désiré et servir."
    ],
    isVegetarian: false,
    isEconomic: true
  },
  {
    id: 6,
    title: "Omelette aux légumes",
    description: "Un plat simple, rapide et nutritif.",
    imageUrl: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543",
    prepTimeMinutes: 12,
    calories: 290,
    difficulty: "Facile",
    categories: ["Facile", "Rapide", "Économique"],
    ingredients: [
      { name: "Œufs", quantity: "3", unit: "pièces" },
      { name: "Poivron", quantity: "1/2", unit: "pièce" },
      { name: "Oignon", quantity: "1/2", unit: "pièce" },
      { name: "Tomate", quantity: "1", unit: "pièce" },
      { name: "Fromage râpé", quantity: "30", unit: "g" },
      { name: "Sel", quantity: "1", unit: "pincée" },
      { name: "Poivre", quantity: "1", unit: "pincée" },
      { name: "Huile d'olive", quantity: "1", unit: "cuillère à soupe" }
    ],
    instructions: [
      "Couper les légumes en petits dés.",
      "Battre les œufs dans un bol, saler et poivrer.",
      "Faire chauffer l'huile dans une poêle.",
      "Faire revenir les oignons et les poivrons pendant 2 minutes.",
      "Ajouter les tomates et continuer la cuisson 1 minute.",
      "Verser les œufs battus sur les légumes.",
      "Parsemer de fromage râpé et laisser cuire à feu doux jusqu'à ce que l'omelette soit prise.",
      "Replier l'omelette en deux et servir."
    ],
    isVegetarian: true,
    isEconomic: true
  },
  {
    id: 7,
    title: "Risotto au poulet",
    description: "Un risotto crémeux et savoureux.",
    imageUrl: "https://images.unsplash.com/photo-1599921841143-819065a55cc6",
    prepTimeMinutes: 30,
    calories: 450,
    difficulty: "Moyen",
    categories: ["Italien", "Classique"],
    ingredients: [
      { name: "Riz à risotto", quantity: "200", unit: "g" },
      { name: "Poulet", quantity: "150", unit: "g" },
      { name: "Oignon", quantity: "1", unit: "pièce" },
      { name: "Bouillon de poulet", quantity: "750", unit: "ml" },
      { name: "Vin blanc", quantity: "50", unit: "ml" },
      { name: "Parmesan", quantity: "50", unit: "g" },
      { name: "Crème fraîche", quantity: "2", unit: "cuillères à soupe" },
      { name: "Beurre", quantity: "20", unit: "g" }
    ],
    instructions: [
      "Couper le poulet en morceaux et l'oignon en petits dés.",
      "Faire chauffer le bouillon dans une casserole.",
      "Dans une autre casserole, faire fondre le beurre et y faire revenir l'oignon.",
      "Ajouter le riz et le faire nacrer pendant 2 minutes.",
      "Verser le vin blanc et laisser évaporer.",
      "Ajouter le bouillon louche par louche, en attendant qu'il soit absorbé avant d'en ajouter.",
      "À mi-cuisson, ajouter les morceaux de poulet.",
      "Continuer à ajouter du bouillon jusqu'à ce que le riz soit cuit (18-20 minutes).",
      "Incorporer le parmesan et la crème fraîche, saler et poivrer.",
      "Servir immédiatement."
    ],
    isVegetarian: false,
    isEconomic: false
  },
  {
    id: 8,
    title: "Curry de poulet",
    description: "Un curry savoureux aux épices orientales.",
    imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
    prepTimeMinutes: 25,
    calories: 410,
    difficulty: "Moyen",
    categories: ["Exotique", "Épicé"],
    ingredients: [
      { name: "Poulet", quantity: "300", unit: "g" },
      { name: "Oignon", quantity: "1", unit: "pièce" },
      { name: "Ail", quantity: "2", unit: "gousses" },
      { name: "Gingembre", quantity: "1", unit: "cm" },
      { name: "Pâte de curry", quantity: "2", unit: "cuillères à soupe" },
      { name: "Lait de coco", quantity: "400", unit: "ml" },
      { name: "Riz", quantity: "200", unit: "g" },
      { name: "Huile d'olive", quantity: "2", unit: "cuillères à soupe" }
    ],
    instructions: [
      "Couper le poulet en morceaux et émincer l'oignon.",
      "Hacher l'ail et râper le gingembre.",
      "Faire chauffer l'huile dans une grande poêle.",
      "Faire revenir l'oignon jusqu'à ce qu'il devienne translucide.",
      "Ajouter l'ail et le gingembre, puis la pâte de curry.",
      "Incorporer le poulet et le faire dorer.",
      "Verser le lait de coco et laisser mijoter 15 minutes.",
      "Pendant ce temps, cuire le riz selon les instructions sur l'emballage.",
      "Servir le curry avec le riz."
    ],
    isVegetarian: false,
    isEconomic: false
  },
  {
    id: 9,
    title: "Tomates farcies",
    description: "Des tomates garnies de viande hachée et gratinées au four.",
    imageUrl: "https://images.unsplash.com/photo-1626200689887-66bbfbe67bc8",
    prepTimeMinutes: 40,
    calories: 380,
    difficulty: "Moyen",
    categories: ["Classique", "Familial"],
    ingredients: [
      { name: "Tomates", quantity: "4", unit: "pièces" },
      { name: "Viande hachée", quantity: "300", unit: "g" },
      { name: "Oignon", quantity: "1", unit: "pièce" },
      { name: "Ail", quantity: "1", unit: "gousse" },
      { name: "Chapelure", quantity: "2", unit: "cuillères à soupe" },
      { name: "Persil", quantity: "1", unit: "poignée" },
      { name: "Riz", quantity: "100", unit: "g" },
      { name: "Fromage râpé", quantity: "50", unit: "g" }
    ],
    instructions: [
      "Préchauffer le four à 180°C.",
      "Couper le haut des tomates et les évider.",
      "Faire cuire le riz à moitié.",
      "Émincer l'oignon et l'ail, puis les faire revenir dans une poêle.",
      "Ajouter la viande hachée et cuire jusqu'à ce qu'elle soit dorée.",
      "Incorporer le riz pré-cuit, le persil et la chapelure.",
      "Farcir les tomates avec ce mélange.",
      "Parsemer de fromage râpé et enfourner pendant 25 minutes.",
      "Servir chaud avec une salade verte."
    ],
    isVegetarian: false,
    isEconomic: true
  }
];
