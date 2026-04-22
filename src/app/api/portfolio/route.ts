import { listPortfolioItems } from "@/lib/repositories/portfolio-repository";
import { apiFailure, apiSuccess } from "@/lib/server/api-response";

export async function GET() {
  const items = await listPortfolioItems();
  return apiSuccess(items);
}

export async function POST(request: Request) {
  await request.text();
  return apiFailure("Use os endpoints protegidos em /api/admin/tattoos.", 405);
}
