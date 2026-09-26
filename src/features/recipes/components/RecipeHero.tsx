import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import type { Recipe } from "../types";
import { tintClass } from "./tint";

type Props = {
  recipe: Pick<Recipe, "tint" | "image">;
  className?: string;
  /** Rendered width hint for next/image; pass a small value for thumbnails. */
  sizes?: string;
  priority?: boolean;
  children?: ReactNode;
};

/** Photo, or the recipe's tint as a placeholder until photos exist. */
export function RecipeHero({
  recipe,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  children,
}: Props) {
  return (
    <div className={cn("relative overflow-hidden", tintClass[recipe.tint], className)}>
      {recipe.image && (
        <Image
          src={recipe.image}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      )}
      {children}
    </div>
  );
}
