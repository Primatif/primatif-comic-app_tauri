---
name: "Styling Standards"
purpose: "Defines guidelines for managing styling using constants/tokens and promoting global theming."
modification_date: "2025-07-22"
tags: ["frontend", "styling", "theming", "design-tokens"]
---

# Styling Standards

This document outlines the principles for managing application styling, emphasizing reusability, consistency, and maintainability through a token-based approach and global theming.

## 1. Design Tokens / Constants

All styling values that are intended for reuse across the application (e.g., colors, typography scales, spacing, breakpoints, border radii, shadows) **must** be defined as design tokens or constants.

- **Source of Truth**: These tokens serve as the single source of truth for design properties.
- **Reusability**: Promotes consistency and reduces duplication.
- **Maintainability**: Simplifies global changes to the design system.

### Implementation with Tailwind CSS

- **`tailwind.config.js`**: Extend Tailwind's default configuration to define custom colors, fonts, spacing, and other design tokens. This allows these values to be used directly as Tailwind utility classes.

    ```javascript
    // tailwind.config.js
    module.exports = {
      theme: {
        extend: {
          colors: {
            primary: {
              DEFAULT: 'var(--color-primary)',
              50: 'var(--color-primary-50)',
              // ...
            },
            secondary: 'var(--color-secondary)',
            // ...
          },
          spacing: {
            'layout-xs': '1rem',
            'layout-sm': '2rem',
            // ...
          },
          // ... other tokens like fontSize, borderRadius, boxShadow
        },
      },
    };
    ```

- **CSS Variables (Optional but Recommended for Theming)**: For dynamic theming (e.g., light/dark mode), define these tokens as CSS custom properties (variables) in a global stylesheet (e.g., `src/index.css`). These CSS variables can then be referenced in `tailwind.config.js`.

    ```css
    /* src/index.css */
    :root {
      --color-primary: #007bff;
      --color-primary-50: #e6f2ff;
      --color-secondary: #6c757d;
      /* ... other global tokens */
    }

    .dark {
      --color-primary: #66b3ff;
      --color-primary-50: #001a33;
      /* ... dark mode tokens */
    }
    ```

## 2. Global Styling and Theming

Prioritize global styling and theming mechanisms to ensure a consistent look and feel across the application and to simplify theme changes.

- **Base Styles**: Define base styles for HTML elements (e.g., `body`, `h1`, `p`) in a global CSS file or through Tailwind's `@apply` or `base` layers.
- **Theming**: Implement theming (e.g., light/dark mode) by toggling classes on the `html` or `body` element, which then leverage CSS variables defined in section 1.
- **Component-Agnostic Styling**: Avoid hardcoding values within individual components that should be part of the global design system. Instead, use the defined design tokens.

## 3. Component-Specific Styling

While global styling is preferred, component-specific styles are sometimes necessary.

- **Utility-First**: Leverage Tailwind's utility classes as much as possible for component styling.
- **Encapsulation**: For complex, unique component styles that cannot be achieved with utilities, use scoped CSS or CSS-in-JS solutions if absolutely necessary, but ensure they do not conflict with global tokens.
- **Avoid Inline Styles**: Do not use inline `style` attributes for styling, as this bypasses the design token system and makes global changes difficult.

## 4. Consistency and Review

- **Design System Adherence**: All new UI development must strictly adhere to the defined design tokens and global styling principles.
- **Code Reviews**: Styling implementations should be part of code reviews to ensure compliance with these standards.
