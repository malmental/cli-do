import type { Screen } from "../types/Task";

export { type Screen } from "../types/Task";

export const SCREENS = ["list", "create", "edit", "detail"] as const;
export type ScreenId = (typeof SCREENS)[number];

export function isValidScreen(screen: string): screen is Screen {
  return SCREENS.includes(screen as Screen);
}

export function assertNever(screen: never): never {
  throw new Error(`Invalid screen: ${screen}`);
}
