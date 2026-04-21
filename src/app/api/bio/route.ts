import { getArtistProfile } from "@/lib/repositories/content-repository";
import { apiSuccess } from "@/lib/server/api-response";

export async function GET() {
  const profile = await getArtistProfile();
  return apiSuccess(profile);
}

export async function PUT(request: Request) {
  const payload = await request.json();
  return apiSuccess(payload);
}
