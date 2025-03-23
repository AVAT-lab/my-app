import React from 'react';
import { XIcon } from './ui/icons';
import { installPWA } from '@/lib/pwa';

interface PwaInstallPromptProps {
  visible: boolean;
  onClose: () => void;
}

const PwaInstallPrompt: React.FC<PwaInstallPromptProps> = ({ visible, onClose }) => {
  const handleInstall = async () => {
    try {
      await installPWA();
      onClose();
    } catch (error) {
      console.error('Failed to install PWA', error);
    }
  };

  if (!visible) return null;
  
  return (
    <div className="install-prompt fixed bottom-20 left-4 right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
      <div className="flex items-start">
        <div className="flex-1">
          <h3 className="font-nunito font-bold mb-1">Installer l'application</h3>
          <p className="text-sm text-gray-600">Ajoutez CuisineIdées à votre écran d'accueil pour un accès rapide et hors-ligne.</p>
        </div>
        <button 
          className="text-gray-400 p-1" 
          aria-label="Fermer"
          onClick={onClose}
        >
          <XIcon className="text-xl" />
        </button>
      </div>
      <div className="mt-3 flex gap-2">
        <button 
          className="flex-1 py-2 px-4 rounded-lg border border-gray-300 text-gray-700 font-semibold"
          onClick={onClose}
        >
          Plus tard
        </button>
        <button 
          className="flex-1 py-2 px-4 bg-primary text-white rounded-lg font-semibold"
          onClick={handleInstall}
        >
          Installer
        </button>
      </div>
    </div>
  );
};

export default PwaInstallPrompt;
