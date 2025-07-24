# Current Sprint: Foundational CI/CD & Architecture

**Sprint Goal:** Implement a basic Tauri application that demonstrates the core architectural principles (Responsive UI/Authoritative Backend) and establishes a functional CI/CD pipeline for `dev` and `main` branches.

**Proposed Tasks:**

## 1. Core Architectural Implementation & Verification

- [ ] **Backend (View-Agnostic API):**
  - [ ] Design the initial Tauri commands (`get_message`, `update_message`) to function as a clean, stable API contract, independent of any frontend implementation details.
- [ ] **Frontend (Responsive UI Pattern):**
  - [ ] Create a simple draggable UI element within the SolidJS frontend.
  - [ ] **Real-time Loop:** The element's position must update smoothly in real-time (60fps) using a local SolidJS signal (`createSignal`) during the drag operation (`onMouseMove`). **No backend calls shall be made during the drag.**
  - [ ] **Authoritative Loop:** On drag completion (`onMouseUp`), the final position must be sent to a dedicated Tauri command (`update_message`) to be persisted. This demonstrates the separation of concerns and serves as a tangible proof-of-concept for the core architectural pattern.
- [ ] **Acceptance Criteria:** The application must visibly demonstrate the responsive UI pattern. Dragging the element should be smooth, and the final state must be correctly saved and re-loaded, proving the backend's authority.

## 2. Project Scaffolding

- [ ] Initialize a new Tauri project using `create-tauri-app` with SolidJS (frontend) and Rust (backend), adhering to the project's core technology stack.
- [ ] Select the appropriate SolidJS UI template (e.g., `solid-ts`) to ensure a reactive and type-safe frontend foundation.
- [ ] Verify the basic Tauri application runs and compiles successfully, confirming the cross-platform desktop framework is operational.
- [ ] Configure `tauri.conf.json` with the application's bundle identifier (e.g., `com.primatif.comic-panel-creator`), initial window title, and other essential metadata to establish a stable application identity for signing and updates.
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

## 3. Database Integration (Rust Backend)

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
- [ ] Implement a second Tauri command (`update_message`) that accepts a string from the frontend and updates the message in the database. This will serve the "Authoritative Update Loop" for the architectural proof-of-concept.
- [ ] Implement a basic, serializable `Result` type in Rust to ensure the frontend can clearly distinguish between successful data retrieval and potential backend errors during the `invoke` call.

## 4. Frontend Display (SolidJS)

- [ ] Create a main SolidJS component (e.g., `src/App.tsx`) that utilizes Vite for development and building.
- [ ] Install and configure the `@kobalte/core` UI toolkit to provide accessible and unstyled component primitives.
- [ ] Implement a basic UI layout using Kobalte components (e.g., a `Text.Root` or a simple `div` with styling) to serve as a container for the application's content.
- [ ] Use `invoke` from `@tauri-apps/api/tauri` to call the Rust Tauri command that retrieves the message from the database.
- [ ] Display the retrieved message dynamically within a Kobalte `Text.Root` component.
- [ ] Implement the draggable element required by the "Core Architectural Implementation" section, connecting its `onMouseUp` event to the `update_message` command.
- [ ] Ensure basic styling is applied using Tailwind CSS, leveraging the global theming setup to style the Kobalte components.

## 5. CI/CD Pipeline Setup (GitHub Actions)

### `dev-branch.yml`

- [ ] **Trigger**: Configure the workflow to trigger on pushes to `dev`, pull requests targeting `dev`, and `workflow_dispatch`.
  - The `workflow_dispatch` trigger is key to your requirement of running this pipeline on-demand for any feature branch. It adds a "Run workflow" button in the GitHub Actions UI, allowing you to manually select a branch and trigger a run.
