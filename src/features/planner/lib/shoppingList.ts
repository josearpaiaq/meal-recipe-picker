import { AISLES, type Aisle, type Recipe } from "@/features/recipes";
import type { Localized } from "@/shared/lib/format";

export type ShoppingItem = {
  key: string;
  aisle: Aisle;
  label: Localized;
  /** Quantities with the same unit are summed; the rest are kept as written. */
  quantities: string[];
};

export type ShoppingGroup = { aisle: Aisle; items: ShoppingItem[] };

type PlanLike = { slots: Record<string, string | null> };

/** Ingredients of every planned meal, merged by shopping key and grouped by aisle. */
export function buildShoppingList(plan: PlanLike, recipes: Recipe[]): ShoppingGroup[] {
  const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
  const items = new Map<string, ShoppingItem>();

  for (const recipeId of Object.values(plan.slots)) {
    const recipe = recipeId ? byId.get(recipeId) : undefined;
    if (!recipe) continue;
    for (const ingredient of recipe.ingredients) {
      const item = items.get(ingredient.shoppingKey);
      if (item) item.quantities.push(ingredient.qty);
      else
        items.set(ingredient.shoppingKey, {
          key: ingredient.shoppingKey,
          aisle: ingredient.aisle,
          label: ingredient.label,
          quantities: [ingredient.qty],
        });
    }
  }

  return AISLES.map((aisle) => ({
    aisle,
    items: [...items.values()]
      .filter((item) => item.aisle === aisle)
      .map((item) => ({ ...item, quantities: mergeQuantities(item.quantities) })),
  })).filter((group) => group.items.length > 0);
}

// "2", "1/2 cup", "1 1/2 tbsp": a leading amount, then an optional unit.
const QTY = /^(\d+(?: \d+\/\d+)?|\d+\/\d+)(?:\s+(.+))?$/;

function parseAmount(text: string): number {
  return text.split(" ").reduce((sum, part) => {
    const [n, d] = part.split("/").map(Number);
    return sum + (d ? n / d : n);
  }, 0);
}

const FRACTIONS: Array<[number, string]> = [
  [1 / 4, "1/4"],
  [1 / 3, "1/3"],
  [1 / 2, "1/2"],
  [2 / 3, "2/3"],
  [3 / 4, "3/4"],
];

function formatAmount(value: number): string {
  const whole = Math.floor(value + 1e-9);
  const rest = value - whole;
  if (rest < 1e-6) return String(whole);
  const fraction = FRACTIONS.find(([f]) => Math.abs(f - rest) < 0.01)?.[1];
  if (!fraction) return String(Math.round(value * 100) / 100);
  return whole ? `${whole} ${fraction}` : fraction;
}

/** Sums amounts that share a unit: ['1/2', '2', '1 cup', '1/2 cup'] → ['2 1/2', '1 1/2 cup']. */
export function mergeQuantities(quantities: string[]): string[] {
  // Keyed by singular unit so "1 handful" and "2 handfuls" merge; shows the plural when seen.
  const sums = new Map<string, { total: number; unit: string }>();
  const other: string[] = [];
  for (const qty of quantities) {
    const match = QTY.exec(qty.trim());
    if (!match) {
      other.push(qty);
      continue;
    }
    const unit = match[2] ?? "";
    const key = unit.replace(/s$/, "");
    const sum = sums.get(key) ?? { total: 0, unit };
    sums.set(key, {
      total: sum.total + parseAmount(match[1]),
      unit: unit.length > sum.unit.length ? unit : sum.unit,
    });
  }
  return [
    ...[...sums.values()].map(({ total, unit }) =>
      unit ? `${formatAmount(total)} ${unit}` : formatAmount(total),
    ),
    ...other,
  ];
}
