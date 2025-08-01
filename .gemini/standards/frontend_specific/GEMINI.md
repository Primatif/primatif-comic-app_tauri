---
name: "Frontend Development Standards"
purpose: "Standards for frontend development, component structure, and styling."
tags: ["frontend", "solidjs", "typescript", "components", "styling"]
---

# Frontend Development Standards

These standards extend `/.gemini/standards/GEMINI.md` with specific conventions for the SolidJS, TypeScript, and Tailwind CSS frontend.

## 1. Component Architecture

- **Directory Structure**: Components are organized by feature under `src/components/`. Each feature directory contains the main component, an `index.ts` for exports, and subdirectories for sub-components/utilities.

  ```txt
  components/
  └── FeatureName/
      ├── FeatureName.tsx
      ├── index.ts
      └── SubComponent/
  ```

- **Decomposition**: Favor small, single-responsibility components.
- **Exports**: Use `index.ts` for clean public API. Import from directory, not specific file.

  ```typescript
  // ✅ Do this
  import { MyComponent } from "components/MyComponent";
  // ❌ Not this
  import { MyComponent } from "components/MyComponent/MyComponent";
  ```

## 2. State Management

- **Local State First**: Use SolidJS signals (`createSignal`) for component-local state.
- **Custom Hooks/Primitives**: Extract complex/reusable state logic into custom primitives (e.g., `createMyLogic`).
- **Global State**: Use SolidJS stores (`createStore`) for shared state across unrelated components. Define global stores in `src/stores/`.

## 3. Type Safety (TypeScript)

- **Focused Interfaces**: Define single-purpose interfaces for props, API responses, and data models.
- **Composition**: Use type composition (`&` and `|`) to build complex types.
- **TSDoc**: Document all exported components, interfaces, and types using TSDoc.

## 4. Styling

Primarily use Tailwind CSS utility classes. For custom styles, define in `src/App.css` or component-specific CSS modules (e.g., BEM). Define design tokens (colors, spacing, typography) in `tailwind.config.js`.

## 5. HTML & Accessibility

- **Semantic HTML**: Use semantic HTML5 elements (`<article>`, `<nav>`, `<section>`) for UI structure.
- **Element Identification**: Interactive/key elements must have unique `id` and `data-testid`.
  - **Convention**: `component-name-element-purpose` (e.g., `id="login-form-submit-button"`).
- **Accessibility**: Adhere to WCAG standards (keyboard navigation, screen reader, high-contrast).

## 5. Error Handling

- **Error Boundaries**: Wrap major UI features in SolidJS `<ErrorBoundary>` to prevent app crashes.
- **Graceful Degradation**: Handle missing/loading data gracefully using `<Show>`, `<For>`, `<Switch>` for empty states or loading indicators.

## 6. Anti-Patterns to Avoid

- **Monolithic Components**: Break down large components.
- **Prop Drilling**: Use stores or context for deep data needs.
- **Inline Styles**: Use Tailwind CSS. Avoid `style` attribute.
