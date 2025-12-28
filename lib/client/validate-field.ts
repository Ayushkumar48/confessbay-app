import type { ZodObject, ZodRawShape, ZodType } from "zod";

type ZodShape = {
  [K in PropertyKey]: ZodType<unknown, unknown>;
};

export function validateField<
  Shape extends ZodRawShape & ZodShape,
  Field extends keyof Shape,
>(schema: ZodObject<Shape>, field: Field, value: unknown): string[] {
  const fieldSchema = schema.shape[field];
  const result = fieldSchema.safeParse(value);

  return result.success ? [] : result.error.issues.map((i) => i.message);
}
