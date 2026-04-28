import { useCallback } from "react";
import type { Task } from "../../types/Task";
import type { Screen } from "../../types/Task";
import { statusOptions } from "../../context/task-constants";

interface ListScreenActions {
  setScreen: (screen: Screen) => void;
  setSelectedIndex: (index: number) => void;
  setTitle: (title: string) => void;
  setSelectedCategoryIndex: (index: number) => void;
  setSelectedStatusIndex: (index: number) => void;
  setEditingTaskId: (id: string | null) => void;
  createTask: () => void;
  updateTask: () => void;
  completeTask: (id: string) => void;
  startTask: (id: string) => void;
  pendingTask: (id: string) => void;
  requestDeleteTask: (id: string) => void;
}

interface UseListScreenKeyboardParams {
  tasks: Task[];
  selectedIndex: number;
  selectedTask: Task | null;
  actions: ListScreenActions;
}

export function useListScreenKeyboard({
  tasks,
  selectedIndex,
  selectedTask,
  actions,
}: UseListScreenKeyboardParams) {
  const handleKeyDown = useCallback(
    (input: string, key: {
      return?: boolean;
      shift?: boolean;
      tab?: boolean;
      upArrow?: boolean;
      downArrow?: boolean;
      backspace?: boolean;
      delete?: boolean;
    }) => {
      if (input === "n") {
        actions.setScreen("create");
        actions.setTitle("");
        actions.setEditingTaskId(null);
        actions.setSelectedCategoryIndex(0);
        actions.setSelectedStatusIndex(0);
        actions.setSelectedIndex(0);
        return true;
      }

      if (input === "j" || key.downArrow) {
        if (tasks.length > 0) {
          actions.setSelectedIndex(Math.min(selectedIndex + 1, tasks.length - 1));
        }
        return true;
      }

      if (input === "k" || key.upArrow) {
        if (tasks.length > 0) {
          actions.setSelectedIndex(Math.max(0, selectedIndex - 1));
        }
        return true;
      }

      if (key.return) {
        if (tasks.length > 0) {
          actions.setScreen("detail");
        }
        return true;
      }

      if (input === "e" && selectedTask) {
        actions.setTitle(selectedTask.title);
        actions.setSelectedCategoryIndex(0);
        const statusIdx = statusOptions.findIndex((s) => s.value === selectedTask.status);
        actions.setSelectedStatusIndex(statusIdx >= 0 ? statusIdx : 0);
        actions.setEditingTaskId(selectedTask.id);
        actions.setScreen("edit");
        return true;
      }

      if (input === "d" && selectedTask && selectedTask.status !== "completed") {
        actions.completeTask(selectedTask.id);
        return true;
      }

      if (input === "s" && selectedTask && selectedTask.status !== "in_progress") {
        actions.startTask(selectedTask.id);
        return true;
      }

      if (input === "p" && selectedTask && selectedTask.status !== "pending") {
        actions.pendingTask(selectedTask.id);
        return true;
      }

      if (input === "x" && selectedTask) {
        actions.requestDeleteTask(selectedTask.id);
        return true;
      }

      return false;
    },
    [tasks, selectedIndex, selectedTask, actions]
  );

  return { handleKeyDown };
}
