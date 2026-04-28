# `src/hooks/useAppKeyboard.ts`

## Purpose

This hook is the keyboard router for the whole application shell. It translates raw input events into screen transitions and task actions by delegating to screen-specific handlers.

## Structure

```
useAppKeyboard (main router)
├── useListScreenKeyboard    → list view input
├── useFormScreenKeyboard    → create/edit input
└── useDetailScreenKeyboard → detail view input
```

## Responsibilities

- Route input to the appropriate screen handler based on current screen.
- Handle delete confirmation modal input (Y/N).
- Keep the input model out of `App.tsx`.
- Compose screen-specific handlers for maintainability.

## What This Teaches

Keyboard input in a CLI app is a controller concern. Composing screen-specific handlers keeps each one focused while the main hook remains the single entry point.

## Key Concepts

- Screen handlers return a `handleKeyDown` function that returns `true` if the input was handled.
- The main hook only handles modal input (delete confirmation) and routes to screen handlers.
- Each screen handler is isolated and only knows about its own input logic.
- Adding a new screen means adding a new handler file, not modifying a large switch statement.

## Screen Handlers

| Handler | File | Responsibilities |
|---------|------|------------------|
| `useListScreenKeyboard` | `screens/useListScreenKeyboard.ts` | Navigation, task actions, shortcuts |
| `useFormScreenKeyboard` | `screens/useFormScreenKeyboard.ts` | Form input, category/status navigation |
| `useDetailScreenKeyboard` | `screens/useDetailScreenKeyboard.ts` | Task status changes |

## Dependencies

- Depends on Ink's `useInput`.
- Depends on task state and action callbacks.
- Screen handlers depend on `statusOptions` for form navigation.
