"use client";

import { useMemo, useState } from "react";

export function useAdminSearch<T>(items: T[], selector: (item: T) => string) {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return items;
    }

    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => selector(item).toLowerCase().includes(normalizedQuery));
  }, [items, query, selector]);

  return {
    query,
    setQuery,
    filteredItems
  };
}
