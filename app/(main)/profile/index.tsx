import {
  Text,
  Avatar,
  Button,
  ScrollView,
  YStack,
  XStack,
  Separator,
} from "tamagui";
import {
  Heart,
  MapPin,
  GraduationCap,
  Calendar,
  Lock,
  Edit3,
  LogOut,
  User,
  Grid,
  Shield,
  Share,
} from "@tamagui/lucide-icons";
import { useAuth, User as UserType } from "$lib/context/auth";
import { formatDate } from "@/components/utils/utils";
import AppHeader from "@/components/custom/navbar/app-header";
import ProfileStats from "@/components/custom/profile/profile-stats";

function ProfileHeader({ user }: { user: UserType }) {
  return (
    <XStack pt="$4" justify="space-between">
      <XStack gap="$4" items="center">
        <Avatar size="$10" circular borderWidth={2} borderColor="purple">
          <Avatar.Image src={user.avatar} />
          <Avatar.Fallback bg="purple">
            <User size={40} color="white" />
          </Avatar.Fallback>
        </Avatar>
      </XStack>

      <YStack gap="$2">
        <XStack items="center" gap="$2">
          <Text fontSize="$5" fontWeight="700" color="$color">
            {user.firstName} {user.lastName || ""}
          </Text>
          {user.anonymous && <Lock size={16} color="gray" />}
        </XStack>

        <Text fontSize="$3" color="gray" fontWeight="500">
          @{user.username}
        </Text>

        {user.bio && (
          <Text fontSize="$4" color="$color" lineHeight="$4">
            {user.bio}
          </Text>
        )}

        <XStack gap="$2" flexWrap="wrap" mt="$1">
          {user.city && (
            <XStack
              bg="lightgray"
              px="$2.5"
              py="$1.5"
              rounded="$2"
              items="center"
              gap="$1.5"
            >
              <MapPin size={12} color="black" />
              <Text fontSize="$2" color="black" fontWeight="500">
                {user.city}
              </Text>
            </XStack>
          )}

          {user.collegeId && (
            <XStack
              bg="lightgray"
              px="$2.5"
              py="$1.5"
              rounded="$2"
              items="center"
              gap="$1.5"
            >
              <GraduationCap size={12} color="black" />
              <Text fontSize="$2" color="black" fontWeight="500">
                Student
              </Text>
            </XStack>
          )}

          {user.dateOfBirth && (
            <XStack
              bg="lightgray"
              px="$2.5"
              py="$1.5"
              rounded="$2"
              items="center"
              gap="$1.5"
            >
              <Calendar size={12} color="black" />
              <Text fontSize="$2" color="black" fontWeight="500">
                {formatDate(user.dateOfBirth, "short")}
              </Text>
            </XStack>
          )}
        </XStack>
      </YStack>
    </XStack>
  );
}

function ProfileActions() {
  return (
    <XStack gap="$2">
      <Button
        width="48%"
        size="$3"
        bg="$accentBackground"
        color="white"
        fontWeight="700"
        iconAfter={<Edit3 size={16} />}
      >
        Edit Profile
      </Button>

      <Button
        width="48%"
        size="$3"
        bg="lightgray"
        color="$color"
        fontWeight="700"
        iconAfter={<Share size={16} />}
      >
        Share Profile
      </Button>
    </XStack>
  );
}

function AboutSection({ user }: { user: UserType }) {
  return (
    <YStack px="$4" gap="$3">
      <Text fontSize="$5" fontWeight="700" color="$color">
        About
      </Text>
      <YStack gap="$3">
        <XStack justify="space-between" py="$2.5">
          <XStack items="center" gap="$2" flex={1}>
            <Text fontSize="$3" color="gray" fontWeight="500">
              Gender
            </Text>
          </XStack>
          <Text fontSize="$4" color="$color" fontWeight="600">
            {user.gender || "—"}
          </Text>
        </XStack>

        <Separator />

        <XStack justify="space-between" py="$2.5">
          <XStack items="center" gap="$2" flex={1}>
            <Text fontSize="$3" color="gray" fontWeight="500">
              Zodiac
            </Text>
          </XStack>
          <Text fontSize="$4" color="$color" fontWeight="600">
            {user.zodiacSign || "—"}
          </Text>
        </XStack>

        <Separator />

        <XStack justify="space-between" py="$2.5">
          <XStack items="center" gap="$2" flex={1}>
            <Text fontSize="$3" color="gray" fontWeight="500">
              Open to relationships
            </Text>
          </XStack>
          <Text fontSize="$4" color="$color" fontWeight="600">
            {user.openToRelationships ? "Yes" : "No"}
          </Text>
        </XStack>

        <Separator />

        <XStack justify="space-between" py="$2.5">
          <XStack items="center" gap="$2" flex={1}>
            <Text fontSize="$3" color="gray" fontWeight="500">
              Phone
            </Text>
          </XStack>
          <Text fontSize="$4" color="$color" fontWeight="600">
            {user.phoneNumber}
          </Text>
        </XStack>
      </YStack>
    </YStack>
  );
}

