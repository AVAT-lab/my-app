/**
 * Liste des ingrédients pour l'autocomplétion
 */
export const allIngredients = [
  "Ail",
  "Avocat",
  "Beurre",
  "Bouillon de légumes",
  "Bouillon de poulet",
  "Carottes",
  "Chapelure",
  "Concombre",
  "Crème fraîche",
  "Épinards",
  "Feta",
  "Fromage râpé",
  "Gingembre",
  "Graines de sésame",
  "Huile d'olive",
  "Jus de citron",
  "Lait de coco",
  "Laitue",
  "Lardons",
  "Œufs",
  "Oignon",
  "Parmesan",
  "Pâte de curry",
  "Persil",
  "Pois chiches",
  "Poivre",
  "Poivron",
  "Pommes de terre",
  "Potiron",
  "Poulet",
  "Poulet cuit",
  "Quinoa",
  "Riz",
  "Riz à risotto",
  "Salade",
  "Sauce au yaourt",
  "Sel",
  "Spaghetti",
  "Tomate",
  "Tomates",
  "Tortillas",
  "Viande hachée",
  "Vinaigre balsamique",
  "Vin blanc"
];

/**
 * Fonction pour filtrer les ingrédients en fonction d'une requête
 * @param query Terme de recherche
 * @returns Liste d'ingrédients correspondant à la requête
 */
export const filterIngredients = (query: string): string[] => {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return allIngredients.filter(ingredient => 
    ingredient.toLowerCase().includes(normalizedQuery)
  ).slice(0, 5); // Limiter à 5 suggestions maximum
};