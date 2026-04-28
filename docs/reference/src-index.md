# `src/index.tsx`

## Purpose

This is the execution entry point for the CLI application.

## Responsibilities

- Clear the terminal before the first render.
- Mount the root app component with Ink.

## What This Teaches

The file shows the minimal bootstrap required for a terminal React application. It also makes the startup boundary explicit: the rest of the codebase only runs after Ink mounts.

## Key Concepts

- Entry points should be small.
- Terminal cleanup before rendering avoids stale output.

## Dependencies

- Depends on Ink's renderer.
- Depends on the root `App` component.

## Design Notes

- Keep the bootstrap path short and deterministic.
- Startup code should not accumulate business logic.
