import {
  Text,
  Avatar,
  Button,
  ScrollView,
  YStack,
  XStack,
  Separator,
  useTheme,
} from "tamagui";
import {
  Heart,
  MapPin,
  GraduationCap,
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
import ProfileStats from "@/components/custom/profile/profile-stats";
import Svg, { Circle } from "react-native-svg";

function calculateProfileCompletion(user: UserType): number {
  let completed = 0;
  let total = 10;

  if (user.firstName) completed++;
  if (user.lastName) completed++;
  if (user.bio) completed++;
  if (user.avatar) completed++;
  if (user.city) completed++;
  if (user.gender) completed++;
  if (user.zodiacSign) completed++;
  if (user.phoneNumber) completed++;
  if (user.collegeId) completed++;
  if (user.emailVerified) completed++;

  return Math.round((completed / total) * 100);
}

function CircularProgress({
  percentage,
  size = 120,
  strokeWidth = 9,
  userAvatar,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  userAvatar: string;
}) {
  const theme = useTheme();
  const accentColor = theme.accentBackground.get();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <YStack
      position="relative"
      width={size}
      height={size}
      items="center"
      justify="center"
    >
      <Svg
        width={size}
        height={size}
        style={{ transform: [{ rotate: "-90deg" }] }}
      >
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={accentColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <YStack
        position="absolute"
        width={size}
        height={size}
        items="center"
        justify="center"
      >
        <Avatar size="$10">
          <Avatar.Image src={userAvatar} />
          <Avatar.Fallback>
            <User size={40} color="white" />
          </Avatar.Fallback>
        </Avatar>
        {/* Percentage badge */}
        <YStack
          position="absolute"
          b={-2}
          bg="#FFD700"
          px="$2"
          rounded="$8"
          borderWidth={0.5}
          borderColor="white"
        >
          <Text fontSize="$2" fontWeight="800" color="black">
            {percentage}%
          </Text>
        </YStack>
      </YStack>
    </YStack>
  );
}

function ProfileHeader({ user }: { user: UserType }) {
  const completionPercentage = calculateProfileCompletion(user);

  return (
    <YStack gap="$2" py="$4" mb="$2" items="center" bg="$accentColor">
      <YStack gap="$2" items="center">
        <XStack items="center" gap="$1">
          <Text fontSize="$5" fontWeight="700" color="white">
            {user.firstName} {user.lastName || ""}
          </Text>
          {user.anonymous && <Lock size={16} color="white" />}
        </XStack>

        <Text fontSize="$3" color="white" fontWeight="500">
          @{user.username}
        </Text>
      </YStack>
      <XStack gap="$4" items="center">
        <CircularProgress
          percentage={completionPercentage}
          userAvatar={user.avatar}
        />
      </XStack>

      <YStack gap="$2">
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
        </XStack>
      </YStack>
    </YStack>
  );
}

function ProfileActions() {
  return (
    <XStack gap="$2">
      <Button
        width="48%"
        size="$2"
        bg="$accentBackground"
        color="white"
        fontWeight="700"
        iconAfter={<Edit3 size={16} />}
        rounded="$12"
      >
        Edit Profile
      </Button>

      <Button
        width="48%"
        size="$2"
        bg="lightgray"
        color="$color"
        fontWeight="700"
        iconAfter={<Share size={16} />}
        rounded="$12"
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
      <ProfileHeader user={user} />
      <YStack gap="$4" px="$2">
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
