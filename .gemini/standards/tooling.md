# Tooling Standards

This document outlines the standard tools and commands for this project.

## Package Management

This project uses **Bun** as the primary package manager to ensure fast and consistent dependency installation.

- **To install all dependencies:** `bun install`
- **To add a new dependency:** `bun add <package-name>`
- **To add a new development dependency:** `bun add -d <package-name>`
- **To remove a dependency:** `bun remove <package-name>`

## Development Server

We use **Vite** to run the local development server and for Hot Module Replacement (HMR).

- **To start the development server:** `bun run dev`

## Building for Production

We use **Vite** to build the application for production.

- **To build the application:** `bun run build`

## Testing

We use **Bun's** built-in test runner for all unit and integration tests.

- **To run all tests:** `bun test`
