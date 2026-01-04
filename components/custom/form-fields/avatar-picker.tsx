import { memo, useCallback } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { YStack, Image, Text, View, XStack } from "tamagui";
import { Camera, X } from "@tamagui/lucide-icons";
import { MediaValue } from "./types";

interface AvatarPickerProps {
  value?: MediaValue | null;
  onChange?: (media: MediaValue | null) => void;
  size?: number;
}

function AvatarPicker({ value, onChange, size = 96 }: AvatarPickerProps) {
  const pickAvatar = useCallback(async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Please allow access to your photos");
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
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
  }, [onChange]);

  const removeAvatar = useCallback(() => {
    Alert.alert("Remove photo?", "This will remove your profile picture.", [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => onChange?.(null) },
    ]);
  }, [onChange]);

  return (
    <YStack
      items="center"
      position="relative"
      width={size}
      height={size}
      self="center"
    >
      <View
        width={size}
        height={size}
        rounded={size / 2}
        overflow="hidden"
        bg="lightgrey"
        pressStyle={{ opacity: 0.85 }}
        onPress={pickAvatar}
        justify="center"
        items="center"
      >
        {value?.uri ? (
          <Image source={{ uri: value.uri }} width="100%" height="100%" />
        ) : (
          <Text color="gray">Add Photo</Text>
        )}
      </View>

      <XStack
        position="absolute"
        b={0}
        r={0}
        bg="$background"
        rounded="$10"
        p="$2"
        elevation="$1"
        pressStyle={{ opacity: 0.8 }}
        onPress={pickAvatar}
      >
        <Camera size={16} />
      </XStack>

      {value?.uri && (
        <XStack
          position="absolute"
          t={0}
          r={0}
          bg="$background"
          rounded="$10"
          p="$1.5"
          elevation="$1"
          pressStyle={{ opacity: 0.7 }}
          onPress={removeAvatar}
        >
          <X size={14} color="$red10" />
        </XStack>
      )}
    </YStack>
  );
}

export default memo(AvatarPicker);
