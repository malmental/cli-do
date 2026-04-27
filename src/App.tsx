import React, { useState, useCallback, useEffect } from "react";
import { Box, Text, useInput } from "ink";
import { getDatabase } from "./db/database";
import type { Task, Category, TaskStatus } from "./types/Task";

type Screen = "list" | "create" | "edit" | "detail";

const statusColors: Record<TaskStatus, string> = {
  pending: "yellow",
  in_progress: "cyan",
  completed: "green",
};

const statusLabels: Record<TaskStatus, string> = {
  pending: "Pendiente",
  in_progress: "En Proceso",
  completed: "Completada",
};

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [screen, setScreen] = useState<Screen>("list");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const loadData = useCallback(() => {
    try {
      const db = getDatabase();
      const cats = db
        .query<{ id: string; name: string; created_at: number }>(
          "SELECT * FROM categories ORDER BY name"
        )
        .all();
      const tks = db
        .query<{
          id: string;
          title: string;
          status: TaskStatus;
          category_id: string;
          created_at: number;
          completed_at: number | null;
        }>("SELECT * FROM tasks ORDER BY created_at DESC")
        .all();

      setCategories(
        cats.map((r) => ({ id: r.id, name: r.name, createdAt: r.created_at }))
      );
      setTasks(
        tks.map((r) => ({
          id: r.id,
          title: r.title,
          status: r.status,
          categoryId: r.category_id,
          createdAt: r.created_at,
          completedAt: r.completed_at,
        }))
      );
    } catch {
      // DB not ready yet
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredTasks =
    filterCategory === "all"
      ? tasks
      : tasks.filter((t) => t.categoryId === filterCategory);
  const selectedTask = filteredTasks[selectedIndex] ?? null;

  useEffect(() => {
    setSelectedIndex(0);
  }, [filterCategory]);

  useInput((input, key) => {
    if (screen === "detail" || screen === "create" || screen === "edit") {
      if (key.escape) {
        setScreen("list");
        setTitle("");
        setEditingTaskId(null);
      }
      return;
    }

    if (input === "n") {
      setScreen("create");
      setTitle("");
      setSelectedCategoryIndex(0);
      return;
    }

    if (key.downArrow || input === "j") {
      setSelectedIndex((prev) =>
        Math.min(prev + 1, filteredTasks.length - 1)
      );
      return;
    }

    if (key.upArrow || input === "k") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
      return;
    }

    if (key.return && selectedTask) {
      setScreen("detail");
      return;
    }

    if (input === "e" && selectedTask) {
      setEditingTaskId(selectedTask.id);
      setTitle(selectedTask.title);
      const catIdx = categories.findIndex((c) => c.id === selectedTask.categoryId);
      setSelectedCategoryIndex(catIdx >= 0 ? catIdx : 0);
      setScreen("edit");
      return;
    }

    if (input === "d" && selectedTask && selectedTask.status !== "completed") {
      const db = getDatabase();
      const now = Math.floor(Date.now() / 1000);
      db.query(
        "UPDATE tasks SET status = 'completed', completed_at = ? WHERE id = ?"
      ).run(now, selectedTask.id);
      setTasks((prev) =>
        prev.map((t) =>
          t.id === selectedTask.id
            ? { ...t, status: "completed", completedAt: now }
            : t
        )
      );
      return;
    }

    if (input === "s" && selectedTask && selectedTask.status !== "in_progress") {
      const db = getDatabase();
      db.query(
        "UPDATE tasks SET status = 'in_progress', completed_at = NULL WHERE id = ?"
      ).run(selectedTask.id);
      setTasks((prev) =>
        prev.map((t) =>
          t.id === selectedTask.id ? { ...t, status: "in_progress", completedAt: null } : t
        )
      );
      return;
    }

    if (input === "p" && selectedTask && selectedTask.status !== "pending") {
      const db = getDatabase();
      db.query(
        "UPDATE tasks SET status = 'pending', completed_at = NULL WHERE id = ?"
      ).run(selectedTask.id);
      setTasks((prev) =>
        prev.map((t) =>
          t.id === selectedTask.id ? { ...t, status: "pending", completedAt: null } : t
        )
      );
      return;
    }

    if (input === "x" && selectedTask) {
      const db = getDatabase();
      db.query("DELETE FROM tasks WHERE id = ?").run(selectedTask.id);
      setTasks((prev) => prev.filter((t) => t.id !== selectedTask.id));
      return;
    }

    if (input === "1") {
      setFilterCategory("all");
      return;
    }
    if (input === "2" && categories[0]) {
      setFilterCategory(categories[0].id);
      return;
    }
    if (input === "3" && categories[1]) {
      setFilterCategory(categories[1].id);
      return;
    }
  });

  const handleSubmit = useCallback(() => {
    if (!title.trim()) return;
    const catId = categories[selectedCategoryIndex]?.id;
    if (!catId) return;

    if (screen === "create") {
      const db = getDatabase();
      const id = crypto.randomUUID();
      const now = Math.floor(Date.now() / 1000);
      db.query(
        "INSERT INTO tasks (id, title, status, category_id, created_at) VALUES (?, ?, 'pending', ?, ?)"
      ).run(id, title.trim(), catId, now);
      setTasks((prev) => [
        {
          id,
          title: title.trim(),
          status: "pending" as const,
          categoryId: catId,
          createdAt: now,
          completedAt: null,
        },
        ...prev,
      ]);
      setScreen("list");
      setTitle("");
    } else if (screen === "edit" && editingTaskId) {
      const db = getDatabase();
      db.query(
        "UPDATE tasks SET title = ?, category_id = ? WHERE id = ?"
      ).run(title.trim(), catId, editingTaskId);
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTaskId ? { ...t, title: title.trim(), categoryId: catId } : t
        )
      );
      setScreen("list");
      setTitle("");
      setEditingTaskId(null);
    }
  }, [screen, title, categories, selectedCategoryIndex, editingTaskId]);

  if (screen === "create" || screen === "edit") {
    return (
      <Box flexDirection="column" gap={2} padding={2}>
        <Text bold>
          {screen === "create" ? "Nueva Tarea" : "Editar Tarea"}
        </Text>
        <Box flexDirection="column" gap={1}>
          <Text dim>Titulo:</Text>
          <Text>{"> "}{title || "..."}</Text>
        </Box>
        <Box flexDirection="row" gap={2}>
          {categories.map((cat, i) => (
            <Text
              key={cat.id}
              bold={selectedCategoryIndex === i}
              dim={selectedCategoryIndex !== i}
            >
              [{cat.name}]
            </Text>
          ))}
        </Box>
        <Box flexDirection="row" gap={3} marginTop={1}>
          <Text
            bold={title.trim().length > 0}
            dim={title.trim().length === 0}
            onClick={handleSubmit}
          >
            [Guardar]
          </Text>
          <Text
            dim
            onClick={() => {
              setScreen("list");
              setTitle("");
              setEditingTaskId(null);
            }}
          >
            [Cancelar]
          </Text>
        </Box>
        <Text dim small>
          Enter = guardar | Esc = cancelar
        </Text>
      </Box>
    );
  }

  if (screen === "detail" && selectedTask) {
    const catName =
      categories.find((c) => c.id === selectedTask.categoryId)?.name ?? "";
    const createdDate = new Date(selectedTask.createdAt * 1000).toLocaleDateString(
      "es-ES"
    );
    const daysText =
      selectedTask.completedAt && selectedTask.createdAt
        ? ` (${Math.floor(
            (selectedTask.completedAt - selectedTask.createdAt) / 86400
          )} dias)`
        : "";

    return (
      <Box flexDirection="column" gap={2} padding={2}>
        <Text bold>
          {selectedTask.title}
        </Text>
        <Box gap={1}>
          <Text dim>Categoria:</Text>
          <Text>{catName}</Text>
        </Box>
        <Box gap={1}>
          <Text dim>Estado:</Text>
          <Text color={statusColors[selectedTask.status]}>
            [{statusLabels[selectedTask.status]}]
          </Text>
        </Box>
        <Text dim>Creada: {createdDate}</Text>
        {selectedTask.completedAt && (
          <Text color="green">
            Completada{daysText}
          </Text>
        )}
        <Text dim marginTop={1}>
          Esc = volver
        </Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" flexGrow={1} padding={1}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={1}
      >
        <Text bold color="cyan">
          CLI-Do
        </Text>
        <Box flexDirection="row" gap={2}>
          <Text dim small>
            N: nueva
          </Text>
          <Text dim small>
            Enter: ver
          </Text>
          <Text dim small>
            E: editar
          </Text>
          <Text dim small>
            X: borrar
          </Text>
        </Box>
      </Box>

      <Box flexDirection="row" gap={1} marginBottom={1}>
        <Text
          bold={filterCategory === "all"}
          dim={filterCategory !== "all"}
        >
          [Todas]
        </Text>
        {categories.map((cat) => (
          <Text
            key={cat.id}
            bold={filterCategory === cat.id}
            dim={filterCategory !== cat.id}
          >
            [{cat.name}]
          </Text>
        ))}
      </Box>

      <Box flexGrow={1}>
        {filteredTasks.length === 0 ? (
          <Box justifyContent="center" alignItems="center" flexGrow={1}>
            <Text dim>No hay tareas</Text>
          </Box>
        ) : (
          filteredTasks.map((task, i) => {
            const catName =
              categories.find((c) => c.id === task.categoryId)?.name ?? "";
            const isSelected = i === selectedIndex;
            return (
              <Box
                key={task.id}
                flexDirection="row"
                gap={2}
                padding={1}
                borderStyle={isSelected ? "bold" : undefined}
              >
                <Box flexDirection="column" flexGrow={1}>
                  <Text bold={isSelected}>{task.title}</Text>
                  <Text dim>
                    {catName} - {new Date(task.createdAt * 1000).toLocaleDateString()}
                  </Text>
                </Box>
                <Text color={statusColors[task.status]}>
                  [{statusLabels[task.status]}]
                </Text>
              </Box>
            );
          })
        )}
      </Box>

      <Box flexDirection="row" justifyContent="space-between" marginTop={1}>
        <Text dim small>
          {filteredTasks.length} tarea{filteredTasks.length !== 1 ? "s" : ""}
        </Text>
        <Text dim small>
          j/k: navegar | 1-3: filtrar
        </Text>
      </Box>
    </Box>
  );
}