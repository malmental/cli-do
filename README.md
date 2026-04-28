# CLI-Do

**A beautiful task manager for your terminal.**

```
  ░██████  ░██ ░██                   ░██
 ░██   ░██ ░██                       ░██
░██        ░██ ░██             ░████████  ░███████
░██        ░██ ░██            ░██    ░██ ░██    ░██
░██        ░██ ░██            ░██    ░██ ░██    ░██
 ░██   ░██ ░██ ░██            ░██   ░███ ░██    ░██
  ░██████  ░██ ░██░██████████  ░█████░██  ░███████
```

## Overview

CLI-Do is a keyboard-driven task manager that runs directly in your terminal. Built with Ink + React, it combines the speed of the command line with a polished visual interface.

### Features

- **Keyboard-first design** — No mouse required
- **Vim-style navigation** — j/k to move, Enter to select
- **Task states** — Open, In Progress, Done
- **Categories** — Personal, Work (and custom ones you add)
- **Splash screen** — Beautiful ASCII logo on startup
- **Persistent storage** — SQLite database, no cloud required
- **Color-coded status** — Yellow (Open), Cyan (In Progress), Green (Done)

---

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) runtime (v1.0 or higher)
- Node.js 18+ or Bun

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/cli-do.git
cd cli-do

# Install dependencies
bun install

# Run the app
bun dev
```

### First Run

When you first launch CLI-Do, you'll see the splash screen with the ASCII logo. After 1.5 seconds (or pressing any key), it transitions to the main task list.

---

## Keyboard Shortcuts

### Navigation (List View)

| Key | Action |
|-----|--------|
| `j` / `↓` | Move down |
| `k` / `↑` | Move up |
| `Enter` | View task details |
| `n` | Create new task |
| `e` | Edit selected task |
| `d` | Mark as Done |
| `s` | Mark as In Progress |
| `p` | Mark as Open |
| `x` | Delete task |

### Forms (Create/Edit View)

| Key | Action |
|-----|--------|
| `Enter` | Save task |
| `Esc` | Cancel and go back |
| `←` / `→` | Change category |
| `↑` / `↓` | Change status |
| `Backspace` | Delete character |

### Detail View

| Key | Action |
|-----|--------|
| `Esc` | Go back to list |
| `d` | Mark as Done |
| `s` | Mark as In Progress |
| `p` | Mark as Open |

---

## Project Structure

```
cli-do/
├── src/
│   ├── index.tsx           # Entry point
│   ├── App.tsx             # Main app with routing + splash screen
│   ├── components/
│   │   ├── Header.tsx      # App header with shortcuts
│   │   └── Footer.tsx      # Task count + navigation hints
│   ├── screens/
│   │   ├── SplashScreen.tsx    # ASCII logo splash
│   │   ├── TaskListScreen.tsx   # Main task list
│   │   ├── TaskFormScreen.tsx   # Create/edit form
│   │   └── TaskDetailScreen.tsx # Task detail view
│   ├── context/
│   │   └── TaskContext.tsx     # State management (state-actions-meta pattern)
│   ├── db/
│   │   ├── database.ts     # SQLite singleton
│   │   └── schema.ts       # Table definitions
│   └── types/
│       └── Task.ts         # TypeScript types
├── dist/                  # Build output
├── package.json
└── README.md
```

---

## Architecture

### State Management

The app uses a **state-actions-meta** pattern via React Context:

```
state     → Current values (tasks, categories, UI state)
actions   → Mutation functions (createTask, updateTask, etc.)
meta      → Computed values (selectedTask, filteredTasks)
```

### Database

SQLite via `bun:sqlite`. Data persists in `tasks.db` next to the executable.

**Tables:**
- `categories` — id, name, created_at
- `tasks` — id, title, status, category_id, created_at, completed_at

### Screen Navigation

Four screens: `list` → `create` → `edit` | `detail` → `list`

The `App` component manages state via `TaskProvider` and routes to the appropriate screen based on `state.screen`.

---

## Development

```bash
# Run in development mode with hot reload
bun dev

# Build for production
bun run build

# Type check
npx tsc --noEmit
```

---

## Roadmap

- [ ] Custom categories (add/remove)
- [ ] Search/filter tasks
- [ ] Due dates
- [ ] Priority levels
- [ ] Export to JSON/CSV
- [ ] Tags

---

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## License

MIT — use it however you want.

---

## Acknowledgments

Built with:
- [Bun](https://bun.sh/) — JavaScript runtime
- [Ink](https://github.com/vadimdemedes/ink) — React for CLIs
- [SQLite](https://www.sqlite.org/) — Embedded database