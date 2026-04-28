import React from "react";
import { Box, Text } from "ink";
import { useTask } from "../context/TaskContext";

export function Footer() {
  const { meta, state } = useTask();
  const { filteredTasks } = meta;
  const isDashboard = state.screen === "list";

  return (
    <Box flexDirection="row" justifyContent="space-between" marginTop={1}>
      <Text color="gray">
        {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""} | {state.screen} view
      </Text>
      <Text color="gray">
        {isDashboard ? "Ctrl+C to quit" : "Shift+Tab + any key: back"}
      </Text>
    </Box>
  );
}
