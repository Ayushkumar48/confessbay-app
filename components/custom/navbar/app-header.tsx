import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ComponentProps } from "react";
import { XStack, Text } from "tamagui";

type AppHeaderProps = {
  leftChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
} & ComponentProps<typeof XStack>;

export default function AppHeader({
  leftChildren,
  rightChildren,
  bg = "$accentBackground",
  ...props
}: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <XStack
      pt={insets.top}
      height={45 + insets.top}
      bg={bg}
      justify="space-between"
      items="center"
      px="$4"
      {...props}
    >
      {leftChildren}
      <Text color="white" fontSize="$6" fontWeight="800">
        ConfessBay
      </Text>
      {rightChildren}
    </XStack>
  );
}
