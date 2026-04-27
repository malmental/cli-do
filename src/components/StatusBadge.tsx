import type { TaskStatus } from "../types/Task";
import { TextAttributes } from "@opentui/core";

interface StatusBadgeProps {
  status: TaskStatus;
}

const statusConfig: Record<TaskStatus, { label: string; color: TextAttributes }> = {
  pending: { label: "Pendiente", color: TextAttributes.YELLOW },
  in_progress: { label: "En Proceso", color: TextAttributes.CYAN },
  completed: { label: "Completada", color: TextAttributes.GREEN },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <text attributes={config.color}>
      [{config.label}]
    </text>
  );
}