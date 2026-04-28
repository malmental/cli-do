import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import { TaskProvider, useTask, statusOptions } from "./context/TaskContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { TaskDashboardScreen } from "./screens/TaskDashboardScreen";
import { TaskFormScreen } from "./screens/TaskFormScreen";
import { TaskDetailScreen } from "./screens/TaskDetailScreen";

const ASCII_LOGO = `
  ░██████  ░██ ░██                   ░██
 ░██   ░██ ░██                       ░██
░██        ░██ ░██             ░████████  ░███████
░██        ░██ ░██            ░██    ░██ ░██    ░██
░██        ░██ ░██            ░██    ░██ ░██    ░██
 ░██   ░██ ░██ ░██            ░██   ░███ ░██    ░██
  ░██████  ░██ ░██░██████████  ░█████░██  ░███████
`;

function SplashView({ onStart }: { onStart: () => void }) {
  useInput(() => {
    onStart();
  });

  return (
    <Box flexDirection="column" justifyContent="center" alignItems="center" flexGrow={1}>
      <Box
        flexDirection="column"
        alignItems="center"
        gap={1}
        padding={2}
        borderStyle="round"
        borderColor="white"
      >
        <Text bold color="cyan">{ASCII_LOGO}</Text>
        <Text bold color="white">Your personal Task Manager for Terminal</Text>
      </Box>
      <Box marginTop={3}>
        <Text dimColor>Press any key to continue...by Salem.deµ</Text>
      </Box>
    </Box>
  );
}

function AppContent() {
  const { state, actions, meta } = useTask();
  const screen = state.screen;
  const tasks = state.tasks;
  const categories = state.categories;
  const selectedIndex = state.selectedIndex;
  const title = state.title;
  const selectedCategoryIndex = state.selectedCategoryIndex;
  const selectedStatusIndex = state.selectedStatusIndex;
  const selectedTask = meta.selectedTask;

  const isBackKey = (input: string, key: { escape: boolean; ctrl: boolean }) =>
    key.escape || input === "q" || input === "h" || (key.ctrl && input === "b");

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
    if (screen === "create" || screen === "edit") {
      if (isBackKey(input, key)) {
        goToList(true);
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
      if (isBackKey(input, key)) {
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
      const statusIdx = statusOptions.findIndex(s => s.value === selectedTask.status);
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
      actions.deleteTask(selectedTask.id);
      return;
    }
  });

  let mainContent;
  if (screen === "create" || screen === "edit") {
    mainContent = <TaskFormScreen />;
  } else if (screen === "detail") {
    mainContent = <TaskDetailScreen />;
  } else {
    mainContent = <TaskDashboardScreen />;
  }

  return (
    <Box key={screen} flexDirection="column" flexGrow={1} padding={1}>
      <Header />
      {mainContent}
      <Footer />
    </Box>
  );
}

export function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <TaskProvider>
      <Box flexDirection="column" flexGrow={1} padding={1}>
        {showSplash ? (
          <SplashView onStart={() => setShowSplash(false)} />
        ) : (
          <AppContent />
        )}
      </Box>
    </TaskProvider>
  );
}
