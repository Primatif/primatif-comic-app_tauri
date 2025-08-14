/**
 * Theme Configuration Utilities
 * 
 * Provides access to Tailwind theme configuration values from JavaScript/TypeScript.
 * This ensures consistency between CSS and component logic by using the same
 * configuration source defined in tailwind.config.js.
 */

/**
 * Checkered background configuration from Tailwind theme
 */
export const CHECKERED_BACKGROUND = {
  /** Default square size in pixels */
  SQUARE_SIZE: 20,
  /** Light square color */
  LIGHT_COLOR: '#ffffff',
  /** Dark square color */
  DARK_COLOR: '#f0f0f0',
} as const;

/**
 * Type for checkered background configuration
 */
export type CheckeredBackgroundConfig = typeof CHECKERED_BACKGROUND;
