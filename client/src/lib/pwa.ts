let deferredPrompt: BeforeInstallPromptEvent | null = null;

// Extend Window interface to include BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    'beforeinstallprompt': BeforeInstallPromptEvent;
  }
}

/**
 * Initialize PWA installation listener
 * Should be called early in the application lifecycle
 */
export const initPwaInstallListener = (): void => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67+ from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
  });
};

/**
 * Check if the PWA can be installed
 * @returns Promise resolving to a boolean indicating if installation is possible
 */
export const canInstallPWA = async (): Promise<boolean> => {
  return !!deferredPrompt;
};

/**
 * Prompt the user to install the PWA
 * @returns Promise that resolves when the prompt is shown
 */
export const installPWA = async (): Promise<void> => {
  if (!deferredPrompt) {
    throw new Error('Cannot install PWA - no installation prompt available');
  }

  // Show the install prompt
  deferredPrompt.prompt();

  // Wait for the user to respond to the prompt
  const choiceResult = await deferredPrompt.userChoice;
  
  // Reset the deferred prompt variable
  deferredPrompt = null;
  
  if (choiceResult.outcome !== 'accepted') {
    throw new Error('User dismissed the PWA installation');
  }
};

/**
 * Check if the app is running in standalone/installed mode
 * @returns boolean indicating if the app is installed
 */
export const isPWAInstalled = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         (window.navigator as any).standalone === true;
};

// Initialize the PWA listener when this module is imported
initPwaInstallListener();
