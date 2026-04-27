import type { Task } from "../types/Task";
import { TextAttributes } from "@opentui/core";
import { StatusBadge } from "./StatusBadge";
import { formatTaskDays } from "../types/Task";

interface TaskItemProps {
  task: Task;
  isSelected: boolean;
  categoryName: string;
}

export function TaskItem({ task, isSelected, categoryName }: TaskItemProps) {
  const daysText = formatTaskDays(task);

  return (
    <box
      style={{
        border: isSelected,
        padding: 1,
        flexDirection: "row",
        gap: 2,
        backgroundColor: isSelected ? 0x555555 : undefined,
      }}
    >
      <box flexDirection="column" flexGrow={1}>
        <text attributes={isSelected ? TextAttributes.BOLD : undefined}>{task.title}</text>
        <text attributes={TextAttributes.DIM}>
          {categoryName} • {new Date(task.createdAt * 1000).toLocaleDateString()}
          {daysText ? ` • ${daysText}` : ""}
        </text>
      </box>
      <StatusBadge status={task.status} />
    </box>
  );
}