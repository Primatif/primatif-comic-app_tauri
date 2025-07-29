/*!
 * The main library for the Primatif Comics Tauri application.
 *
 * This crate handles the core backend logic, including database interactions,
 * error handling, and exposing commands to the frontend.
 */

use rusqlite::Connection;
use std::fs;
use std::sync::{Arc, Mutex};
use tauri::Manager;
use tauri_plugin_log::{Target, TargetKind};

pub mod commands;
pub mod database;
pub mod errors;
pub mod models;

/**
 * The main entry point for the Tauri application.
 *
 * This function initializes the Tauri application, including logging, sets up the
 * database connection, initializes the database schema, and registers the backend
 * commands that can be invoked from the frontend.
 *
 * # Returns
 *
 * This function does not return. It will panic if there is an unrecoverable error
 * during application setup or execution.
 */
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(
            tauri_plugin_log::Builder::default()
                .targets([
                    Target::new(TargetKind::Webview),
                    Target::new(TargetKind::Stdout),
                    Target::new(TargetKind::LogDir { file_name: Some("PrimatifComics.log".into()) }),
                ])
                .level(if cfg!(debug_assertions) {
                    log::LevelFilter::Debug
                } else {
                    log::LevelFilter::Info
                })
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            log::info!("Application setup started.");
            let db_path = app
                .path()
                .resolve("app.db", tauri::path::BaseDirectory::AppLocalData)
                .expect("failed to resolve app db path");

            // Ensure the directory for the database file exists
            if let Some(parent_dir) = db_path.parent() {
                fs::create_dir_all(parent_dir)
                    .expect("failed to create database directory");
            }

            let conn = Connection::open(&db_path).expect("failed to open database");
            let db_manager = database::DatabaseManager::new(db_path.to_str().unwrap())
                .expect("failed to create db manager");
            db_manager
                .initialize_schema()
                .expect("failed to initialize schema");

            app.manage(Arc::new(Mutex::new(conn)));

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::get_message,
            commands::update_message
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
