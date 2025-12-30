import { apiFetch } from "$lib/secure/interceptor";
import { FormData } from "@/components/custom/(auth)/signup/Signup";

export async function signup(formData: FormData) {
  const res = await apiFetch("http://10.41.81.62:5173/api/signup", {
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
    user: {
      id: string;
      username: string;
    };
  }>;
}
