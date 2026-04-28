# `src/components/Header.tsx`

## Purpose

This component renders the application's top banner.

## Responsibilities

- Display the app name.
- Provide a visual top boundary for the terminal layout.

## What This Teaches

The header is a pure presentation component. It illustrates the value of keeping chrome separate from workflow logic.

## Key Concepts

- The component has no state.
- The component has no side effects.

## Dependencies

- Depends on Ink layout primitives.

## Design Notes

- Header components should stay lightweight.
- Changes here should not cascade into the rest of the architecture.
