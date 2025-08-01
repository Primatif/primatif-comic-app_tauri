---
name: "Responsive UI & Authoritative Backend Pattern"
purpose: "Detailed explanation of the Responsive UI and Authoritative Backend architectural pattern."
tags: ["architecture", "pattern", "frontend-backend-interaction", "responsive-ui", "authoritative-backend"]
---

# Responsive UI & Authoritative Backend Pattern

This pattern ensures a highly responsive user interface while maintaining data integrity through an authoritative backend.

## Frontend (Real-time Interaction Loop)

The frontend (e.g., SolidJS) is responsible for handling all real-time user interactions such as dragging, resizing, or drawing.

- **Temporary Local UI State:** It utilizes temporary local UI state to provide a fluid 60 frames per second (fps) experience. This state is optimized purely for rendering and immediate user feedback.
- **Non-Authoritative:** This local state is explicitly **non-authoritative**. It does not represent the true, persisted state of the application.
- **No High-Frequency Backend Calls:** Crucially, no backend calls occur during high-frequency events (e.g., `onMouseMove`). This prevents overwhelming the backend and ensures UI responsiveness.

## Backend (Authoritative Update Loop)

The Rust backend serves as the single source of truth for all application data and business logic.

- **Final User Action States:** The frontend sends only the final user action states (e.g., `onMouseUp`, `onDragEnd`, `onDrawComplete`) to the backend via Tauri commands.
- **Validation and Persistence:** Upon receiving these final states, the backend validates the data, performs necessary business logic, and then persists the **authoritative** state to the database.
- **Data Integrity:** This approach guarantees data integrity and robustness, as all critical state changes are managed and validated by the backend.
