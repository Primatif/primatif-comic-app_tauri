/**
 * Defines the data models used throughout the application.
 *
 * This module contains structs that represent the structure of data
 * stored in the database and exchanged with the frontend.
 */

use serde::{Deserialize, Serialize};

/**
 * Represents a single message stored in the application's database.
 *
 * Messages have a unique identifier and a text content.
 */
#[derive(Debug, Serialize, Deserialize)]
pub struct Message {
    pub id: i32,
    pub text: String,
    pub x: f64,
    pub y: f64,
}
