# Current Sprint: Foundational CI/CD for MVA

**Sprint Goal:** Implement a basic Tauri application displaying database text, and establish a functional CI/CD pipeline for `dev` and `main` branches.

**Proposed Tasks:**

## 1. Project Scaffolding

- [ ] Initialize a new Tauri project using `create-tauri-app` with SolidJS (frontend) and Rust (backend), adhering to the project's core technology stack.
- [ ] Select the appropriate SolidJS UI template (e.g., `solid-ts`) to ensure a reactive and type-safe frontend foundation.
- [ ] Verify the basic Tauri application runs and compiles successfully, confirming the cross-platform desktop framework is operational.
- [ ] Set up basic project structure for frontend and backend as per `PROJECT_SCOPE.md` guidelines, establishing a modular and layered architecture:
  - Frontend (`src/`):
    - `components/` (for UI components, promoting reusability and single responsibility)
    - `services/` (for business logic and API calls, ensuring separation of concerns)
    - `stores/` (for global state management, leveraging SolidJS's reactivity for shared data)
    - Ensure Vite is configured as the build tool for fast development and optimized production builds.
    - Integrate Kobalte for accessible and unstyled UI primitives, allowing for full styling control.
    - Configure Tailwind CSS for utility-first styling, including extending `tailwind.config.js` for global theming (colors, fonts, spacing, etc.) to ensure consistent design language.
  - Backend (`src-tauri/src/`):
    - `database/` (for database schema, models, and operations, abstracting data access)
    - `commands/` (for Tauri command handlers, serving as the entry point for frontend-backend communication)
    - `services/` (for backend business logic, orchestrating data and operations)
    - `config.rs` (for environment configuration, externalizing settings for different environments).
- [ ] Perform an initial Git commit of the scaffolded project, establishing a clean baseline for version control.

## 2. Database Integration (Rust Backend)

- [ ] Integrate `rusqlite` (or `sqlx` if preferred
  for async operations, aligning with
  `PROJECT_SCOPE.md` suggestions) for robust SQLite
  database interaction, ensuring efficient and
  reliable data persistence.
- [ ] Create a simple database schema (e.g., a
  `messages` table with a `text` column) to store the
  application's core data, reflecting the project's
  data architecture principles.
- [ ] Implement a Rust function (Tauri command) to:
  - Initialize the database and table if they don't
    exist, ensuring a smooth first-run experience.
  - Insert a default message if the table is empty,
    providing initial content for the application.
  - Retrieve the message from the database,
    demonstrating the backend's ability to serve data
    to the frontend.

## 3. Frontend Display (SolidJS)

- [ ] Create a main SolidJS component (e.g., `src/App.tsx`) that utilizes Vite for development and building.
- [ ] Install and configure the `@kobalte/core` UI toolkit to provide accessible and unstyled component primitives.
- [ ] Implement a basic UI layout using Kobalte components (e.g., a `Text.Root` or a simple `div` with styling) to serve as a container for the application's content.
- [ ] Use `invoke` from `@tauri-apps/api/tauri` to call the Rust Tauri command that retrieves the message from the database.
- [ ] Display the retrieved message dynamically within a Kobalte `Text.Root` component.
- [ ] Ensure basic styling is applied using Tailwind CSS, leveraging the global theming setup to style the Kobalte components.

## 4. CI/CD Pipeline Setup (GitHub Actions)

### `dev-branch.yml`

- [ ] **Trigger**: Configure the workflow to trigger on pushes to `dev`, pull requests targeting `dev`, and `workflow_dispatch`.
  - The `workflow_dispatch` trigger is key to your requirement of running this pipeline on-demand for any feature branch. It adds a "Run workflow" button in the GitHub Actions UI, allowing you to manually select a branch and trigger a run.
- [ ] **Jobs**:
  - [ ] **Lint & Format**: Run `eslint`, `prettier`, and `cargo fmt --check` to enforce code style.
  - [ ] **Build & Test**: Run `npm install`, `npm run test` (if tests exist), and `cargo check` to ensure the application builds and passes basic checks.

### `main-branch.yml`

- [ ] **Trigger**: Configure the workflow to trigger only on pushes to the `main` branch.
- [ ] **Release Process Overview**:
  - The goal of this workflow is to fully automate the release process. When code is merged into `main`, this workflow will build the application for all target platforms, create a new GitHub Release, and upload the application bundles as release artifacts. This provides a seamless and professional release experience.
- [ ] **Jobs**:
  - [ ] **Validation**: Run the same linting, formatting, and testing jobs as the `dev-branch.yml` workflow to ensure code quality before a release.
  - [ ] **Release with `tauri-action`**: This is the core of the release process.
    - [ ] Use the official `tauri-apps/tauri-action` to build the application.
    - [ ] The action will be configured to build for the `macos-latest` runner, as macOS is the only target platform required at this stage.
    - [ ] The action will automatically create a GitHub Release, using the version number from your `tauri.conf.json` to tag the release.
    - [ ] The compiled application bundles (e.g., `.app`, `.exe`, `.deb`) will be automatically uploaded to the GitHub Release as artifacts, making them available for download.
    - [ ] **Code Signing (for the proof-of-concept)**: While full, production-grade code signing can be complex, we can set up basic signing for the proof-of-concept. This will involve creating secrets in your GitHub repository to store signing keys and passwords, which will be used by the `tauri-action` during the build process. This is a critical step for user trust and avoiding OS warnings.
    - [ ] **Future Distribution**: The workflow will be designed with modularity in mind. While the initial setup will publish artifacts only to GitHub Releases, a separate, subsequent job can be easily added in the future to download these artifacts and upload them to a GCP bucket for website distribution. This ensures the pipeline is extensible for future needs.
