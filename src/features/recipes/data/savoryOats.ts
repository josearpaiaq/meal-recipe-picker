import type { Recipe } from "../types";

export const savoryOats: Recipe = {
  id: "savory-oats",
  meals: ["breakfast"],
  timeMin: 15,
  effort: "easy",
  servings: 1,
  plate: { veg: true, protein: true, grain: true, fat: true },
  tint: "oat",
  image: "/recipes/savory-oats.jpg",
  imageCredit: {
    author: "ProjectManhattan",
    license: "CC BY-SA 3.0",
    url: "https://commons.wikimedia.org/wiki/File:Chicken_porridge_with_an_egg.jpg",
  },
  name: {
    en: "Savory oats with jammy egg & chili crisp",
    es: "Avena salada con huevo tierno y chili crisp",
  },
  flavorNote: {
    en: "Oats cooked in broth instead of milk, plus a runny yolk and chili crisp, taste like a rice bowl, not diet food.",
    es: "Cocinar la avena en caldo en vez de leche, con yema líquida y chili crisp, la hace saber a un bowl de arroz, no a comida de dieta.",
  },
  ingredients: [
    {
      id: "oats",
      qty: "1/2 cup",
      label: { en: "rolled oats", es: "avena en hojuelas" },
      shoppingKey: "rolled-oats",
      aisle: "pantry",
    },
    {
      id: "broth",
      qty: "1 cup",
      label: { en: "low-sodium broth", es: "caldo bajo en sodio" },
      shoppingKey: "broth",
      aisle: "pantry",
    },
    { id: "egg", qty: "1", label: { en: "egg", es: "huevo" }, shoppingKey: "eggs", aisle: "dairy" },
    {
      id: "spinach",
      qty: "1 handful",
      label: { en: "baby spinach", es: "espinaca baby" },
      shoppingKey: "baby-spinach",
      aisle: "produce",
    },
    {
      id: "soy",
      qty: "1/2 tsp",
      label: { en: "soy sauce", es: "salsa de soya" },
      shoppingKey: "soy-sauce",
      aisle: "pantry",
    },
    {
      id: "scallion",
      qty: "1",
      label: { en: "scallion", es: "cebollín" },
      shoppingKey: "scallions",
      aisle: "produce",
    },
    {
      id: "chili-crisp",
      qty: "1 tsp",
      label: { en: "chili crisp", es: "chili crisp" },
      shoppingKey: "chili-crisp",
      aisle: "pantry",
    },
  ],
  steps: [
    {
      text: {
        en: "Bring the broth to a simmer in a small pot. Stir in the oats and cook, stirring now and then, until creamy.",
        es: "Calienta el caldo en una olla pequeña hasta que hierva suave. Agrega la avena y cocina, revolviendo de vez en cuando, hasta que quede cremosa.",
      },
      uses: ["broth", "oats"],
      timer: { durationSec: 300, label: { en: "Oats", es: "Avena" } },
    },
    {
      text: {
        en: "Meanwhile, lower the egg into boiling water and cook for 6½ minutes for a jammy yolk. Move it to cold water.",
        es: "Mientras tanto, pon el huevo en agua hirviendo y cocínalo 6 minutos y medio para que la yema quede tierna. Pásalo a agua fría.",
      },
      uses: ["egg"],
      timer: { durationSec: 390, label: { en: "Egg", es: "Huevo" } },
    },
    {
      text: {
        en: "Stir the spinach into the oats until it wilts, then season with the soy sauce.",
        es: "Mezcla la espinaca con la avena hasta que se marchite y sazona con la salsa de soya.",
      },
      uses: ["spinach", "soy"],
    },
    {
      text: {
        en: "Peel and halve the egg. Top the oats with the egg, sliced scallion and chili crisp.",
        es: "Pela el huevo y pártelo a la mitad. Sirve la avena con el huevo, el cebollín en rodajas y el chili crisp.",
      },
      uses: ["egg", "scallion", "chili-crisp"],
    },
  ],
};
