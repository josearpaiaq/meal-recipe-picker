import type { Recipe } from "../types";

export const tunaWhiteBeanSalad: Recipe = {
  id: "tuna-white-bean-salad",
  meals: ["lunch"],
  timeMin: 10,
  effort: "nocook",
  servings: 2,
  plate: { veg: true, protein: true, grain: false, fat: true },
  tint: "herb",
  image: "/recipes/tuna-white-bean-salad.jpg",
  imageCredit: {
    author: "gran",
    license: "CC BY 3.0",
    url: "https://commons.wikimedia.org/wiki/File:White_bean_mediterranean_salad.jpg",
  },
  name: {
    en: "Tuna, white bean & herb salad",
    es: "Ensalada de atún, frijoles blancos y hierbas",
  },
  flavorNote: {
    en: "Lots of fresh herbs, lemony red onion and good olive oil turn pantry cans into something bright.",
    es: "Muchas hierbas frescas, cebolla morada con limón y buen aceite de oliva convierten unas latas en algo fresco.",
  },
  ingredients: [
    {
      id: "onion",
      qty: "1/2",
      label: { en: "red onion", es: "cebolla morada" },
      shoppingKey: "red-onion",
      aisle: "produce",
    },
    {
      id: "lemon",
      qty: "1",
      label: { en: "lemon", es: "limón amarillo" },
      shoppingKey: "lemons",
      aisle: "produce",
    },
    {
      id: "beans",
      qty: "1 can (15 oz / 425 g)",
      label: { en: "white beans", es: "frijoles blancos" },
      shoppingKey: "canned-white-beans",
      aisle: "pantry",
    },
    {
      id: "tuna",
      qty: "2 cans (5 oz / 140 g)",
      label: { en: "tuna in olive oil", es: "atún en aceite de oliva" },
      shoppingKey: "canned-tuna",
      aisle: "pantry",
    },
    {
      id: "herbs",
      qty: "1 big handful",
      label: { en: "parsley and dill", es: "perejil y eneldo" },
      shoppingKey: "fresh-herbs",
      aisle: "produce",
    },
    {
      id: "oil",
      qty: "2 tbsp",
      label: { en: "extra-virgin olive oil", es: "aceite de oliva extra virgen" },
      shoppingKey: "olive-oil",
      aisle: "pantry",
    },
    {
      id: "arugula",
      qty: "2 handfuls",
      label: { en: "arugula", es: "rúgula" },
      shoppingKey: "arugula",
      aisle: "produce",
    },
  ],
  steps: [
    {
      text: {
        en: "Thinly slice the onion and soak it in the lemon juice with a pinch of salt to soften.",
        es: "Corta la cebolla en tiras finas y déjala en el jugo de limón con una pizca de sal para que se suavice.",
      },
      uses: ["onion", "lemon"],
      timer: { durationSec: 300, label: { en: "Onion", es: "Cebolla" } },
    },
    {
      text: {
        en: "Drain and rinse the beans. Add the tuna, chopped herbs and olive oil, and fold gently.",
        es: "Escurre y enjuaga los frijoles. Agrega el atún, las hierbas picadas y el aceite de oliva, y mezcla con suavidad.",
      },
      uses: ["beans", "tuna", "herbs", "oil"],
    },
    {
      text: {
        en: "Add the onion with its lemon juice, season with salt and pepper, and serve over the arugula.",
        es: "Agrega la cebolla con su jugo de limón, sazona con sal y pimienta, y sirve sobre la rúgula.",
      },
      uses: ["onion", "arugula"],
    },
  ],
};
