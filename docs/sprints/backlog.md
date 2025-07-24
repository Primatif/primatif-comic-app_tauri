# Sprint Backlog

## Over-the-Air Updates (Tauri Updater)

- [ ] **Configure Tauri Updater**:
  - [ ] Enable and configure the `updater` in `tauri.conf.json`.
  - [ ] Define the update endpoints and public key for signature verification.
- [ ] **CI/CD Pipeline for Updates**:
  - [ ] Extend the `main-branch.yml` workflow to generate and sign update artifacts for all target platforms (macOS, Windows, Linux).
  - [ ] Ensure the workflow correctly publishes the update artifacts (JSON metadata, signatures, and application bundles) to a location accessible by the application (e.g., GitHub Releases or a dedicated update server).
- [ ] **Frontend Update UI**:
  - [ ] Implement a basic UI in the SolidJS frontend to notify the user when an update is available.
  - [ ] Provide buttons to allow the user to accept and install the update, or to dismiss the notification.
  - [ ] Use Tauri's updater API (`@tauri-apps/api/updater`) to check for updates and handle the update process.
- [ ] **Acceptance Criteria**:
  - [ ] The application, when installed, can successfully check for updates from a remote server.
  - [ ] When a new version is released via the CI/CD pipeline, the application detects it and prompts the user.
  - [ ] The user can successfully download and install the update through the in-app UI.
