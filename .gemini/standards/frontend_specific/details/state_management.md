---
name: "Frontend State Management"
purpose: "Detailed standards for frontend state management using SolidJS."
tags: ["frontend", "state-management", "solidjs"]
---

# State Management

This section outlines the recommended practices for managing state within the SolidJS frontend application.

## Local State First

-   **SolidJS Signals**: For component-local state, always prefer SolidJS signals (`createSignal`). Signals provide fine-grained reactivity, ensuring that only the parts of the UI that depend on a specific piece of state re-render, leading to highly performant applications.

## Custom Hooks/Primitives

-   **Encapsulation**: Extract complex or reusable stateful logic into custom SolidJS primitives or hooks (e.g., `createMyLogic`). This promotes code reuse, improves readability, and keeps components lean.
-   **Separation of Concerns**: Custom primitives help separate concerns by encapsulating state logic away from the component's rendering logic.

## Global State

-   **SolidJS Stores**: For shared state that needs to be accessed by unrelated components across the application, use SolidJS stores (`createStore`). Stores are ideal for managing global application state, such as user authentication status, theme settings, or application-wide data.
-   **Location**: Define global stores in the `src/stores/` directory to centralize their management and make them easily discoverable.
