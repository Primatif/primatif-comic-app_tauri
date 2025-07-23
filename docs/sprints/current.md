# Current Sprint: Foundational CI/CD for MVA

**Sprint Goal:** Implement a basic Tauri application displaying database text, and establish a functional CI/CD pipeline for `dev` and `main` branches.

**Proposed Tasks:**

## 1. Project Scaffolding

- [ ] Initialize a new Tauri project using `create-tauri-app` with SolidJS (frontend) and Rust (backend).
- [ ] Select the appropriate SolidJS UI template (e.g., `solid-ts`).
- [ ] Verify the basic Tauri application runs and compiles successfully.
- [ ] Set up basic project structure for frontend and backend as per `PROJECT_SCOPE.md` guidelines, including:
  - Frontend (`src/`):
    - `components/` (for UI components)
    - `services/` (for business logic and API calls)
    - `stores/` (for global state management)
  - Backend (`src-tauri/src/`):
    - `database/` (for database schema, models, and operations)
    - `commands/` (for Tauri command handlers)
    - `services/` (for backend business logic)
    - `config.rs` (for environment configuration)
- [ ] Perform an initial Git commit of the scaffolded project.

## 2. Database Integration (Rust Backend)

* Integrate `rusqlite` (or `sqlx` if preferred for async operations, aligning with `PROJECT_SCOPE.md` suggestions) for SQLite database interaction.
* Create a simple database schema (e.g., a `messages` table with a `text` column).
* Implement a Rust function (Tauri command) to:
  * Initialize the database and table if they don't exist.
  * Insert a default message if the table is empty.
  * Retrieve the message from the database.

## 3. Frontend Display (SolidJS)

* Create a basic SolidJS component to call the Rust Tauri command.
* Display the retrieved message on the frontend.

## 4. CI/CD Pipeline Setup (GitHub Actions)

### `dev-branch.yml`

* Trigger on push to `dev` and pull requests targeting `dev`.
* Install Node.js and Rust toolchains.
* Run `npm install` and `cargo check` (or `cargo build` for a smoke test).
* Include basic linting/formatting checks if easily configurable (e.g., `eslint`, `prettier`, `cargo clippy`).

### `main-branch.yml`

* Trigger on push to `main` (from `dev` branch PR merge).
* Install Node.js and Rust toolchains.
* Run comprehensive checks (similar to `dev-branch.yml` but potentially more thorough).
* Build the production-ready Tauri application for at least one target platform (e.g., macOS).
* (Optional, but good for full cycle) Configure a basic GitHub Release step to publish the built artifact.
