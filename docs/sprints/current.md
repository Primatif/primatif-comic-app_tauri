# Current Sprint: Foundational CI/CD & Architecture

**Sprint Goal:** Implement a basic Tauri application that demonstrates the core architectural principles (Responsive UI/Authoritative Backend) and establishes a functional CI/CD pipeline for `dev` and `main` branches.

---

## Step 1: Project Initialization and Basic Scaffolding

**Intent:** To create a clean, stable foundation for the project, ensuring all tools and configurations are in place before writing application-specific code.

- [x] **Initialize Tauri Project**:
  - **Action**: Used `create-tauri-app` to generate the project with the `solid-ts` template.
  - **Notes**: This established the core SolidJS (frontend) and Rust (backend) structure, aligning with the project's technology stack. The initial setup included:
    - **VS Code Extensions**: Rust Analyzer, Tauri, ESLint, Prettier, Tailwind CSS IntelliSense, Solid.js Devtools, GitLens.
    - **Rust Tooling**: `cargo-watch`, `cargo-deny` (installed via `cargo install`).
    - **Frontend Tooling**: Vitest (installed as dev dependency via `bun add -D vitest`).
    - **Package Manager**: Bun (already installed and configured).
  - **Reasoning**: This creates a clean, stable foundation for the project, ensuring all tools and configurations are in place before writing application-specific code.

- [x] **Initial Configuration**:
  - **Action**: Configured `tauri.conf.json` with the bundle identifier (`com.primatif.comic-panel-creator`), window title, and other metadata.
  - **Reasoning**: This gives the application a stable identity, which is crucial for the operating system, code signing, and future updates.

- [x] **Version Control**:
  - **Action**: Performed the initial Git commit.
  - **Reasoning**: This creates a clean baseline, allowing us to track all subsequent changes effectively.

- [x] **Local Scripts**:
  - **Action**: Added a `format:md` script to the `package.json` for formatting Markdown files with Prettier.
  - **Reasoning**: This provides a convenient, local-only tool for maintaining documentation consistency without impacting the CI/CD pipeline.

---

## Step 2: Backend Setup - The Authoritative Core

**Intent:** To build the backend's foundation, focusing on data persistence and establishing a clean, error-handling API that the frontend will communicate with.

- [x] **Database Integration**:
  - **Action**: Integrated `rusqlite` into the Rust backend. Created a `database` module containing a `schema.sql` file for the `messages` table and a `mod.rs` for the `DatabaseManager`.
  - **Notes**: This involved adding the `rusqlite` and `thiserror` dependencies to `Cargo.toml`. We encountered and fixed a feature flag issue, changing `features = ["sql"]` to the correct `features = ["bundled"]` for `rusqlite` to ensure SQLite is included with the crate. The `DatabaseManager` was set up to handle connection and schema initialization.
  - **Reasoning**: This sets up the application's persistence layer, providing a single source of truth for all data, as mandated by the "Authoritative Backend" architectural principle.

- [x] **Implement Serializable Result Type**:
  - **Action**: Created a custom, serializable `AppError` enum and `Result<T>` type alias in a new `errors.rs` module.
  - **Notes**: Initially, the `AppError` enum was not serializable, causing compilation errors when used in Tauri commands. This was resolved by adding `#[derive(Serialize)]` and implementing `From` traits to convert `rusqlite::Error` and `std::io::Error` into our custom `AppError::Database` and `AppError::FileSystem` variants, which now hold `String` representations of the errors. This makes the error type compatible with the frontend.
  - **Reasoning**: This is a critical step for robust error handling. It ensures that the frontend can reliably distinguish between successful operations and backend errors, allowing for clean `try...catch` blocks in the JavaScript code.

