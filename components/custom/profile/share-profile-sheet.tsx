import React from "react";
import { Button, Sheet, Text, YStack, XStack, styled, useTheme } from "tamagui";
import { Share } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { X, Share2 } from "@tamagui/lucide-icons";

interface ShareProfileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  username: string;
  profileUrl?: string;
}

const SheetFrame = styled(YStack, {
  borderTopLeftRadius: "$6",
  borderTopRightRadius: "$6",
  bg: "$background",
});

export default function ShareProfileSheet({
  open,
  onOpenChange,
  username,
  profileUrl,
}: ShareProfileSheetProps) {
  const theme = useTheme();

  const shareUrl = profileUrl || `https://confessbay.app/u/${username}`;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out my ConfessBay profile: ${shareUrl}`,
        url: shareUrl,
        title: "Share Profile",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <Sheet
      modal
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={[85]}
      dismissOnSnapToBottom
      zIndex={100000}
      animation="medium"
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
        bg="rgba(0,0,0,0.5)"
      />

      <Sheet.Handle backgroundColor="$gray8" />

      <Sheet.Frame>
        <SheetFrame flex={1} p="$4" gap="$4">
          {/* Header */}
          <XStack justify="space-between" items="center">
            <Text fontSize="$7" fontWeight="700">
              Share Profile
            </Text>
            <Button
              size="$3"
              circular
              chromeless
              icon={<X size={20} />}
              onPress={() => onOpenChange(false)}
            />
          </XStack>

          {/* Content */}
          <YStack flex={1} justify="center" items="center" gap="$6">
            {/* QR Code */}
            <YStack
              p="$4"
              bg="white"
              rounded="$4"
              items="center"
              justify="center"
              shadowColor="$shadowColor"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.1}
              shadowRadius={8}
              elevation={3}
            >
              <QRCode
                value={shareUrl}
                size={220}
                color={theme.color?.val || "#000000"}
                backgroundColor="white"
              />
            </YStack>

            {/* Info Text */}
            <YStack gap="$2" items="center">
              <YStack items="center">
                <Text fontSize="$5" fontWeight="600">
                  @{username}
                </Text>
              </YStack>
              <YStack items="center" maxW={280}>
                <Text fontSize="$3" color="gray">
                  Scan this QR code to visit your profile
                </Text>
              </YStack>
            </YStack>
          </YStack>

          {/* Share Button */}
          <Button
            size="$5"
            bg="$accentColor"
            color="white"
            fontWeight="700"
            icon={<Share2 size={20} color="white" />}
            onPress={handleShare}
            pressStyle={{
              opacity: 0.8,
              scale: 0.98,
            }}
            rounded="$4"
          >
            Share Profile
          </Button>
        </SheetFrame>
      </Sheet.Frame>
    </Sheet>
  );
}
