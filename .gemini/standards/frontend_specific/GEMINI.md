---
name: "Frontend Development Standards"
purpose: "Contains standards for frontend development, including component structure and styling."
modification_date: "2025-07-21"
tags: ["frontend", "solidjs", "typescript", "components", "styling"]
---

# Frontend Development Standards

These standards build upon the general principles defined in `/.gemini/standards/GEMINI.md` and provide specific conventions for the SolidJS, TypeScript, and Tailwind CSS frontend.

## 1. Component Architecture

- **Directory Structure**: Components are organized by feature under `src/components/`. Each feature directory contains the main component, an `index.ts` for clean exports, and subdirectories for sub-components and utilities.

    ```txt
    components/
    └── FeatureName/
        ├── FeatureName.tsx
        ├── index.ts
        └── SubComponent/
    ```

- **Decomposition**: Favor small, single-responsibility components composed together over large, monolithic components.
- **Exports**: Use `index.ts` files to create a clean public API for each component directory. Consumers should import from the directory, not the specific file.

    ```typescript
    // ✅ Do this
    import { MyComponent } from 'components/MyComponent';
    // ❌ Not this
    import { MyComponent } from 'components/MyComponent/MyComponent';
    ```

## 2. State Management

- **Local State First**: Use SolidJS signals (`createSignal`) for state that is local to a single component.
- **Custom Hooks/Primitives**: Extract complex or reusable state logic into custom primitives (e.g., `createMyLogic`).
- **Global State**: Use SolidJS stores (`createStore`) for state that needs to be shared across multiple, unrelated components. Global stores should be defined in the `src/stores/` directory.

## 3. Type Safety (TypeScript)

- **Focused Interfaces**: Define single-purpose interfaces for props, API responses, and data models.
- **Composition**: Use type composition (`&` and `|`) to build complex types from simpler ones.
- **TSDoc**: Document all exported components, interfaces, and types using TSDoc format for clarity and auto-generated documentation.

## 4. HTML & Accessibility

- **Semantic HTML**: Use semantic HTML5 elements (`<article>`, `<nav>`, `<section>`, etc.) to structure the UI.
- **Element Identification**: All interactive or key elements must have a unique `id` and a corresponding `data-testid` for testing.
  - **Convention**: `component-name-element-purpose` (e.g., `id="login-form-submit-button"`).
- **Accessibility**: Adhere to WCAG standards, ensuring keyboard navigation, screen reader compatibility, and high-contrast support.

## 5. Error Handling

- **Error Boundaries**: Wrap major UI features or sections in SolidJS `<ErrorBoundary>` components to prevent a component crash from taking down the entire application.
- **Graceful Degradation**: Handle missing or loading data gracefully using `<Show>`, `<For>`, and `<Switch>` components to render empty states or loading indicators.

## 6. Anti-Patterns to Avoid

- **Monolithic Components**: Break down large components.
- **Prop Drilling**: Use stores or context for deeply nested data needs.
- **Inline Styles**: Use Tailwind CSS utility classes for all styling. Avoid the `style` attribute.
