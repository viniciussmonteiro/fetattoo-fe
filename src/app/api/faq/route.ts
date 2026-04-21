import { getFaqItems } from "@/lib/repositories/content-repository";
import { apiSuccess } from "@/lib/server/api-response";

export async function GET() {
  const items = await getFaqItems();
  return apiSuccess(items);
}

export async function POST(request: Request) {
  const payload = await request.json();
  return apiSuccess(payload, 201);
}
