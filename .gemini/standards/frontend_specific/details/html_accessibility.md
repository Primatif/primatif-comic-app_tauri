---
name: "Frontend HTML & Accessibility Standards"
purpose: "Detailed standards for HTML structure and accessibility in the frontend."
tags: ["frontend", "html", "accessibility", "a11y"]
---

# HTML & Accessibility

Ensuring semantic HTML and high accessibility standards is crucial for a usable and inclusive application.

## Semantic HTML

-   **Meaningful Elements**: Use semantic HTML5 elements (`<article>`, `<nav>`, `<section>`, `<aside>`, `<main>`, `<footer>`, `<header>`) to structure the user interface. Semantic elements provide meaning to the content and improve accessibility for assistive technologies.

## Element Identification

-   **Unique Identifiers**: Interactive and key elements within the UI **must** have unique `id` attributes and `data-testid` attributes. These are essential for both accessibility (e.g., for `aria-labelledby`) and for automated testing.
-   **Naming Convention**: Follow a consistent naming convention for `id` and `data-testid` attributes: `component-name-element-purpose` (e.g., `id="login-form-submit-button"`, `data-testid="user-profile-avatar"`).

## Accessibility (WCAG)

-   **Adherence**: Adhere to Web Content Accessibility Guidelines (WCAG) standards. This includes:
    -   **Keyboard Navigation**: Ensure all interactive elements are fully navigable and operable using only a keyboard.
    -   **Screen Reader Compatibility**: Provide appropriate ARIA attributes and ensure content is structured logically for screen readers.
    -   **High-Contrast Support**: Design with sufficient color contrast to support users with visual impairments.
