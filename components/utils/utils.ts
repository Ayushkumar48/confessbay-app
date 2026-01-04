export function formatDate(
  date: Date | string,
  type: "short" | "long" = "long",
): string {
  const d = typeof date === "string" ? new Date(date) : date;

  if (!(d instanceof Date) || isNaN(d.getTime())) {
    return "";
  }

  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: type === "long" ? "long" : "short",
    day: "numeric",
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
