import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "./lib/server/appwrite";

export const middleware = async (req: NextRequest) => {
  const user = await getLoggedInUser();

  if (!user) NextResponse.redirect("/sign-in");

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
