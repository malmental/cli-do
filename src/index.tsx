/**
 * Entry point for the CLI application.
 *
 * This file stays intentionally small: it clears the terminal once and mounts
 * the root React tree with Ink. All application behavior lives below this
 * boundary in `App.tsx`, context providers, screens, hooks, and repositories.
 *
 * Responsibilities:
 * - reset the terminal before the first frame
 * - render the root `<App />` component with Ink
 * - keep bootstrap logic free of task, database, and UI state concerns
 *
 * Why this matters:
 * - terminal output can be left dirty between runs, so startup should clear it
 * - keeping the entry point minimal makes the rest of the app easier to test
 *   and refactor
 *
 * @module index
 */

import { render } from "ink";
import React from "react";
import { App } from "./App";

process.stdout.write("\x1b[2J\x1b[H");
render(<App />);
