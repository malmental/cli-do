import React from "react";
import { Box, Text } from "ink";
import { useTask } from "../context/TaskContext";
import { useTerminalSize } from "../hooks/useTerminalSize";
import { useTaskPager } from "../hooks/useTaskPager";
import { TaskListScreen } from "./TaskListScreen";
import { ControlsPanel } from "../components/ControlsPanel";

// Dashboard composition: hero area on top, paged task list on the left, controls on the right.
export function TaskDashboardScreen() {
  const { state, meta } = useTask();
  const { rows } = useTerminalSize();
  const { selectedIndex } = state;
  const tasks = meta.filteredTasks;
  const {
    heroHeight,
    contentRows,
    visibleCount,
    visibleTasks,
    relativeSelectedIndex,
    pageLabel,
  } = useTaskPager(tasks, selectedIndex, rows);

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
