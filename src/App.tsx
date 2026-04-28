import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import { TaskProvider, useTask } from "./context/TaskContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { TaskDashboardScreen } from "./screens/TaskDashboardScreen";
import { TaskFormScreen } from "./screens/TaskFormScreen";
import { TaskDetailScreen } from "./screens/TaskDetailScreen";
import { useAppKeyboard } from "./hooks/useAppKeyboard";

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
  useAppKeyboard({
    screen,
    tasks,
    categories,
    selectedIndex,
    title,
    selectedCategoryIndex,
    selectedStatusIndex,
    selectedTask,
    actions,
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
