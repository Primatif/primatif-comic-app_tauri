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
  
  // Draw a star shape
  const createStar = () => {
    const graphics = new Graphics();
    graphics.beginFill(0xFFFFFF); // White color
    
    const starPoints = 5;
    const outerRadius = 50;
    const innerRadius = 25;
    const startAngle = -Math.PI / 2;
    
    for (let i = 0; i < starPoints * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const pointAngle = startAngle + (i * Math.PI / starPoints);
      const x = radius * Math.cos(pointAngle);
      const y = radius * Math.sin(pointAngle);
      
      if (i === 0) {
        graphics.moveTo(x, y);
      } else {
        graphics.lineTo(x, y);
      }
    }
    
    graphics.closePath();
    graphics.endFill();
    return graphics;
  };
  
  onMount(async () => {
    if (!appContainer) {
      console.error('CanvasRenderer: appContainer ref is not set');
      return;
    }

    // Log for debugging
    console.log('CanvasRenderer: Container dimensions', {
      width: appContainer.clientWidth,
      height: appContainer.clientHeight
    });

    try {
      // Create the Pixi Application
      pixiApp = new Application();
      
      // Initialize with proper settings
      await pixiApp.init({
        background: props.backgroundColor || 0xFF0000,
        resizeTo: appContainer,
        antialias: true,
        autoDensity: true,
        resolution: window.devicePixelRatio || 1
      });
      
      // Add canvas to the DOM with correct styles
      if (pixiApp.canvas) {
        pixiApp.canvas.style.display = 'block';
        pixiApp.canvas.style.width = '100%';
        pixiApp.canvas.style.height = '100%';
        appContainer.appendChild(pixiApp.canvas);
        
        console.log('CanvasRenderer: Canvas added to DOM');
      }
      // Create a container for the star
      starContainer = new Container();
      
      // Create the star shape
      const star = createStar();
      starContainer.addChild(star);
      
      // Position in center
      if (pixiApp.screen) {
        starContainer.position.set(
          pixiApp.screen.width / 2,
          pixiApp.screen.height / 2
        );
      }
      
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
      
      // Handle window resize
      const handleResize = () => {
        if (pixiApp && pixiApp.screen && starContainer) {
          starContainer.position.set(
            pixiApp.screen.width / 2,
            pixiApp.screen.height / 2
          );
        }
      };
      
      window.addEventListener('resize', handleResize);
      handleResize(); // Force initial positioning
      
      // Set up cleanup
      onCleanup(() => {
        window.removeEventListener('resize', handleResize);
        if (pixiApp) {
          pixiApp.ticker.remove(animateStar);
          pixiApp.destroy(true, { children: true, texture: true });
        }
      });
      
      console.log('CanvasRenderer: Star animation set up');
    } catch (error) {
      console.error('CanvasRenderer: Error initializing PixiJS', error);
    }
  });


  return (
    <div 
      ref={appContainer} 
      style={{
        width: "100%", 
        height: "100%",
        position: "relative",
        overflow: "hidden",
        background: "#FF0000", // Fallback color
        "min-height": "300px" // Using hyphenated style name for TypeScript
      }}
      data-testid="canvas-container"
    />
  );
};

export default CanvasRenderer;
