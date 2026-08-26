"use server";

export async function verifyAdminPassword(password: string): Promise<boolean> {
  return password === process.env.ADMIN_PASSWORD;
}
