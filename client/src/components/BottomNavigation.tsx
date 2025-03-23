import React from 'react';
import { HomeIcon, SearchIcon, HeartIcon, UserIcon } from './ui/icons';

interface BottomNavigationProps {
  activeItem: 'home' | 'search' | 'favorites' | 'profile';
  onItemClick: (item: 'home' | 'search' | 'favorites' | 'profile') => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeItem, onItemClick }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-1px_4px_rgba(0,0,0,0.05)] border-t border-gray-200 flex z-10">
      <button 
        className={`flex-1 py-3 flex flex-col items-center ${activeItem === 'home' ? 'text-primary' : 'text-gray-400'}`} 
        aria-selected={activeItem === 'home'}
        onClick={() => onItemClick('home')}
      >
        <HomeIcon className="text-xl" />
        <span className="text-xs mt-1">Accueil</span>
      </button>
      <button 
        className={`flex-1 py-3 flex flex-col items-center ${activeItem === 'search' ? 'text-primary' : 'text-gray-400'}`} 
        aria-selected={activeItem === 'search'}
        onClick={() => onItemClick('search')}
      >
        <SearchIcon className="text-xl" />
        <span className="text-xs mt-1">Recherche</span>
      </button>
      <button 
        className={`flex-1 py-3 flex flex-col items-center ${activeItem === 'favorites' ? 'text-primary' : 'text-gray-400'}`} 
        aria-selected={activeItem === 'favorites'}
        onClick={() => onItemClick('favorites')}
      >
        <HeartIcon className="text-xl" />
        <span className="text-xs mt-1">Favoris</span>
      </button>
      <button 
        className={`flex-1 py-3 flex flex-col items-center ${activeItem === 'profile' ? 'text-primary' : 'text-gray-400'}`} 
        aria-selected={activeItem === 'profile'}
        onClick={() => onItemClick('profile')}
      >
        <UserIcon className="text-xl" />
        <span className="text-xs mt-1">Profil</span>
      </button>
    </nav>
  );
};

export default BottomNavigation;
