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

## Backend Undo/Redo System (Command Pattern)

- [ ] **Core Command Trait**:
  - [ ] Define a generic `Command` trait in Rust that includes `execute` and `undo` methods. The `execute` method will apply the change, and the `undo` method will revert it.
  - [ ] Both methods will take a mutable reference to the application's state (e.g., `&mut AppState`) to perform their operations.
- [ ] **History Manager**:
  - [ ] Create a `HistoryManager` struct to manage the undo/redo stacks.
  - [ ] It will hold two vectors: `undo_stack: Vec<Box<dyn Command>>` and `redo_stack: Vec<Box<dyn Command>>`.
  - [ ] Implement a method to `execute_command`, which applies a new command, moves it to the `undo_stack`, and clears the `redo_stack`.
  - [ ] Implement `undo` and `redo` methods that move commands between the stacks and call the appropriate methods on the command objects.
- [ ] **Concrete Command Implementation**:
  - [ ] Create a simple, concrete command for a basic action, such as `UpdateMessageCommand`.
  - [ ] This command will store the old and new values of the message. Its `execute` method will set the new value, and its `undo` method will restore the old value.
- [ ] **Tauri Integration**:
  - [ ] Integrate the `HistoryManager` into the Tauri application state.
  - [ ] Create new Tauri commands (`undo`, `redo`) that call the corresponding methods on the `HistoryManager`.
  - [ ] Modify the existing `update_message` command to use the `HistoryManager` to execute the `UpdateMessageCommand` instead of changing the state directly.
- [ ] **Acceptance Criteria**:
  - [ ] The user can perform an action (e.g., update the message).
  - [ ] The user can then trigger the `undo` command, and the application state correctly reverts to its previous condition.
  - [ ] The user can then trigger the `redo` command, and the application state correctly returns to the state after the initial action.
