import type { ZodError } from "zod";

export function mapZodErrors<T extends Record<string, unknown>>(
  error: ZodError<T>,
) {
  const result = {} as Record<keyof T, string[]>;

  for (const issue of error.issues) {
    const key = issue.path[0] as keyof T;
    if (!result[key]) result[key] = [];
    result[key].push(issue.message);
  }

  return result;
}
