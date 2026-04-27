import { useState } from "react";
import { TextAttributes } from "@opentui/core";
import type { Category, Task, TaskInput } from "../types/Task";

interface TaskFormProps {
  categories: Category[];
  task?: Task;
  onSubmit: (input: TaskInput) => void;
  onCancel: () => void;
}

export function TaskForm({ categories, task, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const currentCategoryId = categories[selectedCategoryIndex]?.id ?? "";

  const handleSubmit = () => {
    if (!title.trim() || !currentCategoryId) return;
    onSubmit({ title: title.trim(), categoryId: currentCategoryId });
  };

  return (
    <box flexDirection="column" gap={2} padding={2}>
      <text bold>{(task ? "Editar" : "Nueva") + " Tarea"}</text>

      <box flexDirection="column" gap={1}>
        <text dim>Titulo:</text>
        <input
          value={title}
          onInput={setTitle}
          placeholder="Descripcion de la tarea..."
          onSubmit={handleSubmit}
          focused
        />
      </box>

      <box flexDirection="column" gap={1}>
        <text dim>Categoria:</text>
        <box flexDirection="row" gap={2}>
          {categories.map((cat, index) => (
            <text
              key={cat.id}
              attributes={selectedCategoryIndex === index ? TextAttributes.BOLD : TextAttributes.DIM}
              onClick={() => setSelectedCategoryIndex(index)}
            >
              [{cat.name}]
            </text>
          ))}
        </box>
      </box>

      <box flexDirection="row" gap={3} marginTop={1}>
        <text
          attributes={title.trim() ? TextAttributes.BOLD : TextAttributes.DIM}
          onClick={handleSubmit}
        >
          [Guardar]
        </text>
        <text attributes={TextAttributes.DIM} onClick={onCancel}>
          [Cancelar]
        </text>
      </box>

      <text dim small>Enter = guardar | Esc = cancelar</text>
    </box>
  );
}