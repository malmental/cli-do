# `src/App.tsx`

## Purpose

This module is the root application shell. It owns splash rendering, high-level screen selection, and the outer layout of the Ink tree.

## Responsibilities

- Render the splash screen before the app starts.
- Mount the task provider.
- Route to the correct screen component.
- Delegate keyboard control to `useAppKeyboard()`.

## What This Teaches

This file illustrates the difference between composition and logic. The shell is responsible for assembling the app, not for implementing task rules.

## Key Concepts

- The splash screen is separate from the task workflow.
- `state.screen` selects the active view.
- The shell remains thin because interaction logic lives in a hook.

## Dependencies

- Depends on the task provider and the main screens.
- Depends on Ink for terminal rendering.

## Design Notes

- Keep startup behavior minimal.
- The root shell should remain stable as the application grows.
