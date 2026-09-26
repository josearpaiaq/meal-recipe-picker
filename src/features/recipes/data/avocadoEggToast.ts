import type { Recipe } from "../types";

export const avocadoEggToast: Recipe = {
  id: "avocado-egg-toast",
  meals: ["breakfast"],
  timeMin: 10,
  effort: "easy",
  servings: 1,
  plate: { veg: true, protein: true, grain: true, fat: true },
  tint: "herb",
  image: "/recipes/avocado-egg-toast.jpg",
  imageCredit: {
    author: "Joseph Gonzalez",
    license: "CC0",
    url: "https://commons.wikimedia.org/wiki/File:Avocado_and_Egg_Toast_(Unsplash).jpg",
  },
  name: {
    en: "Avocado toast with soft eggs & tomatoes",
    es: "Tostada de aguacate con huevos suaves y tomates",
  },
  flavorNote: {
    en: "Lemon and salt in the avocado keep it bright, and slow, soft-scrambled eggs make it feel like a café breakfast.",
    es: "El limón y la sal en el aguacate lo mantienen fresco, y los huevos revueltos suaves y lentos lo hacen sentir como un desayuno de café.",
  },
  ingredients: [
    {
      id: "bread",
      qty: "2 slices",
      label: { en: "whole-grain bread", es: "pan integral" },
      shoppingKey: "whole-grain-bread",
      aisle: "other",
    },
    {
      id: "eggs",
      qty: "2",
      label: { en: "eggs", es: "huevos" },
      shoppingKey: "eggs",
      aisle: "dairy",
    },
    {
      id: "avocado",
      qty: "1/2",
      label: { en: "ripe avocado", es: "aguacate maduro" },
      shoppingKey: "avocado",
      aisle: "produce",
    },
    {
      id: "lemon",
      qty: "1/4",
      label: { en: "lemon", es: "limón amarillo" },
      shoppingKey: "lemons",
      aisle: "produce",
    },
    {
      id: "tomatoes",
      qty: "1 handful",
      label: { en: "cherry tomatoes", es: "tomates cherry" },
      shoppingKey: "cherry-tomatoes",
      aisle: "produce",
    },
    {
      id: "chili",
      qty: "1 pinch",
      label: { en: "chili flakes", es: "ají en hojuelas" },
      shoppingKey: "chili-flakes",
      aisle: "pantry",
    },
  ],
  steps: [
    {
      text: { en: "Toast the bread.", es: "Tuesta el pan." },
      uses: ["bread"],
    },
    {
      text: {
        en: "Cook the beaten eggs in a nonstick pan over medium-low heat, stirring gently, until just set.",
        es: "Cocina los huevos batidos en una sartén antiadherente a fuego medio-bajo, revolviendo suavemente, hasta que apenas cuajen.",
      },
      uses: ["eggs"],
      timer: { durationSec: 180, label: { en: "Eggs", es: "Huevos" } },
    },
    {
      text: {
        en: "Mash the avocado with a squeeze of lemon and a pinch of salt, then spread it on the toast.",
        es: "Aplasta el aguacate con un chorrito de limón y una pizca de sal, y úntalo sobre el pan.",
      },
      uses: ["avocado", "lemon"],
    },
    {
      text: {
        en: "Top with the eggs, halved tomatoes and a pinch of chili flakes.",
        es: "Termina con los huevos, los tomates en mitades y una pizca de ají.",
      },
      uses: ["eggs", "tomatoes", "chili"],
    },
  ],
};
