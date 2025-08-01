---
name: "Core Application Architecture"
purpose: "Defines core architectural patterns for frontend-backend interaction."
tags:
  ["architecture", "frontend-backend-interaction", "performance", "decoupling"]
---

# Core Application Architecture Standards

This document outlines core architectural principles for the application's structure and frontend-backend interaction.

## 1. Responsive UI & Authoritative Backend

This pattern ensures a highly responsive user interface while maintaining data integrity.

- **Summary**: The frontend manages real-time, non-authoritative UI state for fluid interaction, while the backend acts as the authoritative source of truth, validating and persisting final user actions.
- **For detailed explanation and examples**: Refer to `/.gemini/standards/architecture/patterns/responsive_ui_pattern.md`.

## 2. View-Agnostic Backend

The backend must be a view-agnostic service layer for maintainability and flexibility.

- **Stable API Contract:** Tauri commands (`#[tauri::command]`) and their Rust structs define a strict, stable API contract.
- **Frontend as a "Client":** The frontend (SolidJS, Dioxus, etc.) acts as an API client.
- **Decoupling:** Backend logic must not depend on frontend specifics. Data and commands should be generic.
