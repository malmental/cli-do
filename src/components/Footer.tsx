import React from "react";
import { Box, Text } from "ink";
import { useTask } from "../context/TaskContext";

export function Footer() {
  const { meta, state } = useTask();
  const { filteredTasks } = meta;

  return (
    <Box flexDirection="row" justifyContent="space-between" marginTop={1}>
      <Text color="gray">
        {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""} | {state.screen} view
      </Text>
      <Text color="gray">
        Ctrl+C to quit | H/Q/Esc: back
      </Text>
    </Box>
  );
}
