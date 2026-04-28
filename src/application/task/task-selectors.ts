import type { Task } from "../../types/Task";

// Pure selectors used by the presentation layer to derive visible task state.
export function selectSelectedTask(tasks: Task[], selectedIndex: number): Task | null {
  return tasks[selectedIndex] ?? null;
}

export function selectTaskWindow(tasks: Task[], selectedIndex: number, rows: number) {
  const heroHeight = Math.max(4, Math.floor(rows * 0.22));
  const contentRows = Math.max(8, rows - heroHeight - 8);
  const visibleCount = Math.max(2, Math.floor(contentRows / 3));
  const pageIndex = Math.floor(selectedIndex / visibleCount);
  const start = pageIndex * visibleCount;
  const visibleTasks = tasks.slice(start, start + visibleCount);
  const relativeSelectedIndex = selectedIndex - start;
  const pageLabel = tasks.length > visibleCount
    ? `Page ${pageIndex + 1}/${Math.ceil(tasks.length / visibleCount)}`
    : undefined;

  return {
    heroHeight,
    contentRows,
    visibleCount,
    visibleTasks,
    relativeSelectedIndex,
    pageLabel,
  };
}
