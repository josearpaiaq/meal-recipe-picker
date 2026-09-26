import type { Recipe } from "../types";

export const blackBeanTacos: Recipe = {
  id: "black-bean-tacos",
  meals: ["lunch", "dinner"],
  timeMin: 20,
  effort: "easy",
  servings: 2,
  plate: { veg: true, protein: true, grain: true, fat: true },
  tint: "corn",
  image: "/recipes/black-bean-tacos.jpg",
  imageCredit: {
    author: "Jennifer",
    license: "CC BY 2.0",
    url: "https://commons.wikimedia.org/wiki/File:Vegetables_and_Black_Bean_Tacos_(7212559656).jpg",
  },
  name: {
    en: "Black bean tacos with lime slaw",
    es: "Tacos de frijoles negros con ensalada de col y limón",
  },
  flavorNote: {
    en: "A sharp lime slaw cuts through earthy beans; a little chipotle adds smoke without extra fat.",
    es: "La ensalada de col con limón corta lo terroso de los frijoles; un poco de chipotle da un toque ahumado sin grasa extra.",
  },
  ingredients: [
    {
      id: "cabbage",
      qty: "2 cups",
      label: { en: "shredded cabbage", es: "repollo rallado" },
      shoppingKey: "cabbage",
      aisle: "produce",
    },
    {
      id: "limes",
      qty: "2",
      label: { en: "limes", es: "limones" },
      shoppingKey: "limes",
      aisle: "produce",
    },
    {
      id: "cilantro",
      qty: "1 handful",
      label: { en: "cilantro", es: "cilantro" },
      shoppingKey: "fresh-herbs",
      aisle: "produce",
    },
    {
      id: "oil",
      qty: "1 tbsp",
      label: { en: "olive oil", es: "aceite de oliva" },
      shoppingKey: "olive-oil",
      aisle: "pantry",
    },
    {
      id: "beans",
      qty: "1 can (15 oz / 425 g)",
      label: { en: "black beans", es: "frijoles negros" },
      shoppingKey: "canned-black-beans",
      aisle: "pantry",
    },
    {
      id: "chipotle",
      qty: "1",
      label: { en: "chipotle in adobo, chopped", es: "chipotle en adobo, picado" },
      shoppingKey: "chipotle-in-adobo",
      aisle: "pantry",
    },
    {
      id: "cumin",
      qty: "1/2 tsp",
      label: { en: "ground cumin", es: "comino molido" },
      shoppingKey: "ground-cumin",
      aisle: "pantry",
    },
    {
      id: "tortillas",
      qty: "6",
      label: { en: "corn tortillas", es: "tortillas de maíz" },
      shoppingKey: "corn-tortillas",
      aisle: "other",
    },
    {
      id: "avocado",
      qty: "1",
      label: { en: "avocado", es: "aguacate" },
      shoppingKey: "avocado",
      aisle: "produce",
    },
  ],
  steps: [
    {
      text: {
        en: "Toss the cabbage with the juice of one lime, the cilantro and a pinch of salt. Set aside.",
        es: "Mezcla el repollo con el jugo de un limón, el cilantro y una pizca de sal. Reserva.",
      },
      uses: ["cabbage", "limes", "cilantro"],
    },
    {
      text: {
        en: "Warm the oil in a pan. Add the beans with a splash of their liquid, the chipotle and cumin. Mash lightly and simmer.",
        es: "Calienta el aceite en una sartén. Agrega los frijoles con un poco de su líquido, el chipotle y el comino. Aplasta un poco y cocina a fuego bajo.",
      },
      uses: ["oil", "beans", "chipotle", "cumin"],
      timer: { durationSec: 300, label: { en: "Beans", es: "Frijoles" } },
    },
    {
      text: {
        en: "Warm the tortillas in a dry pan, about 30 seconds per side.",
        es: "Calienta las tortillas en una sartén sin aceite, unos 30 segundos por lado.",
      },
      uses: ["tortillas"],
    },
    {
      text: {
        en: "Fill the tortillas with beans, slaw and sliced avocado. Serve with lime wedges.",
        es: "Rellena las tortillas con frijoles, ensalada y aguacate en tajadas. Sirve con cascos de limón.",
      },
      uses: ["tortillas", "beans", "cabbage", "avocado", "limes"],
    },
  ],
};
