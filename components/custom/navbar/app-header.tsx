import { Text, XStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ActionButton from "./action-button";
import { HeaderItem } from "./utils";

export default function AppHeader({
  pagename,
  label,
  headerLeft,
  headerRight,
  onPress,
  icon,
}: HeaderItem) {
  const insets = useSafeAreaInsets();

  return (
    <XStack
      pt={insets.top}
      height={50 + insets.top}
      bg="$accentBackground"
      justify="space-between"
      items="center"
      px="$4"
    >
      <ActionButton {...headerLeft} />
      <Text color="white" fontSize="$6" fontWeight="600">
        ConfessBay
      </Text>
      <ActionButton {...headerRight} />
    </XStack>
  );
}
