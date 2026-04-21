import { portfolioItems, type PortfolioItem } from "@/data/portfolio";

export async function listPortfolioItems(): Promise<PortfolioItem[]> {
  return portfolioItems;
}

export async function findPortfolioItemById(id: number): Promise<PortfolioItem | undefined> {
  return portfolioItems.find((item) => item.id === id);
}

export async function createPortfolioItem(payload: Omit<PortfolioItem, "id">) {
  return {
    ...payload,
    id: portfolioItems.length + 1
  } satisfies PortfolioItem;
}
