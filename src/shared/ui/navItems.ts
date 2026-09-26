import type { IconName } from "./Icon";

export type NavItem = {
  href: "/" | "/week" | "/saved" | "/pantry";
  icon: IconName;
  short: "pick" | "week" | "saved" | "pantry";
  long: "pickLong" | "weekLong" | "saved" | "pantry";
};

export const navItems: NavItem[] = [
  { href: "/", icon: "bowl", short: "pick", long: "pickLong" },
  { href: "/week", icon: "calendar", short: "week", long: "weekLong" },
  { href: "/saved", icon: "heart", short: "saved", long: "saved" },
  { href: "/pantry", icon: "jar", short: "pantry", long: "pantry" },
];

export function isActive(pathname: string, href: NavItem["href"]) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
