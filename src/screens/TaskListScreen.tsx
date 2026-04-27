import React from "react";
import { Box, Text } from "ink";
import { useTask, statusColors, statusLabels } from "../context/TaskContext";

export function TaskListScreen() {
  const { meta, state, actions } = useTask();
  const { selectedTask, filteredTasks } = meta;
  const { selectedIndex, categories } = state;

  if (filteredTasks.length === 0) {
    return (
      <Box justifyContent="center" alignItems="center" flexGrow={1}>
        <Text dim>No hay tareas</Text>
      </Box>
    );
  }

  return (
    <Box flexGrow={1} borderStyle="round" borderColor="white" padding={1}>
      {filteredTasks.map((task, i) => {
        const catName = categories.find((c) => c.id === task.categoryId)?.name ?? "";
        const isSelected = i === selectedIndex;
        return (
          <Box
            key={task.id}
            flexDirection="row"
            gap={2}
            padding={1}
            borderStyle={isSelected ? "bold" : undefined}
          >
            <Box flexDirection="column" flexGrow={1}>
              <Text bold={isSelected}>{task.title}</Text>
              <Text dim>
                {catName} - {new Date(task.createdAt * 1000).toLocaleDateString()}
              </Text>
            </Box>
            <Text color={statusColors[task.status]}>
              [{statusLabels[task.status]}]
            </Text>
          </Box>
        );
      })}
    </Box>
  );
}