import { Text, XStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Menu } from "@tamagui/lucide-icons";

export default function AppHeader({ title }: { title: string }) {
  const insets = useSafeAreaInsets();

  return (
    <XStack
      pt={insets.top}
      height={40 + insets.top}
      bg="$accentBackground"
      justify="space-between"
      items="center"
      px="$4"
    >
      <Text color="white" fontSize="$5" fontWeight="600">
        {title}
      </Text>
      <Text color="white" fontSize="$6" fontWeight="600">
        ConfessBay
      </Text>
      <Menu color="white" />
    </XStack>
  );
}
