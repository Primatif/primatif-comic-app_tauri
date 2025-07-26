---
name: "Core Application Architecture"
purpose: "Defines the fundamental architectural patterns governing the interaction between the frontend and backend."
modification_date: "2025-07-24"
tags:
  ["architecture", "frontend-backend-interaction", "performance", "decoupling"]
---

# Core Application Architecture Standards

This document outlines the core architectural principles that govern the structure of the application and the interaction between the frontend and backend components. Adherence to these patterns is critical for ensuring performance, maintainability, and future flexibility.

## 1. Responsive UI / Authoritative Backend Pattern

This pattern is the foundation of the application's interactive experience and data integrity. It separates the concerns of real-time user feedback from the official persistence of data.

- **Frontend (Real-time Interaction Loop):** The frontend (e.g., SolidJS) is solely responsible for all high-frequency, real-time user interactions such as dragging, resizing, or drawing.
  - It maintains a temporary, local UI state to provide a fluid, 60fps experience.
  - This local state is considered **non-authoritative** and is optimized for rendering speed.
  - The frontend makes no calls to the backend during high-frequency event loops (e.g., `onMouseMove`).

- **Backend (Authoritative Update Loop):** The Rust backend is the application's single source of truth.
  - The frontend communicates the final, settled state of a user action (e.g., on `onMouseUp` after a drag operation) to the backend via a Tauri command.
  - The backend validates all incoming data, performs the necessary business logic, and persists the **authoritative** state to the database.
  - This model ensures data integrity and robustness while decoupling the UI's perceived performance from backend processing time.

## 2. View-Agnostic Backend API

To ensure long-term maintainability and technological flexibility, the backend must be developed as a completely view-agnostic service layer.

- **Stable API Contract:** The set of Tauri commands (`#[tauri::command]`) and the Rust structs they use for input and output form a strict, stable API contract.
- **Frontend as a "Client":** The frontend, regardless of the technology used (SolidJS, Dioxus, etc.), is treated as just one possible client of this API.
- **Decoupling:** The backend must never contain any logic that depends on the specific implementation details of the frontend framework. All data and commands should be generic.
- **Benefit:** This strict separation ensures that the entire frontend could be replaced or rewritten in the future (e.g., migrating from SolidJS to Dioxus) without requiring a significant backend rewrite.
