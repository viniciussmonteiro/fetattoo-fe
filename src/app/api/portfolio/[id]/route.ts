import { findPortfolioItemById } from "@/lib/repositories/portfolio-repository";
import { apiFailure, apiSuccess } from "@/lib/server/api-response";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return apiFailure("ID inválido.", 422);
  }

  const item = await findPortfolioItemById(numericId);

  if (!item) {
    return apiFailure("Item não encontrado.", 404);
  }

  return apiSuccess(item);
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return apiFailure("ID inválido.", 422);
  }

  const payload = await request.json();

  return apiSuccess({
    id: numericId,
    ...payload
  });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return apiFailure("ID inválido.", 422);
  }

  return apiSuccess({
    removed: true,
    id: numericId
  });
}
