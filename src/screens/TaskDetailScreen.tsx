import React from "react";
import { Box, Text } from "ink";
import { useTask, statusColors, statusLabels } from "../context/TaskContext";
import { TaskDetailControlsPanel } from "../components/TaskDetailControlsPanel";

export function TaskDetailScreen() {
  const { meta, state } = useTask();
  const { selectedTask } = meta;
  const { categories } = state;

  const task = selectedTask;
  if (!task) return null;

  const catName = categories.find((c) => c.id === task.categoryId)?.name ?? "";
  const createdDate = new Date(task.createdAt * 1000).toLocaleDateString();

  return (
    <Box flexDirection="column" flexGrow={1} gap={1}>
      <Box
        flexDirection="row"
        flexGrow={1}
        gap={1}
      >
        <Box
          flexDirection="column"
          flexGrow={2}
          borderStyle="round"
          borderColor="cyan"
          padding={2}
          gap={2}
        >
          <Text bold>{task.title}</Text>

          <Box gap={1}>
            <Text color="gray">Category:</Text>
            <Text>{catName}</Text>
          </Box>

          <Box gap={1}>
            <Text color="gray">Status:</Text>
            <Text color={statusColors[task.status]}>
              [{statusLabels[task.status]}]
            </Text>
          </Box>

          <Text color="gray">Created: {createdDate}</Text>

          <Box marginTop={1}>
            <Text color="gray">Shift+Tab + any key = back</Text>
          </Box>
        </Box>

        <Box flexDirection="column" flexGrow={1}>
          <TaskDetailControlsPanel />
        </Box>
      </Box>
    </Box>
  );
}
