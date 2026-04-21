import { getSocialLinks } from "@/lib/repositories/content-repository";
import { apiSuccess } from "@/lib/server/api-response";

export async function GET() {
  const links = await getSocialLinks();
  return apiSuccess(links);
}

export async function PUT(request: Request) {
  const payload = await request.json();
  return apiSuccess(payload);
}
