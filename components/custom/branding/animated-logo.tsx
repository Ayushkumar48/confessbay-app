import { memo, useMemo } from "react";
import { YStack, Square, H2 } from "tamagui";

export interface AnimatedLogoProps {
  size?: number;
  initials?: string;
  animated?: boolean;
}

function AnimatedLogo({
  size = 56,
  initials = "CB",
  animated = true,
}: AnimatedLogoProps) {
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
  const headingStyle = useMemo(
    () =>
      ({ lineHeight: Math.round(size * 0.9), textAlign: "center" }) as const,
    [size],
  );

  return (
    <YStack
      content="center"
      justify="center"
      role="img"
      aria-label="ConfessBay logo"
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
        <H2 color="floralwhite" style={headingStyle}>
          {initials}
        </H2>
      </Square>
    </YStack>
  );
}

export default memo(AnimatedLogo);
