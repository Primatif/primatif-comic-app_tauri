---
title: "Current Sprint: CI/CD Pipeline and Release Automation"
---

## Current Sprint: CI/CD Pipeline and Release Automation

**Sprint Goal:** To automate the process of testing, building, and releasing the application, ensuring that every change is validated and that releases are consistent and professional.

---

## Tasks

### CI/CD Pipeline Automation - `a1b2c3d4-e5f6-7890-1234-567890abcdef`

- **Description**: Refactor CI/CD into a composable architecture, aligning with the pipeline diagram in `docs/guides/images/github-workflow-diagram.png`. Create a central, reusable QA workflow that both `dev` and `main` workflows call. Keep performance testing, Selenium, and dev-environment deploys explicitly out-of-scope for this sprint (future work).
  
  <!-- Diagram reference moved to docs/guides/images/github-workflow-diagram.png -->
  - **Reusable QA Workflow (`reusable-qa.yml`)**: A workflow triggered via `workflow_call` that encapsulates all verification logic:
    - Test Scripts: integration tests and unit tests.
    - Quality Assurance Scripts: circular dependency checks, unused files/constants/functions, security scan.
    - Rust checks: clippy and rustfmt; Frontend checks: formatting, markdown lint.
    - Produces a single QA summary artifact for downstream jobs.

  - **Shared Setup Composite Action (`.github/actions/setup-environment/`)**: One action that standardizes checkout, Node/Bun setup, Rust toolchain, and caching. Used by the reusable QA workflow and any build jobs.

  - **Main Workflow (`main-branch.yml`)**: Calls `reusable-qa.yml` first. On success: Version++, Build, Release, Store (publish artifacts to GitHub Releases via `tauri-apps/tauri-action` on `macos-latest`, producing a dmg bundle).

  - **Dev Workflow (`dev-branch.yml`)**: Calls `reusable-qa.yml` on pushes to `dev` and on manual dispatch. On success: perform build checks and upload build artifacts. Performance/Selenium/Dev-deploy are intentionally deferred.

- **Acceptance Criteria**:
  - `.github/workflows/reusable-qa.yml` exists and is invokable via `workflow_call`, running tests and QA checks listed above and uploading a unified summary artifact.
  - `.github/actions/setup-environment/action.yml` exists and is used by the reusable workflow and by build jobs.
  - `.github/workflows/dev-branch.yml` calls `./.github/workflows/reusable-qa.yml` and, after QA passes, performs build checks. It triggers on pushes to `dev` and supports manual dispatch. Caching for Node/Bun and Cargo is enabled.
  - `.github/workflows/main-branch.yml` calls the reusable QA workflow and, after QA passes, builds a macOS dmg using `tauri-apps/tauri-action`, creates a GitHub Release, and uploads the dmg bundle.
  - The plan explicitly excludes performance testing, Selenium, and dev-environment deployment for this sprint.

- **Links**:
  - CI/CD Guide: `docs/guides/ci_cd_workflows.md`
  - Pipeline diagram: `docs/guides/images/github-workflow-diagram.png`
- **Notes**: This decomposition removes duplication between `dev` and `main`, keeps QA logic in one place, and makes future extensions (e.g., performance or Selenium stages) easy to add as additional reusable workflows.

### Spike: Backend TIFF Data Handling & Saving (Rust) - `0a9f5838-a6f2-4aad-9f23-12e8dc3d0aea`

- **Description**: Research and integrate a Rust library for reading, writing, and editing TIFF files. Define compatible Rust types for a mocked canvas data structure (elements, properties, layers) and demonstrate saving this mocked data to a TIFF file.
- **Acceptance Criteria**:
  - A Rust library for reading, writing, and editing TIFF files is identified and integrated into the backend.
  - Compatible Rust types are defined in the backend for a mocked canvas data structure.
  - The backend successfully writes the mocked data to a TIFF file.
  - The generated TIFF file can be opened and viewed successfully.
- **Links**:
- **Notes**: This spike focuses purely on the backend's ability to handle and save TIFF data from a defined Rust data structure.

### Spike: Frontend Canvas Data Model & TIFF Compatibility (TypeScript) - `815d8c3e-d915-4644-b2b2-19b8f6a833fd`

