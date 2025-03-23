import React from 'react';
import { HeartIcon } from '@/components/ui/icons';
import RecipeCard from '@/components/RecipeCard';
import { type Recipe } from '@shared/schema';
import { useQuery } from '@tanstack/react-query';

interface FavoritesViewProps {
  recipes: Recipe[];
  favorites: number[];
  onFavoriteToggle: (recipeId: number) => void;
  onExploreClick: () => void;
}

const FavoritesView: React.FC<FavoritesViewProps> = ({ 
  recipes, 
  favorites, 
  onFavoriteToggle,
  onExploreClick
}) => {
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));
  
  const isEmpty = favoriteRecipes.length === 0;
  
  return (
    <div id="favorites-view" className="p-4">
      {isEmpty ? (
        <div className="text-center py-12">
          <div className="mb-4 text-gray-400">
            <HeartIcon className="text-5xl mx-auto" />
          </div>
          <h2 className="font-nunito font-bold text-xl mb-2">Aucune recette favorite</h2>
          <p className="text-gray-500 mb-4">Cliquez sur le cœur pour ajouter des recettes à vos favoris.</p>
          <button 
            className="bg-primary text-white py-2 px-4 rounded-lg font-semibold shadow-sm hover:bg-primary/90 transition"
            onClick={onExploreClick}
          >
            Découvrir des recettes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {favoriteRecipes.map(recipe => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              variant="horizontal" 
              favorites={favorites}
              onFavoriteToggle={onFavoriteToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesView;
