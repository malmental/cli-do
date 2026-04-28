# `src/context/TaskContext.tsx`

## Purpose

This module composes the task provider used by the application. It binds the reducer, the repository adapter, and the derived metadata into one React Context value.

## Responsibilities

- Own the top-level task provider.
- Load data from the repository.
- Dispatch reducer actions.
- Expose `state`, `actions`, and `meta`.
- Keep persistence details behind the repository adapter.

## What This Teaches

This file demonstrates dependency wiring in a small application. The provider is where infrastructure enters the React tree, but the provider itself remains a composition layer rather than a business-logic sink.

## Key Concepts

- `useReducer` gives the UI a predictable state machine.
- `useRef` stores the repository instance across renders.
- `loadData()` refreshes the state from persistence.
- `selectedTask` is derived from the current task list and selection index.

## Dependencies

- Depends on `task-state.ts` for state transitions.
- Depends on the repository contract and SQLite adapter.
- Depends on selectors for derived state.

## Design Notes

- The provider does not issue SQL directly.
- State refresh happens after persistence mutations to avoid manual drift.
- The public context API stays stable even if internals move again.
