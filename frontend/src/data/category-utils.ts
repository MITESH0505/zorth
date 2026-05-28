import { categories } from "./categories";
import { allResources } from "./resources";

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const resource of allResources) {
    counts[resource.category] = (counts[resource.category] || 0) + 1;
  }
  return counts;
}

export function getCategoriesWithCounts() {
  const counts = getCategoryCounts();
  return categories.map((cat) => ({
    ...cat,
    count: counts[cat.name] || 0,
  }));
}

export function getTotalResourceCount(): number {
  return allResources.length;
}
