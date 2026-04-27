import { useState, useEffect, useCallback } from "react";
import { getDatabase } from "../db/database";
import type { Task, Category, TaskInput, TaskUpdate, TaskStatus } from "../types/Task";

function generateId(): string {
  return crypto.randomUUID();
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = useCallback(() => {
    const db = getDatabase();
    const rows = db.query<{
      id: string;
      title: string;
      status: TaskStatus;
      category_id: string;
      created_at: number;
      completed_at: number | null;
    }>("SELECT * FROM tasks ORDER BY created_at DESC").all();

    setTasks(
      rows.map((row) => ({
        id: row.id,
        title: row.title,
        status: row.status,
        categoryId: row.category_id,
        createdAt: row.created_at,
        completedAt: row.completed_at,
      }))
    );
  }, []);

  const loadCategories = useCallback(() => {
    const db = getDatabase();
    const rows = db.query<{
      id: string;
      name: string;
      created_at: number;
    }>("SELECT * FROM categories ORDER BY name").all();

    setCategories(
      rows.map((row) => ({
        id: row.id,
        name: row.name,
        createdAt: row.created_at,
      }))
    );
  }, []);

  useEffect(() => {
    loadTasks();
    loadCategories();
    setLoading(false);
  }, [loadTasks, loadCategories]);

  const addTask = useCallback(
    (input: TaskInput): Task => {
      const db = getDatabase();
      const id = generateId();
      const now = Math.floor(Date.now() / 1000);

      db.query(
        "INSERT INTO tasks (id, title, status, category_id, created_at) VALUES (?, ?, 'pending', ?, ?)"
      ).run(id, input.title, input.categoryId, now);

      const task: Task = {
        id,
        title: input.title,
        status: "pending",
        categoryId: input.categoryId,
        createdAt: now,
        completedAt: null,
      };

      setTasks((prev) => [task, ...prev]);
      return task;
    },
    []
  );

  const updateTask = useCallback((update: TaskUpdate): Task | null => {
    const db = getDatabase();
    const existing = db.query("SELECT * FROM tasks WHERE id = ?").get(update.id) as
      | {
          id: string;
          title: string;
          status: TaskStatus;
          category_id: string;
          created_at: number;
          completed_at: number | null;
        }
      | undefined;

    if (!existing) return null;

    const now = Math.floor(Date.now() / 1000);
    let completedAt = existing.completed_at;

    if (update.status === "completed" && existing.status !== "completed") {
      completedAt = now;
    } else if (update.status && update.status !== "completed" && existing.status === "completed") {
      completedAt = null;
    }

    const newTitle = update.title ?? existing.title;
    const newStatus = update.status ?? existing.status;
    const newCategoryId = update.categoryId ?? existing.category_id;

    db.query(
      "UPDATE tasks SET title = ?, status = ?, category_id = ?, completed_at = ? WHERE id = ?"
    ).run(newTitle, newStatus, newCategoryId, completedAt, update.id);

    const updated: Task = {
      id: update.id,
      title: newTitle,
      status: newStatus,
      categoryId: newCategoryId,
      createdAt: existing.created_at,
      completedAt,
    };

    setTasks((prev) => prev.map((t) => (t.id === update.id ? updated : t)));
    return updated;
  }, []);

  const deleteTask = useCallback((id: string) => {
    const db = getDatabase();
    db.query("DELETE FROM tasks WHERE id = ?").run(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const completeTask = useCallback(
    (id: string): Task | null => {
      return updateTask({ id, status: "completed" });
    },
    [updateTask]
  );

  const startTask = useCallback(
    (id: string): Task | null => {
      return updateTask({ id, status: "in_progress" });
    },
    [updateTask]
  );

  const pendingTask = useCallback(
    (id: string): Task | null => {
      return updateTask({ id, status: "pending" });
    },
    [updateTask]
  );

  return {
    tasks,
    categories,
    loading,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    startTask,
    pendingTask,
  };
}