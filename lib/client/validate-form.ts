import type z from "zod";
import { mapZodErrors } from "./validation";

export function resetErrors<T extends Record<string, unknown>>(
  shape: T,
): Record<keyof T, string[]> {
  const result = {} as Record<keyof T, string[]>;
  for (const key in shape) {
    result[key] = [];
  }
  return result;
}

export function validateForm<T extends Record<string, unknown>>(
  form: T,
  schema: z.ZodType<T>,
) {
  const result = schema.safeParse(form);

  if (!result.success) {
    return {
      valid: false,
      errors: {
        ...resetErrors(form),
        ...mapZodErrors(result.error),
      },
    };
  }

  return {
    valid: true,
    errors: resetErrors(form),
  };
}
