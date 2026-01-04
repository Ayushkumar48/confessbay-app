import { Home } from "@tamagui/lucide-icons";
import { memo } from "react";
import { GetThemeValueForKey } from "tamagui";

function TabIcon({
  focused,
  Icon,
  size,
  activeColor,
}: {
  focused: boolean;
  Icon: typeof Home;
  size: number;
  activeColor: GetThemeValueForKey<"color">;
}) {
  return (
    <Icon
      size={size}
      color={focused ? activeColor : "dimgray"}
      strokeWidth={focused ? 2.4 : 1.8}
      scale={focused ? 1.06 : 0.98}
      opacity={focused ? 1 : 0.85}
      strokeLinecap="round"
      strokeLinejoin="round"
      animation="smooth"
    />
  );
}

export default memo(TabIcon);
