import { getCookies, saveCookies } from "./cookie-helper";

export async function apiFetch(url: string, options: RequestInit = {}) {
  const cookies = await getCookies();

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(cookies ? { Cookie: cookies } : {}),
      ...options.headers,
    },
    credentials: "include",
  });

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    await saveCookies(setCookie);
  }

  return res;
}
