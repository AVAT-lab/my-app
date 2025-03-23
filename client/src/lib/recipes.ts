import { Recipe } from "@shared/schema";

/**
 * Filter recipes based on a search query
 * @param recipes The list of recipes to filter
 * @param query The search query
 * @returns Filtered recipes
 */
export const filterRecipes = (recipes: Recipe[], query: string): Recipe[] => {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    return recipes;
  }
  
  return recipes.filter(recipe => {
    // Search in title
    if (recipe.title.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    
    // Search in description
    if (recipe.description.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    
    // Search in categories
    if (recipe.categories.some(category => 
      category.toLowerCase().includes(normalizedQuery)
    )) {
      return true;
    }
    
    // Search in ingredients
    if (recipe.ingredients.some(ingredient => 
      ingredient.name.toLowerCase().includes(normalizedQuery)
    )) {
      return true;
    }
    
    return false;
  });
};

/**
 * Get recipes by category
 */
export const getRecipesByCategory = (recipes: Recipe[], category: string): Recipe[] => {
  const normalizedCategory = category.toLowerCase();
  
  return recipes.filter(recipe => 
    recipe.categories.some(cat => cat.toLowerCase().includes(normalizedCategory))
  );
};

/**
 * Get recipes by difficulty level
 */
export const getRecipesByDifficulty = (recipes: Recipe[], difficulty: string): Recipe[] => {
  const normalizedDifficulty = difficulty.toLowerCase();
  
  return recipes.filter(recipe => 
    recipe.difficulty.toLowerCase() === normalizedDifficulty
  );
};

/**
 * Get recipes by preparation time (minutes)
 */
export const getRecipesByPrepTime = (recipes: Recipe[], maxMinutes: number): Recipe[] => {
  return recipes.filter(recipe => recipe.prepTimeMinutes <= maxMinutes);
};

/**
 * Sort recipes by various criteria
 */
export const sortRecipes = (
  recipes: Recipe[],
  sortBy: 'prepTime' | 'calories' | 'difficulty'
): Recipe[] => {
  const recipesCopy = [...recipes];
  
  switch (sortBy) {
    case 'prepTime':
      return recipesCopy.sort((a, b) => a.prepTimeMinutes - b.prepTimeMinutes);
    case 'calories':
      return recipesCopy.sort((a, b) => a.calories - b.calories);
    case 'difficulty':
      const difficultyOrder = { 'Facile': 0, 'Moyen': 1, 'Difficile': 2 };
      return recipesCopy.sort((a, b) => {
        const aDifficulty = difficultyOrder[a.difficulty as keyof typeof difficultyOrder] || 0;
        const bDifficulty = difficultyOrder[b.difficulty as keyof typeof difficultyOrder] || 0;
        return aDifficulty - bDifficulty;
      });
    default:
      return recipesCopy;
  }
};
