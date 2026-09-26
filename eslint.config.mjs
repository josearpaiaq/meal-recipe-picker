import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const FEATURES = ["recipes", "picker", "cooking", "planner", "favorites", "pantry"];

// Allowed feature → feature imports (public APIs only). Keep this graph acyclic.
const ALLOWED = {
  recipes: [],
  favorites: ["recipes"],
  pantry: ["recipes"],
  picker: ["recipes", "favorites", "pantry"],
  cooking: ["recipes", "favorites"],
  planner: ["recipes", "picker", "favorites", "pantry"],
};

// Features are imported only through their public index.ts.
const deepImport = {
  group: ["@/features/*/**"],
  message: "Import features only through their public API: @/features/<name>.",
};

const restrict = (patterns) => ["error", { patterns: [deepImport, ...patterns] }];

const featureBoundaries = FEATURES.map((feature) => {
  const forbidden = FEATURES.filter((f) => f !== feature && !ALLOWED[feature].includes(f));
  return {
    files: [`src/features/${feature}/**`],
    rules: {
      "no-restricted-imports": restrict([
        {
          group: [`@/features/${feature}`],
          message: "Use relative imports inside a feature.",
        },
        ...(forbidden.length
          ? [
              {
                group: forbidden.map((f) => `@/features/${f}`),
                message: `features/${feature} may only import: ${ALLOWED[feature].join(", ") || "no other feature"}.`,
              },
            ]
          : []),
      ]),
    },
  };
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "no-restricted-imports": restrict([]),
    },
  },
  {
    files: ["src/shared/**"],
    rules: {
      "no-restricted-imports": restrict([
        { group: ["@/features", "@/features/*"], message: "shared/** must not import features." },
      ]),
    },
  },
  ...featureBoundaries,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
