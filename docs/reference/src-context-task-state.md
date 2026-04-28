# `src/context/task-state.ts`

## Purpose

This module defines the UI state machine for the task workflow. It is the canonical source for screen state, form state, and selection state.

## Responsibilities

- Define the `Screen` union.
- Define the `TaskState` structure.
- Define the reducer action union.
- Provide the initial state.
- Implement the reducer that governs state transitions.

## What This Teaches

This file illustrates the value of a reducer in a terminal application. Instead of scattering state mutations across the app, the workflow is centralized and explicit.

## Key Concepts

- `screen` expresses which terminal view is active.
- `selectedIndex` tracks list navigation.
- `editingTaskId` links the form to an existing task during edit mode.
- `selectedCategoryIndex` and `selectedStatusIndex` are form-local choices.
- `loadSnapshot` synchronizes the reducer with repository output.

## Dependencies

- Depends only on `src/types/Task.ts`.
- Does not import React.
- Does not import database code.

## Design Notes

- The reducer is deterministic and side-effect free.
- The `resetForm` action defines a clean return-to-list behavior.
- The clamp logic prevents selection drift when the task list changes.
