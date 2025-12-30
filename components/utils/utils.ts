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
