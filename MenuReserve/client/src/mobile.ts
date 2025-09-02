import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';

export const initializeMobile = async () => {
  if (Capacitor.isNativePlatform()) {
    // Configure status bar
    await StatusBar.setStyle({ style: 'default' });
    await StatusBar.setBackgroundColor({ color: '#ffffff' });
    
    // Hide splash screen
    await SplashScreen.hide();
  }
};