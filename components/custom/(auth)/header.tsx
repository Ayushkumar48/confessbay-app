import { H2, Paragraph, YStack } from "tamagui";
import AnimatedLogo from "../branding/AnimatedLogo";

export function Header({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <YStack gap="$2" items="center" justify="center">
      <AnimatedLogo size={64} initials="CB" animated />
      <H2
        color="$color"
        animation={{
          type: "timing",
          duration: "600ms",
          delay: "200ms",
        }}
        enterStyle={{ opacity: 0, y: -6 }}
      >
        {title}
      </H2>
      <Paragraph size="$3" color="$color" opacity={0.8}>
        {description}
      </Paragraph>
    </YStack>
  );
}
