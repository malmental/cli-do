import React from "react";
import { Box, Text } from "ink";

export function ConfirmDeleteModal({
  taskTitle,
}: {
  taskTitle: string;
}) {
  return (
    <Box
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        flexDirection="column"
        borderStyle="round"
        borderColor="red"
        padding={1}
        width={58}
        gap={1}
      >
        <Text bold color="red">Delete task?</Text>
        <Text color="white" wrap="truncate-end">{taskTitle}</Text>
        <Text dimColor>Press Y to confirm or Shift+Tab + any key to cancel.</Text>
      </Box>
    </Box>
  );
}
