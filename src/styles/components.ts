/**
 * PRIMATIF COMICS COMPONENT PATTERNS
 * 
 * Pre-built Tailwind class combinations for common UI elements.
 * All patterns use semantic color tokens that automatically adapt to light/dark themes.
 * 
 * USAGE:
 * import { LAYOUT, COMPONENTS, TYPOGRAPHY, CANVAS } from '@/styles/components';
 * <button className={COMPONENTS.BUTTON_PRIMARY}>Click me</button>
 */

// Layout patterns for the three-column comic app structure
export const LAYOUT = {
  MAIN_CONTAINER: 'h-screen w-screen overflow-hidden bg-bg-secondary',
  THREE_COLUMN: 'flex h-full',
  // Width is now defined directly in the components
  LEFT_SIDEBAR: 'bg-bg-tertiary text-text-primary flex flex-col border-r border-border-primary p-2 flex-shrink-0',
  RIGHT_SIDEBAR: 'bg-bg-primary flex flex-col border-l border-border-primary p-2 flex-shrink-0',
  CENTER_CANVAS: 'flex-1 bg-canvas-bg flex flex-col p-2',
  SIDEBAR_HEADER: 'p-4 border-b border-border-secondary',
  SIDEBAR_CONTENT: 'flex-1 p-4 overflow-y-auto',
  CANVAS_TOOLBAR: 'bg-bg-primary border-b border-border-primary p-3',
  CANVAS_WORKSPACE: 'flex-1 relative overflow-hidden',
};

// Component patterns using Primatif brand system
export const COMPONENTS = {
  // Cards and containers
  CARD: 'bg-bg-primary rounded-lg shadow-sm border border-border-primary',
  CARD_SECONDARY: 'bg-bg-secondary rounded-lg border border-border-secondary',
  PANEL: 'p-4 rounded-lg',
  
  // Buttons following Primatif design system
  BUTTON_PRIMARY: 'px-4 py-2 bg-primatif-blue text-white font-medium rounded-md hover:bg-primatif-blue/90 focus:outline-none focus:ring-2 focus:ring-primatif-blue focus:ring-offset-2 transition-colors',
  BUTTON_SECONDARY: 'px-4 py-2 bg-transparent text-text-primary font-medium rounded-md border border-border-primary hover:bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-border-primary focus:ring-offset-2 transition-colors',
  BUTTON_DESTRUCTIVE: 'px-4 py-2 bg-error text-white font-medium rounded-md hover:bg-error/90 focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2 transition-colors',
  
  // Form elements
  INPUT: 'w-full px-3 py-2 border border-border-primary rounded-md shadow-sm bg-bg-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-primatif-blue focus:border-primatif-blue',
  LABEL: 'block text-sm font-medium text-text-secondary mb-1',
  
  // Interactive states
  CLICKABLE: 'cursor-pointer transition-colors duration-200',
  HOVER_LIFT: 'hover:shadow-card-hover transition-shadow duration-200',
};

// Typography patterns using Primatif brand fonts
export const TYPOGRAPHY = {
  H1: 'font-heading text-5xl font-bold text-text-primary',
  H2: 'font-heading text-4xl font-bold text-text-primary',
  H3: 'font-heading text-2xl font-bold text-text-primary',
  BODY: 'font-body text-base text-text-primary',
  CAPTION: 'font-body text-xs text-text-tertiary',
  SIDEBAR_HEADER: 'font-heading text-lg font-bold text-text-primary',
  SIDEBAR_HEADER_LIGHT: 'font-heading text-lg font-bold text-text-secondary',
};

// Canvas-specific patterns for comic creation
export const CANVAS = {
  PAGE_CONTAINER: 'bg-canvas-page shadow-page border border-border-primary relative',
  TRIM_LINES: 'absolute inset-0 border-2 border-canvas-trim opacity-30 pointer-events-none',
  SAFE_AREA: 'absolute border border-canvas-safe opacity-30 pointer-events-none',
  PAGE_CONTENT: 'absolute inset-6 flex items-center justify-center',
  CHECKERBOARD_PATTERN: {
    backgroundImage: `
      linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%)
    `,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
  },
};

// Utility functions for class management
export const combineClasses = (...classes: (string | undefined | null | false)[]) => 
  classes.filter(Boolean).join(' ');

export const conditionalClass = (condition: boolean, trueClass: string, falseClass = '') => 
  condition ? trueClass : falseClass;
