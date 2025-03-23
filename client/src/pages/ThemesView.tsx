import React, { useState, useEffect } from 'react';
import CategoryCard from '@/components/CategoryCard';
import RecipeCard from '@/components/RecipeCard';
import { type Recipe } from '@shared/schema';
import { useQuery } from '@tanstack/react-query';

interface ThemesViewProps {
  recipes: Recipe[];
  favorites: number[];
  onFavoriteToggle: (recipeId: number) => void;
}

const categories = [
  { name: 'Rapide (<30min)', icon: 'timer' as const, color: 'primary' as const },
  { name: 'Facile', icon: 'heart' as const, color: 'secondary' as const },
  { name: 'Économique', icon: 'euro' as const, color: 'success' as const },
  { name: 'Végétarien', icon: 'plant' as const, color: 'warning' as const },
];

const ThemesView: React.FC<ThemesViewProps> = ({ recipes, favorites, onFavoriteToggle }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);
  const [showAll, setShowAll] = useState(false);
  
  // Get trending recipes (could be based on most viewed, etc.)
  const trendingRecipes = recipes.slice(0, 5);
  
  // Filter by selected category
  useEffect(() => {
    if (selectedCategory) {
      const categoryName = selectedCategory.split(' ')[0].toLowerCase();
      
      const filtered = recipes.filter(recipe => 
        recipe.categories.some(cat => 
          cat.toLowerCase().includes(categoryName)
        )
      );
      
      setDisplayedRecipes(filtered);
    } else {
      // If no category selected, show quick recipes
      const quickRecipes = recipes.filter(recipe => 
        recipe.categories.some(cat => 
          cat.toLowerCase().includes('rapide')
        )
      );
      
      setDisplayedRecipes(quickRecipes);
    }
  }, [selectedCategory, recipes]);
  
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };
  
  const displayRecipes = showAll ? displayedRecipes : displayedRecipes.slice(0, 4);
  
  return (
    <div id="themes-view" className="p-4">
      {/* Categories Section */}
      <section>
        <h2 className="font-nunito font-bold text-xl mb-4">Catégories populaires</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {categories.map((category, index) => (
            <CategoryCard 
              key={index} 
              category={category} 
              onClick={handleCategoryClick} 
            />
          ))}
        </div>
      </section>
      
      {/* Trending Recipes */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-nunito font-bold text-xl">Tendances du moment</h2>
          <button className="text-primary font-semibold">Voir tout</button>
        </div>
        
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-4 py-2 pb-4 min-w-min">
            {trendingRecipes.map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                variant="vertical"
                favorites={favorites}
                onFavoriteToggle={onFavoriteToggle}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Recipes by Theme */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-nunito font-bold text-xl">
            {selectedCategory ? selectedCategory : 'Recettes rapides'}
          </h2>
          <button className="text-primary font-semibold">Filtrer</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayRecipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              variant="horizontal"
              favorites={favorites}
              onFavoriteToggle={onFavoriteToggle}
            />
          ))}
        </div>
        
        {displayedRecipes.length > 4 && (
          <div className="mt-4 text-center">
            <button 
              className="bg-primary/10 text-primary font-semibold py-2 px-4 rounded-lg hover:bg-primary/20 transition"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Voir moins' : 'Voir plus de recettes'}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ThemesView;
