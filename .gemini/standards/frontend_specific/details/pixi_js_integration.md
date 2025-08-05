---
name: "PixiJS Integration Standards"
purpose: "Guidelines for integrating PixiJS with SolidJS using solid-pixi, emphasizing modularity and performance."
tags: ["frontend", "pixijs", "solidjs", "solid-pixi", "graphics"]
---

# PixiJS Integration Standards

This document outlines the standards for integrating PixiJS into the SolidJS frontend, primarily leveraging the `solid-pixi` library. The goal is to ensure a modular, performant, and maintainable graphics rendering system that aligns with our project's architectural principles.

## 1. Core Principle: Declarative Rendering with `solid-pixi`

- **Summary**: Prioritize the use of `solid-pixi`'s JSX components to declaratively define and manage PixiJS display objects. This approach leverages SolidJS's fine-grained reactivity for efficient updates and promotes a component-based structure for the graphics scene.
- **Details**:
  - Use `solid-pixi` components like `<Application>`, `<Container>`, `<Sprite>`, `<Graphics>`, and `<Text>` to construct the visual hierarchy.
  - Bind PixiJS object properties (e.g., `x`, `y`, `scale`, `alpha`) to SolidJS signals to enable automatic, performant updates when data changes.
  - Example:

      ```tsx
      import { createSignal } from 'solid-js';
      import { Application, Sprite } from 'solid-pixi';

      const MyScene = () => {
        const [x, setX] = createSignal(0);
        // ... logic to update x
        return (
          <Application width={800} height={600}>
            <Sprite texture="path/to/texture.png" x={x()} y={100} />
          </Application>
        );
      };
      ```

## 2. Direct PixiJS API Access (Imperative Operations)

- **Summary**: While `solid-pixi` is preferred for declarative rendering, direct access to the underlying PixiJS API is permissible and necessary for certain imperative operations (e.g., complex animations, custom drawing logic, advanced filters, or specific object manipulations not easily expressed declaratively).
- **Details**:
  - When accessing PixiJS objects directly, ensure that any state changes that affect rendering are managed through SolidJS signals or effects to maintain reactivity and prevent inconsistencies.
  - Obtain references to PixiJS objects via `ref` props on `solid-pixi` components.
  - Example:

      ```tsx
      import { createSignal, onMount } from 'solid-js';
      import { Application, Graphics } from 'solid-pixi';
      import * as PIXI from 'pixi.js';

      const CustomDrawing = () => {
        let graphicsRef: PIXI.Graphics | undefined;

        onMount(() => {
          if (graphicsRef) {
            graphicsRef.clear();
            graphicsRef.lineStyle(2, 0xFF0000);
            graphicsRef.drawCircle(0, 0, 50);
          }
        });

        return (
          <Application width={800} height={600}>
            <Graphics ref={graphicsRef} x={100} y={100} />
          </Application>
        );
      };
      ```

## 3. Modularity and Component Structure

- **Summary**: Break down complex PixiJS scenes into smaller, reusable SolidJS components. Each component should encapsulate a specific visual element or a logical part of the scene, promoting maintainability and reusability.
- **Details**:
  - Follow the component architecture guidelines defined in `/.gemini/standards/frontend_specific/details/component_architecture.md`.
  - Create dedicated SolidJS components for individual sprites, text elements, custom graphics, or interactive areas within the PixiJS canvas.
  - Use SolidJS props to pass data and event handlers between parent and child PixiJS-related components.

## 4. Asset Management

- **Summary**: Utilize PixiJS's built-in Assets system for loading and managing resources (images, spritesheets, fonts, etc.).
- **Details**:
  - Load assets asynchronously using `PIXI.Assets.load()`.
  - Consider creating a dedicated SolidJS context or store for managing loaded assets, making them accessible throughout the PixiJS scene without re-loading.
  - Preload critical assets during application startup or before a scene is rendered to avoid visual delays.

## 5. Performance Considerations

- **Summary**: Adhere to general PixiJS performance best practices to ensure a smooth and responsive user experience, especially given the desktop application context.
- **Details**:
  - **Batching**: PixiJS automatically batches compatible objects (e.g., sprites using the same texture). Design scenes to maximize batching.
  - **Texture Optimization**: Use spritesheets for multiple small images. Ensure textures are power-of-two dimensions if possible (though less critical with modern PixiJS).
  - **Avoid Constant Text Changes**: Text rendering can be expensive. If text changes frequently, consider using `BitmapText` or caching `Text` objects.
  - **Culling**: Implement manual culling for off-screen objects in very large scenes if automatic culling is insufficient.
  - **Minimize Filters/Masks**: Use filters and masks sparingly, as they can be performance-intensive.
  - **Test in Tauri**: Always test performance within the Tauri environment, as webview performance can differ from browser environments.
