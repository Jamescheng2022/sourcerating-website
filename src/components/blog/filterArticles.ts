export interface ArticleFilterItem {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
}

/**
 * Pure filter function for blog directory articles.
 * - query: trimmed, case-insensitive substring match across title, excerpt, or category.
 * - category: exact match against item.category, or all categories if "All categories" or empty.
 * - intersection: when both query and category are provided, matches must satisfy both (AND).
 * - order: preserves original array order.
 * - non-mutation: does not mutate the input array.
 */
export function filterArticles<T extends ArticleFilterItem>(
  items: readonly T[],
  query: string,
  category: string
): T[] {
  const trimmedQuery = query.trim().toLowerCase();
  const isAllCategories = !category || category === "All categories";

  return items.filter((item) => {
    const matchesCategory = isAllCategories || item.category === category;
    if (!matchesCategory) {
      return false;
    }

    if (!trimmedQuery) {
      return true;
    }

    const titleMatch = item.title.toLowerCase().includes(trimmedQuery);
    const excerptMatch = item.excerpt.toLowerCase().includes(trimmedQuery);
    const categoryMatch = item.category.toLowerCase().includes(trimmedQuery);

    return titleMatch || excerptMatch || categoryMatch;
  });
}
