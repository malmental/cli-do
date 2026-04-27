import React, { useEffect } from "react";
import { Box, useInput } from "ink";
import { TaskProvider, useTask, statusOptions, Screen } from "./context/TaskContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { TaskListScreen } from "./screens/TaskListScreen";
import { TaskFormScreen } from "./screens/TaskFormScreen";
import { TaskDetailScreen } from "./screens/TaskDetailScreen";

function AppContent() {
  const { state, actions, meta } = useTask();
  const { screen, selectedIndex, filteredTasks, categories, title, selectedCategoryIndex, selectedStatusIndex, editingTaskId } = state;
  const { selectedTask } = meta;

  useInput((input, key) => {
    if (screen === "create" || screen === "edit") {
      if (key.escape) {
        actions.setScreen("list");
        actions.setTitle("");
        return;
      }
      if (key.return) {
        if (title.trim()) {
          if (screen === "create") {
            actions.createTask();
          } else {
            actions.updateTask();
          }
        }
        return;
      }
      if (key.backspace || key.delete) {
        actions.setTitle(title.slice(0, -1));
        return;
      }
      if (key.leftArrow) {
        actions.setSelectedCategoryIndex(Math.max(selectedCategoryIndex - 1, 0));
        return;
      }
      if (key.rightArrow) {
        actions.setSelectedCategoryIndex(Math.min(selectedCategoryIndex + 1, categories.length - 1));
        return;
      }
      if (key.upArrow) {
        actions.setSelectedStatusIndex(Math.max(selectedStatusIndex - 1, 0));
        return;
      }
      if (key.downArrow) {
        actions.setSelectedStatusIndex(Math.min(selectedStatusIndex + 1, statusOptions.length - 1));
        return;
      }
      if (input && input.length === 1 && !key.ctrl && !key.meta) {
        actions.setTitle(title + input);
        return;
      }
      return;
    }

    if (screen === "detail") {
      if (key.escape) {
        actions.setScreen("list");
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
      actions.setSelectedCategoryIndex(0);
      actions.setSelectedStatusIndex(0);
      return;
    }

    if (key.downArrow || input === "j") {
      actions.setSelectedIndex(Math.min(selectedIndex + 1, filteredTasks.length - 1));
      return;
    }

    if (key.upArrow || input === "k") {
      actions.setSelectedIndex(Math.max(selectedIndex - 1, 0));
      return;
    }

    if (key.return && selectedTask) {
      actions.setScreen("detail");
      return;
    }

    if (input === "e" && selectedTask) {
      actions.setTitle(selectedTask.title);
      const catIdx = categories.findIndex((c) => c.id === selectedTask.categoryId);
      actions.setSelectedCategoryIndex(catIdx >= 0 ? catIdx : 0);
      const statusIdx = statusOptions.findIndex(s => s.value === selectedTask.status);
      actions.setSelectedStatusIndex(statusIdx >= 0 ? statusIdx : 0);
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
      actions.deleteTask(selectedTask.id);
      return;
    }
  });

  return (
    <Box flexDirection="column" flexGrow={1} padding={1}>
      <Header />

      {screen === "create" || screen === "edit" ? (
        <TaskFormScreen />
      ) : screen === "detail" ? (
        <TaskDetailScreen />
      ) : (
        <TaskListScreen />
      )}

      <Footer />
    </Box>
  );
}

export function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}