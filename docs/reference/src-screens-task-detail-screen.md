# `src/screens/TaskDetailScreen.tsx`

## Purpose

This screen renders the currently selected task in detail mode.

## Responsibilities

- Display the task title and metadata.
- Show status-specific actions.
- Show completion information when available.

## What This Teaches

This file demonstrates a read-oriented detail view. It is useful as an example of how to present derived data without mutating the model from inside the screen.

## Key Concepts

- The selected task is derived from context meta.
- Category names are looked up from the category list.
- The completion label is conditional on the task state.

## Dependencies

- Depends on the task context.
- Depends on the shared status colors and labels.

## Design Notes

- Detail views should fail softly when selection is missing.
- Action hints belong here because they help the user interpret the current mode.
