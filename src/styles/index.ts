/**
 * PRIMATIF COMICS STYLES - CENTRAL EXPORT
 * 
 * Single import point for all styling utilities, components, and theme functions.
 * 
 * USAGE:
 * import { LAYOUT, COMPONENTS, TYPOGRAPHY, THEME_UTILS } from '@/styles';
 */

// Re-export all component patterns
export {
  LAYOUT,
  COMPONENTS,
  TYPOGRAPHY,
  CANVAS,
  combineClasses,
  conditionalClass,
} from './components';

// Re-export theme utilities
export { THEME_UTILS } from './utils/theme-utils';
