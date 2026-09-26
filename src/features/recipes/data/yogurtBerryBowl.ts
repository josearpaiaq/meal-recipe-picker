import type { Recipe } from "../types";

export const yogurtBerryBowl: Recipe = {
  id: "yogurt-berry-bowl",
  meals: ["breakfast"],
  timeMin: 5,
  effort: "nocook",
  servings: 1,
  plate: { veg: false, protein: true, grain: false, fat: true },
  tint: "berry",
  image: "/recipes/yogurt-berry-bowl.jpg",
  imageCredit: {
    author: "Peter Hershey",
    license: "CC0",
    url: "https://commons.wikimedia.org/wiki/File:Lancaster,_United_States_(Unsplash).jpg",
  },
  name: {
    en: "Greek yogurt, berries, walnuts & honey",
    es: "Yogur griego con frutos rojos, nueces y miel",
  },
  flavorNote: {
    en: "Lemon zest wakes up the yogurt, and a pinch of flaky salt on the honey makes it taste like dessert.",
    es: "La ralladura de limón despierta el yogur, y una pizca de sal en escamas sobre la miel hace que sepa a postre.",
  },
  ingredients: [
    {
      id: "yogurt",
      qty: "3/4 cup",
      label: { en: "plain Greek yogurt", es: "yogur griego natural" },
      shoppingKey: "greek-yogurt",
      aisle: "dairy",
    },
    {
      id: "lemon",
      qty: "1/2",
      label: { en: "lemon, for zest", es: "limón amarillo, para rallar" },
      shoppingKey: "lemons",
      aisle: "produce",
    },
    {
      id: "berries",
      qty: "1 cup",
      label: { en: "mixed berries", es: "frutos rojos mixtos" },
      shoppingKey: "berries",
      aisle: "produce",
    },
    {
      id: "walnuts",
      qty: "2 tbsp",
      label: { en: "walnuts", es: "nueces" },
      shoppingKey: "walnuts",
      aisle: "pantry",
    },
    {
      id: "honey",
      qty: "1 tsp",
      label: { en: "honey", es: "miel" },
      shoppingKey: "honey",
      aisle: "pantry",
    },
    {
      id: "salt",
      qty: "1 pinch",
      label: { en: "flaky salt", es: "sal en escamas" },
      shoppingKey: "flaky-salt",
      aisle: "pantry",
    },
  ],
  steps: [
    {
      text: {
        en: "Spoon the yogurt into a bowl and grate the lemon zest over it.",
        es: "Sirve el yogur en un bowl y ralla encima la cáscara del limón.",
      },
      uses: ["yogurt", "lemon"],
    },
    {
      text: {
        en: "Top with the berries and the roughly chopped walnuts.",
        es: "Agrega los frutos rojos y las nueces picadas en trozos grandes.",
      },
      uses: ["berries", "walnuts"],
    },
    {
      text: {
        en: "Drizzle with honey and finish with a pinch of flaky salt.",
        es: "Rocía con miel y termina con una pizca de sal en escamas.",
      },
      uses: ["honey", "salt"],
    },
  ],
};
