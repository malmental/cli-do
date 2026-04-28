/**
 * CLI-Do - Task Manager CLI Application
 *
 * A command-line task management application built with Ink (React for CLIs).
 * This module serves as the application entry point and root renderer.
 *
 * ## Overview
 *
 * CLI-Do is a terminal-based task manager that allows users to create, edit,
 * and manage tasks with categories and status tracking. The application uses
 * a modular architecture following React composition patterns for maintainability.
 *
 * ## Technical Stack
 *
 * - **Runtime**: Bun (JavaScript/TypeScript runtime)
 * - **UI Framework**: Ink v4.4.1 (React for command-line interfaces)
 * - **Database**: Bun:sqlite (embedded SQLite database)
 * - **Language**: TypeScript
 *
 * ## Entry Point Architecture
 *
 * This file implements the root render pattern for Ink applications.
 * The `render()` function from Ink takes a React element and mounts it
 * to the terminal, converting React components into ANSI escape sequences
 * for terminal rendering.
 *
 * ## Rendering Process
 *
 * 1. Ink's `render()` function creates a CLI renderer instance
 * 2. React reconciler builds the component tree
 * 3. Ink converts the virtual DOM to terminal escape sequences
 * 4. Output is flushed to stdout in raw TTY mode
 *
 * ## Usage
 *
 * ```bash
 * bun run src/index.tsx
 * # or
 * bun run dev    # Watch mode for development
 * ```
 *
 * ## Requirements
 *
 * - Bun runtime must be installed
 * - Terminal must support ANSI escape codes
 * - Raw mode TTY required for keyboard input
 *
 * ## File Structure
 *
 * The application follows a modular architecture:
 * ```
 * src/
 * ├── index.tsx          # Entry point (this file)
 * ├── App.tsx            # Root component with routing
 * ├── context/           # React Context for state management
 * ├── components/         # Reusable UI components
 * ├── screens/           # Screen-level components
 * ├── db/                # Database layer
 * └── types/             # TypeScript type definitions
 * ```
 *
 * @module index
 * @requires ink
 * @requires react
 * @requires ./App
 */

import { render } from "ink";
import React from "react";
import { App } from "./App";

process.stdout.write("\x1b[2J\x1b[H");
render(<App />);