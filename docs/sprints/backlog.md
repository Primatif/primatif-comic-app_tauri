---
title: "Backlog"
---


### Over-the-Air Updates (Tauri Updater) - `5cd2238d-b0fd-4645-812b-6fe32f0570fd`

- **Description**: Implement a system for delivering updates to users automatically. This is crucial for ensuring users have the latest features and bug fixes without manual intervention, improving the user experience and maintenance efficiency.
- **Acceptance Criteria**:
  - The application can detect when a new version is available.
  - The user is prompted to download and install the update.
  - The update process completes successfully.
- **Links**:
- **Notes**:

### Backend Undo/Redo System - `9ad5290a-8ee7-4805-b0ab-a33ed3a4cbf9`

- **Description**: Implement a robust undo/redo functionality for user actions. This is a fundamental feature for any editor, providing a safety net that allows users to experiment and easily correct mistakes, leading to a more forgiving and productive user experience.
- **Acceptance Criteria**:
  - User actions that modify the application's state can be undone.
  - Undone actions can be redone.
  - The undo/redo history is cleared when a new, conflicting action is taken.
- **Links**:
- **Notes**:

### High-Performance Rendering with Wasm and Pixi.js - `31c86706-99ff-4ca2-886f-59d5fd80ec81`

- **Description**: Integrate a Rust-based WebAssembly (Wasm) engine with Pixi.js to handle complex rendering tasks. The Wasm engine will manage and process complex rendering data for better performance, while Pixi.js will render the DOM using WebGPU and WebGL. This architecture will ensure a smooth, responsive UI, especially for large or intricate comic panels. Subtask: Performance Validation Framework: To ensure the 60 FPS target is met and maintained, a two-part validation framework will be implemented for the canvas area: 1. Observable Metric: A simple, toggleable FPS counter will be displayed over the canvas to provide real-time visual feedback during development. 2. Automated Benchmark Test: A new test will be created to simulate a high-stress rendering scenario (e.g., rendering and animating 100+ complex objects). This test will run for a fixed duration, calculate the average FPS, and fail if the result is below the acceptable threshold (e.g., 55 FPS), preventing performance regressions.
- **Acceptance Criteria**:
  - The application's rendering performance can be manually verified at any time using the observable FPS counter.
  - The automated performance benchmark test passes, confirming the application meets the required FPS target under stress.
  - A clear data pipeline exists between the Wasm engine and the Pixi.js renderer.
  - The system demonstrably uses hardware acceleration (WebGL/WebGPU) via Pixi.js.
- **Links**:
- **Notes**:

### Log File Rolling and Retention - `14552f0f-9ab5-44a2-9bfc-f3279379271e`

- **Description**: Implement a log file rolling and retention strategy for the `tauri-plugin-log` to manage disk space and simplify log analysis. This involves configuring log files to automatically roll over based on size and ensuring that only a specified number of recent log files are retained.
- **Acceptance Criteria**:
  - Log files automatically roll over to a new file when the current log file reaches a predefined size (e.g., 20KB).
  - A maximum of 4 log files are maintained at any given time.
  - Older log files are automatically deleted to adhere to the retention limit.
- **Links**:
- **Notes**:

### Semantic Versioning and Automated Releases - `18742f0f-8572-44a2-9bfc-3dfdfe231234`

- **Description**: Wire up semantic-release so `main` builds produce semantic tags and changelogs. Expose `nextRelease.version` to downstream jobs via `$GITHUB_OUTPUT`, and update the `tauri-action` job to use that version for tag and release name. Add appropriate permissions for contents and PRs.
- **Acceptance Criteria**:
  - `semantic-release` runs on `main` and publishes a release with a semver tag (e.g., `v1.2.3`).
  - The workflow exports the new version to a job output and uses it in the Tauri release step.
  - Changelog is generated and committed or attached to the release per our chosen strategy.
  - Documentation in `docs/guides/ci_cd_workflows.md` updated to include semantic versioning details.
- **Links**:
- **Notes**:
