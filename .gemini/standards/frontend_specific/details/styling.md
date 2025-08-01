---
name: "Frontend Styling Standards"
purpose: "Detailed standards for styling frontend components."
tags: ["frontend", "styling", "tailwind-css"]
---

# Styling

This section outlines the standards for styling frontend components, primarily leveraging Tailwind CSS.

## Tailwind CSS

- **Utility-First**: Primarily use Tailwind CSS utility classes for styling components. This approach promotes consistency, reduces the need for custom CSS, and speeds up development.

## Custom Styles

- **Limited Use**: For highly custom styles that cannot be achieved with Tailwind utilities, define them in `src/App.css` or in component-specific CSS modules (e.g., following BEM conventions).
- **Design Tokens**: Define design tokens (such as colors, spacing, and typography) within `tailwind.config.js`. This centralizes design decisions and ensures consistency across the application.

## Global Theming

- **Tailwind Theming**: Leverage Tailwind's `theme` configuration to define and extend color palettes, typography, spacing, and other design system elements. This ensures a consistent and easily modifiable global theme.
- **CSS Variables (for dynamic themes)**: For dynamic theming (e.g., light/dark mode toggling, user-customizable themes), utilize CSS variables defined at the root level (`:root`) and referenced within Tailwind's configuration or directly in CSS. This allows for runtime theme changes without recompiling CSS.
