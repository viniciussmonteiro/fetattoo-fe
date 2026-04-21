import { createPortfolioItem, listPortfolioItems } from "@/lib/repositories/portfolio-repository";
import { portfolioCategories, type PortfolioCategory, type PortfolioItem } from "@/data/portfolio";
import { apiFailure, apiSuccess } from "@/lib/server/api-response";

export async function GET() {
  const items = await listPortfolioItems();
  return apiSuccess(items);
}

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

function isPortfolioPayload(value: unknown): value is Omit<PortfolioItem, "id"> {
  if (!value || typeof value !== "object") {
    return false;
  }

  const source = value as Record<string, unknown>;
  const allowedCategories = portfolioCategories.filter((category) => category !== "Todas") as PortfolioCategory[];

  return (
    isString(source.title) &&
    isString(source.category) &&
    allowedCategories.includes(source.category as PortfolioCategory) &&
    isString(source.bodyPart) &&
    isString(source.technique) &&
    isString(source.image) &&
    isString(source.alt) &&
    isBoolean(source.healed) &&
    isBoolean(source.beforeAfter)
  );
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!isPortfolioPayload(payload)) {
    return apiFailure("Erro de validação dos dados enviados.", 422);
  }

  const item = await createPortfolioItem(payload);

  return apiSuccess(item, 201);
}
