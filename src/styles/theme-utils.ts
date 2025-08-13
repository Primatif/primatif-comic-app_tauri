/**
 * PRIMATIF COMICS THEME UTILITIES
 * 
 * JavaScript utilities for managing light/dark theme switching.
 * Works with the CSS custom properties defined in themes.css
 * 
 * USAGE:
 * import { THEME_UTILS } from '@/styles/theme-utils';
 * THEME_UTILS.initTheme(); // Initialize on app start
 * THEME_UTILS.toggleTheme(); // Toggle between themes
 */

export const THEME_UTILS = {
  // Theme detection
  isDarkMode: () => document.documentElement.classList.contains('dark'),
  isLightMode: () => !document.documentElement.classList.contains('dark'),
  
  // Theme switching
  setDarkMode: () => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  },
  
  setLightMode: () => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  },
  
  toggleTheme: () => {
    if (document.documentElement.classList.contains('dark')) {
      THEME_UTILS.setLightMode();
    } else {
      THEME_UTILS.setDarkMode();
    }
  },
  
  // Initialize theme from localStorage or system preference
  initTheme: () => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      THEME_UTILS.setDarkMode();
    } else {
      THEME_UTILS.setLightMode();
    }
  },
  
  // Listen for system theme changes
  watchSystemTheme: () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          THEME_UTILS.setDarkMode();
        } else {
          THEME_UTILS.setLightMode();
        }
      }
    });
  }
};
