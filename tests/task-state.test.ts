import { describe, expect, test } from "bun:test";
import { initialTaskState, taskReducer, type TaskLoadSnapshot } from "../src/context/task-state";

describe("task reducer", () => {
  test("resets the form back to a clean list state", () => {
    const state = {
      ...initialTaskState,
      screen: "edit" as const,
      selectedIndex: 3,
      editingTaskId: "task-1",
      deleteConfirmationTaskId: "task-1",
      title: "Draft",
      selectedCategoryIndex: 1,
      selectedStatusIndex: 2,
    };

    const next = taskReducer(state, { type: "resetForm" });

    expect(next.screen).toBe("list");
    expect(next.selectedIndex).toBe(0);
    expect(next.editingTaskId).toBeNull();
    expect(next.deleteConfirmationTaskId).toBeNull();
    expect(next.title).toBe("");
    expect(next.selectedCategoryIndex).toBe(0);
    expect(next.selectedStatusIndex).toBe(0);
  });

  test("clamps selection when loading a smaller snapshot", () => {
    const snapshot: TaskLoadSnapshot = {
      tasks: [
        {
          id: "task-1",
          title: "A",
          status: "pending",
          categoryId: "personal",
          createdAt: 1,
          completedAt: null,
        },
      ],
      categories: [
        {
          id: "personal",
          name: "Personal",
          createdAt: 1,
        },
      ],
    };

    const state = {
      ...initialTaskState,
      selectedIndex: 5,
    };

    const next = taskReducer(state, { type: "loadSnapshot", snapshot });

    expect(next.tasks).toHaveLength(1);
    expect(next.categories).toHaveLength(1);
    expect(next.selectedIndex).toBe(0);
  });
});
