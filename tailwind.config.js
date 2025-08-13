/**
 * TAILWIND CONFIGURATION FOR PRIMATIF COMICS
 * 
 * This file serves as the SINGLE SOURCE OF TRUTH for all styling in the app.
 * 
 * PURPOSE:
 * 1. TAILWIND UTILITIES: Defines custom colors, fonts, spacing as Tailwind classes
 * 2. COMPONENT PATTERNS: Pre-built class combinations for common UI patterns
 * 3. BRAND SYSTEM: Implements Primatif design system colors and typography
 * 
 * USAGE:
 * - Use utilities directly: className="bg-primatif-red font-heading"
 * - Use component patterns: className={COMPONENTS.BUTTON_PRIMARY}
 * - Import patterns: import { COMPONENTS, LAYOUT } from '../tailwind.config.js'
 */

/** @type {import('tailwindcss').Config} */
const config = {
  // In Tailwind v4, explicit content paths are needed
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  // Enable dark mode with class strategy
  darkMode: 'class',
  theme: {
    extend: {
      // Primatif Brand Colors
      colors: {
        // Brand Colors - foundational anchor colors
        'primatif-red': '#E31937',
        'primatif-red-dark': '#5C0411',
        'primatif-blue': '#53C8ED',
        'sky-blue-light': '#A0DFF2',
        
        // SEMANTIC COLORS - Auto-switch between light/dark
        'bg-primary': 'rgb(var(--color-bg-primary) / <alpha-value>)',
        'bg-secondary': 'rgb(var(--color-bg-secondary) / <alpha-value>)',
        'bg-tertiary': 'rgb(var(--color-bg-tertiary) / <alpha-value>)',
        
        'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        'text-tertiary': 'rgb(var(--color-text-tertiary) / <alpha-value>)',
        
        'border-primary': 'rgb(var(--color-border-primary) / <alpha-value>)',
        'border-secondary': 'rgb(var(--color-border-secondary) / <alpha-value>)',
        
        // Canvas colors (theme-aware)
        'canvas-bg': 'rgb(var(--color-canvas-bg) / <alpha-value>)',
        'canvas-page': 'rgb(var(--color-canvas-page) / <alpha-value>)',
        'canvas-trim': '#06b6d4', // Always cyan for guidelines
        'canvas-safe': '#ec4899', // Always magenta for guidelines
        
        // Status colors (consistent across themes)
        'success': '#38a169',
        'success-bg': 'rgb(var(--color-success-bg) / <alpha-value>)',
        'warning': '#d69e2e',
        'warning-bg': 'rgb(var(--color-warning-bg) / <alpha-value>)',
        'error': '#e53e3e',
        'error-bg': 'rgb(var(--color-error-bg) / <alpha-value>)',
        'info': '#3182ce',
        'info-bg': 'rgb(var(--color-info-bg) / <alpha-value>)',
      },
      
      // Primatif Typography
      fontFamily: {
        'heading': ['Bebas Neue', 'Arial Black', 'sans-serif'],
        'body': ['Lato', 'system-ui', 'sans-serif'],
        'code': ['monospace'],
      },
      
      // Custom shadows for comic elements
      boxShadow: {
        'page': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      
      // Animation durations
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  // Add Kobalte support using dynamic import for ES module compatibility
  plugins: [
    // Load the Kobalte plugin (must be defined as a function for ES modules)
    async () => {
      const kobalte = await import('@kobalte/tailwindcss');
      return kobalte.default;
    }
  ],
};

export default config;