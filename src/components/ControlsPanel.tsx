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
          title="Navigate"
          color="yellow"
          items={[
            { key: "j/k/↑↓", label: "move selection" },
            { key: "Enter", label: "open selected task" },
          ]}
        />

        <ControlGroup
          title="Task Actions"
          color="green"
          items={[
            { key: "N", label: "new task" },
            { key: "E", label: "edit selected task" },
            { key: "D", label: "mark as done" },
            { key: "S", label: "mark as in progress" },
            { key: "P", label: "mark as open" },
          ]}
        />
        <Box flexDirection="column" gap={0}>
          <Text bold color="magenta">Back</Text>
          <Text color="magenta">[H/Q/Esc]</Text>
        </Box>
      </Box>
    </Box>
  );
}
