import type { Task } from "../types/Task";
import { selectTaskWindow } from "../application/task/task-selectors";

// Presentation helper that exposes a fixed task window for the dashboard layout.
export function useTaskPager(tasks: Task[], selectedIndex: number, rows: number) {
  return selectTaskWindow(tasks, selectedIndex, rows);
}
