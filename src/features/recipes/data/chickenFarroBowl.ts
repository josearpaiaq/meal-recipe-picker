import type { Recipe } from "../types";

export const chickenFarroBowl: Recipe = {
  id: "chicken-farro-bowl",
  meals: ["lunch"],
  timeMin: 30,
  effort: "medium",
  servings: 2,
  plate: { veg: true, protein: true, grain: true, fat: true },
  tint: "sage",
  image: "/recipes/chicken-farro-bowl.jpg",
  imageCredit: {
    author: "PizzaMan",
    license: "CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/File:BuddhaBowlLot.jpg",
  },
  name: {
    en: "Chicken & farro bowl with lemon-tahini",
    es: "Bowl de pollo y farro con salsa de limón y tahini",
  },
  flavorNote: {
    en: "Charred vegetables bring sweetness, and the lemon-tahini sauce ties everything together with acid and richness.",
    es: "Las verduras doradas aportan dulzor y la salsa de limón y tahini lo une todo con acidez y cremosidad.",
  },
  ingredients: [
    {
      id: "farro",
      qty: "1/2 cup",
      label: { en: "quick-cooking farro", es: "farro de cocción rápida" },
      shoppingKey: "farro",
      aisle: "pantry",
    },
    {
      id: "chicken",
      qty: "2",
      label: { en: "boneless chicken thighs", es: "muslos de pollo sin hueso" },
      shoppingKey: "chicken-thighs",
      aisle: "protein",
    },
    {
      id: "oil",
      qty: "2 tbsp",
      label: { en: "olive oil", es: "aceite de oliva" },
      shoppingKey: "olive-oil",
      aisle: "pantry",
    },
    {
      id: "zucchini",
      qty: "1",
      label: { en: "zucchini, sliced", es: "calabacín, en rodajas" },
      shoppingKey: "zucchini",
      aisle: "produce",
    },
    {
      id: "pepper",
      qty: "1",
      label: { en: "red bell pepper, sliced", es: "pimiento rojo, en tiras" },
      shoppingKey: "red-bell-pepper",
      aisle: "produce",
    },
    {
      id: "tahini",
      qty: "2 tbsp",
      label: { en: "tahini", es: "tahini" },
      shoppingKey: "tahini",
      aisle: "pantry",
    },
    {
      id: "lemon",
      qty: "1",
      label: { en: "lemon", es: "limón amarillo" },
      shoppingKey: "lemons",
      aisle: "produce",
    },
    {
      id: "garlic",
      qty: "1 small",
      label: { en: "garlic clove", es: "diente de ajo" },
      shoppingKey: "garlic",
      aisle: "produce",
    },
  ],
  steps: [
    {
      text: {
        en: "Cook the farro in salted boiling water until tender, then drain.",
        es: "Cocina el farro en agua hirviendo con sal hasta que esté tierno y escúrrelo.",
      },
      uses: ["farro"],
      timer: { durationSec: 600, label: { en: "Farro", es: "Farro" } },
    },
    {
      text: {
        en: "Season the chicken with salt and pepper. Cook it in 1 tbsp oil in a hot skillet, turning once, until cooked through.",
        es: "Sazona el pollo con sal y pimienta. Cocínalo en 1 cda de aceite en una sartén caliente, volteándolo una vez, hasta que esté bien cocido.",
      },
      uses: ["chicken", "oil"],
      timer: { durationSec: 720, label: { en: "Chicken", es: "Pollo" } },
    },
    {
      text: {
        en: "Move the chicken to a board to rest. In the same pan, char the zucchini and pepper in the rest of the oil.",
        es: "Pasa el pollo a una tabla para que repose. En la misma sartén, dora el calabacín y el pimiento con el resto del aceite.",
      },
      uses: ["zucchini", "pepper", "oil"],
      timer: { durationSec: 360, label: { en: "Vegetables", es: "Verduras" } },
    },
    {
      text: {
        en: "Whisk the tahini, lemon juice, grated garlic and 2–3 tbsp water into a pourable sauce.",
        es: "Bate el tahini, el jugo de limón, el ajo rallado y 2 o 3 cdas de agua hasta obtener una salsa fluida.",
      },
      uses: ["tahini", "lemon", "garlic"],
    },
    {
      text: {
        en: "Slice the chicken. Build bowls with farro, vegetables and chicken, and spoon the sauce over.",
        es: "Corta el pollo en tiras. Arma los bowls con farro, verduras y pollo, y báñalos con la salsa.",
      },
      uses: ["chicken", "farro"],
    },
  ],
};
