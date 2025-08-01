---
name: "Frontend Error Handling Standards"
purpose: "Detailed standards for error handling in the frontend."
tags: ["frontend", "error-handling"]
---

# Error Handling

Effective error handling in the frontend is crucial for providing a robust and user-friendly experience, preventing application crashes, and gracefully managing unexpected situations.

## Error Boundaries

-   **Crash Prevention**: Wrap major UI features or logical sections of the application in SolidJS `<ErrorBoundary>` components. Error boundaries catch JavaScript errors that occur in their child component tree, log those errors, and display a fallback UI instead of crashing the entire application.

## Graceful Degradation

-   **User Experience**: Handle missing data, loading states, or errors gracefully to provide a smooth user experience. Utilize SolidJS control flow components:
    -   `<Show>`: Conditionally render content based on a signal's value, useful for displaying content only when data is available.
    -   `<For>`: Efficiently render lists, and can be combined with `<Show>` to display a message when a list is empty.
    -   `<Switch>` and `<Match>`: For rendering different content based on multiple conditions, ideal for managing various loading, success, and error states.
-   **Loading Indicators**: Provide clear loading indicators (spinners, skeletons) when data is being fetched or operations are in progress.
