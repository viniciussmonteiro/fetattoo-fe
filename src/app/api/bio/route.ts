import { getArtistProfile } from "@/lib/repositories/content-repository";
import { apiFailure, apiSuccess } from "@/lib/server/api-response";

export async function GET() {
  const profile = await getArtistProfile();
  return apiSuccess(profile);
}

export async function PUT(request: Request) {
  await request.text();
  return apiFailure("Use os endpoints protegidos em /api/admin/artist-profile.", 405);
}
