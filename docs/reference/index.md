# CLI-Do Reference Library

This directory contains file-by-file documentation for the current codebase. The intent is academic and practical: each document explains what the module does, why it exists, what it depends on, and what concept it teaches.

## How to Use This Library

- Start with `src/types/Task.ts` to learn the domain vocabulary.
- Continue with `src/context/task-state.ts` and `src/context/TaskContext.tsx` to understand UI state composition.
- Read `src/application/task/*` to see how persistence and selectors are isolated.
- Finish with `src/hooks/*`, `src/screens/*`, and `src/components/*` to see how the terminal UI is assembled.

## Files

- [src/types/Task.ts](./src-types-task.md)
- [src/context/task-state.ts](./src-context-task-state.md)
- [src/context/task-constants.ts](./src-context-task-constants.md)
- [src/context/TaskContext.tsx](./src-context-taskcontext.md)
- [src/application/task/task-repository.ts](./src-application-task-task-repository.md)
- [src/application/task/sqlite-task-repository.ts](./src-application-task-sqlite-task-repository.md)
- [src/application/task/task-selectors.ts](./src-application-task-task-selectors.md)
- [src/hooks/useAppKeyboard.ts](./src-hooks-use-app-keyboard.md)
- [src/hooks/useTerminalSize.ts](./src-hooks-use-terminal-size.md)
- [src/hooks/useTaskPager.ts](./src-hooks-use-task-pager.md)
- [src/screens/TaskDashboardScreen.tsx](./src-screens-task-dashboard-screen.md)
- [src/screens/TaskListScreen.tsx](./src-screens-task-list-screen.md)
- [src/screens/TaskFormScreen.tsx](./src-screens-task-form-screen.md)
- [src/screens/TaskDetailScreen.tsx](./src-screens-task-detail-screen.md)
- [src/components/Header.tsx](./src-components-header.md)
- [src/components/Footer.tsx](./src-components-footer.md)
- [src/components/ControlsPanel.tsx](./src-components-controls-panel.md)
- [src/db/database.ts](./src-db-database.md)
- [src/db/schema.ts](./src-db-schema.md)
- [src/App.tsx](./src-app.md)
- [src/index.tsx](./src-index.md)

## Architecture Map

- `types` defines the shared language.
- `context` holds reducer state and shared UI constants.
- `application/task` isolates repository and selector logic.
- `hooks`, `screens`, and `components` handle presentation.
- `db` owns SQLite bootstrap and migration.
