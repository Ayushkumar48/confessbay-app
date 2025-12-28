import z from "zod";

const loginSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long" })
    .max(100),
  password: z
    .string()
    .min(1, { message: "Password must not be empty!" })
    .max(100),
});

type LoginSchema = typeof loginSchema;

export { loginSchema };
export type { LoginSchema };
