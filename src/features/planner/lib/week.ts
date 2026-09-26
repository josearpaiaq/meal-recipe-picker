import type { Meal } from "@/features/recipes";

export type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Slot = { day: Day; meal: Meal };

export const DAYS: Day[] = [0, 1, 2, 3, 4, 5, 6];

export function slotKey({ day, meal }: Slot): string {
  return `${day}-${meal}`;
}

function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Local-date ISO string of the Monday that starts the week containing `date`. */
export function weekStartOf(date: Date): string {
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  return toIsoDate(monday);
}

/** Local Date for a day (0 = Monday) of the week starting at `weekStart`. */
export function dateOf(weekStart: string, day: Day): Date {
  const [y, m, d] = weekStart.split("-").map(Number);
  return new Date(y, m - 1, d + day);
}
