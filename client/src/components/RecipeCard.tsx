import React from 'react';
import { HeartIcon, FireIcon } from './ui/icons';
import type { Recipe } from '@shared/schema';
import { toggleFavorite, isFavorite } from '@/lib/favorites';

interface RecipeCardProps {
  recipe: Recipe;
  variant?: 'horizontal' | 'vertical' | 'compact';
  onRecipeClick?: (recipe: Recipe) => void;
  favorites: number[];
  onFavoriteToggle: (recipeId: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  variant = 'vertical',
  onRecipeClick,
  favorites,
  onFavoriteToggle
}) => {
  const isFavorited = isFavorite(favorites, recipe.id);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle(recipe.id);
  };
  
  if (variant === 'horizontal') {
    return (
      <div 
        className="recipe-card bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transform transition hover:shadow-md hover:scale-[1.01] cursor-pointer"
        onClick={() => onRecipeClick?.(recipe)}
      >
        <div className="relative">
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="h-36 w-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <button 
              className={`${isFavorited ? 'bg-white text-primary' : 'bg-white/80 hover:bg-white text-gray-700'} p-1.5 rounded-full`}
              aria-label={isFavorited ? "Retirer des favoris" : "Ajouter aux favoris"}
              onClick={handleFavoriteClick}
            >
              <HeartIcon filled={isFavorited} />
            </button>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-nunito font-semibold">{recipe.title}</h3>
          <div className="flex gap-1 mt-1 flex-wrap">
            {recipe.categories.slice(0, 3).map((category, index) => (
              <span 
                key={index} 
                className={`px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs`}
              >
                {category}
              </span>
            ))}
            <span className="px-2 py-0.5 bg-success/10 text-success rounded-full text-xs">
              {recipe.prepTimeMinutes} min
            </span>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <div className="flex items-center text-sm text-gray-500">
              <FireIcon className="mr-1" />
              <span>{recipe.calories} kcal</span>
            </div>
            <button className="text-primary font-semibold text-sm">Voir</button>
          </div>
        </div>
      </div>
    );
  }
  
  if (variant === 'compact') {
    return (
      <div className="py-3 flex gap-3 items-center cursor-pointer" onClick={() => onRecipeClick?.(recipe)}>
        <img src={recipe.imageUrl} alt={recipe.title} className="h-16 w-16 object-cover rounded-lg" />
        <div className="flex-1">
          <h4 className="font-nunito font-semibold">{recipe.title}</h4>
          <div className="flex mt-1">
            <span className="text-sm text-gray-500 flex items-center mr-3">
              <FireIcon className="mr-1" /> {recipe.calories} kcal
            </span>
            <span className="text-sm text-success flex items-center">
              {recipe.prepTimeMinutes} min
            </span>
          </div>
        </div>
        <button 
          className={isFavorited ? "text-primary" : "text-gray-400 hover:text-primary"} 
          aria-label={isFavorited ? "Retirer des favoris" : "Ajouter aux favoris"}
          onClick={handleFavoriteClick}
        >
          <HeartIcon filled={isFavorited} className="text-xl" />
        </button>
      </div>
    );
  }
  
  // Default vertical card
  return (
    <div 
      className="recipe-card bg-white rounded-xl shadow-sm min-w-[220px] max-w-[220px] overflow-hidden border border-gray-100 transform transition hover:shadow-md hover:scale-[1.01] cursor-pointer"
      onClick={() => onRecipeClick?.(recipe)}
    >
      <img 
        src={recipe.imageUrl} 
        alt={recipe.title} 
        className="h-32 w-full object-cover"
      />
      <div className="p-3">
        <div className="flex justify-between items-start">
          <h3 className="font-nunito font-semibold text-base">{recipe.title}</h3>
          <button 
            className={isFavorited ? "text-primary" : "text-gray-400 hover:text-primary"} 
            aria-label={isFavorited ? "Retirer des favoris" : "Ajouter aux favoris"}
            onClick={handleFavoriteClick}
          >
            <HeartIcon filled={isFavorited} />
          </button>
        </div>
        <div className="flex gap-1 mt-1">
          {recipe.categories.slice(0, 2).map((category, index) => (
            <span 
              key={index} 
              className={`px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs`}
            >
              {category}
            </span>
          ))}
          <span className="px-2 py-0.5 bg-success/10 text-success rounded-full text-xs">
            {recipe.prepTimeMinutes} min
          </span>
        </div>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <FireIcon className="mr-1" />
          <span>{recipe.calories} kcal</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
