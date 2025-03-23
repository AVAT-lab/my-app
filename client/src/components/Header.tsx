import React, { useState, useEffect, useRef } from 'react';
import { RestaurantIcon, WifiOffIcon, DownloadIcon, SearchIcon, CheckIcon } from './ui/icons';
import { canInstallPWA, installPWA } from '@/lib/pwa';
import { filterIngredients } from '@/lib/ingredients';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  isOffline: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ isOffline, searchQuery, setSearchQuery }) => {
  const [canInstall, setCanInstall] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Effet pour vérifier si l'application peut être installée
  useEffect(() => {
    const checkInstallability = async () => {
      const installable = await canInstallPWA();
      setCanInstall(installable);
    };
    
    checkInstallability();
    
    window.addEventListener('beforeinstallprompt', () => {
      setCanInstall(true);
    });
    
    return () => {
      window.removeEventListener('beforeinstallprompt', () => {
        setCanInstall(true);
      });
    };
  }, []);

  // Effet pour gérer les clics en dehors des suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) && 
          searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Effet pour mettre à jour les suggestions lors de la saisie
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const matchedIngredients = filterIngredients(searchQuery);
      setSuggestions(matchedIngredients);
      setShowSuggestions(matchedIngredients.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setActiveSuggestionIndex(-1);
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    searchInputRef.current?.focus();
    
    // Notifier l'utilisateur que l'ingrédient a été sélectionné
    toast({
      title: "Ingrédient sélectionné",
      description: `Vous avez sélectionné ${suggestion}`
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Navigation avec les touches du clavier
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && activeSuggestionIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[activeSuggestionIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleInstall = async () => {
    try {
      await installPWA();
      setCanInstall(false);
    } catch (error) {
      console.error('Failed to install PWA', error);
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <RestaurantIcon className="text-primary text-2xl" />
          <h1 className="font-nunito font-bold text-xl">CuisineIdées</h1>
        </div>
        <div className="flex items-center gap-3">
          {isOffline && (
            <div className="flex items-center text-sm px-2 py-1 rounded-full bg-warning/10 text-warning">
              <WifiOffIcon className="mr-1" />
              <span>Mode hors-ligne</span>
            </div>
          )}
          {canInstall && (
            <button 
              className="bg-secondary text-white p-2 rounded-full"
              aria-label="Installer l'application"
              onClick={handleInstall}
            >
              <DownloadIcon />
            </button>
          )}
        </div>
      </div>
      
      <div className="px-4 pb-3">
        <div className="relative">
          <input 
            ref={searchInputRef}
            type="search" 
            placeholder="Rechercher une recette ou ingrédient..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          
          {/* Liste de suggestions */}
          {showSuggestions && (
            <div 
              ref={suggestionsRef}
              className="absolute left-0 right-0 mt-1 max-h-60 overflow-auto bg-white rounded-lg shadow-lg z-20 border border-gray-200"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
                    index === activeSuggestionIndex ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span>{suggestion}</span>
                  {index === activeSuggestionIndex && (
                    <CheckIcon className="w-4 h-4 text-primary" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
