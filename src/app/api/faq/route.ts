import { getFaqItems } from "@/lib/repositories/content-repository";
import { apiFailure, apiSuccess } from "@/lib/server/api-response";

export async function GET() {
  const items = await getFaqItems();
  return apiSuccess(items);
}

export async function POST(request: Request) {
  await request.text();
  return apiFailure("Use os endpoints protegidos em /api/admin/faq.", 405);
}
