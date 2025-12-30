import z from "zod";
import { gender } from "./enums";

const loginSchema = z.object({
  username: z
    .string()
    .min(2, { error: "Username must be at least 2 characters long" })
    .max(100),
  password: z
    .string()
    .min(1, { error: "Password must not be empty!" })
    .max(100),
});

type LoginSchema = z.infer<typeof loginSchema>;

const step1Schema = z.object({
  firstName: z
    .string()
    .min(2, { error: "First name must be at least 2 characters long" })
    .max(100, { error: "First name must be at most 100 characters long" }),
  lastName: z
    .string()
    .min(2, { error: "Last name must be at least 2 characters long" })
    .max(100, { error: "Last name must be at most 100 characters long" }),
});

const step2Schema = z.object({
  username: z
    .string()
    .min(2, { error: "Username must be at least 2 characters long" })
    .max(100, { error: "Username must be at most 100 characters long" }),
  email: z.email({ error: "Invalid email address" }),
  phoneNumber: z.string().optional(),
});

const step3Schema = z
  .object({
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters long" })
      .refine(
        (val) =>
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(val),
        {
          error:
            "Password must contain at least one letter, one number, and one special character",
        },
      ),
    confirmPassword: z.string().min(8).max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

const step4Schema = z.object({
  gender: z.enum(gender, { error: "Please select you gender" }),
  dateOfBirth: z.date().optional(),
});

const step5Schema = z.object({
  city: z.string().optional(),
});

const step6Schema = z.object({
  avatar: z
    .instanceof(File, { error: "Please upload a file." })
    .refine((f) => f.size <= 10_000_000, "Max 10 MB upload size.")
    .optional(),
});

type Step1Schema = z.infer<typeof step1Schema>;
type Step2Schema = z.infer<typeof step2Schema>;
type Step3Schema = z.infer<typeof step3Schema>;
type Step4Schema = z.infer<typeof step4Schema>;
type Step5Schema = z.infer<typeof step5Schema>;
type Step6Schema = z.infer<typeof step6Schema>;

export {
  loginSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
};
export type {
  LoginSchema,
  Step1Schema,
  Step2Schema,
  Step3Schema,
  Step4Schema,
  Step5Schema,
  Step6Schema,
};
