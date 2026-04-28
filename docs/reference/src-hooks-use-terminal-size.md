# `src/hooks/useTerminalSize.ts`

## Purpose

This hook tracks terminal dimensions and exposes them to responsive presentation code.

## Responsibilities

- Read the current `stdout` size from Ink.
- Subscribe to terminal resize events.
- Provide a stable `{ columns, rows }` object to callers.

## What This Teaches

Terminal UIs still need layout awareness even though they do not render in a browser. This hook demonstrates how to adapt layout to a dynamic viewport.

## Key Concepts

- The terminal size is a reactive signal.
- Resize events should be cleaned up on unmount.
- Default values are needed because size can be unavailable briefly.

## Dependencies

- Depends on React state/effect hooks.
- Depends on Ink's `useStdout`.

## Design Notes

- Keep the hook small so layout code remains readable.
- Prefer a single resize source rather than ad hoc measurement logic.
