import type { Category, Task } from "../types/Task";

// UI state and reducer for the task workflow. Keeps screen state and form state separate from persistence.
export type Screen = "list" | "create" | "edit" | "detail";

export interface TaskState {
  tasks: Task[];
  categories: Category[];
  screen: Screen;
  selectedIndex: number;
  editingTaskId: string | null;
  deleteConfirmationTaskId: string | null;
  title: string;
  selectedCategoryIndex: number;
  selectedStatusIndex: number;
  categoryModalCategoryIndex: number;
}

export interface TaskLoadSnapshot {
  tasks: Task[];
  categories: Category[];
}

export type TaskAction =
  | { type: "setScreen"; screen: Screen }
  | { type: "setTitle"; title: string }
  | { type: "setSelectedCategoryIndex"; index: number }
  | { type: "setSelectedStatusIndex"; index: number }
  | { type: "setSelectedIndex"; index: number }
  | { type: "setEditingTaskId"; id: string | null }
  | { type: "setDeleteConfirmationTaskId"; id: string | null }
  | { type: "setCategoryModalCategoryIndex"; index: number }
  | { type: "resetForm" }
  | { type: "loadSnapshot"; snapshot: TaskLoadSnapshot };

export const initialTaskState: TaskState = {
  tasks: [],
  categories: [],
  screen: "list",
  selectedIndex: 0,
  editingTaskId: null,
  deleteConfirmationTaskId: null,
  title: "",
  selectedCategoryIndex: 0,
  selectedStatusIndex: 0,
  categoryModalCategoryIndex: -1,
};

function clampSelectedIndex(tasks: Task[], selectedIndex: number): number {
  if (tasks.length === 0) return 0;
  return Math.max(0, Math.min(selectedIndex, tasks.length - 1));
}

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "setScreen":
      return { ...state, screen: action.screen };
    case "setTitle":
      return { ...state, title: action.title };
    case "setSelectedCategoryIndex":
      return { ...state, selectedCategoryIndex: action.index };
    case "setSelectedStatusIndex":
      return { ...state, selectedStatusIndex: action.index };
    case "setSelectedIndex":
      return { ...state, selectedIndex: action.index };
    case "setEditingTaskId":
      return { ...state, editingTaskId: action.id };
    case "setDeleteConfirmationTaskId":
      return { ...state, deleteConfirmationTaskId: action.id };
    case "setCategoryModalCategoryIndex":
      return { ...state, categoryModalCategoryIndex: action.index };
    case "resetForm":
      return {
        ...state,
        screen: "list",
        selectedIndex: 0,
        editingTaskId: null,
        deleteConfirmationTaskId: null,
        title: "",
        selectedCategoryIndex: 0,
        selectedStatusIndex: 0,
        categoryModalCategoryIndex: -1,
      };
    case "loadSnapshot":
      return {
        ...state,
        tasks: action.snapshot.tasks,
        categories: action.snapshot.categories,
        selectedIndex: clampSelectedIndex(action.snapshot.tasks, state.selectedIndex),
      };
    default:
      return state;
  }
}
