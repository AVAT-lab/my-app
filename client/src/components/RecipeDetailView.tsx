import React from 'react';
import { XIcon, HeartIcon, TimerIcon, FireIcon } from './ui/icons';
import { type Recipe } from '@shared/schema';
import { isFavorite } from '@/lib/favorites';

interface RecipeDetailViewProps {
  recipe: Recipe;
  onClose: () => void;
  favorites: number[];
  onFavoriteToggle: (recipeId: number) => void;
}

const RecipeDetailView: React.FC<RecipeDetailViewProps> = ({ 
  recipe, 
  onClose,
  favorites,
  onFavoriteToggle
}) => {
  const isFavorited = isFavorite(favorites, recipe.id);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle(recipe.id);
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 z-20 overflow-y-auto">
      <div className="max-w-md mx-auto bg-white min-h-screen overflow-hidden">
        <div className="relative">
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="w-full h-56 object-cover"
          />
          <button 
            className="absolute top-4 left-4 bg-white/80 rounded-full p-2 shadow-sm"
            onClick={onClose}
          >
            <XIcon className="text-gray-700" />
          </button>
          <button 
            className={`absolute top-4 right-4 ${isFavorited ? 'bg-white text-primary' : 'bg-white/80 text-gray-700'} rounded-full p-2 shadow-sm`}
            onClick={handleFavoriteClick}
          >
            <HeartIcon filled={isFavorited} />
          </button>
        </div>
        
        <div className="p-4">
          <h1 className="font-nunito font-bold text-2xl">{recipe.title}</h1>
          
          <div className="flex gap-2 mt-2 flex-wrap">
            {recipe.categories.map((category, index) => (
              <span 
                key={index} 
                className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs"
              >
                {category}
              </span>
            ))}
          </div>
          
          <div className="flex gap-4 mt-4">
            <div className="flex items-center">
              <TimerIcon className="mr-1 text-gray-500" />
              <span className="text-sm">{recipe.prepTimeMinutes} min</span>
            </div>
            <div className="flex items-center">
              <FireIcon className="mr-1 text-gray-500" />
              <span className="text-sm">{recipe.calories} kcal</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium">{recipe.difficulty}</span>
            </div>
          </div>
          
          <p className="mt-4 text-gray-700">{recipe.description}</p>
          
          <div className="mt-6">
            <h2 className="font-nunito font-semibold text-lg mb-2">Ingrédients</h2>
            <ul className="bg-gray-50 p-3 rounded-lg">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="py-1 flex items-center">
                  <span className="w-4 h-4 bg-primary/20 rounded-full flex items-center justify-center mr-2 text-xs text-primary">•</span>
                  <span>
                    {ingredient.amount ? `${ingredient.amount} ${ingredient.unit || ''} ` : ''}
                    {ingredient.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6">
            <h2 className="font-nunito font-semibold text-lg mb-2">Instructions</h2>
            <ol className="space-y-3">
              {recipe.steps.map((step, index) => (
                <li key={index} className="flex">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3">{index + 1}</span>
                  <p className="text-gray-700">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailView;