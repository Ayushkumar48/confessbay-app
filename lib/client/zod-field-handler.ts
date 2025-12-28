import type { ZodObject, ZodType } from "zod";

export function handleFieldChange<
  TForm extends Record<string, unknown>,
  TShape extends Record<string, ZodType<unknown>>,
  K extends keyof TForm & keyof TShape,
>(
  form: TForm,
  errors: Record<keyof TForm, string[]>,
  schema: ZodObject<TShape>,
  field: K,
  value: TForm[K],
) {
  form[field] = value;

  const fieldSchema = schema.shape[field];
  const result = fieldSchema.safeParse(value);

  errors[field] = result.success
    ? []
    : result.error.issues.map((i) => i.message);
}
