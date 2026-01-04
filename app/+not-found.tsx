import { Link, Stack } from "expo-router";
import { YStack, Text, Button, View } from "tamagui";
import { useEffect, useState } from "react";

export default function NotFoundScreen() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: "Oops! Page Not Found" }} />
      <View
        flex={1}
        bg="$background"
        p="$4"
        animation="bouncy"
        enterStyle={{ opacity: 0, scale: 0.9 }}
        exitStyle={{ opacity: 0, scale: 0.9 }}
        justify="center"
        items="center"
      >
        {showContent && (
          <YStack
            gap="$6"
            animation="quick"
            enterStyle={{ opacity: 0, y: 20 }}
            exitStyle={{ opacity: 0, y: -20 }}
            items="center"
          >
            {/* Illustration with Emojis */}
            <YStack gap="$2" items="center">
              <Text fontSize={120} animation="bouncy" enterStyle={{ scale: 0 }}>
                😵
              </Text>
              <Text
                fontSize={80}
                animation="quick"
                enterStyle={{ opacity: 0, y: 10 }}
              >
                🚀
              </Text>
            </YStack>

            {/* Title */}
            <YStack gap="$2" items="center">
              <Text
                fontSize="$10"
                fontWeight="bold"
                color="$color"
                animation="quick"
                enterStyle={{ opacity: 0, x: -20 }}
              >
                404
              </Text>
              <Text
                fontSize="$6"
                color="$color"
                opacity={0.8}
                animation="quick"
                enterStyle={{ opacity: 0, x: 20 }}
              >
                Page Not Found
              </Text>
            </YStack>

            <Text
              fontSize="$4"
              color="$color"
              maxW={300}
              animation="quick"
              enterStyle={{ opacity: 0, y: 10 }}
              text="center"
            >
              Looks like you&apos;ve ventured into the unknown! 🌌 The page
              you&apos;re looking for doesn&apos;t exist.
            </Text>

            <Link href="/" asChild>
              <Button
                size="$5"
                theme="accent"
                animation="bouncy"
                enterStyle={{ opacity: 0, scale: 0.8 }}
                pressStyle={{ scale: 0.95 }}
              >
                🏠 Go Home
              </Button>
            </Link>
          </YStack>
        )}
      </View>
    </>
  );
}
