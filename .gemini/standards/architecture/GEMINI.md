---
name: "Core Application Architecture"
purpose: "Defines core architectural patterns for frontend-backend interaction."
tags:
  ["architecture", "frontend-backend-interaction", "performance", "decoupling"]
---

# Core Application Architecture Standards

This document outlines core architectural principles for the application's structure and frontend-backend interaction.

## 1. Responsive UI & Authoritative Backend

This pattern ensures responsive UI and data integrity.

- **Frontend (Real-time Interaction Loop):** The frontend (e.g., SolidJS) handles all real-time user interactions (dragging, resizing, drawing).
  - It uses temporary local UI state for a fluid 60fps experience.
  - This local state is **non-authoritative** and optimized for rendering.
  - No backend calls occur during high-frequency events (e.g., `onMouseMove`).

- **Backend (Authoritative Update Loop):** The Rust backend is the single source of truth.
  - Frontend sends final user action states (e.g., `onMouseUp`) to the backend via Tauri commands.
  - Backend validates data, performs business logic, and persists the **authoritative** state.
  - This ensures data integrity and robustness.

## 2. View-Agnostic Backend

The backend must be a view-agnostic service layer for maintainability and flexibility.

- **Stable API Contract:** Tauri commands (`#[tauri::command]`) and their Rust structs define a strict, stable API contract.
- **Frontend as a "Client":** The frontend (SolidJS, Dioxus, etc.) acts as an API client.
- **Decoupling:** Backend logic must not depend on frontend specifics. Data and commands should be generic.
