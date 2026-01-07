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
  MapPin,
  GraduationCap,
  Lock,
  Edit3,
  LogOut,
  User,
  QrCode,
} from "@tamagui/lucide-icons";
import { useAuth, User as UserType } from "$lib/context/auth";
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
    <YStack gap="$2" items="center">
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
    <XStack gap="$2" px="$2">
      <Button
        width="48%"
        size="$2"
        bg="$accentBackground"
        color="white"
        fontWeight="700"
        borderWidth={2}
        borderColor="white"
        icon={<Edit3 size={16} />}
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
        icon={<QrCode size={16} />}
        rounded="$12"
      >
        Share Profile
      </Button>
    </XStack>
  );
}

// function LogoutSection({ logout }: { logout: () => void }) {
//   return (
//     <YStack px="$4" pb="$6" pt="$2">
//       <Button
//         size="$4"
//         bg="transparent"
//         borderWidth={1}
//         borderColor="$red10"
//         color="$red10"
//         fontWeight="700"
//         pressStyle={{ bg: "$red2" }}
//         iconAfter={<LogOut size={18} />}
//         onPress={logout}
//       >
//         Logout
//       </Button>
//     </YStack>
//   );
// }

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <ScrollView flex={1} bg="$background">
      <YStack bg="$accentColor" gap="$4" py="$4">
        <ProfileHeader user={user} />
        <ProfileActions />
      </YStack>
      <Separator />
      <YStack gap="$4" px="$2" pt="$2">
        <ProfileStats />
        <Separator />
        {/*<LogoutSection logout={logout} />*/}
        <YStack height="$4" />
      </YStack>
    </ScrollView>
  );
}
