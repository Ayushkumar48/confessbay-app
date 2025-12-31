import "../tamagui-web.css";

import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { Provider } from "components/Provider";
import { useAuthStore } from "$lib/store/auth";
import { apiFetch } from "$lib/secure/interceptor";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const [authBooted, setAuthBooted] = useState(false);

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const res = await apiFetch("/api/me");
        if (res.ok) {
          const { user, session } = await res.json();
          setAuth(user, session);
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
      } finally {
        setAuthBooted(true);
      }
    };

    bootstrapAuth();
  }, []);

  useEffect(() => {
    if ((interLoaded || interError) && authBooted) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError, authBooted]);

  if ((!interLoaded && !interError) || !authBooted) {
    return null;
  }

  return (
    <Providers>
      <RootLayoutNav />
    </Providers>
  );
}

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
