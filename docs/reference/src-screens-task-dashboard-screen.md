# `src/screens/TaskDashboardScreen.tsx`

## Purpose

This screen composes the main dashboard view. It arranges the hero section, the paged task list, and the controls panel.

## Responsibilities

- Read terminal size.
- Compute the visible page of tasks.
- Render the layout for the dashboard.

## What This Teaches

This file demonstrates screen composition. It is a useful example of how to combine state, selectors, and reusable components into one terminal page without mixing in input logic.

## Key Concepts

- The hero area reserves vertical space at the top.
- The task list and controls are rendered side by side.
- Paged data prevents the layout from growing without bound.

## Dependencies

- Depends on the task context for state.
- Depends on `useTerminalSize()` and `useTaskPager()`.
- Depends on `TaskListScreen` and `ControlsPanel`.

## Design Notes

- This screen should remain a composition layer.
- Layout stability is a design goal, not an accident.
