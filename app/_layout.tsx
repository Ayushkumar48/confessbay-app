import "../tamagui-web.css";

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
import { ClientShell, useAuth } from "$lib/context/auth";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!interLoaded && !interError) {
    return null;
  }
  return (
    <Providers>
      <ClientShell>
        <AuthBootstrap>
          <RootLayoutNav />
        </AuthBootstrap>
      </ClientShell>
    </Providers>
  );
}

function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const { fetchProfile } = useAuth();
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    fetchProfile().finally(() => {
      setBooted(true);
    });
  }, [fetchProfile]);

  useEffect(() => {
    if (booted) {
      SplashScreen.hideAsync();
    }
  }, [booted]);

  if (!booted) {
    return null;
  }

  return <>{children}</>;
}

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Provider>{children}</Provider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
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