- [x] **Create Initial Tauri Commands**:
  - **Action**: Implemented `get_message` and `update_message` in a new `commands.rs` module. The main `lib.rs` was updated to manage the database connection state and register these new commands.
  - **Notes**: We ran into several module resolution issues (`undeclared module`). These were fixed by adding `pub mod <module_name>;` declarations to `lib.rs` for the `database`, `errors`, `models`, and `commands` modules. A `cargo check` was run to confirm the compiler could resolve all paths correctly, which also helped the IDE's language server (`rust-analyzer`) to sync up.
  - **Reasoning**: These commands form the initial "View-Agnostic API." They are the stable contract the frontend will use, ensuring a clear separation of concerns.

---

## Step 3: Foundational Logging

**Intent:** To integrate a robust logging system early in the development process. This ensures that we have visibility into the application's behavior from the very beginning, making debugging and verification easier.

- [x] **Integrate `tauri-plugin-log`**:
  - **Action**: Added the `tauri-plugin-log` to the project and initialized it in `src-tauri/src/lib.rs`.
  - **Notes**: The plugin was configured to output logs to the `Webview`, `Stdout`, and a `LogDir` with a specific file name (`PrimatifComics.log`). The log level is dynamically set to `Debug` in development builds and `Info` in release builds. While the initial proposal mentioned structured JSON output and rolling files, `tauri-plugin-log` does not natively support structured JSON, and advanced rolling file strategies (beyond `KeepOne` or `KeepAll`) are not directly supported. A backlog item has been created for future implementation of a more robust log file rolling and retention strategy.
  - **Reasoning**: This provides a unified logging solution for both the frontend and backend, which is a Tauri best practice. It ensures early visibility into application behavior.

- [x] **Implement Initial Log Points**:
  - **Action**:
    - **Backend**: Added an `info!` log in `src-tauri/src/lib.rs` (`setup` closure) to signal that the application is starting.
    - **Backend**: Added `error!` logs in `src-tauri/src/errors.rs` within the `From` implementations for `rusqlite::Error` and `std::io::Error` to capture and log database and file system errors when they are converted to `AppError`.
  - **Notes**: The `update_message` command log point was not implemented at this stage, as the command's full integration with the frontend will occur in a later step (Step 4).
  - **Reasoning**: These initial logs serve as a simple, immediate test to verify that the logging system is correctly configured and capturing events from the Rust backend, and provide crucial debugging information for errors.

---

## Step 4: Frontend Setup and Architectural Pattern Implementation

**Intent:** To build the user-facing part of the application and implement the core "Responsive UI / Authoritative Backend" pattern.

- [x] **UI and Styling Setup**:
  - **Action**: Created the main `App.tsx` component. Installed and configured `@kobalte/core` for UI primitives and Tailwind CSS for styling.
  - **Notes**: Integrated `@kobalte/core/button` and `@kobalte/core/text-field` for improved UI components and accessibility. Refined Tailwind CSS classes for a more polished aesthetic, adhering to utility-first and tokenized styling principles.
  - **Reasoning**: This established the foundational tools for building a consistent, accessible, and well-styled user interface.

- [x] **Implement the Draggable Element**:
  - **Action**: Created a simple draggable UI element.
    - **Real-time Loop (`onMouseMove`)**: The element's position updates in real-time using a local SolidJS signal (`createSignal`). No backend calls are made during this phase, ensuring a fluid user experience.
    - **Authoritative Loop (`onSave` button)**: The final position and text are sent to the `update_message` Tauri command only when the user explicitly clicks a "Save Changes" button.
  - **Notes**: **Deviation from initial plan**: The original plan for the "Authoritative Loop" was to send the final position on `onMouseUp`. However, the user requested an explicit "Save Changes" button to confirm updates to the backend. This provides more user control over persistence.
  - **Reasoning**: This is the tangible proof-of-concept for the application's most critical architectural pattern. It demonstrates the separation of the fluid user experience (local state) from the official data persistence (backend state), ensuring both performance and data integrity.

- [x] **Add Frontend Logging**:
  - **Action**:
    - Added a `debug!` log in the `onMouseMove` handler to log the element's real-time coordinates.
    - Added an `info!` log in the `onSave` handler to log the final coordinates and text being sent to the backend.
  - **Reasoning**: This verifies that the logging system is also capturing high-frequency events from the frontend (in debug mode) and key interaction events, providing a complete picture of the application's behavior.

