# `src/screens/TaskListScreen.tsx`

## Purpose

This screen renders a task list with a stable, paged layout.

## Responsibilities

- Render the current tasks or a passed-in subset.
- Highlight the selected row.
- Reserve space for empty slots so the layout does not jump.
- Show the current page label when paging is active.

## What This Teaches

This file shows how to make a terminal list feel stable. The UI uses fixed widths, truncation, and placeholder rows to avoid visual reflow while navigating.

## Key Concepts

- `tasksOverride` allows the component to render a page slice.
- `selectedIndexOverride` keeps selection aligned with the current page.
- `slotCount` preserves height even when the last page is shorter.
- Truncation prevents long titles from pushing other columns.

## Dependencies

- Depends on task context for default data.
- Depends on the shared status colors and labels.

## Design Notes

- The component favors consistency over compactness.
- Width reservation is intentional because terminal layouts are sensitive to small changes.
