import type { Recipe } from "../types";

export const redLentilCurry: Recipe = {
  id: "red-lentil-curry",
  meals: ["lunch", "dinner"],
  timeMin: 35,
  effort: "easy",
  servings: 4,
  plate: { veg: true, protein: true, grain: false, fat: true },
  tint: "turmeric",
  image: "/recipes/red-lentil-curry.jpg",
  imageCredit: {
    author: "Miansari66",
    license: "CC0",
    url: "https://commons.wikimedia.org/wiki/File:Lal_Masoor_Dal_and_Palak.JPG",
  },
  name: {
    en: "Coconut red lentil curry with spinach",
    es: "Curry de lentejas rojas con coco y espinaca",
  },
  flavorNote: {
    en: "Toasting the spices first, then finishing with lime juice, makes lentils taste rich and complete.",
    es: "Tostar primero las especias y terminar con jugo de limón hace que las lentejas sepan ricas y completas.",
  },
  ingredients: [
    {
      id: "oil",
      qty: "1 tbsp",
      label: { en: "olive oil", es: "aceite de oliva" },
      shoppingKey: "olive-oil",
      aisle: "pantry",
    },
    {
      id: "onion",
      qty: "1",
      label: { en: "onion, chopped", es: "cebolla, picada" },
      shoppingKey: "onions",
      aisle: "produce",
    },
    {
      id: "garlic",
      qty: "3",
      label: { en: "garlic cloves, minced", es: "dientes de ajo, picados" },
      shoppingKey: "garlic",
      aisle: "produce",
    },
    {
      id: "ginger",
      qty: "1 tbsp",
      label: { en: "fresh ginger, grated", es: "jengibre fresco, rallado" },
      shoppingKey: "ginger",
      aisle: "produce",
    },
    {
      id: "curry",
      qty: "1 tbsp",
      label: { en: "curry powder", es: "curry en polvo" },
      shoppingKey: "curry-powder",
      aisle: "pantry",
    },
    {
      id: "lentils",
      qty: "1 cup",
      label: { en: "red lentils, rinsed", es: "lentejas rojas, enjuagadas" },
      shoppingKey: "red-lentils",
      aisle: "pantry",
    },
    {
      id: "coconut",
      qty: "1 can (14 oz / 400 ml)",
      label: { en: "light coconut milk", es: "leche de coco ligera" },
      shoppingKey: "coconut-milk",
      aisle: "pantry",
    },
    {
      id: "tomatoes",
      qty: "1 can (14 oz / 400 g)",
      label: { en: "crushed tomatoes", es: "tomates triturados" },
      shoppingKey: "canned-tomatoes",
      aisle: "pantry",
    },
    {
      id: "broth",
      qty: "2 cups",
      label: { en: "vegetable broth", es: "caldo de verduras" },
      shoppingKey: "broth",
      aisle: "pantry",
    },
    {
      id: "spinach",
      qty: "4 handfuls",
      label: { en: "baby spinach", es: "espinaca baby" },
      shoppingKey: "baby-spinach",
      aisle: "produce",
    },
    {
      id: "lime",
      qty: "1",
      label: { en: "lime", es: "limón" },
      shoppingKey: "limes",
      aisle: "produce",
    },
  ],
  steps: [
    {
      text: {
        en: "Heat the oil in a large pot over medium heat and cook the onion until soft.",
        es: "Calienta el aceite en una olla grande a fuego medio y cocina la cebolla hasta que esté suave.",
      },
      uses: ["oil", "onion"],
      timer: { durationSec: 300, label: { en: "Onion", es: "Cebolla" } },
    },
    {
      text: {
        en: "Add the garlic, ginger and curry powder. Stir for a minute to toast the spices.",
        es: "Agrega el ajo, el jengibre y el curry. Revuelve un minuto para tostar las especias.",
      },
      uses: ["garlic", "ginger", "curry"],
    },
    {
      text: {
        en: "Add the lentils, coconut milk, tomatoes and broth. Simmer, stirring often, until the lentils fall apart.",
        es: "Agrega las lentejas, la leche de coco, los tomates y el caldo. Cocina a fuego bajo, revolviendo seguido, hasta que las lentejas se deshagan.",
      },
      uses: ["lentils", "coconut", "tomatoes", "broth"],
      timer: { durationSec: 1200, label: { en: "Lentils", es: "Lentejas" } },
    },
    {
      text: {
        en: "Stir in the spinach until it wilts. Season with salt and the lime juice.",
        es: "Incorpora la espinaca hasta que se marchite. Sazona con sal y el jugo de limón.",
      },
      uses: ["spinach", "lime"],
    },
  ],
};
