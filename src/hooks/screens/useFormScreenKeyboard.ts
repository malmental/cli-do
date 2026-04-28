import { useCallback } from "react";
import type { Task } from "../../types/Task";
import type { Screen } from "../../types/Task";
import { statusOptions } from "../../context/task-constants";

interface FormScreenActions {
  setScreen: (screen: Screen) => void;
  setTitle: (title: string) => void;
  setSelectedCategoryIndex: (index: number) => void;
  setSelectedStatusIndex: (index: number) => void;
  setSelectedIndex: (index: number) => void;
  setEditingTaskId: (id: string | null) => void;
  setDeleteConfirmationTaskId: (id: string | null) => void;
  createTask: () => void;
  updateTask: () => void;
  requestDeleteTask: (id: string) => void;
}

interface UseFormScreenKeyboardParams {
  screen: Screen;
  title: string;
  categories: { length: number };
  selectedCategoryIndex: number;
  selectedStatusIndex: number;
  selectedTask: Task | null;
  actions: FormScreenActions;
}

export function useFormScreenKeyboard({
  screen,
  title,
  categories,
  selectedCategoryIndex,
  selectedStatusIndex,
  selectedTask,
  actions,
}: UseFormScreenKeyboardParams) {
  const handleKeyDown = useCallback(
    (input: string, key: {
      return?: boolean;
      shift?: boolean;
      tab?: boolean;
      upArrow?: boolean;
      downArrow?: boolean;
      leftArrow?: boolean;
      rightArrow?: boolean;
      backspace?: boolean;
      delete?: boolean;
    }) => {
      if (key.shift && key.tab) {
        actions.setScreen("list");
        actions.setTitle("");
        actions.setEditingTaskId(null);
        actions.setSelectedCategoryIndex(0);
        actions.setSelectedStatusIndex(0);
        actions.setSelectedIndex(0);
        actions.setDeleteConfirmationTaskId(null);
        return true;
      }

      if (input === "x" && screen === "edit" && selectedTask) {
        actions.requestDeleteTask(selectedTask.id);
        return true;
      }

      if (key.return) {
        if (screen === "create") {
          actions.createTask();
        } else {
          actions.updateTask();
        }
        return true;
      }

      if (key.backspace || key.delete) {
        actions.setTitle(title.slice(0, -1));
        return true;
      }

      if (key.leftArrow) {
        if (selectedCategoryIndex > 0) {
          actions.setSelectedCategoryIndex(selectedCategoryIndex - 1);
        }
        return true;
      }

      if (key.rightArrow) {
        if (selectedCategoryIndex < categories.length - 1) {
          actions.setSelectedCategoryIndex(selectedCategoryIndex + 1);
        }
        return true;
      }

      if (key.upArrow) {
        if (selectedStatusIndex > 0) {
          actions.setSelectedStatusIndex(selectedStatusIndex - 1);
        }
        return true;
      }

      if (key.downArrow) {
        if (selectedStatusIndex < statusOptions.length - 1) {
          actions.setSelectedStatusIndex(selectedStatusIndex + 1);
        }
        return true;
      }

      if (input) {
        actions.setTitle(title + input);
        return true;
      }

      return false;
    },
    [screen, title, categories, selectedCategoryIndex, selectedStatusIndex, selectedTask, actions]
  );

  return { handleKeyDown };
}
