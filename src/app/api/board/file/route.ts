import { NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { FILE_PREFIX } from "@/lib/board";

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) return new NextResponse("Unauthorized", { status: 401 });

  const { searchParams } = new URL(request.url);
  const pathname = searchParams.get("p") ?? "";
  const name = (searchParams.get("n") ?? "download").replace(/[\r\n"]/g, "_");
  if (!pathname.startsWith(FILE_PREFIX) || pathname.includes("..")) return new NextResponse("Bad request", { status: 400 });

  // Only images and PDFs may open inline; everything else is always a download.
  const types: Record<string, string> = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", webp: "image/webp", pdf: "application/pdf" };
  const inlineType = searchParams.get("inline") === "1" ? types[name.split(".").pop()?.toLowerCase() ?? ""] : undefined;

  const res = await get(pathname, { access: "private" });
  if (!res || res.statusCode !== 200) return new NextResponse("Not found", { status: 404 });

  return new NextResponse(res.stream, {
    headers: {
      "Content-Type": inlineType ?? "application/octet-stream",
      "Content-Disposition": `${inlineType ? "inline" : "attachment"}; filename*=UTF-8''${encodeURIComponent(name)}`,
      "Content-Security-Policy": "sandbox",
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
