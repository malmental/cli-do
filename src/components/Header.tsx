import React from "react";
import { Box, Text } from "ink";

export function Header() {
  return (
    <Box
      flexDirection="column"
      gap={0}
      marginBottom={1}
      padding={1}
      borderStyle="round"
      borderColor="cyan"
    >
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        <Text bold color="cyan">CLI-Do</Text>
      </Box>
    </Box>
  );
}
