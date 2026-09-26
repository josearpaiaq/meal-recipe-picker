import type { AnchorHTMLAttributes } from "react";
import { vi } from "vitest";

// Shared mock for "@/i18n/navigation". Use with: vi.mock("@/i18n/navigation", () => navigationMock)
export const router = { push: vi.fn(), replace: vi.fn() };
export const pathname = { current: "/" };

export const navigationMock = {
  useRouter: () => router,
  usePathname: () => pathname.current,
  Link: ({ href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...rest} />
  ),
};
