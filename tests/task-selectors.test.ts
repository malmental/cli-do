import { describe, expect, test } from "bun:test";
import { selectSelectedTask, selectTaskWindow } from "../src/application/task/task-selectors";
import type { Task } from "../src/types/Task";

const tasks: Task[] = [
  {
    id: "t1",
    title: "First",
    status: "pending",
    categoryId: "personal",
    createdAt: 1,
    completedAt: null,
  },
  {
    id: "t2",
    title: "Second",
    status: "in_progress",
    categoryId: "work",
    createdAt: 2,
    completedAt: null,
  },
  {
    id: "t3",
    title: "Third",
    status: "completed",
    categoryId: "work",
    createdAt: 3,
    completedAt: 4,
  },
  {
    id: "t4",
    title: "Fourth",
    status: "pending",
    categoryId: "work",
    createdAt: 4,
    completedAt: null,
  },
  {
    id: "t5",
    title: "Fifth",
    status: "pending",
    categoryId: "work",
    createdAt: 5,
    completedAt: null,
  },
];

describe("task selectors", () => {
  test("selects the current task by index", () => {
    expect(selectSelectedTask(tasks, 2)?.id).toBe("t3");
    expect(selectSelectedTask(tasks, 99)).toBeNull();
  });

  test("paginates a fixed task window", () => {
    const result = selectTaskWindow(tasks, 4, 24);

    expect(result.heroHeight).toBe(5);
    expect(result.contentRows).toBe(11);
    expect(result.visibleCount).toBe(3);
    expect(result.visibleTasks.map((task) => task.id)).toEqual(["t4", "t5"]);
    expect(result.relativeSelectedIndex).toBe(1);
    expect(result.pageLabel).toBe("Page 2/2");
  });
});