- **Description**: Research and define the optimal frontend canvas data model (elements, properties, layers) with TypeScript types, ensuring it is inherently compatible with or easily convertible to a TIFF-like data structure. This includes exploring how existing canvas libraries (e.g., PixiJS) represent their data and how that can map to TIFF concepts.
- **Acceptance Criteria**:
  - A well-defined and typed frontend data model for canvas elements, properties, and layers is proposed.
  - A clear understanding of how the proposed frontend data model maps to TIFF concepts (e.g., pixels, layers, metadata) is documented.
  - Potential challenges or limitations in representing canvas data in a TIFF-compatible way are identified.
  - Recommendations for structuring frontend state for efficient TIFF conversion are provided.
- **Links**:
- **Notes**: This spike focuses purely on the frontend's data structure design for TIFF compatibility, independent of backend integration.

### Spike: Frontend-Backend TIFF Save Integration (Tauri Invoke) - `66ff7ac0-53e5-4432-9330-877a2f27dbb5`

- **Description**: Implement the Tauri invoke command to send a mocked frontend canvas data structure to the Rust backend. The backend will receive this data, convert it if necessary, and use its TIFF saving utility (identified in Spike 1) to write the TIFF file. This spike focuses on the data transfer and communication pipeline.
- **Acceptance Criteria**:
  - A Tauri invoke command is implemented in the frontend to send a mocked canvas data structure.
  - The Rust backend successfully receives and deserializes the data sent from the frontend via invoke.
  - The backend utilizes the TIFF saving functionality (from Spike 1) to write a TIFF file based on the received data.
  - The end-to-end flow, from frontend invoke call to backend TIFF file creation, is demonstrated.
- **Links**:
- **Notes**: This spike bridges the work from Spike 1 (backend TIFF saving) and Spike 2 (frontend data model). It focuses on the communication and data flow between the frontend and backend for TIFF export.

### Implement End-to-End Canvas TIFF Read/Write Feature - `5a0dec0b-f369-420c-a63c-f635397faeae`

- **Description**: Implement the full end-to-end feature for reading and writing canvas data to/from TIFF files, leveraging the findings from the three spikes. This includes integrating the frontend canvas data model, the backend TIFF handling, and the Tauri invoke communication. This feature is a core part of the canvas rendering system.
- **Acceptance Criteria**:
  - Users can load canvas data from an existing TIFF file into the application.
  - Users can save the current state/contents of the canvas to a new TIFF file.
  - The loaded/saved TIFF files accurately represent the canvas elements, properties, and layers.
  - The read/write operations are performed efficiently and without data loss.
  - The feature is integrated seamlessly into the canvas rendering system.
- **Links**:
- **Notes**: This task is the culmination of the spike efforts. Focus on robustness, performance, and user experience. This feature will serve as a blueprint for future export types.

### Implement Automated Code Quality Auditing & Reporting System with Plugin Architecture (using Just & Node.js/Bun) - `1acee52c-d202-418b-976d-97b75ca0fc0f`

- **Description**: Design and implement an automated system for comprehensive code quality auditing with a modular plugin architecture. This system will leverage `just` for executing individual code quality tools and capturing their outputs, and a Node.js/Bun orchestration script for managing plugins, consolidating feedback into a configurable report, and prompting the AI agent for review. The report will be dated, numbered, and its content controllable via configuration.
- **Acceptance Criteria**:
  - A `Justfile` is created to define recipes for running individual code quality tools (plugins) and capturing their outputs.
  - A new core Node.js/Bun orchestration script (e.g., `scripts/audit-code-quality/index.js`) is created to manage the auditing process.
  - The orchestration script calls `just` recipes for each enabled code quality plugin.
  - The system captures and consolidates outputs from `just` into a single, unified report document (e.g., Markdown or structured text).
  - The report generation is configurable, allowing control over which plugin outputs are included and how they are formatted (e.g., via a configuration file and command-line parameters).
  - The consolidated report file is uniquely named with a date and number (e.g., `reports/code-quality/audit-report-YYYY-MM-DD-NN.md`).
  - Upon completion, the orchestration script prints a clear message to the console, including the exact path to the generated report file, and instructs the AI agent to review its contents and provide recommendations.
  - New `package.json` scripts are added to easily trigger the automated audit with different configurations.
  - Documentation is updated to reflect the new auditing process, including how to add new plugins and configure reports, and the role of `just`.
- **Links**:
- **Notes**: This modular design promotes scalability, maintainability, and fine-grained control over code quality feedback. The configurable report is essential for tailoring the information presented to the AI agent for effective automated review and recommendations. Leveraging `just` simplifies individual tool execution and output capture.
