import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "tamagui";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <>
      <StatusBar backgroundColor={theme.accent2.get()} style="inverted" />
      <Slot />
    </>
  );
}
