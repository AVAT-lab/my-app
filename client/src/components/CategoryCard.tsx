import React from 'react';
import { TimerIcon, PlantIcon, EuroIcon, HeartIcon } from './ui/icons';

interface CategoryCardProps {
  category: {
    name: string;
    icon: 'timer' | 'heart' | 'euro' | 'plant';
    color: 'primary' | 'secondary' | 'success' | 'warning';
  };
  onClick: (category: string) => void;
  isSelected?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick, isSelected = false }) => {
  const getIcon = () => {
    switch (category.icon) {
      case 'timer':
        return <TimerIcon className="text-2xl mb-2" />;
      case 'heart':
        return <HeartIcon className="text-2xl mb-2" />;
      case 'euro':
        return <EuroIcon className="text-2xl mb-2" />;
      case 'plant':
        return <PlantIcon className="text-2xl mb-2" />;
      default:
        return <TimerIcon className="text-2xl mb-2" />;
    }
  };
  
  const getBgColor = () => {
    switch (category.color) {
      case 'primary':
        return 'from-primary/90 to-primary';
      case 'secondary':
        return 'from-secondary/90 to-secondary';
      case 'success':
        return 'from-success/90 to-success';
      case 'warning':
        return 'from-warning/90 to-warning';
      default:
        return 'from-primary/90 to-primary';
    }
  };
  
  return (
    <div 
      className={`category-card cursor-pointer bg-gradient-to-br ${getBgColor()} rounded-lg p-3 text-white
        ${isSelected ? 'ring-4 ring-white shadow-lg scale-[1.02]' : 'shadow-sm'} 
        transition hover:shadow-md hover:scale-[1.02]`}
      onClick={() => onClick(category.name)}
    >
      <div className="flex flex-col items-center text-center">
        {getIcon()}
        <span className="font-nunito font-semibold">{category.name}</span>
      </div>
    </div>
  );
};

export default CategoryCard;
