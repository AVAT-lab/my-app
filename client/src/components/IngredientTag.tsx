import React from 'react';
import { XIcon } from './ui/icons';

interface IngredientTagProps {
  name: string;
  onRemove: (name: string) => void;
}

const IngredientTag: React.FC<IngredientTagProps> = ({ name, onRemove }) => {
  return (
    <div className="ingredient-tag flex items-center bg-secondary/10 text-secondary px-3 py-1 rounded-full">
      <span>{name}</span>
      <button 
        className="ml-2 text-secondary/70 hover:text-secondary" 
        aria-label="Retirer l'ingrédient"
        onClick={() => onRemove(name)}
      >
        <XIcon />
      </button>
    </div>
  );
};

export default IngredientTag;
