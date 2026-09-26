import type { Recipe } from "../types";

export const chickpeaShakshuka: Recipe = {
  id: "chickpea-shakshuka",
  meals: ["breakfast", "lunch"],
  timeMin: 25,
  effort: "easy",
  servings: 2,
  plate: { veg: true, protein: true, grain: false, fat: true },
  tint: "paprika",
  image: "/recipes/chickpea-shakshuka.jpg",
  imageCredit: {
    author: "Jarosław Ceborski",
    license: "CC0",
    url: "https://commons.wikimedia.org/wiki/File:Shakshuka_(Unsplash).jpg",
  },
  name: { en: "Chickpea shakshuka with feta", es: "Shakshuka con garbanzos y feta" },
  flavorNote: {
    en: "Cumin and smoked paprika bloomed in olive oil give the tomato sauce depth; feta adds the salty punch.",
    es: "El comino y el pimentón ahumado sofritos en aceite de oliva dan profundidad a la salsa; el feta aporta el toque salado.",
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
      label: { en: "onion, sliced", es: "cebolla, en tiras" },
      shoppingKey: "onions",
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
      id: "garlic",
      qty: "2",
      label: { en: "garlic cloves, minced", es: "dientes de ajo, picados" },
      shoppingKey: "garlic",
      aisle: "produce",
    },
    {
      id: "cumin",
      qty: "1 tsp",
      label: { en: "ground cumin", es: "comino molido" },
      shoppingKey: "ground-cumin",
      aisle: "pantry",
    },
    {
      id: "paprika",
      qty: "1 tsp",
      label: { en: "smoked paprika", es: "pimentón ahumado" },
      shoppingKey: "smoked-paprika",
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
      id: "chickpeas",
      qty: "1 can (15 oz / 425 g)",
      label: { en: "chickpeas, drained", es: "garbanzos, escurridos" },
      shoppingKey: "canned-chickpeas",
      aisle: "pantry",
    },
    {
      id: "eggs",
      qty: "4",
      label: { en: "eggs", es: "huevos" },
      shoppingKey: "eggs",
      aisle: "dairy",
    },
    {
      id: "feta",
      qty: "1/4 cup",
      label: { en: "crumbled feta", es: "queso feta desmenuzado" },
      shoppingKey: "feta",
      aisle: "dairy",
    },
    {
      id: "herbs",
      qty: "1 handful",
      label: { en: "parsley or cilantro", es: "perejil o cilantro" },
      shoppingKey: "fresh-herbs",
      aisle: "produce",
    },
  ],
  steps: [
    {
      text: {
        en: "Heat the oil in a large skillet over medium heat. Cook the onion and pepper until soft.",
        es: "Calienta el aceite en una sartén grande a fuego medio. Cocina la cebolla y el pimiento hasta que estén suaves.",
      },
      uses: ["oil", "onion", "pepper"],
      timer: { durationSec: 360, label: { en: "Onion & pepper", es: "Cebolla y pimiento" } },
    },
    {
      text: {
        en: "Add the garlic, cumin and paprika. Stir for about a minute, until fragrant.",
        es: "Agrega el ajo, el comino y el pimentón ahumado. Revuelve por un minuto, hasta que suelten su aroma.",
      },
      uses: ["garlic", "cumin", "paprika"],
    },
    {
      text: {
        en: "Add the tomatoes and chickpeas, season with salt and simmer until the sauce thickens a little.",
        es: "Agrega los tomates y los garbanzos, sazona con sal y cocina a fuego bajo hasta que la salsa espese un poco.",
      },
      uses: ["tomatoes", "chickpeas"],
      timer: { durationSec: 300, label: { en: "Sauce", es: "Salsa" } },
    },
    {
      text: {
        en: "Make four wells in the sauce and crack an egg into each. Cover and cook until the whites are set but the yolks are still runny.",
        es: "Haz cuatro huecos en la salsa y rompe un huevo en cada uno. Tapa y cocina hasta que las claras cuajen y las yemas sigan líquidas.",
      },
      uses: ["eggs"],
      timer: { durationSec: 360, label: { en: "Eggs", es: "Huevos" } },
    },
    {
      text: {
        en: "Scatter the feta and herbs over the top and serve from the pan.",
        es: "Esparce el feta y las hierbas por encima y sirve en la misma sartén.",
      },
      uses: ["feta", "herbs"],
    },
  ],
};
