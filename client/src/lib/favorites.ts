/**
 * Utility functions for managing favorite recipes in localStorage
 */

const STORAGE_KEY = 'cuisine-idees-favorites';

/**
 * Get favorites from localStorage
 */
export const getFavorites = (): number[] => {
  try {
    const storedFavorites = localStorage.getItem(STORAGE_KEY);
    if (storedFavorites) {
      return JSON.parse(storedFavorites);
    }
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
  }
  return [];
};

/**
 * Save favorites to localStorage
 */
export const setFavorites = (favorites: number[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

/**
 * Toggle a recipe in favorites
 */
export const toggleFavorite = (favorites: number[], recipeId: number): number[] => {
  const currentFavorites = [...favorites];
  const index = currentFavorites.indexOf(recipeId);
  
  if (index === -1) {
    // Add to favorites
    currentFavorites.push(recipeId);
  } else {
    // Remove from favorites
    currentFavorites.splice(index, 1);
  }
  
  setFavorites(currentFavorites);
  return currentFavorites;
};

/**
 * Check if a recipe is in favorites
 */
export const isFavorite = (favorites: number[], recipeId: number): boolean => {
  return favorites.includes(recipeId);
};
