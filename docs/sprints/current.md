# Current Sprint: Foundational CI/CD & Architecture

**Sprint Goal:** Implement a basic Tauri application that demonstrates the core architectural principles (Responsive UI/Authoritative Backend) and establishes a functional CI/CD pipeline for `dev` and `main` branches.

---

## Step 1: Project Initialization and Basic Scaffolding

**Intent:** To create a clean, stable foundation for the project, ensuring all tools and configurations are in place before writing application-specific code.

- [ ] **Initialize Tauri Project**:
  - **Action**: Use `create-tauri-app` to generate the project with the `solid-ts` template.
  - **Reasoning**: This establishes the core SolidJS (frontend) and Rust (backend) structure, aligning with the project's technology stack.

- [ ] **Initial Configuration**:
  - **Action**: Configure `tauri.conf.json` with the bundle identifier (`com.primatif.comic-panel-creator`), window title, and other metadata.
  - **Reasoning**: This gives the application a stable identity, which is crucial for the operating system, code signing, and future updates.

- [ ] **Version Control**:
  - **Action**: Perform the initial Git commit.
  - **Reasoning**: This creates a clean baseline, allowing us to track all subsequent changes effectively.

- [ ] **Local Scripts**:
  - **Action**: Add a `format:md` script to the `package.json` for formatting Markdown files with Prettier.
  - **Reasoning**: This provides a convenient, local-only tool for maintaining documentation consistency without impacting the CI/CD pipeline.

---

## Step 2: Backend Setup - The Authoritative Core

**Intent:** To build the backend's foundation, focusing on data persistence and establishing a clean, error-handling API that the frontend will communicate with.

- [ ] **Database Integration**:
  - **Action**: Integrate `rusqlite` into the Rust backend. Create a simple `messages` table with a `text` column.
  - **Reasoning**: This sets up the application's persistence layer, providing a single source of truth for all data, as mandated by the "Authoritative Backend" architectural principle.

- [ ] **Implement Serializable Result Type**:
  - **Action**: Create a custom, serializable `AppResult<T>` type in Rust.
  - **Reasoning**: This is a critical step for robust error handling. It ensures that the frontend can reliably distinguish between successful operations and backend errors, allowing for clean `try...catch` blocks in the JavaScript code.

- [ ] **Create Initial Tauri Commands**:
  - **Action**: Implement two commands:
    1. `get_message`: Retrieves the current message from the database.
    2. `update_message`: Accepts a string from the frontend and saves it to the database.
  - **Reasoning**: These commands form the initial "View-Agnostic API." They are the stable contract the frontend will use, ensuring a clear separation of concerns.

---

## Step 3: Foundational Logging

**Intent:** To integrate a robust logging system early in the development process. This ensures that we have visibility into the application's behavior from the very beginning, making debugging and verification easier.

- [ ] **Integrate `tauri-plugin-log`**:
  - **Action**: Add the `tauri-plugin-log` to the project and initialize it in `main.rs`. Configure it for structured JSON output and rolling files.
  - **Reasoning**: This provides a unified logging solution for both the frontend and backend, which is a Tauri best practice. Structured JSON logs are machine-parsable and essential for future analysis, while rolling files prevent log data from growing indefinitely.

- [ ] **Implement Initial Log Points**:
  - **Action**:
    - **Backend**: Add an `info!` log in `main.rs` to signal that the application is starting.
    - **Backend**: Add an `info!` log to the `update_message` command to record when it's called.
  - **Reasoning**: These initial logs serve as a simple, immediate test to verify that the logging system is correctly configured and capturing events from the Rust backend.

---

## Step 4: Frontend Setup and Architectural Pattern Implementation

**Intent:** To build the user-facing part of the application and implement the core "Responsive UI / Authoritative Backend" pattern.

- [ ] **UI and Styling Setup**:
  - **Action**: Create the main `App.tsx` component. Install and configure `@kobalte/core` for UI primitives and Tailwind CSS for styling.
  - **Reasoning**: This establishes the foundational tools for building a consistent, accessible, and well-styled user interface.

- [ ] **Implement the Draggable Element**:
  - **Action**: Create a simple draggable UI element.
    - **Real-time Loop (`onMouseMove`)**: The element's position must update in real-time using a local SolidJS signal (`createSignal`). **No backend calls should be made during this phase.**
    - **Authoritative Loop (`onMouseUp`)**: The final position must be sent to the `update_message` Tauri command.
  - **Reasoning**: This is the tangible proof-of-concept for the application's most critical architectural pattern. It demonstrates the separation of the fluid user experience (local state) from the official data persistence (backend state), ensuring both performance and data integrity.

- [ ] **Add Frontend Logging**:
  - **Action**:
    - Add a `debug!` log in the `onMouseMove` handler to log the element's real-time coordinates.
    - Add an `info!` log in the `onMouseUp` handler to log the final coordinates being sent to the backend.
  - **Reasoning**: This verifies that the logging system is also capturing high-frequency events from the frontend (in debug mode) and key interaction events, providing a complete picture of the application's behavior.

- [ ] **Acceptance Criteria for this Step**:
  - The application must visibly demonstrate the responsive UI pattern.
  - All four log messages (two from the backend, two from the frontend) must appear correctly in the console and the log file during development.

---

## Step 5: CI/CD Pipeline Automation

**Intent:** To automate the process of testing, building, and releasing the application, ensuring that every change is validated and that releases are consistent and professional.

- [ ] **Create `dev-branch.yml` Workflow**:
  - **Action**: Configure a workflow that runs on pushes to `dev` and can be manually dispatched for feature branches. It will run linting, formatting, and build checks. Add caching for `node_modules` and `cargo` directories.
  - **Reasoning**: This provides a fast feedback loop for developers, ensuring that code quality and basic build integrity are maintained throughout the development process. Caching is added to dramatically speed up these frequent checks.

- [ ] **Create `main-branch.yml` Workflow**:
  - **Action**: Configure a workflow that runs only on pushes to `main`. It will use the `tauri-apps/tauri-action` with a build matrix for `macos-latest` and `ubuntu-latest`. The action will build the application, create a GitHub Release, and upload the signed application bundles.
  - **Reasoning**: This fully automates the release process. It ensures that every release is built in a clean, consistent environment for multiple platforms and that the resulting application bundles are professionally signed and easily accessible to users.
