import React from "react";
import { Box, Text } from "ink";
import { useTask } from "../context/TaskContext";
import { useTerminalSize } from "../hooks/useTerminalSize";
import { TaskListScreen } from "./TaskListScreen";
import { ControlsPanel } from "../components/ControlsPanel";

export function TaskDashboardScreen() {
  const { state, meta } = useTask();
  const { rows } = useTerminalSize();
  const { selectedIndex } = state;
  const tasks = meta.filteredTasks;

  const heroHeight = Math.max(4, Math.floor(rows * 0.22));
  const contentRows = Math.max(8, rows - heroHeight - 8);
  const visibleCount = Math.max(2, Math.floor(contentRows / 3));
  const pageIndex = Math.floor(selectedIndex / visibleCount);
  const start = pageIndex * visibleCount;
  const visibleTasks = tasks.slice(start, start + visibleCount);
  const relativeSelectedIndex = selectedIndex - start;
  const pageLabel = tasks.length > visibleCount
    ? `Page ${pageIndex + 1}/${Math.ceil(tasks.length / visibleCount)}`
    : undefined;

  return (
    <Box flexDirection="column" flexGrow={1} gap={1}>
      <Box
        flexDirection="column"
        height={heroHeight}
        borderStyle="round"
        borderColor="gray"
        padding={1}
        justifyContent="center"
        alignItems="center"
      >
        <Text dimColor>This is CLI_do</Text>
        <Text color="gray">Mouse free, start by adding a Task with N</Text>
      </Box>

      <Box flexDirection="row" flexGrow={2} gap={1}>
        <Box flexDirection="column" flexGrow={2} height={contentRows}>
          <TaskListScreen
            tasks={visibleTasks}
            selectedIndexOverride={relativeSelectedIndex}
            pageLabel={pageLabel}
            slotCount={visibleCount}
          />
        </Box>
        <Box flexDirection="column" flexGrow={1} height={contentRows}>
          <ControlsPanel />
        </Box>
      </Box>
    </Box>
  );
}
