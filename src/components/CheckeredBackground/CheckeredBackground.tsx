import { Component } from 'solid-js';
import { CHECKERED_BACKGROUND } from '../../styles/utils/theme-config';

/**
 * Props for the CheckeredBackground component
 */
interface CheckeredBackgroundProps {
  /** Size of each square in pixels. Defaults to 20 */
  squareSize?: number;
  /** Color of the light squares (CSS color). Defaults to '#ffffff' */
  lightColor?: string;
  /** Color of the dark squares (CSS color). Defaults to '#f0f0f0' */
  darkColor?: string;
  /** Optional CSS class name for additional styling */
  class?: string;
  /** Optional inline styles */
  style?: Record<string, string | number>;
}

/**
 * CheckeredBackground - A configurable checkered pattern background component
 * 
 * This component creates a CSS-based checkered pattern that's commonly used in
 * graphics applications to indicate transparency or as a neutral workspace background.
 * Perfect for comic creation tools where you need to distinguish between transparent
 * and opaque areas.
 * 
 * @component
 * @example
 * ```tsx
 * // Default 20px squares
 * <CheckeredBackground />
 * 
 * // Custom square size and colors
 * <CheckeredBackground 
 *   squareSize={16} 
 *   lightColor="#ffffff" 
 *   darkColor="#e0e0e0" 
 * />
 * 
 * // Large squares for subtle background
 * <CheckeredBackground squareSize={40} />
 * ```
 * 
 * @features
 * - Configurable square size for different visual densities
 * - Customizable colors to match your app's theme
 * - Pure CSS implementation for optimal performance
 * - Responsive design that fills parent container
 * - No JavaScript overhead - just CSS patterns
 * 
 * @performance
 * - Uses CSS background patterns for hardware acceleration
 * - No canvas or SVG overhead
 * - Scales efficiently at any size
 */
export const CheckeredBackground: Component<CheckeredBackgroundProps> = (props) => {

  // Default props from theme configuration
  const squareSize = () => props.squareSize ?? CHECKERED_BACKGROUND.SQUARE_SIZE;
  const lightColor = () => props.lightColor ?? CHECKERED_BACKGROUND.LIGHT_COLOR;
  const darkColor = () => props.darkColor ?? CHECKERED_BACKGROUND.DARK_COLOR;
  
  /**
   * Generates the CSS background pattern for the checkered effect
   * Uses linear gradients to create the alternating square pattern
   */
  const backgroundStyle = () => {
    const size = squareSize();
    const light = lightColor();
    const dark = darkColor();
    
    return {
      'background-image': `
        linear-gradient(45deg, ${dark} 25%, transparent 25%),
        linear-gradient(-45deg, ${dark} 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, ${dark} 75%),
        linear-gradient(-45deg, transparent 75%, ${dark} 75%)
      `,
      'background-size': `${size}px ${size}px`,
      'background-position': `0 0, 0 ${size / 2}px, ${size / 2}px -${size / 2}px, -${size / 2}px 0px`,
      'background-color': light,
      ...props.style
    };
  };

  return (
    <div
      class={props.class}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        'z-index': '-1', // Behind other content
        ...backgroundStyle()
      }}
      data-testid="checkered-background"
    />
  );
};

export default CheckeredBackground;
