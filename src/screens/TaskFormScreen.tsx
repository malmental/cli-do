import React from "react";
import { Box, Text } from "ink";
import { useTask, statusOptions, statusColors } from "../context/TaskContext";

export function TaskFormScreen() {
  const { state, actions } = useTask();
  const { screen, title, categories, selectedCategoryIndex, selectedStatusIndex } = state;
  const isEdit = screen === "edit";

  return (
    <Box flexDirection="column" gap={2} padding={2} borderStyle="round" borderColor="cyan">
      <Text bold>{isEdit ? "Editar Tarea" : "Nueva Tarea"}</Text>

      <Box flexDirection="column" gap={1}>
        <Text dim>Titulo:</Text>
        <Box>
          <Text bold color="cyan">&gt; </Text>
          <Text>{title}</Text>
          <Text blink>{"|"}</Text>
        </Box>
      </Box>

      <Box flexDirection="row" gap={2}>
        {categories.map((cat, i) => (
          <Text
            key={cat.id}
            bold={selectedCategoryIndex === i}
            dim={selectedCategoryIndex !== i}
          >
            [{cat.name}]
          </Text>
        ))}
      </Box>

      <Box flexDirection="row" gap={1}>
        <Text dim>Estado:</Text>
        {statusOptions.map((opt, i) => (
          <Text
            key={opt.value}
            bold={selectedStatusIndex === i}
            dim={selectedStatusIndex !== i}
            color={statusColors[opt.value]}
          >
            [{opt.label}]
          </Text>
        ))}
      </Box>

      <Text dim small>
        Enter = guardar | Esc = cancelar | ←→ = categoria | ↑↓ = estado
      </Text>
    </Box>
  );
}