- [ ] **Jobs**:
  - [ ] **Lint & Format**: Run `eslint`, `prettier`, and `cargo fmt --check` to enforce code style.
  - [ ] **Build & Test**: Run `npm install`, `npm run test` (if tests exist), and `cargo check` to ensure the application builds and passes basic checks.
  - [ ] **Caching**: Add steps to cache `node_modules` and `cargo` build directories to optimize workflow speed.

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
    - [ ] **Secrets & Permissions**: Proactively create placeholders for required secrets (`TAURI_SIGNING_PRIVATE_KEY`, etc.) in the GitHub repository settings and ensure the workflow has the necessary `contents: write` permissions to prevent CI/CD failures.
    - [ ] **Future Distribution**: The workflow will be designed with modularity in mind. While the initial setup will publish artifacts only to GitHub Releases, a separate, subsequent job can be easily added in the future to download these artifacts and upload them to a GCP bucket for website distribution. This ensures the pipeline is extensible for future needs.

## 6. Centralized & Structured Logging Setup (Tauri Best Practice)

- [ ] **Core Solution**: Utilize the official `tauri-plugin-log` for unified logging across frontend and backend, handling file management and rotation.
- [ ] **Structured Format (JSON)**: All log entries will be written as structured JSON objects to ensure they are machine-parsable for future analysis and consumption. This will be achieved by:
  - [ ] **Backend (Rust)**: Integrating a structured logging crate (e.g., `structured_logger`) to format Rust logs as JSON before they are processed by `tauri-plugin-log`.
  - [ ] **Frontend (SolidJS)**: Using the `tauri-plugin-log` JavaScript API to send logs, ensuring JSON objects are stringified before transmission.
  - The schema will include: `timestamp`, `level`, `source` (e.g., "FRONTEND", "BACKEND", "TAURI"), `message`, and an optional `payload` for additional structured context.
- [ ] **Rolling Mechanism**: `tauri-plugin-log` will be configured to automatically manage log file rotation (e.g., every 10MB, keeping the last 5 files) to prevent indefinite growth.
- [ ] **Error & Exception Logging**: `WARN` and `ERROR` level events, including panics and unhandled exceptions, will be logged unconditionally, regardless of the debug mode.
- [ ] **Debug Mode Distinction (Hybrid Approach)**:
  - [ ] **Primary Indicators (Compile-Time Safety)**:
    - **Rust Backend**: Leverage `#[cfg(debug_assertions)]` (automatically set by `tauri dev`) to include/exclude sensitive debug-only code from production builds.
    - **SolidJS Frontend**: Utilize `import.meta.env.DEV` (set by Vite) to control development-specific behaviors.
  - [ ] **Secondary Indicator (Runtime Flexibility)**:
    - **`DEBUG_MODE` Environment Variable**: Read from `.env` (e.g., `DEBUG_MODE=true/false`). This variable will primarily control the *verbosity* of logging and output destinations (console vs. file) *within* a development build.
- [ ] **Logging Behavior based on Mode**:
  - [ ] **If `#[cfg(debug_assertions)]` (Rust) OR `import.meta.env.DEV` (SolidJS) is `true` (Development Build)**:
    - **Log Level**: Determined by `DEBUG_MODE` (e.g., `DEBUG` if `DEBUG_MODE=true`, `INFO` if `DEBUG_MODE=false`).
    - **Content**: If `DEBUG_MODE=true`, captures verbose, developer-centric information (e.g., environment variables, detailed traces). If `DEBUG_MODE=false`, captures key lifecycle events.
    - **Destination**: Logs are written to **both** the console (human-readable) and the rolling JSON file.
  - [ ] **If `#[cfg(debug_assertions)]` (Rust) AND `import.meta.env.PROD` (SolidJS) is `true` (Production Build)**:
    - **Log Level**: `INFO` (or higher, e.g., `WARN`).
    - **Content**: Captures key, contextually important lifecycle and business logic events. It will **not** log sensitive developer data, as such code will not be compiled in.
    - **Destination**: Logs are written **only** to the rolling JSON file.
- [ ] **Tauri Integration**: Ensure `tauri-plugin-log` is properly initialized in `main.rs` and configured to capture logs from the entire Tauri application (frontend, backend, and framework internals).
