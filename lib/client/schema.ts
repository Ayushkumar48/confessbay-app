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

const step1Schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
});

const step2Schema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long" })
    .max(100),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().optional(),
});

const step3Schema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(100),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const step4Schema = z.object({
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional(),
  dateOfBirth: z.date().optional(),
});

const step5Schema = z.object({
  city: z.string().min(1, { message: "City is required" }),
});

const step6Schema = z.object({
  avatar: z.string().optional(),
});

type Step1Schema = typeof step1Schema;
type Step2Schema = typeof step2Schema;
type Step3Schema = typeof step3Schema;
type Step4Schema = typeof step4Schema;
type Step5Schema = typeof step5Schema;
type Step6Schema = typeof step6Schema;

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
