import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TabNavigation, { TabType } from '@/components/TabNavigation';
import BottomNavigation from '@/components/BottomNavigation';
import ThemesView from '@/pages/ThemesView';
import IngredientsView from '@/pages/IngredientsView';
import FavoritesView from '@/pages/FavoritesView';
import PwaInstallPrompt from '@/components/PwaInstallPrompt';
import { useQuery } from '@tanstack/react-query';
import { getFavorites, setFavorites } from '@/lib/favorites';
import { filterRecipes } from '@/lib/recipes';
import { canInstallPWA } from '@/lib/pwa';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('themes');
  const [activeNavItem, setActiveNavItem] = useState<'home' | 'search' | 'favorites' | 'profile'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [favorites, setFavoritesState] = useState<number[]>(getFavorites());
  
  const { data: recipes = [] } = useQuery({
    queryKey: ['/api/recipes'],
    staleTime: 60 * 60 * 1000, // 1 hour
  });
  
  const filteredRecipes = searchQuery 
    ? filterRecipes(recipes, searchQuery)
    : recipes;
  
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check if PWA can be installed
    const checkInstallPWA = async () => {
      const installable = await canInstallPWA();
      // Only show prompt if installable and user hasn't dismissed it before
      if (installable && !localStorage.getItem('pwa-install-dismissed')) {
        setTimeout(() => {
          setShowInstallPrompt(true);
        }, 3000);
      }
    };
    
    checkInstallPWA();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'favorites') {
      setActiveNavItem('favorites');
    } else {
      setActiveNavItem('home');
    }
  };
  
  const handleBottomNavigation = (item: 'home' | 'search' | 'favorites' | 'profile') => {
    setActiveNavItem(item);
    if (item === 'favorites') {
      setActiveTab('favorites');
    } else if (item === 'home') {
      setActiveTab('themes');
    } else if (item === 'search') {
      setActiveTab('ingredients');
    }
  };
  
  const handlePwaPromptClose = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };
  
  const handleFavoriteToggle = (recipeId: number) => {
    const newFavorites = favorites.includes(recipeId)
      ? favorites.filter(id => id !== recipeId)
      : [...favorites, recipeId];
    
    setFavoritesState(newFavorites);
    setFavorites(newFavorites);
  };

  return (
    <>
      <Header 
        isOffline={isOffline} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <TabNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
      
      <main className="flex-1 overflow-auto">
        {activeTab === 'themes' && (
          <ThemesView 
            recipes={filteredRecipes} 
            favorites={favorites}
            onFavoriteToggle={handleFavoriteToggle}
          />
        )}
        
        {activeTab === 'ingredients' && (
          <IngredientsView 
            recipes={recipes}
            favorites={favorites}
            onFavoriteToggle={handleFavoriteToggle}
          />
        )}
        
        {activeTab === 'favorites' && (
          <FavoritesView 
            recipes={recipes}
            favorites={favorites}
            onFavoriteToggle={handleFavoriteToggle}
            onExploreClick={() => setActiveTab('themes')}
          />
        )}
      </main>
      
      <BottomNavigation 
        activeItem={activeNavItem}
        onItemClick={handleBottomNavigation}
      />
      
      <PwaInstallPrompt 
        visible={showInstallPrompt}
        onClose={handlePwaPromptClose}
      />
    </>
  );
};

export default HomePage;
