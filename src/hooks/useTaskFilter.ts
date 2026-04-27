import { useState, useCallback, useMemo } from "react";
import type { Task, Category } from "../types/Task";

export type FilterCategory = "all" | string;

export function useTaskFilter(tasks: Task[], categories: Category[]) {
  const [filter, setFilter] = useState<FilterCategory>("all");

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter((t) => t.categoryId === filter);
  }, [tasks, filter]);

  const selectCategory = useCallback((categoryId: FilterCategory) => {
    setFilter(categoryId);
  }, []);

  const nextCategory = useCallback(() => {
    const catIds = ["all", ...categories.map((c) => c.id)];
    const currentIdx = catIds.indexOf(filter);
    const nextIdx = (currentIdx + 1) % catIds.length;
    setFilter(catIds[nextIdx]);
  }, [filter, categories]);

  const prevCategory = useCallback(() => {
    const catIds = ["all", ...categories.map((c) => c.id)];
    const currentIdx = catIds.indexOf(filter);
    const prevIdx = currentIdx === 0 ? catIds.length - 1 : currentIdx - 1;
    setFilter(catIds[prevIdx]);
  }, [filter, categories]);

  return {
    filter,
    filteredTasks,
    selectCategory,
    nextCategory,
    prevCategory,
  };
}