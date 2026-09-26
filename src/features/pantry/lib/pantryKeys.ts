export type KnownIngredient = { key: string; label: string };

type IngredientLike = { shoppingKey: string; label: string };

/** Unique ingredients by shopping key, sorted by label. */
export function knownIngredients(ingredients: IngredientLike[]): KnownIngredient[] {
  const byKey = new Map<string, string>();
  for (const { shoppingKey, label } of ingredients) {
    if (!byKey.has(shoppingKey)) byKey.set(shoppingKey, label);
  }
  return [...byKey]
    .map(([key, label]) => ({ key, label }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function toKey(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Match typed text to a known ingredient label or key; otherwise normalize it into a key. */
export function resolvePantryKey(input: string, known: KnownIngredient[]): string {
  const key = toKey(input);
  const match = known.find((item) => toKey(item.label) === key || item.key === key);
  return match ? match.key : key;
}
