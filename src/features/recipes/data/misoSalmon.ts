import type { Recipe } from "../types";

export const misoSalmon: Recipe = {
  id: "miso-salmon",
  meals: ["dinner"],
  timeMin: 25,
  effort: "easy",
  servings: 2,
  plate: { veg: true, protein: true, grain: true, fat: true },
  tint: "salmon",
  image: "/recipes/miso-salmon.jpg",
  imageCredit: {
    author: "transcendancing",
    license: "CC BY-SA 2.0",
    url: "https://commons.wikimedia.org/wiki/File:Adam_Liaw%27s_teriyaki_salmon_for_Fox%27s_dinner_tonight,_using_his_home_made_teriyaki_sauce_recipe._I%27m_sold!_Fox_raved_too..._-mycookingadventures_(49833355826).jpg",
  },
  name: {
    en: "Miso-glazed salmon, rice & sesame greens",
    es: "Salmón glaseado con miso, arroz y verduras con ajonjolí",
  },
  flavorNote: {
    en: "Miso brings salty, savory depth and the honey caramelizes under the broiler. Sesame oil and a squeeze of lime on the greens add richness and brightness.",
    es: "El miso aporta un sabor salado y profundo, y la miel se carameliza al gratinar. El aceite de ajonjolí y un poco de limón en las verduras dan cremosidad y frescura.",
  },
  ingredients: [
    {
      id: "rice",
      qty: "3/4 cup",
      label: { en: "jasmine or quick brown rice", es: "arroz jazmín o integral rápido" },
      shoppingKey: "rice",
      aisle: "pantry",
    },
    {
      id: "salmon",
      qty: "2",
      label: { en: "salmon fillets", es: "filetes de salmón" },
      shoppingKey: "salmon-fillet",
      aisle: "protein",
    },
    {
      id: "miso",
      qty: "1 tbsp",
      label: { en: "white miso", es: "miso blanco" },
      shoppingKey: "white-miso",
      aisle: "pantry",
    },
    {
      id: "honey",
      qty: "1 tbsp",
      label: { en: "honey", es: "miel" },
      shoppingKey: "honey",
      aisle: "pantry",
    },
    {
      id: "soy",
      qty: "1 tsp",
      label: { en: "soy sauce", es: "salsa de soya" },
      shoppingKey: "soy-sauce",
      aisle: "pantry",
    },
    {
      id: "greens",
      qty: "2 heads",
      label: {
        en: "bok choy (or a big handful of spinach)",
        es: "bok choy (o un buen puñado de espinaca)",
      },
      shoppingKey: "bok-choy",
      aisle: "produce",
    },
    {
      id: "garlic",
      qty: "1",
      label: { en: "garlic clove", es: "diente de ajo" },
      shoppingKey: "garlic",
      aisle: "produce",
    },
    {
      id: "sesame-oil",
      qty: "1 tsp",
      label: { en: "sesame oil", es: "aceite de ajonjolí" },
      shoppingKey: "sesame-oil",
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
      id: "sesame-seeds",
      qty: "1 tsp",
      label: { en: "sesame seeds", es: "ajonjolí" },
      shoppingKey: "sesame-seeds",
      aisle: "pantry",
    },
    {
      id: "lime",
      qty: "1/2",
      label: { en: "lime", es: "limón" },
      shoppingKey: "limes",
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
        en: "Stir the miso, honey and soy sauce into a paste. Brush it over the salmon.",
        es: "Mezcla el miso, la miel y la soya hasta formar una pasta. Úntala sobre el salmón.",
      },
      uses: ["miso", "honey", "soy", "salmon"],
    },
    {
      text: {
        en: "Broil the salmon until the glaze darkens in spots and the fish flakes.",
        es: "Gratina el salmón hasta que el glaseado se dore en partes y el pescado se desmenuce fácilmente.",
      },
      uses: ["salmon"],
      timer: { durationSec: 480, label: { en: "Salmon", es: "Salmón" } },
    },
    {
      text: {
        en: "Cook the greens with the garlic and sesame oil.",
        es: "Saltea las verduras con el ajo y el aceite de ajonjolí.",
      },
      uses: ["greens", "garlic", "sesame-oil"],
      timer: { durationSec: 180, label: { en: "Greens", es: "Verduras" } },
    },
    {
      text: {
        en: "Serve over rice. Finish with scallion, sesame seeds and a squeeze of lime.",
        es: "Sirve sobre el arroz. Termina con cebollín, ajonjolí y un chorrito de limón.",
      },
      uses: ["scallion", "sesame-seeds", "lime"],
    },
  ],
};
