/**
 * Core task domain types used across presentation, application, and persistence.
 *
 * This module is intentionally framework-free. It defines the language of the
 * task model: statuses, records, category metadata, and helper functions for
 * common derived values.
 */

export type Screen = "list" | "create" | "edit" | "detail";

export type TaskStatus = "pending" | "in_progress" | "completed";

/**
 * Persistent task record.
 *
 * A task is identified by `id` and carries both business data and lifecycle
 * metadata. Timestamps use Unix seconds so they align with SQLite defaults.
 */
export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  categoryId: string;
  createdAt: number;
  completedAt: number | null;
}

/**
 * Task category record.
 *
 * Categories are used to group tasks into user-facing buckets such as
 * Personal and Work.
 *
 * @interface Category
 */
export interface Category {
  id: string;
  name: string;
  createdAt: number;
}

/**
 * Input required to create a new task.
 *
 * This type is useful for form submission boundaries and repository calls.
 *
 * @interface TaskInput
 */
export interface TaskInput {
  title: string;
  categoryId: string;
}

/**
 * Partial update payload for a task.
 *
 * The `id` identifies the record; the rest of the fields are optional because
 * different update flows may only change part of the task.
 *
 * @interface TaskUpdate
 */
export interface TaskUpdate {
  id: string;
  title?: string;
  status?: TaskStatus;
  categoryId?: string;
}

/**
 * Calculates the number of full days between creation and completion.
 *
 * Returns `null` if the task has not been completed yet.
 *
 * @param task - Task record to evaluate.
 * @returns Days taken, or `null` if incomplete.
 */
export function getDaysTaken(task: Task): number | null {
  if (!task.completedAt || !task.createdAt) return null;
  const diffSeconds = task.completedAt - task.createdAt;
  return Math.floor(diffSeconds / 86400);
}

/**
 * Formats task duration for presentation.
 *
 * The function returns a localized English label because the rest of the UI
 * currently uses English status terminology.
 *
 * @param task - Task record to format.
 * @returns Human-readable duration string.
 */
export function formatTaskDays(task: Task): string {
  const days = getDaysTaken(task);
  if (days === null) return "";
  if (days === 0) return "Today";
  if (days === 1) return "1 day";
  return `${days} days`;
}
