export type TaskStatus = "pending" | "in_progress" | "completed";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  categoryId: string;
  createdAt: number;
  completedAt: number | null;
}

export interface Category {
  id: string;
  name: string;
  createdAt: number;
}

export interface TaskInput {
  title: string;
  categoryId: string;
}

export interface TaskUpdate {
  id: string;
  title?: string;
  status?: TaskStatus;
  categoryId?: string;
}

export function getDaysTaken(task: Task): number | null {
  if (!task.completedAt || !task.createdAt) return null;
  const diffMs = task.completedAt - task.createdAt;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export function formatTaskDays(task: Task): string {
  const days = getDaysTaken(task);
  if (days === null) return "";
  if (days === 0) return "Hoy";
  if (days === 1) return "1 día";
  return `${days} días`;
}