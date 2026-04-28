import React, { createContext, useContext, useCallback, useEffect, useReducer, useRef } from "react";
import type { Task, Category } from "../types/Task";
import { createSqliteTaskRepository } from "../application/task/sqlite-task-repository";
import { selectSelectedTask } from "../application/task/task-selectors";
import type { TaskRepository } from "../application/task/task-repository";
import {
  initialTaskState,
  taskReducer,
  type Screen,
  type TaskState,
} from "./task-state";
import { statusColors, statusLabels, statusOptions } from "./task-constants";

interface TaskActions {
  setScreen: (screen: Screen) => void;
  setTitle: (title: string) => void;
  setSelectedCategoryIndex: (index: number) => void;
  setSelectedStatusIndex: (index: number) => void;
  setSelectedIndex: (index: number) => void;
  setEditingTaskId: (id: string | null) => void;
  setDeleteConfirmationTaskId: (id: string | null) => void;
  setCategoryModalCategoryIndex: (index: number) => void;
  createTask: () => void;
  updateTask: () => void;
  completeTask: (id: string) => void;
  startTask: (id: string) => void;
  pendingTask: (id: string) => void;
  deleteTask: (id: string) => void;
  requestDeleteTask: (id: string) => void;
  confirmDeleteTask: () => void;
  cancelDeleteTask: () => void;
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

export { statusColors, statusLabels, statusOptions };

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const repositoryRef = useRef<TaskRepository>(createSqliteTaskRepository());

  const setScreen = useCallback((nextScreen: Screen) => {
    dispatch({ type: "setScreen", screen: nextScreen });
  }, []);

  const loadData = useCallback(() => {
    try {
      const snapshot = repositoryRef.current.getSnapshot();
      dispatch({ type: "loadSnapshot", snapshot });
    } catch {
      // DB not ready yet
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const resetForm = useCallback(() => {
    dispatch({ type: "resetForm" });
  }, []);

  const cancelDeleteTask = useCallback(() => {
    dispatch({ type: "setDeleteConfirmationTaskId", id: null });
  }, []);

  const createTask = useCallback(() => {
    if (!state.title.trim()) return;
    const catId = state.categories[state.selectedCategoryIndex]?.id;
    if (!catId) return;

    const id = crypto.randomUUID();
    const now = Math.floor(Date.now() / 1000);
    repositoryRef.current.createTask({
      id,
      createdAt: now,
      title: state.title.trim(),
      status: "pending",
      categoryId: catId,
    });
    loadData();
    resetForm();
    setScreen("list");
  }, [state.title, state.categories, state.selectedCategoryIndex, loadData, resetForm, setScreen]);

  const updateTask = useCallback(() => {
    if (!state.title.trim() || !state.editingTaskId) return;
    const catId = state.categories[state.selectedCategoryIndex]?.id;
    if (!catId) return;

    const nextStatus = statusOptions[state.selectedStatusIndex]?.value ?? "pending";
    repositoryRef.current.updateTask({
      id: state.editingTaskId,
      title: state.title.trim(),
      categoryId: catId,
      status: nextStatus,
    });
    loadData();
    resetForm();
    setScreen("list");
  }, [state.title, state.categories, state.selectedCategoryIndex, state.editingTaskId, state.selectedStatusIndex, loadData, resetForm, setScreen]);

  const completeTask = useCallback((id: string) => {
    const now = Math.floor(Date.now() / 1000);
    repositoryRef.current.updateTaskStatus({
      id,
      status: "completed",
      completedAt: now,
    });
    loadData();
  }, [loadData]);

  const startTask = useCallback((id: string) => {
    repositoryRef.current.updateTaskStatus({
      id,
      status: "in_progress",
      completedAt: null,
    });
    loadData();
  }, [loadData]);

  const pendingTask = useCallback((id: string) => {
    repositoryRef.current.updateTaskStatus({
      id,
      status: "pending",
      completedAt: null,
    });
    loadData();
  }, [loadData]);

  const deleteTask = useCallback((id: string) => {
    repositoryRef.current.deleteTask(id);
    loadData();
  }, [loadData]);

  const requestDeleteTask = useCallback((id: string) => {
    dispatch({ type: "setDeleteConfirmationTaskId", id });
  }, []);

  const confirmDeleteTask = useCallback(() => {
    if (!state.deleteConfirmationTaskId) return;
    deleteTask(state.deleteConfirmationTaskId);
    cancelDeleteTask();
    resetForm();
  }, [cancelDeleteTask, deleteTask, state.deleteConfirmationTaskId, resetForm]);

  const actions: TaskActions = {
    setScreen,
    setTitle: (title: string) => dispatch({ type: "setTitle", title }),
    setSelectedCategoryIndex: (index: number) => dispatch({ type: "setSelectedCategoryIndex", index }),
    setSelectedStatusIndex: (index: number) => dispatch({ type: "setSelectedStatusIndex", index }),
    setSelectedIndex: (index: number) => dispatch({ type: "setSelectedIndex", index }),
    setEditingTaskId: (id: string | null) => dispatch({ type: "setEditingTaskId", id }),
    setDeleteConfirmationTaskId: (id: string | null) => dispatch({ type: "setDeleteConfirmationTaskId", id }),
    setCategoryModalCategoryIndex: (index: number) => dispatch({ type: "setCategoryModalCategoryIndex", index }),
    createTask,
    updateTask,
    completeTask,
    startTask,
    pendingTask,
    deleteTask,
    requestDeleteTask,
    confirmDeleteTask,
    cancelDeleteTask,
    loadData,
  };

  const filteredTasks = state.tasks;
  const selectedTask = selectSelectedTask(filteredTasks, state.selectedIndex);

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