- [x] **Acceptance Criteria for this Step** (Completed):
  - The application visibly demonstrates the responsive UI pattern.
  - All relevant log messages (from both frontend and backend) appear correctly in the console and the log file during development.
  - The draggable element's position and text are persisted to the backend only upon explicit user confirmation via the "Save Changes" button.

---

## Step 5: Frontend Refactoring - Pixi.js Canvas Integration

**Intent:** To refactor the existing draggable element to use Pixi.js for rendering, demonstrating integration with a canvas-based library and preparing for more complex graphical operations.

- [ ] **Integrate Pixi.js**:
  - **Action**: Install Pixi.js v8 and related types (`@pixi/app`, `@pixi/graphics`, `@pixi/text`, `@pixi/events`).
  - **Reasoning**: Pixi.js provides a high-performance 2D rendering engine that is crucial for the comic panel creator's future graphical capabilities.

- [ ] **Create `CanvasRenderer` Component**:
  - **Action**: Develop a new SolidJS component (e.g., `src/components/CanvasRenderer.tsx`) that encapsulates the Pixi.js application.
  - **Notes**: This component should be responsible for initializing the Pixi.js `Application`, managing its lifecycle, and providing a canvas element for rendering.
  - **Reasoning**: Encapsulating the canvas logic in a separate component promotes modularity and reusability, aligning with our component architecture standards.

- [ ] **Refactor Draggable Element to Pixi.js**:
  - **Action**: Migrate the draggable text element from its current DOM-based implementation to be rendered within the Pixi.js canvas.
    - **Pixi.js Graphics**: Use `PIXI.Graphics` to draw the background shape of the draggable element.
    - **Pixi.js Text**: Use `PIXI.Text` to render the message text.
    - **Pixi.js Interaction**: Implement dragging logic using Pixi.js's event system (`pointerdown`, `pointermove`, `pointerup`).
  - **Reasoning**: This refactoring serves as a critical integration test, ensuring that our responsive UI pattern can be effectively applied to canvas-based elements. It also validates the performance and interaction capabilities of Pixi.js within the Tauri environment.

- [ ] **Update `App.tsx` to use `CanvasRenderer`**:
  - **Action**: Modify `App.tsx` to import and render the new `CanvasRenderer` component. Pass the message data and save handler as props to the `CanvasRenderer`.
  - **Reasoning**: This maintains `App.tsx` as a high-level orchestrator, delegating rendering concerns to specialized components.

- [ ] **Acceptance Criteria for this Step**:
  - The draggable text element is rendered on a Pixi.js canvas.
  - Dragging the element updates its position smoothly within the canvas.
  - The "Save Changes" button still correctly persists the text and coordinates to the backend.
  - No new TypeScript errors are introduced.
  - The application's overall performance remains fluid.

---

## Step 6: CI/CD Pipeline Automation

**Intent:** To automate the process of testing, building, and releasing the application, ensuring that every change is validated and that releases are consistent and professional.

- [ ] **Create `dev-branch.yml` Workflow**:
  - **Action**: Configure a workflow that runs on pushes to `dev` and can be manually dispatched for feature branches. It will run linting, formatting, and build checks. Add caching for `node_modules` and `cargo` directories.
  - **Reasoning**: This provides a fast feedback loop for developers, ensuring that code quality and basic build integrity are maintained throughout the development process. Caching is added to dramatically speed up these frequent checks.

- [ ] **Create `main-branch.yml` Workflow**:
  - **Action**: Configure a workflow that runs only on pushes to `main`. It will use the `tauri-apps/tauri-action` with a build matrix for `macos-latest` and `ubuntu-latest`. The action will build the application, create a GitHub Release, and upload the signed application bundles.
  - **Reasoning**: This fully automates the release process. It ensures that every release is built in a clean, consistent environment for multiple platforms and that the resulting application bundles are professionally signed and easily accessible to users.
