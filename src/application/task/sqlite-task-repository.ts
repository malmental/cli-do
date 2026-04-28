import { getDatabase } from "../../db/database";
import type { Category, Task, TaskStatus } from "../../types/Task";
import type { TaskRepository, TaskSnapshot } from "./task-repository";

// SQLite adapter for the task repository contract.
function mapCategoryRow(row: { id: string; name: string; created_at: number }): Category {
  return {
    id: row.id,
    name: row.name,
    createdAt: row.created_at,
  };
}

function mapTaskRow(row: {
  id: string;
  title: string;
  status: TaskStatus;
  category_id: string;
  created_at: number;
  completed_at: number | null;
}): Task {
  return {
    id: row.id,
    title: row.title,
    status: row.status,
    categoryId: row.category_id,
    createdAt: row.created_at,
    completedAt: row.completed_at,
  };
}

export function createSqliteTaskRepository(): TaskRepository {
  const db = getDatabase();

  return {
    getSnapshot(): TaskSnapshot {
      const categories = db
        .query("SELECT * FROM categories ORDER BY name")
        .all() as { id: string; name: string; created_at: number }[];
      const tasks = db
        .query("SELECT * FROM tasks ORDER BY created_at DESC")
        .all() as {
          id: string;
          title: string;
          status: TaskStatus;
          category_id: string;
          created_at: number;
          completed_at: number | null;
        }[];

      return {
        categories: categories.map(mapCategoryRow),
        tasks: tasks.map(mapTaskRow),
      };
    },

    createTask(input) {
      db.query(
        "INSERT INTO tasks (id, title, status, category_id, created_at) VALUES (?, ?, ?, ?, ?)"
      ).run(input.id, input.title, input.status, input.categoryId, input.createdAt);
    },

    updateTask(input) {
      db.query(
        "UPDATE tasks SET title = ?, category_id = ?, status = ? WHERE id = ?"
      ).run(input.title, input.categoryId, input.status, input.id);
    },

    updateTaskStatus(input) {
      db.query(
        "UPDATE tasks SET status = ?, completed_at = ? WHERE id = ?"
      ).run(input.status, input.completedAt, input.id);
    },

    deleteTask(id: string) {
      db.query("DELETE FROM tasks WHERE id = ?").run(id);
    },
  };
}
