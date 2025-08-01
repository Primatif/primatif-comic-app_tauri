---
name: "Frontend Anti-Patterns to Avoid"
purpose: "Common anti-patterns to avoid in frontend development."
tags: ["frontend", "anti-patterns"]
---

# Anti-Patterns to Avoid

To maintain a clean, performant, and scalable frontend codebase, avoid the following common anti-patterns:

-   **Monolithic Components**: Avoid creating excessively large components that handle too many responsibilities. Break down complex components into smaller, single-purpose components.

-   **Prop Drilling**: Do not pass props through many layers of components that don't directly use them. Instead, use SolidJS stores (`createStore`) or Context API for deep data needs, allowing components to access data directly without unnecessary prop passing.

-   **Inline Styles**: Avoid using the `style` attribute for styling elements directly in JSX/TSX. Instead, leverage Tailwind CSS utility classes for styling. For custom styles, use dedicated CSS files or CSS modules as per the styling standards.
