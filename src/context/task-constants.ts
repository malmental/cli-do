import type { TaskStatus } from "../types/Task";

// Shared labels and colors for task status rendering and keyboard-driven forms.
export const statusColors: Record<TaskStatus, string> = {
  pending: "yellow",
  in_progress: "cyan",
  completed: "green",
};

export const statusLabels: Record<TaskStatus, string> = {
  pending: "Open",
  in_progress: "In Progress",
  completed: "Done",
};

export const statusOptions = [
  { value: "pending" as TaskStatus, label: "Open" },
  { value: "in_progress" as TaskStatus, label: "In Progress" },
  { value: "completed" as TaskStatus, label: "Done" },
];
