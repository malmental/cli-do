import type { Category, Task, TaskStatus } from "../../types/Task";

// Repository contract for loading and mutating tasks without coupling callers to SQLite.
export interface TaskSnapshot {
  tasks: Task[];
  categories: Category[];
}

export interface TaskRepository {
  getSnapshot(): TaskSnapshot;
  createTask(input: {
    id: string;
    createdAt: number;
    title: string;
    categoryId: string;
    status: TaskStatus;
  }): void;
  updateTask(input: {
    id: string;
    title: string;
    categoryId: string;
    status: TaskStatus;
  }): void;
  updateTaskStatus(input: {
    id: string;
    status: TaskStatus;
    completedAt: number | null;
  }): void;
  deleteTask(id: string): void;
}
