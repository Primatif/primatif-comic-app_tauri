import { Component, onCleanup, onMount } from 'solid-js';
import { Application, Container, Graphics } from 'pixi.js';
import { error } from '@tauri-apps/plugin-log';
import { CheckeredBackground } from '../CheckeredBackground/CheckeredBackground';

/**
 * Props for the WorkspaceRenderer component
 */
interface WorkspaceRendererProps {
  /** Optional fixed width for the workspace. If not provided, uses container width */
  width?: number;
  /** Optional fixed height for the workspace. If not provided, uses container height */
  height?: number;
  /** Background color as a hex number (e.g., 0xFF0000 for red). Defaults to transparent for checkered background */
  backgroundColor?: number;
  /** Size of checkered background squares in pixels. Defaults to 20 */
  checkerSize?: number;
  /** Light color for checkered background. Defaults to '#ffffff' */
  checkerLightColor?: string;
  /** Dark color for checkered background. Defaults to '#f0f0f0' */
  checkerDarkColor?: string;
}

/**
 * WorkspaceRenderer - A SolidJS component that provides the main workspace for comic creation
 * 
 * This component creates and manages a PixiJS Application instance that serves as the primary
 * workspace for comic creation and editing. It handles the complete lifecycle of the PixiJS 
 * application including initialization, rendering, resizing, and cleanup.
 * 
 * @component
 * @example
 * ```tsx
 * <WorkspaceRenderer backgroundColor={0xFF0000} />
 * ```
 * 
 * @features
 * - Responsive workspace that fills parent container
 * - Automatic resize handling using ResizeObserver
 * - PixiJS-powered rendering engine for comic elements
 * - Proper resource cleanup on component unmount
 * - PixiJS v8 API compliance (no deprecation warnings)
 * - Tauri native logging integration
 * 
 * @performance
 * - Uses PixiJS ticker for smooth 60fps rendering
 * - Efficient ResizeObserver for responsive behavior
 * - Proper memory management with cleanup handlers
 */
export const WorkspaceRenderer: Component<WorkspaceRendererProps> = (props) => {
  /** Reference to the DOM container element that holds the PixiJS canvas */
  let appContainer: HTMLDivElement | undefined;
  /** The main PixiJS Application instance */
  let pixiApp: Application | undefined;
  /** Container that holds the animated star graphics */
  let starContainer: Container | undefined;
  
  /**
   * Creates a 5-pointed star shape using PixiJS v8 Graphics API
   * 
   * @returns {Graphics} A Graphics object containing the white star shape
   * 
   * @internal
   * Uses the new PixiJS v8 poly() and fill() methods instead of deprecated
   * beginFill/endFill to avoid console warnings
   */
  const createStar = () => {
    const graphics = new Graphics();
    
    const starPoints = 5;
    const outerRadius = 50;
    const innerRadius = 25;
    const startAngle = -Math.PI / 2;
    
    // Create star path
    const starPath = [];
    for (let i = 0; i < starPoints * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const pointAngle = startAngle + (i * Math.PI / starPoints);
      const x = radius * Math.cos(pointAngle);
      const y = radius * Math.sin(pointAngle);
      starPath.push(x, y);
    }
    
    // Use v8 API - poly method with fill
    graphics.poly(starPath).fill('#E31937'); // Red color
    return graphics;
  };
  
  /**
   * SolidJS lifecycle hook that initializes the PixiJS application
   * 
   * This async function handles the complete setup of the PixiJS environment:
   * - Creates and initializes the PixiJS Application with proper settings
   * - Sets up the canvas element with responsive styling
   * - Creates the animated star graphics and positions it in the center
   * - Configures the animation ticker for smooth rotation
   * - Sets up ResizeObserver for responsive canvas behavior
   * - Registers cleanup handlers for proper resource disposal
   * 
   * @async
   * @returns {Promise<void>}
   * 
   * @throws Will log errors if PixiJS initialization fails
   */
  onMount(async () => {
    if (!appContainer) {
      await error('WorkspaceRenderer: appContainer ref is not set');
      return;
    }

    try {
      // Create the Pixi Application
      pixiApp = new Application();
      
      // Initialize with proper settings - use transparent background for checkered pattern
      await pixiApp.init({
        background: props.backgroundColor || 0x000000, // Transparent or custom color
        backgroundAlpha: props.backgroundColor ? 1 : 0, // Transparent if no background color specified
        width: appContainer.clientWidth || 800,
        height: appContainer.clientHeight || 600,
        antialias: true,
        autoDensity: true,
        resolution: window.devicePixelRatio || 1
      });
      
      // Add canvas to the DOM with correct styles
      if (pixiApp.canvas) {
        pixiApp.canvas.style.display = 'block';
        pixiApp.canvas.style.width = '100%';
        pixiApp.canvas.style.height = '100%';
        pixiApp.canvas.style.maxWidth = '100%';
        pixiApp.canvas.style.maxHeight = '100%';
        appContainer.appendChild(pixiApp.canvas);
      }
      
      // Create a container for the star
      starContainer = new Container();
      
      // Create the star shape
      const star = createStar();
      starContainer.addChild(star);
      
      /**
       * Centers the star container in the middle of the canvas
       * @internal
       */
      const centerStar = () => {
        if (pixiApp && pixiApp.screen && starContainer) {
          starContainer.position.set(
            pixiApp.screen.width / 2,
            pixiApp.screen.height / 2
          );
        }
      };
      
      centerStar();
      
      // Add the star container to the main stage
      pixiApp.stage.addChild(starContainer);
      
      /**
       * Animation function that rotates the star continuously
       * Called by PixiJS ticker for smooth 60fps animation
       * @internal
       */
      const animateStar = () => {
        if (starContainer) {
          starContainer.rotation += 0.02; // ~1.15 degrees per frame at 60fps
        }
      };
      
      // Register the animation function with PixiJS ticker
      pixiApp.ticker.add(animateStar);
      
      /**
       * Handles canvas resize events by updating renderer dimensions and re-centering content
       * @internal
       */
      const handleResize = () => {
        if (pixiApp && appContainer) {
          const newWidth = appContainer.clientWidth;
          const newHeight = appContainer.clientHeight;
          
          // Update PixiJS renderer to match new container size
          pixiApp.renderer.resize(newWidth, newHeight);
          
          // Re-center the star in the new dimensions
          centerStar();
        }
      };
      
      /**
       * ResizeObserver provides efficient container size change detection
       * More performant than window resize events for responsive behavior
       */
      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      
      resizeObserver.observe(appContainer);
      
      // Set up cleanup properly within onMount
      onCleanup(() => {
        resizeObserver.disconnect();
        if (pixiApp) {
          pixiApp.ticker.remove(animateStar);
          pixiApp.destroy(true, { children: true, texture: true });
        }
      });
      
    } catch (err) {
      await error(`WorkspaceRenderer: Error initializing PixiJS - ${err}`);
    }
  });


  return (
    <div 
      ref={appContainer} 
      style={{
        width: "100%", 
        height: "100%", // Respect parent height from layout system
        position: "absolute", // Use absolute positioning to fill container
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        overflow: "hidden",
        "min-height": "200px" // Reduced minimum height
      }}
      data-testid="workspace-container"
    >
      {/* Checkered background pattern for transparency indication */}
      <CheckeredBackground 
        squareSize={props.checkerSize}
        lightColor={props.checkerLightColor}
        darkColor={props.checkerDarkColor}
      />
    </div>
  );
};

export default WorkspaceRenderer;
