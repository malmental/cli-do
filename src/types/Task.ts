/**
 * @fileoverview Task Type Definitions
 * @module types/Task
 *
 * @description
 * This module defines the core TypeScript types and interfaces for the
 * CLI-Do application. These types represent the domain model for tasks
 * and categories, serving as the authoritative source of truth for data
 * structures throughout the codebase.
 *
 * ## Type Hierarchy
 *
 * ```
 * TaskStatus (union type)
 * ├── "pending"
 * ├── "in_progress"
 * └── "completed"
 *
 * Task (interface)
 * ├── id: string
 * ├── title: string
 * ├── status: TaskStatus
 * ├── categoryId: string
 * ├── createdAt: number (Unix timestamp)
 * └── completedAt: number | null
 *
 * Category (interface)
 * ├── id: string
 * ├── name: string
 * └── createdAt: number (Unix timestamp)
 *
 * TaskInput (interface) - For creating tasks
 * ├── title: string
 * └── categoryId: string
 *
 * TaskUpdate (interface) - For updating tasks
 * ├── id: string (required)
 * ├── title?: string (optional)
 * ├── status?: TaskStatus (optional)
 * └── categoryId?: string (optional)
 * ```
 *
 * ## TaskStatus Enum
 *
 * TaskStatus represents the lifecycle stages of a task:
 *
 * - **pending (Abierta)**: Task is newly created and awaiting action
 * - **in_progress (En Proceso)**: Task is actively being worked on
 * - **completed (Cerrada)**: Task has been finished
 *
 * ## Timestamp Convention
 *
 * All timestamps use Unix epoch format (seconds since 1970-01-01).
 * This matches SQLite's DEFAULT (unixepoch()) behavior for consistency.
 *
 * ## Usage
 *
 * ```typescript
 * import type { Task, TaskStatus, Category } from './types/Task';
 *
 * const task: Task = {
 *   id: crypto.randomUUID(),
 *   title: 'Complete project',
 *   status: 'pending',
 *   categoryId: 'personal',
 *   createdAt: Math.floor(Date.now() / 1000),
 *   completedAt: null
 * };
 * ```
 *
 * @requires none (pure TypeScript)
 *
 * @see {@link context/TaskContext} for state management using these types
 */

export type TaskStatus = "pending" | "in_progress" | "completed";

/**
 * TaskStatus represents the lifecycle stages of a task:
 *
 * - **pending (Open)**: Task is newly created and awaiting action
 * - **in_progress (In Progress)**: Task is actively being worked on
 * - **completed (Done)**: Task has been finished
 *
 * ## Timestamp Convention
 *
 * All timestamps use Unix epoch format (seconds since 1970-01-01).
 * This matches SQLite's DEFAULT (unixepoch()) behavior for consistency.
 *
 * ## Usage
 *
 * ```typescript
 * import type { Task, TaskStatus, Category } from './types/Task';
 *
 * const task: Task = {
 *   id: crypto.randomUUID(),
 *   title: 'Complete project',
 *   status: 'pending',
 *   categoryId: 'personal',
 *   createdAt: Math.floor(Date.now() / 1000),
 *   completedAt: null
 * };
 * ```
 *
 * @requires none (pure TypeScript)
 *
 * @see {@link context/TaskContext} for state management using these types
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
 * Category represents a task category.
 *
 * @interface Category
 */
export interface Category {
  id: string;
  name: string;
  createdAt: number;
}

/**
 * TaskInput represents the data required to create a new task.
 *
 * Used when submitting the create task form.
 *
 * @interface TaskInput
 */
export interface TaskInput {
  title: string;
  categoryId: string;
}

/**
 * TaskUpdate represents partial task data for updates.
 *
 * All fields except `id` are optional since updates may only
 * modify specific fields.
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
 * Calculates the number of days taken to complete a task.
 *
 * @function getDaysTaken
 * @param {Task} task - The task to evaluate
 * @returns {number | null} Days taken, or null if incomplete
 *
 * @example
 * ```typescript
 * const days = getDaysTaken(task);
 * if (days !== null) {
 *   console.log(`Completed in ${days} days`);
 * }
 * ```
 */
export function getDaysTaken(task: Task): number | null {
  if (!task.completedAt || !task.createdAt) return null;
  const diffMs = task.completedAt - task.createdAt;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Formats the task duration as a human-readable string.
 *
 * @function formatTaskDays
 * @param {Task} task - The task to format
 * @returns {string} Formatted string ("Hoy", "1 día", "N días")
 *
 * @example
 * ```typescript
 * const formatted = formatTaskDays(task);
 * console.log(formatted); // "3 días"
 * ```
 */
export function formatTaskDays(task: Task): string {
  const days = getDaysTaken(task);
  if (days === null) return "";
  if (days === 0) return "Today";
  if (days === 1) return "1 day";
  return `${days} days`;
}