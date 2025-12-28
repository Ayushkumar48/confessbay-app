import React, { memo, useMemo } from "react";
import { YStack, Square, H2 } from "tamagui";

export interface AnimatedLogoProps {
  /**
   * Pixel size for the square containing the logo. Defaults to 56.
   */
  size?: number;

  /**
   * Short text to show inside the logo (usually 1-3 characters).
   */
  initials?: string;

  /**
   * Controls whether the entrance animation is applied.
   */
  animated?: boolean;
}

/**
 * AnimatedLogo
 *
 * A small, fast logo component built with Tamagui primitives.
 * - Memoized to avoid unnecessary re-renders.
 * - Uses useMemo for derived values (animation props / styles).
 * - Safe for both web and native (uses accessibilityRole + aria-label).
 *
 * Notes:
 * - Keep this component very lightweight; avoid heavy computation or dependencies.
 * - The `animated` prop controls whether mount animations are applied.
 */
const AnimatedLogoComponent: React.FC<AnimatedLogoProps> = ({
  size = 56,
  initials = "CB",
  animated = true,
}) => {
  // Memoize animation strings / styles so they don't get recreated each render.
  const animation = useMemo(
    () => (animated ? "bouncy" : undefined),
    [animated],
  );

  const enterStyle = useMemo(
    () => (animated ? { opacity: 0, scale: 0.75, y: -6 } : undefined),
    [animated],
  );

  const exitStyle = useMemo(
    () => (animated ? { opacity: 0, scale: 0.95 } : undefined),
    [animated],
  );

  // H2 inline style for consistent line height based on the given size.
  const headingStyle = useMemo(
    () =>
      ({ lineHeight: Math.round(size * 0.9), textAlign: "center" }) as const,
    [size],
  );

  return (
    <YStack
      // Layout + accessibility
      content="center"
      justify="center"
      role="img"
      aria-label="ConfessBay logo"
      // Animation (applied to the wrapper, not the inner text/input)
      animation={animation}
      enterStyle={enterStyle}
      exitStyle={exitStyle}
    >
      <Square
        size={size}
        rounded="$4"
        bg="$accentBackground"
        justify="center"
        verticalAlign="center"
        elevation={2}
      >
        <H2 color="$color" style={headingStyle}>
          {initials}
        </H2>
      </Square>
    </YStack>
  );
};

AnimatedLogoComponent.displayName = "AnimatedLogo";

export const AnimatedLogo = memo(AnimatedLogoComponent);
export default AnimatedLogo;
