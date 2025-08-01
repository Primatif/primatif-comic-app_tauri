---
name: "TypeScript TSDoc Example"
purpose: "Example of TSDoc usage for in-code documentation."
tags: ["typescript", "tsdoc", "example", "documentation"]
---

```typescript
/**
 * Represents a user in the system.
 * @remarks This interface is used for both API responses and internal state.
 */
export interface User {
  id: string;
  name: string;
}

/**
 * Fetches a user from the API by their ID.
 *
 * @param userId - The unique identifier of the user to fetch.
 * @returns A promise that resolves to the User object, or null if not found.
 * @throws Will throw an error if the network request fails.
 */
export async function fetchUser(userId: string): Promise<User | null> {
  // ...
}
```
