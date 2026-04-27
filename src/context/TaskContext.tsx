import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { getDatabase } from "../db/database";
import type { Task, Category, TaskStatus } from "../types/Task";

export type Screen = "list" | "create" | "edit" | "detail";

interface TaskState {
  tasks: Task[];
  categories: Category[];
  screen: Screen;
  selectedIndex: number;
  editingTaskId: string | null;
  title: string;
  selectedCategoryIndex: number;
  selectedStatusIndex: number;
}

interface TaskActions {
  setScreen: (screen: Screen) => void;
  setTitle: (title: string) => void;
  setSelectedCategoryIndex: (index: number) => void;
  setSelectedStatusIndex: (index: number) => void;
  setSelectedIndex: (index: number) => void;
  setEditingTaskId: (id: string | null) => void;
  createTask: () => void;
  updateTask: () => void;
  completeTask: (id: string) => void;
  startTask: (id: string) => void;
  pendingTask: (id: string) => void;
  deleteTask: (id: string) => void;
  loadData: () => void;
}

interface TaskMeta {
  selectedTask: Task | null;
  filteredTasks: Task[];
}

interface TaskContextValue {
  state: TaskState;
  actions: TaskActions;
  meta: TaskMeta;
}

const TaskContext = createContext<TaskContextValue | null>(null);

export const statusColors: Record<TaskStatus, string> = {
  pending: "yellow",
  in_progress: "cyan",
  completed: "green",
};

export const statusLabels: Record<TaskStatus, string> = {
  pending: "Abierta",
  in_progress: "En Proceso",
  completed: "Cerrada",
};

export const statusOptions = [
  { value: "pending" as TaskStatus, label: "Abierta" },
  { value: "in_progress" as TaskStatus, label: "En Proceso" },
  { value: "completed" as TaskStatus, label: "Cerrada" },
];

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [screen, setScreen] = useState<Screen>("list");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedStatusIndex, setSelectedStatusIndex] = useState(0);

  const loadData = useCallback(() => {
    try {
      const db = getDatabase();
      const cats = db
        .query<{ id: string; name: string; created_at: number }>(
          "SELECT * FROM categories ORDER BY name"
        )
        .all();
      const tks = db
        .query<{
          id: string;
          title: string;
          status: TaskStatus;
          category_id: string;
          created_at: number;
          completed_at: number | null;
        }>("SELECT * FROM tasks ORDER BY created_at DESC")
        .all();

      setCategories(cats.map((r) => ({ id: r.id, name: r.name, createdAt: r.created_at })));
      setTasks(tks.map((r) => ({
        id: r.id,
        title: r.title,
        status: r.status,
        categoryId: r.category_id,
        createdAt: r.created_at,
        completedAt: r.completed_at,
      })));
    } catch {
      // DB not ready yet
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const createTask = useCallback(() => {
    if (!title.trim()) return;
    const catId = categories[selectedCategoryIndex]?.id;
    if (!catId) return;

    const db = getDatabase();
    const id = crypto.randomUUID();
    const now = Math.floor(Date.now() / 1000);
    db.query(
      "INSERT INTO tasks (id, title, status, category_id, created_at) VALUES (?, ?, 'pending', ?, ?)"
    ).run(id, title.trim(), catId, now);
    setTasks((prev) => [
      { id, title: title.trim(), status: "pending" as const, categoryId: catId, createdAt: now, completedAt: null },
      ...prev,
    ]);
    setScreen("list");
    setTitle("");
  }, [title, categories, selectedCategoryIndex]);

  const updateTask = useCallback(() => {
    if (!title.trim() || !editingTaskId) return;
    const catId = categories[selectedCategoryIndex]?.id;
    if (!catId) return;

    const db = getDatabase();
    db.query(
      "UPDATE tasks SET title = ?, category_id = ?, status = ? WHERE id = ?"
    ).run(title.trim(), catId, statusOptions[selectedStatusIndex].value, editingTaskId);
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingTaskId
          ? { ...t, title: title.trim(), categoryId: catId, status: statusOptions[selectedStatusIndex].value }
          : t
      )
    );
    setScreen("list");
    setTitle("");
    setEditingTaskId(null);
  }, [title, categories, selectedCategoryIndex, editingTaskId, selectedStatusIndex]);

  const completeTask = useCallback((id: string) => {
    const db = getDatabase();
    const now = Math.floor(Date.now() / 1000);
    db.query("UPDATE tasks SET status = 'completed', completed_at = ? WHERE id = ?").run(now, id);
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status: "completed", completedAt: now } : t));
  }, []);

  const startTask = useCallback((id: string) => {
    const db = getDatabase();
    db.query("UPDATE tasks SET status = 'in_progress', completed_at = NULL WHERE id = ?").run(id);
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status: "in_progress", completedAt: null } : t));
  }, []);

  const pendingTask = useCallback((id: string) => {
    const db = getDatabase();
    db.query("UPDATE tasks SET status = 'pending', completed_at = NULL WHERE id = ?").run(id);
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status: "pending", completedAt: null } : t));
  }, []);

  const deleteTask = useCallback((id: string) => {
    const db = getDatabase();
    db.query("DELETE FROM tasks WHERE id = ?").run(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const state: TaskState = {
    tasks,
    categories,
    screen,
    selectedIndex,
    editingTaskId,
    title,
    selectedCategoryIndex,
    selectedStatusIndex,
  };

  const actions: TaskActions = {
    setScreen,
    setTitle,
    setSelectedCategoryIndex,
    setSelectedStatusIndex,
    setSelectedIndex,
    setEditingTaskId,
    createTask,
    updateTask,
    completeTask,
    startTask,
    pendingTask,
    deleteTask,
    loadData,
  };

  const filteredTasks = tasks;
  const selectedTask = filteredTasks[selectedIndex] ?? null;

  const meta: TaskMeta = {
    selectedTask,
    filteredTasks,
  };

  return (
    <TaskContext.Provider value={{ state, actions, meta }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within TaskProvider");
  }
  return context;
}