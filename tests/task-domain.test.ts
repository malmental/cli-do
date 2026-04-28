import { describe, expect, test } from "bun:test";
import { formatTaskDays, getDaysTaken, type Task } from "../src/types/Task";

const baseTask: Task = {
  id: "task-1",
  title: "Write tests",
  status: "completed",
  categoryId: "work",
  createdAt: 1_700_000_000,
  completedAt: 1_700_000_000,
};

describe("task domain helpers", () => {
  test("returns null for incomplete tasks", () => {
    expect(getDaysTaken({ ...baseTask, completedAt: null })).toBeNull();
    expect(formatTaskDays({ ...baseTask, completedAt: null })).toBe("");
  });

  test("formats durations using Unix-second timestamps", () => {
    expect(getDaysTaken({ ...baseTask, completedAt: baseTask.createdAt + 86400 })).toBe(1);
    expect(formatTaskDays({ ...baseTask, completedAt: baseTask.createdAt + 86400 })).toBe("1 day");
    expect(formatTaskDays({ ...baseTask, completedAt: baseTask.createdAt + 86400 * 2 })).toBe("2 days");
  });
});
