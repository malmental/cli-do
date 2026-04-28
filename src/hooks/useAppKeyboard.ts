import { useInput } from "ink";
import type { Category, Task } from "../types/Task";
import type { Screen } from "../context/task-state";
import { statusOptions } from "../context/task-constants";

type InputKey = {
  ctrl: boolean;
  return: boolean;
  tab: boolean;
  shift: boolean;
  backspace: boolean;
  delete: boolean;
  leftArrow: boolean;
  rightArrow: boolean;
  upArrow: boolean;
  downArrow: boolean;
};

// Central keyboard router for the app shell. It keeps Ink input handling out of App.tsx.
interface AppKeyboardActions {
  setScreen: (screen: Screen) => void;
  setTitle: (title: string) => void;
  setSelectedCategoryIndex: (index: number) => void;
  setSelectedStatusIndex: (index: number) => void;
  setSelectedIndex: (index: number) => void;
  setEditingTaskId: (id: string | null) => void;
  setDeleteConfirmationTaskId: (id: string | null) => void;
  createTask: () => void;
  updateTask: () => void;
  completeTask: (id: string) => void;
  startTask: (id: string) => void;
  pendingTask: (id: string) => void;
  deleteTask: (id: string) => void;
  requestDeleteTask: (id: string) => void;
  confirmDeleteTask: () => void;
  cancelDeleteTask: () => void;
}

interface UseAppKeyboardParams {
  screen: Screen;
  tasks: Task[];
  categories: Category[];
  selectedIndex: number;
  title: string;
  selectedCategoryIndex: number;
  selectedStatusIndex: number;
  selectedTask: Task | null;
  deleteConfirmationTaskId: string | null;
  actions: AppKeyboardActions;
}

export function useAppKeyboard({
  screen,
  tasks,
  categories,
  selectedIndex,
  title,
  selectedCategoryIndex,
  selectedStatusIndex,
  selectedTask,
  deleteConfirmationTaskId,
  actions,
}: UseAppKeyboardParams) {
  const isBackKey = (key: InputKey) => key.tab && key.shift;

  const goToList = (resetForm = false) => {
    actions.setScreen("list");

    if (resetForm) {
      actions.setTitle("");
      actions.setEditingTaskId(null);
      actions.setSelectedCategoryIndex(0);
      actions.setSelectedStatusIndex(0);
      actions.setSelectedIndex(0);
    }
  };

  useInput((input, key) => {
    if (deleteConfirmationTaskId) {
      if (input === "y" || key.return) {
        actions.confirmDeleteTask();
        return;
      }
      if (input === "n" || isBackKey(key)) {
        actions.cancelDeleteTask();
        return;
      }
      return;
    }

    if (screen === "create" || screen === "edit") {
      if (isBackKey(key)) {
        actions.setScreen("list");
        actions.setTitle("");
        actions.setEditingTaskId(null);
        actions.setSelectedCategoryIndex(0);
        actions.setSelectedStatusIndex(0);
        actions.setSelectedIndex(0);
        actions.setDeleteConfirmationTaskId(null);
        return;
      }
      if (input === "x" && screen === "edit" && selectedTask) {
        actions.requestDeleteTask(selectedTask.id);
        return;
      }
      if (key.return) {
        if (screen === "create") {
          actions.createTask();
        } else {
          actions.updateTask();
        }
        return;
      }
      if (key.backspace || key.delete) {
        actions.setTitle(title.slice(0, -1));
        return;
      }
      if (key.leftArrow) {
        if (selectedCategoryIndex > 0) actions.setSelectedCategoryIndex(selectedCategoryIndex - 1);
        return;
      }
      if (key.rightArrow) {
        if (selectedCategoryIndex < categories.length - 1) actions.setSelectedCategoryIndex(selectedCategoryIndex + 1);
        return;
      }
      if (key.upArrow) {
        if (selectedStatusIndex > 0) actions.setSelectedStatusIndex(selectedStatusIndex - 1);
        return;
      }
      if (key.downArrow) {
        if (selectedStatusIndex < statusOptions.length - 1) actions.setSelectedStatusIndex(selectedStatusIndex + 1);
        return;
      }
      if (input) {
        actions.setTitle(title + input);
        return;
      }
      return;
    }

    if (screen === "detail") {
      if (isBackKey(key)) {
        goToList();
        return;
      }
      if (input === "d" && selectedTask && selectedTask.status !== "completed") {
        actions.completeTask(selectedTask.id);
        return;
      }
      if (input === "s" && selectedTask && selectedTask.status !== "in_progress") {
        actions.startTask(selectedTask.id);
        return;
      }
      if (input === "p" && selectedTask && selectedTask.status !== "pending") {
        actions.pendingTask(selectedTask.id);
        return;
      }
      return;
    }

    if (input === "n") {
      actions.setScreen("create");
      actions.setTitle("");
      actions.setEditingTaskId(null);
      actions.setSelectedCategoryIndex(0);
      actions.setSelectedStatusIndex(0);
      actions.setSelectedIndex(0);
      return;
    }

    if (input === "j" || key.downArrow) {
      if (tasks.length > 0) {
        actions.setSelectedIndex(Math.min(selectedIndex + 1, tasks.length - 1));
      }
      return;
    }

    if (input === "k" || key.upArrow) {
      if (tasks.length > 0) {
        actions.setSelectedIndex(Math.max(0, selectedIndex - 1));
      }
      return;
    }

    if (key.return) {
      if (tasks.length > 0) {
        actions.setScreen("detail");
      }
      return;
    }

    if (input === "e" && selectedTask) {
      actions.setTitle(selectedTask.title);
      const catIdx = categories.findIndex((c) => c.id === selectedTask.categoryId);
      actions.setSelectedCategoryIndex(catIdx >= 0 ? catIdx : 0);
      const statusIdx = statusOptions.findIndex((s) => s.value === selectedTask.status);
      actions.setSelectedStatusIndex(statusIdx >= 0 ? statusIdx : 0);
      actions.setEditingTaskId(selectedTask.id);
      actions.setScreen("edit");
      return;
    }

    if (input === "d" && selectedTask && selectedTask.status !== "completed") {
      actions.completeTask(selectedTask.id);
      return;
    }

    if (input === "s" && selectedTask && selectedTask.status !== "in_progress") {
      actions.startTask(selectedTask.id);
      return;
    }

    if (input === "p" && selectedTask && selectedTask.status !== "pending") {
      actions.pendingTask(selectedTask.id);
      return;
    }

    if (input === "x" && selectedTask) {
      actions.requestDeleteTask(selectedTask.id);
      return;
    }
  });
}
