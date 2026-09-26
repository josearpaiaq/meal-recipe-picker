import type { Recipe } from "../types";

export const turkeyStirFry: Recipe = {
  id: "turkey-stir-fry",
  meals: ["dinner"],
  timeMin: 20,
  effort: "easy",
  servings: 2,
  plate: { veg: true, protein: true, grain: true, fat: false },
  tint: "olive",
  image: "/recipes/turkey-stir-fry.jpg",
  imageCredit: {
    author: "Joy",
    license: "CC BY 2.0",
    url: "https://commons.wikimedia.org/wiki/File:Beef_and_broccoli_stir_fry_closeup.jpg",
  },
  name: { en: "Ginger-garlic turkey stir-fry", es: "Salteado de pavo con jengibre y ajo" },
  flavorNote: {
    en: "A very hot pan and fresh ginger do the work; a splash of rice vinegar at the end keeps it lively.",
    es: "Una sartén muy caliente y jengibre fresco hacen el trabajo; un chorrito de vinagre de arroz al final lo aviva.",
  },
  ingredients: [
    {
      id: "rice",
      qty: "3/4 cup",
      label: { en: "quick brown rice", es: "arroz integral rápido" },
      shoppingKey: "rice",
      aisle: "pantry",
    },
    {
      id: "oil",
      qty: "1 tbsp",
      label: { en: "neutral oil", es: "aceite neutro" },
      shoppingKey: "neutral-oil",
      aisle: "pantry",
    },
    {
      id: "turkey",
      qty: "1 lb (450 g)",
      label: { en: "lean ground turkey", es: "carne molida de pavo magra" },
      shoppingKey: "ground-turkey",
      aisle: "protein",
    },
    {
      id: "broccoli",
      qty: "1 head",
      label: { en: "broccoli, in small florets", es: "brócoli, en arbolitos pequeños" },
      shoppingKey: "broccoli",
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
      id: "ginger",
      qty: "1 tbsp",
      label: { en: "fresh ginger, grated", es: "jengibre fresco, rallado" },
      shoppingKey: "ginger",
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
      id: "soy",
      qty: "2 tbsp",
      label: { en: "low-sodium soy sauce", es: "salsa de soya baja en sodio" },
      shoppingKey: "soy-sauce",
      aisle: "pantry",
    },
    {
      id: "vinegar",
      qty: "1 tbsp",
      label: { en: "rice vinegar", es: "vinagre de arroz" },
      shoppingKey: "rice-vinegar",
      aisle: "pantry",
    },
    {
      id: "scallions",
      qty: "2",
      label: { en: "scallions, sliced", es: "cebollines, en rodajas" },
      shoppingKey: "scallions",
      aisle: "produce",
    },
  ],
  steps: [
    {
      text: {
        en: "Rinse the rice and start cooking it.",
        es: "Enjuaga el arroz y ponlo a cocinar.",
      },
      uses: ["rice"],
      timer: { durationSec: 900, label: { en: "Rice", es: "Arroz" } },
    },
    {
      text: {
        en: "Heat the oil in a large skillet over high heat until it shimmers. Add the turkey, break it up and cook until browned.",
        es: "Calienta el aceite en una sartén grande a fuego alto hasta que brille. Agrega el pavo, desmenúzalo y cocina hasta que se dore.",
      },
      uses: ["oil", "turkey"],
      timer: { durationSec: 300, label: { en: "Turkey", es: "Pavo" } },
    },
    {
      text: {
        en: "Add the broccoli and pepper and stir-fry until crisp-tender.",
        es: "Agrega el brócoli y el pimiento y saltea hasta que estén tiernos pero crujientes.",
      },
      uses: ["broccoli", "pepper"],
      timer: { durationSec: 240, label: { en: "Vegetables", es: "Verduras" } },
    },
    {
      text: {
        en: "Add the ginger and garlic and stir for 30 seconds, then add the soy sauce and toss.",
        es: "Agrega el jengibre y el ajo y revuelve 30 segundos; luego agrega la soya y mezcla.",
      },
      uses: ["ginger", "garlic", "soy"],
    },
    {
      text: {
        en: "Off the heat, add a splash of rice vinegar and the scallions. Serve over the rice.",
        es: "Fuera del fuego, agrega un chorrito de vinagre de arroz y los cebollines. Sirve sobre el arroz.",
      },
      uses: ["vinegar", "scallions", "rice"],
    },
  ],
};
