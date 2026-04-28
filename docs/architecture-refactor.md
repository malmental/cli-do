# CLI-Do Architecture Refactor

## Current Shape

The app is already split by delivery concern:

- `src/App.tsx` owns splash, input routing, and view switching.
- `src/hooks/useAppKeyboard.ts` owns the keyboard router for the app shell.
- `src/context/TaskContext.tsx` owns provider composition and repository wiring.
- `src/context/task-state.ts` owns the reducer and UI state model.
- `src/application/task/` owns the task repository contract, adapter, and selectors.
- `src/screens/` owns screen-level composition.
- `src/components/` owns reusable terminal UI.
- `src/db/` owns SQLite setup and schema.

This works, but `App.tsx` is still doing too much. The next step is to separate terminal presentation from input routing and make the application layer easier to test in isolation.

## Recommended Modularization

### 1. Presentation

Target:

- `src/App.tsx`
- `src/screens/*`
- `src/components/*`
- `src/hooks/useTerminalSize.ts`

Move toward:

- `src/presentation/AppShell.tsx`
- `src/presentation/screens/*`
- `src/presentation/components/*`
- `src/presentation/hooks/*`

Keep this layer responsible only for layout and user input.

### 2. Application

Target:

- `src/context/TaskContext.tsx`
- `src/context/task-state.ts`
- `src/context/task-constants.ts`

Split into:

- `src/application/task/task-provider.tsx`
- `src/application/task/task-actions.ts`
- `src/application/task/task-selectors.ts`
- `src/application/task/task-store.ts`

This layer should coordinate state transitions and expose derived views, but not speak SQL directly. The first step of that split is already in place through the repository contract and selector extraction under `src/application/task/`.

### 3. Domain

Target:

- `src/types/Task.ts`

Split into:

- `src/domain/task/task.ts`
- `src/domain/task/status.ts`
- `src/domain/task/category.ts`
- `src/domain/task/task-formatters.ts`

This layer should be framework-free and hold the rules that remain stable even if the UI changes.

### 4. Infrastructure

Target:

- `src/db/database.ts`
- `src/db/schema.ts`

Split into:

- `src/infrastructure/db/database.ts`
- `src/infrastructure/db/schema.ts`
- `src/infrastructure/task/task-repository.ts`

This layer should contain SQLite and SQL details only.

## Phase Plan

### Phase 1

- Extract selectors and page/window math out of `TaskContext.tsx`.
- Move terminal-size logic into a dedicated presentation hook if it grows.

### Phase 2

- Introduce a task repository interface.
- Make `TaskContext` call the repository instead of raw SQL.

### Phase 3

- Split `App.tsx` into shell and keyboard router.
- Isolate splash rendering from the app switcher.

### Phase 4

- Move task-specific formatting and status constants into domain modules.
- Add unit tests around selectors and pagination.

## Guiding Rule

If a function needs to know about the terminal, it belongs in presentation.
If it needs to know about SQLite, it belongs in infrastructure.
If it needs to know about task behavior, it belongs in domain or application.
