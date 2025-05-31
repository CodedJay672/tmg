import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "./lib/server/appwrite";

export const middleware = async (req: NextRequest) => {
  const user = await getLoggedInUser();

  if (!user || !user.labels.includes("admin")) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
