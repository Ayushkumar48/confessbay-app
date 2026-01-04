import React, {
  ComponentProps,
  ComponentPropsWithRef,
  memo,
  useCallback,
} from "react";
import { Alert, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { VideoView, useVideoPlayer } from "expo-video";
import { YStack, Button, Image, Stack } from "tamagui";
import { X } from "@tamagui/lucide-icons";
import { MediaValue } from "./types";

export interface MediaSelectProps
  extends
    Omit<
      ComponentPropsWithRef<typeof Button>,
      "animation" | "enterStyle" | "exitStyle" | "value" | "onChange"
    >,
    Pick<
      ComponentProps<typeof YStack>,
      "animation" | "enterStyle" | "exitStyle"
    > {
  value?: MediaValue | null;
  onChange?: (media: MediaValue | null) => void;
  placeholder?: string;
  children?: React.ReactNode;
  allow?: ["images"] | ["videos"] | ["images", "videos"];
}

function MediaSelect({
  value,
  onChange,
  placeholder = "Select media",
  children,
  allow = ["images", "videos"],
  animation,
  enterStyle,
  exitStyle,
  ...buttonProps
}: MediaSelectProps) {
  const player = useVideoPlayer(
    value?.type === "videos" ? { uri: value.uri } : {},
  );
  const pickMedia = useCallback(async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }
    const mediaTypes = allow as ("images" | "videos")[];
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!res.canceled) {
      const asset = res.assets[0];
      onChange?.({
        uri: asset.uri,
        type: "images",
        name: asset.fileName,
        size: asset.fileSize,
      });
    }
  }, [onChange, allow]);

  return (
    <YStack
      width="100%"
      gap="$3"
      animation={animation}
      enterStyle={enterStyle}
      exitStyle={exitStyle}
    >
      {children ? (
        <Button onPress={pickMedia} {...buttonProps}>
          {children}
        </Button>
      ) : (
        <Button onPress={pickMedia} {...buttonProps}>
          {value ? "Select another" : placeholder}
        </Button>
      )}

      {value && (
        <Stack position="relative">
          {value.type === "images" && (
            <Image
              source={{ uri: value.uri }}
              width={120}
              height={120}
              borderRadius="$4"
            />
          )}
          {value.type === "videos" && (
            <VideoView
              player={player}
              style={{ width: 200, height: 120 }}
              allowsFullscreen
            />
          )}
          <Pressable
            style={{
              position: "absolute",
              bottom: 8,
              right: 8,
              padding: 4,
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: 4,
            }}
            onPress={() => onChange?.(null)}
          >
            <X size={16} color="white" />
          </Pressable>
        </Stack>
      )}
    </YStack>
  );
}

export default memo(MediaSelect);
