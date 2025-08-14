import { Component, onCleanup, onMount } from 'solid-js';
import { Application, Container, Graphics } from 'pixi.js';

interface CanvasRendererProps {
  width?: number;
  height?: number;
  backgroundColor?: number;
}

/**
 * CanvasRenderer component that encapsulates Pixi.js application.
 * This component manages the Pixi.js lifecycle and provides the canvas element.
 */
export const CanvasRenderer: Component<CanvasRendererProps> = (props) => {
  let appContainer: HTMLDivElement | undefined;
  let pixiApp: Application | undefined;
  let starContainer: Container | undefined;
  
  // Draw a star shape using PixiJS v8 API
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
    graphics.poly(starPath).fill(0xFFFFFF); // White color
    return graphics;
  };
  
  onMount(async () => {
    if (!appContainer) {
      console.error('CanvasRenderer: appContainer ref is not set');
      return;
    }

    try {
      // Create the Pixi Application
      pixiApp = new Application();
      
      // Initialize with proper settings - remove resizeTo to handle manually
      await pixiApp.init({
        background: props.backgroundColor || 0xFF0000,
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
      
      // Position in center
      const centerStar = () => {
        if (pixiApp && pixiApp.screen && starContainer) {
          starContainer.position.set(
            pixiApp.screen.width / 2,
            pixiApp.screen.height / 2
          );
        }
      };
      
      centerStar();
      
      // Add to stage
      pixiApp.stage.addChild(starContainer);
      
      // Set up animation ticker
      const animateStar = () => {
        if (starContainer) {
          starContainer.rotation += 0.02;
        }
      };
      
      // Add animation to ticker
      pixiApp.ticker.add(animateStar);
      
      // Handle window resize with proper canvas scaling
      const handleResize = () => {
        if (pixiApp && appContainer) {
          const newWidth = appContainer.clientWidth;
          const newHeight = appContainer.clientHeight;
          
          // Resize the renderer
          pixiApp.renderer.resize(newWidth, newHeight);
          
          // Re-center the star
          centerStar();
        }
      };
      
      // Use ResizeObserver for better resize handling
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
      
    } catch (error) {
      console.error('CanvasRenderer: Error initializing PixiJS', error);
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
        background: "#FF0000", // Fallback color
        "min-height": "200px" // Reduced minimum height
      }}
      data-testid="canvas-container"
    />
  );
};

export default CanvasRenderer;
