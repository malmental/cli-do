import type { Task } from "../types/Task";
import { StatusBadge } from "./StatusBadge";
import { TextAttributes } from "@opentui/core";
import { formatTaskDays } from "../types/Task";

interface TaskDetailProps {
  task: Task;
  categoryName: string;
  onClose: () => void;
}

export function TaskDetail({ task, categoryName, onClose }: TaskDetailProps) {
  const daysText = formatTaskDays(task);
  const createdDate = new Date(task.createdAt * 1000).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const completedDate = task.completedAt
    ? new Date(task.completedAt * 1000).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <box flexDirection="column" gap={2} padding={2}>
      <text bold font-size={3}>
        {task.title}
      </text>

      <box flexDirection="row" gap={2}>
        <text dim>Categoría:</text>
        <text>{categoryName}</text>
      </box>

      <box flexDirection="row" gap={2}>
        <text dim>Estado:</text>
        <StatusBadge status={task.status} />
      </box>

      <box flexDirection="column" gap={1}>
        <text dim>Creada:</text>
        <text>{createdDate}</text>
      </box>

      {completedDate && (
        <box flexDirection="column" gap={1}>
          <text dim>Completada:</text>
          <text>{completedDate}</text>
        </box>
      )}

      {daysText && (
        <box flexDirection="row" gap={1}>
          <text dim>Duración:</text>
          <text attributes={TextAttributes.GREEN}>{daysText}</text>
        </box>
      )}

      <box marginTop={2}>
        <button onClick={onClose}>
          <text>Volver (Esc)</text>
        </button>
      </box>
    </box>
  );
}