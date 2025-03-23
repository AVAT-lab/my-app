import React, { useState, useRef } from 'react';
import { PlusIcon, CheckIcon, AlertIcon, ArrowRightIcon } from '@/components/ui/icons';
import IngredientTag from '@/components/IngredientTag';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { type Recipe } from '@shared/schema';

interface IngredientsViewProps {
  recipes: Recipe[];
  favorites: number[];
  onFavoriteToggle: (recipeId: number) => void;
  onRecipeClick?: (recipe: Recipe) => void;
}

interface IngredientMatch {
  recipe: Recipe;
  matchingIngredients: number;
  missingIngredients: string[];
}

const IngredientsView: React.FC<IngredientsViewProps> = ({ recipes, favorites, onFavoriteToggle, onRecipeClick }) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: suggestedRecipes = [], isPending } = useQuery({
    queryKey: ['/api/recipes/ingredients', ingredients],
    queryFn: async () => {
      if (ingredients.length === 0) return [];
      
      const res = await apiRequest('POST', '/api/recipes/ingredients', { ingredients });
      return await res.json();
    },
    enabled: ingredients.length > 0,
  });

  const recipeMatches = suggestedRecipes.map((recipe: Recipe) => {
    const recipeIngredients = recipe.ingredients.map((i: { name: string }) => i.name.toLowerCase());
    const userIngredients = ingredients.map((i: string) => i.toLowerCase());
    
    const matchingCount = userIngredients.filter((ingredient: string) => 
      recipeIngredients.some((ri: string) => ri.includes(ingredient))
    ).length;
    
    const missingIngredients = recipe.ingredients
      .map((i: { name: string }) => i.name)
      .filter((ingredient: string) => 
        !userIngredients.some((ui: string) => 
          ingredient.toLowerCase().includes(ui)
        )
      );
    
    return {
      recipe,
      matchingIngredients: matchingCount,
      missingIngredients: missingIngredients
    };
  });

  const handleAddIngredient = () => {
    const trimmedInput = ingredientInput.trim();
    if (trimmedInput && !ingredients.includes(trimmedInput)) {
      setIngredients([...ingredients, trimmedInput]);
      setIngredientInput('');
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  return (
    <div id="ingredients-view" className="p-4">
      {/* Fridge Search */}
      <section>
        <h2 className="font-nunito font-bold text-xl mb-4">Que contient votre frigo ?</h2>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ajoutez un ingrédient..." 
              className="w-full pl-10 pr-28 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              id="ingredient-input"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
            <PlusIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-2 py-1 rounded-lg text-sm"
              onClick={handleAddIngredient}
            >
              Ajouter
            </button>
          </div>
          
          <div className="mt-3" id="ingredients-container">
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient, index) => (
                <IngredientTag 
                  key={index} 
                  name={ingredient} 
                  onRemove={handleRemoveIngredient} 
                />
              ))}
            </div>
          </div>
          
          <div className="mt-4">
            <button 
              className="w-full bg-primary text-white py-2 rounded-lg font-semibold shadow-sm hover:bg-primary/90 transition"
              disabled={ingredients.length === 0}
              onClick={() => inputRef.current?.focus()}
            >
              Trouver des recettes
            </button>
          </div>
        </div>
        
        {ingredients.length > 0 && (
          <div className="mt-6">
            <h3 className="font-nunito font-semibold text-lg mb-3">Suggestions avec vos ingrédients</h3>
            
            {isPending ? (
              <div className="text-center py-4">
                <p className="text-gray-500">Recherche des recettes...</p>
              </div>
            ) : recipeMatches.length > 0 ? (
              <div className="divide-y">
                {recipeMatches.map(({ recipe, matchingIngredients, missingIngredients }) => (
                  <div 
                    key={recipe.id} 
                    className="py-3 flex gap-3 items-center cursor-pointer"
                    onClick={() => onRecipeClick && onRecipeClick(recipe)}
                  >
                    <img src={recipe.imageUrl} alt={recipe.title} className="h-16 w-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-nunito font-semibold">{recipe.title}</h4>
                      <div className="flex flex-wrap mt-1">
                        <span className="text-sm text-success flex items-center mr-3">
                          <CheckIcon className="mr-1" /> {matchingIngredients}/{recipe.ingredients.length} ingrédients
                        </span>
                        {missingIngredients.length > 0 && (
                          <span className="text-sm text-warning flex items-center">
                            <AlertIcon className="mr-1" /> Manque: {missingIngredients.slice(0, 2).join(', ')}
                            {missingIngredients.length > 2 && '...'}
                          </span>
                        )}
                      </div>
                    </div>
                    <button 
                      className="text-primary" 
                      aria-label="Voir la recette"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRecipeClick && onRecipeClick(recipe);
                      }}
                    >
                      <ArrowRightIcon className="text-xl" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">Aucune recette trouvée avec ces ingrédients.</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default IngredientsView;
