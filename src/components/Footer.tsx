import React from "react";
import { Box, Text } from "ink";
import { useTask } from "../context/TaskContext";

export function Footer() {
  const { meta } = useTask();
  const { filteredTasks } = meta;

  return (
    <Box flexDirection="row" justifyContent="space-between" marginTop={1}>
      <Text dim small>
        {filteredTasks.length} tarea{filteredTasks.length !== 1 ? "s" : ""}
      </Text>
      <Text dim small>
        j/k: navegar | Enter: ver
      </Text>
    </Box>
  );
}