import React from "react";
import { Box, Text } from "ink";
import { useTask, statusColors, statusLabels } from "../context/TaskContext";

type TaskListScreenProps = {
  tasks?: ReturnType<typeof useTask>["meta"]["filteredTasks"];
  selectedIndexOverride?: number;
  pageLabel?: string;
  slotCount?: number;
};

export function TaskListScreen({
  tasks: tasksOverride,
  selectedIndexOverride,
  pageLabel,
  slotCount,
}: TaskListScreenProps = {}) {
  const { meta, state } = useTask();
  const { filteredTasks } = meta;
  const { selectedIndex, categories } = state;
  const tasks = tasksOverride ?? filteredTasks;
  const activeIndex = selectedIndexOverride ?? selectedIndex;
  const visibleRows = slotCount ?? tasks.length;

  if (tasks.length === 0) {
    return (
      <Box flexDirection="column" flexGrow={1} borderStyle="round" borderColor="white" padding={1}>
        <Box flexGrow={1} justifyContent="center" alignItems="center">
          <Text dimColor>No tasks</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" flexGrow={1} borderStyle="round" borderColor="white" padding={1}>
      <Box flexDirection="row" justifyContent="space-between" marginBottom={1}>
        <Text bold color="white">Tasks</Text>
        <Box width={12} justifyContent="flex-end">
          <Text dimColor>{pageLabel ?? " "}</Text>
        </Box>
      </Box>

      <Box flexDirection="column" flexGrow={1}>
        {Array.from({ length: visibleRows }).map((_, i) => {
          const task = tasks[i];
          if (!task) {
            return (
              <Box key={`empty-${i}`} flexDirection="column" paddingX={1} minHeight={2} />
            );
          }

          const catName = categories.find((c) => c.id === task.categoryId)?.name ?? "";
          const isSelected = i === activeIndex;

          return (
            <Box
              key={task.id}
              flexDirection="column"
              paddingX={1}
              paddingY={0}
              marginBottom={0}
            >
              <Box flexDirection="row" justifyContent="space-between">
                <Box flexDirection="row" flexGrow={1} paddingRight={1}>
                  <Text bold={isSelected} color={isSelected ? "cyan" : "white"}>
                    {isSelected ? "▶ " : "  "}
                  </Text>
                  <Text bold={isSelected} color={isSelected ? "cyan" : "white"} wrap="truncate-end">
                    {task.title}
                  </Text>
                </Box>
                <Box width={18} justifyContent="flex-end">
                  <Text color={statusColors[task.status]}>
                    [{statusLabels[task.status]}]
                  </Text>
                </Box>
              </Box>
              <Text dimColor>
                {catName} - {new Date(task.createdAt * 1000).toLocaleDateString()}
              </Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
