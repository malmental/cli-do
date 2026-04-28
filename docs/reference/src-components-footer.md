# `src/components/Footer.tsx`

## Purpose

This component renders the footer status line.

## Responsibilities

- Show the number of tasks currently visible.
- Show the current screen.
- Remind the user of the quit/back shortcuts.

## What This Teaches

The footer is an information surface. It demonstrates how to expose state to the user without adding another interaction layer.

## Key Concepts

- It reads from the task context.
- It presents state, but does not alter state.

## Dependencies

- Depends on the task context.
- Depends on Ink text and layout primitives.

## Design Notes

- Keep this component compact and legible.
- Status surfaces should favor clarity over decoration.
