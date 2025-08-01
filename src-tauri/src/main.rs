//! Main executable for the Primatif Comics Tauri application.
//! This file serves as the entry point for the application, primarily invoking
//! the `run` function from the `primatif_comics_lib` crate.

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

/// The main entry point of the application.
/// This function calls the `run` function from the `primatif_comics_lib` crate,
/// which contains the core logic for initializing and running the Tauri application.
fn main() {
    primatif_comics_lib::run()
}
