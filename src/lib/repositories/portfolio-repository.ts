import { cache } from "react";
import { portfolioItems as fallbackPortfolioItems, type PortfolioCategory, type PortfolioItem } from "@/data/portfolio";
import { requestBackend } from "@/lib/server/backend-request";

type PublicPortfolioFilters = {
  category?: string;
  featured?: boolean;
  healed?: boolean;
  beforeAfter?: boolean;
};

type BackendTattooImage = {
  id: number;
  imageUrl: string;
  altText: string;
  isCover: boolean;
};

type BackendTattoo = {
  id: number;
  title: string;
  style: string;
  bodyPart: string;
  technique: string;
  healed: boolean;
  fresh: boolean;
  beforeAfter: boolean;
  featuredHome: boolean;
  category?: {
    name: string;
  };
  images?: BackendTattooImage[];
};

type BackendCategory = {
  name: string;
};

function resolveImage(images?: BackendTattooImage[]): { image: string; alt: string } {
  const cover = images?.find((item) => item.isCover) ?? images?.[0];
  if (!cover) {
    return {
      image: "/images/portfolio/blackwork-panther.svg",
      alt: "Tatuagem autoral de Fernanda Borges"
    };
  }

  return {
    image: cover.imageUrl,
    alt: cover.altText
  };
}

function mapTattooToPortfolioItem(item: BackendTattoo): PortfolioItem {
  const resolvedImage = resolveImage(item.images);

  return {
    id: item.id,
    title: item.title,
    category: (item.category?.name ?? item.style) as PortfolioCategory,
    bodyPart: item.bodyPart,
    technique: item.technique,
    image: resolvedImage.image,
    alt: resolvedImage.alt,
    healed: item.healed,
    beforeAfter: item.beforeAfter,
    closeUp: false,
    fresh: item.fresh,
    featured: item.featuredHome
  };
}

const listPortfolioItemsFallback = cache(async () => fallbackPortfolioItems);

export async function listPortfolioItems(filters: PublicPortfolioFilters = {}): Promise<PortfolioItem[]> {
  const params = new URLSearchParams();

  if (filters.category) params.set("category", filters.category);
  if (typeof filters.featured === "boolean") params.set("featured", String(filters.featured));
  if (typeof filters.healed === "boolean") params.set("healed", String(filters.healed));
  if (typeof filters.beforeAfter === "boolean") params.set("beforeAfter", String(filters.beforeAfter));

  try {
    const response = await requestBackend<BackendTattoo[]>({
      path: "/api/public/portfolio",
      search: params.toString(),
      next: { revalidate: 60 }
    });

    if (!response.ok || !response.data) {
      return listPortfolioItemsFallback();
    }

    return response.data.map(mapTattooToPortfolioItem);
  } catch {
    return listPortfolioItemsFallback();
  }
}

export async function listPortfolioCategories(): Promise<Array<"Todas" | PortfolioCategory>> {
  try {
    const response = await requestBackend<BackendCategory[]>({
      path: "/api/public/portfolio/categories",
      next: { revalidate: 60 }
    });

    if (!response.ok || !response.data?.length) {
      return ["Todas", ...new Set(fallbackPortfolioItems.map((item) => item.category))];
    }

    const categories = response.data.map((item) => item.name) as PortfolioCategory[];
    return ["Todas", ...categories];
  } catch {
    return ["Todas", ...new Set(fallbackPortfolioItems.map((item) => item.category))];
  }
}

export async function findPortfolioItemById(id: number): Promise<PortfolioItem | undefined> {
  const items = await listPortfolioItems();
  return items.find((item) => item.id === id);
}

export async function createPortfolioItem(payload: Omit<PortfolioItem, "id">) {
  return {
    ...payload,
    id: fallbackPortfolioItems.length + 1
  } satisfies PortfolioItem;
}

