import { useCallback } from "react";
import type { Task } from "../../types/Task";
import type { Screen } from "../../types/Task";

interface DetailScreenActions {
  setScreen: (screen: Screen) => void;
  setSelectedIndex: (index: number) => void;
  completeTask: (id: string) => void;
  startTask: (id: string) => void;
  pendingTask: (id: string) => void;
  requestDeleteTask: (id: string) => void;
}

interface UseDetailScreenKeyboardParams {
  selectedTask: Task | null;
  actions: DetailScreenActions;
}

export function useDetailScreenKeyboard({
  selectedTask,
  actions,
}: UseDetailScreenKeyboardParams) {
  const handleKeyDown = useCallback(
    (input: string, key: {
      shift?: boolean;
      tab?: boolean;
      return?: boolean;
    }) => {
      if (key.shift && key.tab) {
        actions.setScreen("list");
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
    [selectedTask, actions]
  );

  return { handleKeyDown };
}
