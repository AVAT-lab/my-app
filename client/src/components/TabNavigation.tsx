import React from 'react';

export type TabType = 'themes' | 'ingredients' | 'favorites';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white border-b">
      <div className="flex" role="tablist">
        <button 
          className={`flex-1 py-3 px-4 font-nunito font-semibold ${
            activeTab === 'themes' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500'
          }`} 
          role="tab" 
          aria-selected={activeTab === 'themes'} 
          onClick={() => onTabChange('themes')}
        >
          Par thème
        </button>
        <button 
          className={`flex-1 py-3 px-4 font-nunito font-semibold ${
            activeTab === 'ingredients' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500'
          }`} 
          role="tab" 
          aria-selected={activeTab === 'ingredients'} 
          onClick={() => onTabChange('ingredients')}
        >
          Par ingrédient
        </button>
        <button 
          className={`flex-1 py-3 px-4 font-nunito font-semibold ${
            activeTab === 'favorites' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500'
          }`} 
          role="tab" 
          aria-selected={activeTab === 'favorites'} 
          onClick={() => onTabChange('favorites')}
        >
          Mes favoris
        </button>
      </div>
    </div>
  );
};

export default TabNavigation;
