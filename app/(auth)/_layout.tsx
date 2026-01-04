import { useAuth } from "$lib/context/auth";
import { Redirect, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "tamagui";

export default function TabLayout() {
  const { user } = useAuth();
  const theme = useTheme();
  if (user) {
    return <Redirect href="/feed" />;
  }

  return (
    <>
      <StatusBar backgroundColor={theme.accent2.get()} style="inverted" />
      <Slot />
    </>
  );
}
