import { TextAttributes } from "@opentui/core";
import type { Task, Category } from "../types/Task";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  categories: Category[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
}

export function TaskList({ tasks, categories, selectedIndex, onSelectIndex }: TaskListProps) {
  const getCategoryName = (categoryId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat?.name ?? "Sin categoría";
  };

  if (tasks.length === 0) {
    return (
      <box justifyContent="center" alignItems="center" flexGrow={1}>
        <text attributes={TextAttributes.DIM}>No hay tareas</text>
      </box>
    );
  }

  return (
    <scrollbox flexGrow={1}>
      <box flexDirection="column" gap={1}>
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            isSelected={index === selectedIndex}
            categoryName={getCategoryName(task.categoryId)}
          />
        ))}
      </box>
    </scrollbox>
  );
}