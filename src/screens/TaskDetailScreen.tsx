import React from "react";
import { Box, Text } from "ink";
import { useTask, statusColors, statusLabels } from "../context/TaskContext";

export function TaskDetailScreen() {
  const { meta, state } = useTask();
  const { selectedTask, filteredTasks } = meta;
  const { categories } = state;

  const task = selectedTask;
  if (!task) return null;

  const catName = categories.find((c) => c.id === task.categoryId)?.name ?? "";
  const createdDate = new Date(task.createdAt * 1000).toLocaleDateString("es-ES");
  const daysText = task.completedAt && task.createdAt
    ? ` (${Math.floor((task.completedAt - task.createdAt) / 86400)} dias)`
    : "";

  return (
    <Box flexDirection="column" gap={2} padding={2} borderStyle="round" borderColor="cyan">
      <Text bold>{task.title}</Text>

      <Box gap={1}>
        <Text dim>Categoria:</Text>
        <Text>{catName}</Text>
      </Box>

      <Box gap={1}>
        <Text dim>Estado:</Text>
        <Text color={statusColors[task.status]}>
          [{statusLabels[task.status]}]
        </Text>
      </Box>

      <Text dim>Creada: {createdDate}</Text>

      {task.completedAt && (
        <Text color="green">
          Completada{daysText}
        </Text>
      )}

      <Box flexDirection="row" gap={2} marginTop={1}>
        {task.status !== "completed" && (
          <Text color="green" dim={task.status === "completed"}>
            [D: completar]
          </Text>
        )}
        {task.status !== "in_progress" && (
          <Text color="cyan" dim={task.status === "in_progress"}>
            [S: proceso]
          </Text>
        )}
        {task.status !== "pending" && (
          <Text color="yellow" dim={task.status === "pending"}>
            [P: pendiente]
          </Text>
        )}
      </Box>

      <Text dim small marginTop={1}>
        Esc = volver
      </Text>
    </Box>
  );
}