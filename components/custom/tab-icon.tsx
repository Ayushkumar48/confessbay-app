import { Home } from "@tamagui/lucide-icons";
import { memo } from "react";
import { GetThemeValueForKey } from "tamagui";

function TabIcon({
  focused,
  Icon,
  color,
  size,
  activeColor,
}: {
  focused: boolean;
  Icon: typeof Home;
  color: string;
  size: number;
  activeColor: string;
}) {
  return (
    <Icon size={size} fill={focused ? activeColor : "none"} stroke="blue" />
  );
}

export default memo(TabIcon);
