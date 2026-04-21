export type AdminSession = {
  userId: string;
  email: string;
  role: "admin";
};

export async function getAdminSession(): Promise<AdminSession | null> {
  return {
    userId: "mock-admin",
    email: "admin@ananoirtattoo.com",
    role: "admin"
  };
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}
