import { useTranslations } from "next-intl";
import { Chip } from "@/shared/ui";
import type { Recipe } from "../types";

const parts = ["veg", "protein", "grain", "fat"] as const;

/** Filled chip when the plate has that part, dashed when it doesn't. */
export function PlateChips({ plate }: { plate: Recipe["plate"] }) {
  const t = useTranslations("common.plate");
  return (
    <ul className="flex flex-wrap gap-1.5">
      {parts.map((part) => (
        <li key={part}>
          <Chip variant={plate[part] ? "filled" : "dashed"}>{t(part)}</Chip>
        </li>
      ))}
    </ul>
  );
}
