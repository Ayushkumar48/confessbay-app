import { defaultConfig } from "@tamagui/config/v4";
import { themes } from "./components/utils/theme";
import { createAnimations } from "@tamagui/animations-moti";
import { createTamagui } from "tamagui";

export const config = createTamagui({
  ...defaultConfig,
  animations: createAnimations({
    fast: {
      type: "spring",
      damping: 20,
      mass: 1.2,
      stiffness: 250,
    },
    medium: {
      type: "spring",
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
    slow: {
      type: "spring",
      damping: 20,
      stiffness: 60,
    },
  }),
  themes,
});

export default config;

export type Conf = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
