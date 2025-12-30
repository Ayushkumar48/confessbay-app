import * as SecureStore from "expo-secure-store";

export const COOKIE_KEY = "confessbay_cookies";

export async function saveCookies(setCookieHeader: string) {
  await SecureStore.setItemAsync(COOKIE_KEY, setCookieHeader);
}

export async function getCookies() {
  return await SecureStore.getItemAsync(COOKIE_KEY);
}
