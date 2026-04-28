import React from "react";
import { Box, Text } from "ink";
import { useTask, statusOptions, statusColors } from "../context/TaskContext";

export function TaskFormScreen() {
  const { state, actions } = useTask();
  const { screen, title, categories, selectedCategoryIndex, selectedStatusIndex } = state;
  const isEdit = screen === "edit";

  return (
    <Box flexDirection="column" gap={2} padding={2} borderStyle="round" borderColor="cyan">
      <Text bold>{isEdit ? "Edit Task" : "New Task"}</Text>

      <Box flexDirection="column" gap={1}>
        <Text color="gray">Title:</Text>
        <Box>
          <Text bold color="cyan">&gt; </Text>
          <Text>{title}</Text>
          <Text>▋</Text>
        </Box>
      </Box>

      <Box flexDirection="row" gap={2}>
        {categories.map((cat, i) => (
          <Text
            key={cat.id}
            bold={selectedCategoryIndex === i}
            dimColor={selectedCategoryIndex !== i}
          >
            [{cat.name}]
          </Text>
        ))}
      </Box>

      <Box flexDirection="row" gap={1}>
        <Text color="gray">Status:</Text>
        {statusOptions.map((opt, i) => (
          <Text
            key={opt.value}
            bold={selectedStatusIndex === i}
            dimColor={selectedStatusIndex !== i}
            color={statusColors[opt.value]}
          >
            [{opt.label}]
          </Text>
        ))}
      </Box>

      <Text>
        {"Enter = save | "}
        <Text color="magenta">Shift+Tab + any key = back</Text>
        {" | "}
        <Text color="cyan">←→ = category</Text>
        {" | "}
        <Text color="green">↑↓ = status</Text>
        {isEdit ? " | " : ""}
        {isEdit ? <Text color="red">X = delete</Text> : null}
      </Text>
    </Box>
  );
}
