# `src/components/ControlsPanel.tsx`

## Purpose

This component renders the shortcut legend for the dashboard.

## Responsibilities

- Group navigation shortcuts.
- Group task action shortcuts.
- Show the back/cancel hint in a dedicated area.

## What This Teaches

The controls panel is UI documentation embedded in the app. It shows the interaction model directly where the user needs it.

## Key Concepts

- Grouping helps with scanning.
- Color can be used as a secondary organizational signal.
- The displayed shortcuts should match the keyboard router.

## Dependencies

- Depends on Ink layout and text primitives.

## Design Notes

- Keep the panel synchronized with `useAppKeyboard()`.
- Avoid adding logic here; it should remain a readable legend.
