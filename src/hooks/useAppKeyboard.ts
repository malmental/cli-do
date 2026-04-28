import { useInput } from "ink";
import type { Category, Task, Screen } from "../types/Task";
import { statusOptions } from "../context/task-constants";
import { useListScreenKeyboard } from "./screens/useListScreenKeyboard";
import { useFormScreenKeyboard } from "./screens/useFormScreenKeyboard";
import { useDetailScreenKeyboard } from "./screens/useDetailScreenKeyboard";

export type { Screen } from "../types/Task";

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
  const listActions = {
    setScreen: actions.setScreen,
    setSelectedIndex: actions.setSelectedIndex,
    setTitle: actions.setTitle,
    setSelectedCategoryIndex: actions.setSelectedCategoryIndex,
    setSelectedStatusIndex: actions.setSelectedStatusIndex,
    setEditingTaskId: actions.setEditingTaskId,
    createTask: actions.createTask,
    updateTask: actions.updateTask,
    completeTask: actions.completeTask,
    startTask: actions.startTask,
    pendingTask: actions.pendingTask,
    requestDeleteTask: actions.requestDeleteTask,
  };

  const formActions = {
    setScreen: actions.setScreen,
    setTitle: actions.setTitle,
    setSelectedCategoryIndex: actions.setSelectedCategoryIndex,
    setSelectedStatusIndex: actions.setSelectedStatusIndex,
    setSelectedIndex: actions.setSelectedIndex,
    setEditingTaskId: actions.setEditingTaskId,
    setDeleteConfirmationTaskId: actions.setDeleteConfirmationTaskId,
    createTask: actions.createTask,
    updateTask: actions.updateTask,
    requestDeleteTask: actions.requestDeleteTask,
  };

  const detailActions = {
    setScreen: actions.setScreen,
    setSelectedIndex: actions.setSelectedIndex,
    completeTask: actions.completeTask,
    startTask: actions.startTask,
    pendingTask: actions.pendingTask,
    requestDeleteTask: actions.requestDeleteTask,
  };

  const { handleKeyDown: handleListKey } = useListScreenKeyboard({
    tasks,
    selectedIndex,
    selectedTask,
    actions: listActions,
  });

  const { handleKeyDown: handleFormKey } = useFormScreenKeyboard({
    screen,
    title,
    categories,
    selectedCategoryIndex,
    selectedStatusIndex,
    selectedTask,
    actions: formActions,
  });

  const { handleKeyDown: handleDetailKey } = useDetailScreenKeyboard({
    selectedTask,
    actions: detailActions,
  });

  useInput((input, key) => {
    if (deleteConfirmationTaskId) {
      if (input === "y" || key.return) {
        actions.confirmDeleteTask();
        return;
      }
      if (input === "n" || (key.shift && key.tab)) {
        actions.cancelDeleteTask();
        return;
      }
      return;
    }

    if (screen === "list") {
      handleListKey(input, key);
      return;
    }

    if (screen === "create" || screen === "edit") {
      handleFormKey(input, key);
      return;
    }

    if (screen === "detail") {
      handleDetailKey(input, key);
      return;
    }
  });
}
