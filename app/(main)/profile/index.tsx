import {
  Text,
  Avatar,
  Button,
  ScrollView,
  YStack,
  XStack,
  Theme,
} from "tamagui";
import {
  Heart,
  MapPin,
  GraduationCap,
  Calendar,
  Shield,
  EyeOff,
} from "@tamagui/lucide-icons";
import { useAuth } from "$lib/context/auth";
import { Redirect } from "expo-router";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Theme name="dark">
      <ScrollView flex={1} bg="$background">
        <YStack p="$4" gap="$4">
          <YStack items="center" gap="$2">
            <Avatar size="$10" circular>
              <Avatar.Image src={user.avatar} />
              <Avatar.Fallback bg="gray" />
            </Avatar>
            <Text fontSize="$8" fontWeight="bold" color="$color">
              {user.firstName} {user.lastName || ""}{" "}
              {user.anonymous ? "👤" : ""}
            </Text>
            <Text fontSize="$5" color="lightslategray">
              @{user.username}
            </Text>
            {user.bio && (
              <Text fontSize="$4" text="center" color="$color">
                {user.bio} 💬
              </Text>
            )}
          </YStack>

          <XStack justify="space-around" p="$2" bg="gray" rounded="$4">
            <YStack items="center">
              <Heart size={24} color="$red10" />
              <Text fontSize="$6" fontWeight="bold" color="$color">
                {user.totalConfessions}
              </Text>
              <Text fontSize="$3" color="lightslategray">
                Confessions ❤️
              </Text>
            </YStack>
            <YStack items="center">
              <EyeOff size={24} color="blue" />
              <Text fontSize="$6" fontWeight="bold" color="$color">
                {user.anonymous ? "Yes" : "No"}
              </Text>
              <Text fontSize="$3" color="lightslategray">
                Anonymous 🔒
              </Text>
            </YStack>
          </XStack>

          <YStack gap="$3" p="$4" bg="gray" rounded="$6">
            <XStack items="center" gap="$2">
              <GraduationCap size={20} color="$green10" />
              <Text fontSize="$4" color="$color">
                College: {user.collegeId ? "Your College" : "Not specified"} 🎓
              </Text>
            </XStack>
            <XStack items="center" gap="$2">
              <MapPin size={20} color="orange" />
              <Text fontSize="$4" color="$color">
                City: {user.city || "Not specified"} 📍
              </Text>
            </XStack>
            <XStack items="center" gap="$2">
              <Calendar size={20} color="purple" />
              <Text fontSize="$4" color="$color">
                DOB: {user.dateOfBirth ? user.dateOfBirth : "Not specified"} 🎂
              </Text>
            </XStack>
            <XStack items="center" gap="$2">
              <Shield size={20} color="$yellow10" />
              <Text fontSize="$4" color="$color">
                Zodiac: {user.zodiacSign || "Not specified"} ♈
              </Text>
            </XStack>
            <Text fontSize="$4" color="$color">
              Open to Relationships:{" "}
              {user.openToRelationships ? "Yes 💕" : "No 🚫"}
            </Text>
            <Text fontSize="$4" color="$color">
              Email Verified: {user.emailVerified ? "Yes ✅" : "No ❌"}
            </Text>
            <Text fontSize="$4" color="$color">
              Phone Verified: {user.phoneVerified ? "Yes 📱" : "No ❌"}
            </Text>
          </YStack>

          <YStack gap="$2">
            <Button theme="success" onPress={() => {}}>
              Edit Profile ✏️
            </Button>
            <Button theme="error" onPress={logout}>
              Logout 🚪
            </Button>
          </YStack>
        </YStack>
      </ScrollView>
    </Theme>
  );
}
