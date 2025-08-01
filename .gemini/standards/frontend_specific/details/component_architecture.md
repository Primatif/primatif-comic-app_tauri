---
name: "Frontend Component Architecture"
purpose: "Detailed standards for frontend component structure and organization."
tags: ["frontend", "components", "architecture"]
---

# Component Architecture

This section defines the standards for organizing and structuring frontend components to ensure maintainability, scalability, and reusability.

## Directory Structure

Components are organized by feature under the `src/components/` directory. Each feature should have its own dedicated directory, which contains:

- The main component file (e.g., `FeatureName.tsx`).
- An `index.ts` file for exporting the component(s), providing a clean public API.
- Subdirectories for any sub-components or related utilities that are specific to that feature.

```txt
components/
└── FeatureName/
    ├── FeatureName.tsx
    ├── index.ts
    └── SubComponent/
        └── SubComponent.tsx
```

## Decomposition

Favor creating small, single-responsibility components. This approach enhances readability, testability, and reusability. A component should ideally do one thing well.

## Exports

Use `index.ts` files within component directories to define a clean public API for importing components. This allows for cleaner import paths and better encapsulation.

- **✅ Do this (import from directory):**

    ```typescript
    import { MyComponent } from "components/MyComponent";
    ```

- **❌ Not this (import from specific file):**

    ```typescript
    import { MyComponent } from "components/MyComponent/MyComponent";
    ```
