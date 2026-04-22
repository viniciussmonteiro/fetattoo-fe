import { getSocialLinks } from "@/lib/repositories/content-repository";
import { apiFailure, apiSuccess } from "@/lib/server/api-response";

export async function GET() {
  const links = await getSocialLinks();
  return apiSuccess(links);
}

export async function PUT(request: Request) {
  await request.text();
  return apiFailure("Use os endpoints protegidos em /api/admin/social-links.", 405);
}
