# `src/hooks/useAppKeyboard.ts`

## Purpose

This hook is the keyboard router for the whole application shell. It translates raw input events into screen transitions and task actions.

## Responsibilities

- Handle navigation keys across list, detail, create, and edit screens.
- Handle task mutation shortcuts.
- Handle back/cancel behavior consistently.
- Keep the input model out of `App.tsx`.

## What This Teaches

Keyboard input in a CLI app is a controller concern. This hook shows how to keep control flow explicit while still allowing the presentation layer to stay compositional.

## Key Concepts

- Back keys are normalized into a single behavior.
- Screen-specific input handling prevents cross-screen leakage.
- The hook is stateful only through the values passed into it.

## Dependencies

- Depends on Ink's `useInput`.
- Depends on task state and action callbacks.
- Depends on `statusOptions` for form navigation.

## Design Notes

- The hook is intentionally centralized so keybindings remain coherent.
- If you add new shortcuts, this is the primary place to document and implement them.
