import type { LoginSchema, SignupForm } from "$lib/client/schema";
import { apiFetch } from "$lib/secure/interceptor";
import { User } from "$lib/store/auth";

async function signup(formData: SignupForm) {
  const res = await apiFetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message ?? "Signup failed");
  }

  return res.json() as Promise<{
    success: boolean;
    user: User;
  }>;
}

async function login(formData: LoginSchema) {
  const res = await apiFetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message ?? "An unexpected error occurred. Try again.");
  }

  return res.json() as Promise<{
    success: boolean;
    user: User;
  }>;
}

export { signup, login };
