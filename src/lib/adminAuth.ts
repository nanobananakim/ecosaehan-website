import { cookies } from "next/headers";
import crypto from "node:crypto";

export const ADMIN_COOKIE_NAME = "ecosaehan_admin_session";

// The cookie holds a hash of the password, never the password itself.
export function adminSessionToken(): string {
  const password = process.env.ADMIN_PASSWORD ?? "";
  return crypto.createHash("sha256").update(`ecosaehan-admin:${password}`).digest("hex");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  if (!process.env.ADMIN_PASSWORD) return false;
  const token = (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
  return !!token && token === adminSessionToken();
}