function AccountSection({ user }: { user: UserType }) {
  return (
    <YStack px="$4" gap="$3">
      <Text fontSize="$5" fontWeight="700" color="$color">
        Account
      </Text>

      <YStack gap="$3">
        <XStack justify="space-between" py="$2.5">
          <XStack items="center" gap="$2" flex={1}>
            <Text fontSize="$3" color="gray" fontWeight="500">
              Joined
            </Text>
          </XStack>
          <Text fontSize="$4" color="$color" fontWeight="600">
            {formatDate(user.createdAt, "short")}
          </Text>
        </XStack>

        <Separator />

        <XStack justify="space-between" py="$2.5">
          <XStack items="center" gap="$2" flex={1}>
            <Text fontSize="$3" color="gray" fontWeight="500">
              Email
            </Text>
          </XStack>
          <XStack items="center" gap="$2">
            {user.emailVerified && (
              <Shield size={14} color="$green10" fill="$green10" />
            )}
            <Text fontSize="$4" color="$color" fontWeight="600">
              {user.email}
            </Text>
          </XStack>
        </XStack>

        <Separator />

        <XStack justify="space-between" py="$2.5">
          <XStack items="center" gap="$2" flex={1}>
            <Text fontSize="$3" color="gray" fontWeight="500">
              Location
            </Text>
          </XStack>
          <Text fontSize="$4" color="$color" fontWeight="600">
            {user.city || "Not specified"}
          </Text>
        </XStack>
      </YStack>
    </YStack>
  );
}

function RecentConfessions() {
  return (
    <YStack px="$4" gap="$3">
      <XStack gap="$4" justify="space-around" py="$2">
        <YStack items="center" gap="$2" flex={1} pressStyle={{ opacity: 0.7 }}>
          <Grid size={24} color="purple" />
          <Text fontSize="$2" color="purple" fontWeight="600">
            Recent Confessions
          </Text>
        </YStack>
      </XStack>

      <YStack items="center" justify="center" py="$8" gap="$3">
        <YStack
          bg="gray"
          p="$4"
          rounded="$12"
          items="center"
          justify="center"
          width={80}
          height={80}
        >
          <Heart size={40} color="gray" strokeWidth={1.5} />
        </YStack>
        <Text
          fontSize="$5"
          fontWeight="700"
          color="$color"
          verticalAlign="center"
        >
          My Recent Confessions
        </Text>
        <Text fontSize="$3" color="gray" verticalAlign="center" maxW={280}>
          No confessions yet. Start sharing!
        </Text>
      </YStack>
    </YStack>
  );
}

function LogoutSection({ logout }: { logout: () => void }) {
  return (
    <YStack px="$4" pb="$6" pt="$2">
      <Button
        size="$4"
        bg="transparent"
        borderWidth={1}
        borderColor="$red10"
        color="$red10"
        fontWeight="700"
        pressStyle={{ bg: "$red2" }}
        iconAfter={<LogOut size={18} />}
        onPress={logout}
      >
        Logout
      </Button>
    </YStack>
  );
}

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <ScrollView flex={1} bg="$background">
      <AppHeader justify="center" />
      <YStack gap="$4" px="$2">
        <ProfileHeader user={user} />
        <ProfileActions />
        <ProfileStats totalConfessions={user.totalConfessions} />
        <Separator />
        <AboutSection user={user} />
        <Separator />
        <AccountSection user={user} />
        <Separator />
        <RecentConfessions />
        <LogoutSection logout={logout} />
        <YStack height="$4" />
      </YStack>
    </ScrollView>
  );
}
