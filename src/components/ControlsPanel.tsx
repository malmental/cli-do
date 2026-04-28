import React from "react";
import { Box, Text } from "ink";

function ControlGroup({
  title,
  items,
  color,
}: {
  title: string;
  items: Array<{ key: string; label: string }>;
  color: string;
}) {
  return (
    <Box flexDirection="column" gap={0}>
      <Text bold color={color}>{title}</Text>
      {items.map((item) => (
        <Box key={item.key} flexDirection="row" gap={1}>
          <Text color={color}>[{item.key}]</Text>
          <Text color="white">{item.label}</Text>
        </Box>
      ))}
    </Box>
  );
}

export function ControlsPanel() {
  return (
    <Box
      flexDirection="column"
      flexGrow={1}
      borderStyle="round"
      borderColor="cyan"
      padding={1}
      gap={0}
    >
      <Text bold color="cyan">Controls</Text>

      <Box flexDirection="column" gap={0}>
        <ControlGroup
          title="Status"
          color="green"
          items={[
            { key: "D", label: "mark as done" },
            { key: "S", label: "mark as in progress" },
            { key: "P", label: "mark as open" },
          ]}
        />

        <ControlGroup
          title="Task"
          color="red"
          items={[
            { key: "N", label: "new task" },
            { key: "E", label: "edit selected task" },
            { key: "Ctrl+X", label: "delete selected task" },
          ]}
        />
      </Box>
    </Box>
  );
}
