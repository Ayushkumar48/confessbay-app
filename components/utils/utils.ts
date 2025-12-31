export function formatDate(
  date: Date,
  type: "short" | "long" = "long",
): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: type === "long" ? "long" : "short",
    day: "2-digit",
  });
}

export function extractTreeErrors(tree: unknown) {
  if (
    typeof tree === "object" &&
    tree !== null &&
    "properties" in tree &&
    typeof (tree as any).properties === "object"
  ) {
    const out: Record<string, string[]> = {};
    for (const key in (tree as any).properties) {
      const prop = (tree as any).properties[key];
      if (prop && Array.isArray(prop.errors)) {
        out[key] = prop.errors;
      }
    }
    return out;
  }
  return {};
}
