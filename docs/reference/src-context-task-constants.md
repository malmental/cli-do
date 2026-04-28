# `src/context/task-constants.ts`

## Purpose

This module centralizes the visible vocabulary for task status. It ensures the same status is rendered consistently across list, detail, and form screens.

## Responsibilities

- Define the color for each status.
- Define the human-readable label for each status.
- Expose the ordered status options used by the form and keyboard flow.

## What This Teaches

This file shows that presentation constants are part of the product model. A status is not only a database value; it is also a label, a color, and a selection option.

## Key Concepts

- `statusColors` keeps visual mapping in one place.
- `statusLabels` keeps textual mapping in one place.
- `statusOptions` defines the order of the form choices.

## Dependencies

- Depends on `TaskStatus` from the domain types.

## Design Notes

- A single source of truth prevents label drift.
- Keeping the option list ordered gives keyboard navigation predictable behavior.
