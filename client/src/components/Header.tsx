import React, { useState } from 'react';
import { RestaurantIcon, WifiOffIcon, DownloadIcon, SearchIcon } from './ui/icons';
import { canInstallPWA, installPWA } from '@/lib/pwa';

interface HeaderProps {
  isOffline: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ isOffline, searchQuery, setSearchQuery }) => {
  const [canInstall, setCanInstall] = useState(false);

  React.useEffect(() => {
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
            type="search" 
            placeholder="Rechercher une recette..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;
