import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { FILE_PREFIX, MAX_FILE_BYTES } from "@/lib/board";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }
  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async pathname => {
        if (!pathname.startsWith(FILE_PREFIX) || pathname.includes("..")) throw new Error("잘못된 경로입니다.");
        return { maximumSizeInBytes: MAX_FILE_BYTES, addRandomSuffix: false };
      },
    });
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
