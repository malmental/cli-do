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
      <Box flexDirection="row" gap={1} marginTop={1}>
        <Text dim small>[N: nueva]</Text>
        <Text dim small>[E: editar]</Text>
        <Text dim small>[D: hacer]</Text>
        <Text dim small>[S: proceso]</Text>
        <Text dim small>[P: pendiente]</Text>
        <Text dim small>[X: borrar]</Text>
      </Box>
    </Box>
  );
}