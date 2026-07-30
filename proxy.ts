import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n";

const middleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return middleware(request);
}

export const config = {
  matcher: ["/", "/(pt|en)/:path*"],
};
