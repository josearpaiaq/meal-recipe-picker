import type { Recipe } from "../types";

export const sheetPanChicken: Recipe = {
  id: "sheet-pan-chicken",
  meals: ["dinner"],
  timeMin: 40,
  effort: "easy",
  servings: 2,
  plate: { veg: true, protein: true, grain: false, fat: true },
  tint: "paprika",
  image: "/recipes/sheet-pan-chicken.jpg",
  imageCredit: {
    author: "HaJunkiyada",
    license: "CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Liat_Portal_for_Foodie_Disorder_-_Grilled_Chicken_with_Roasted_Vegetables.jpg",
  },
  name: {
    en: "Sheet-pan paprika chicken with sweet potato",
    es: "Pollo al pimentón en bandeja con batata",
  },
  flavorNote: {
    en: "High heat browns everything on one pan, and a cold lemon-yogurt sauce balances the smoky paprika.",
    es: "El horno bien caliente dora todo en una sola bandeja, y una salsa fría de yogur y limón equilibra el pimentón ahumado.",
  },
  ingredients: [
    {
      id: "sweet-potato",
      qty: "1 large",
      label: { en: "sweet potato, in wedges", es: "batata, en gajos" },
      shoppingKey: "sweet-potato",
      aisle: "produce",
    },
    {
      id: "onion",
      qty: "1",
      label: { en: "red onion, in wedges", es: "cebolla morada, en gajos" },
      shoppingKey: "red-onion",
      aisle: "produce",
    },
    {
      id: "oil",
      qty: "2 tbsp",
      label: { en: "olive oil", es: "aceite de oliva" },
      shoppingKey: "olive-oil",
      aisle: "pantry",
    },
    {
      id: "chicken",
      qty: "4",
      label: { en: "boneless chicken thighs", es: "muslos de pollo sin hueso" },
      shoppingKey: "chicken-thighs",
      aisle: "protein",
    },
    {
      id: "paprika",
      qty: "1 tsp",
      label: { en: "smoked paprika", es: "pimentón ahumado" },
      shoppingKey: "smoked-paprika",
      aisle: "pantry",
    },
    {
      id: "garlic-powder",
      qty: "1 tsp",
      label: { en: "garlic powder", es: "ajo en polvo" },
      shoppingKey: "garlic-powder",
      aisle: "pantry",
    },
    {
      id: "broccoli",
      qty: "1 head",
      label: { en: "broccoli, in florets", es: "brócoli, en arbolitos" },
      shoppingKey: "broccoli",
      aisle: "produce",
    },
    {
      id: "yogurt",
      qty: "1/2 cup",
      label: { en: "plain Greek yogurt", es: "yogur griego natural" },
      shoppingKey: "greek-yogurt",
      aisle: "dairy",
    },
    {
      id: "lemon",
      qty: "1/2",
      label: { en: "lemon", es: "limón amarillo" },
      shoppingKey: "lemons",
      aisle: "produce",
    },
  ],
  steps: [
    {
      text: {
        en: "Heat the oven to 425°F (220°C). Toss the sweet potato and onion with half the oil and a pinch of salt, and start roasting them.",
        es: "Calienta el horno a 220 °C (425 °F). Mezcla la batata y la cebolla con la mitad del aceite y una pizca de sal, y empieza a hornearlas.",
      },
      uses: ["sweet-potato", "onion", "oil"],
      timer: { durationSec: 600, label: { en: "Sweet potato", es: "Batata" } },
    },
    {
      text: {
        en: "Rub the chicken with the rest of the oil, the paprika, garlic powder and salt. Add it to the pan with the broccoli.",
        es: "Unta el pollo con el resto del aceite, el pimentón, el ajo en polvo y sal. Agrégalo a la bandeja junto con el brócoli.",
      },
      uses: ["chicken", "oil", "paprika", "garlic-powder", "broccoli"],
    },
    {
      text: {
        en: "Roast until the chicken is cooked through (165°F / 74°C inside) and the edges are browned.",
        es: "Hornea hasta que el pollo esté bien cocido (74 °C / 165 °F por dentro) y los bordes estén dorados.",
      },
      uses: ["chicken"],
      timer: { durationSec: 1200, label: { en: "Chicken", es: "Pollo" } },
    },
    {
      text: {
        en: "Mix the yogurt with the lemon juice and a pinch of salt. Serve it alongside.",
        es: "Mezcla el yogur con el jugo de limón y una pizca de sal. Sírvelo al lado.",
      },
      uses: ["yogurt", "lemon"],
    },
  ],
};
