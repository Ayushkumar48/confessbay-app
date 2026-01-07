import React from "react";
import {
  AnimatePresence,
  Tabs,
  Text,
  XStack,
  YStack,
  styled,
  Spinner,
  type TabsTabProps,
  type TabLayout,
  type StackProps,
} from "tamagui";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "$lib/secure/interceptor";
import {
  ProfilePageLoadSchema,
  type GetMyConfessionPostsResponseSchema,
  type UserFriendsItemSchema,
  type UserFollowersItemSchema,
  type UserFollowingsItemSchema,
} from "$lib/server/additional-schema";
import type { z } from "zod";

// Types
type ConfessionsData = z.infer<typeof GetMyConfessionPostsResponseSchema>;
type FriendsData = z.infer<typeof UserFriendsItemSchema>[];
type FollowersData = z.infer<typeof UserFollowersItemSchema>[];
type FollowingsData = z.infer<typeof UserFollowingsItemSchema>[];

// Styled Components
const TabsRovingIndicator = ({
  active,
  ...props
}: { active?: boolean } & StackProps) => {
  return (
    <YStack
      position="absolute"
      backgroundColor="$color5"
      opacity={0.7}
      animation="fast"
      enterStyle={{
        opacity: 0,
      }}
      exitStyle={{
        opacity: 0,
      }}
      {...(active && {
        backgroundColor: "$color8",
        opacity: 0.6,
      })}
      {...props}
    />
  );
};

const AnimatedYStack = styled(YStack, {
  flex: 1,
  x: 0,
  opacity: 1,
  animation: "quick",
  variants: {
    // 1 = right, 0 = nowhere, -1 = left
    direction: {
      ":number": (direction) => ({
        enterStyle: {
          x: direction > 0 ? -25 : 25,
          opacity: 0,
        },
        exitStyle: {
          zIndex: 0,
          x: direction < 0 ? -25 : 25,
          opacity: 0,
        },
      }),
    },
  } as const,
});

// Empty State Component
const EmptyState = ({ message }: { message: string }) => (
  <YStack items="center" justify="center" flex={1} gap="$2">
    <Text color="gray" fontSize="$4">
      {message}
    </Text>
  </YStack>
);

// Tab Content Components
const ConfessionsTab = ({ data }: { data: ConfessionsData }) => {
  return (
    <YStack flex={1} p="$4" gap="$3">
      <Text fontSize="$6" fontWeight="700">
        Confessions ({data.length})
      </Text>
      {data.length === 0 ? (
        <EmptyState message="No confessions yet" />
      ) : (
        <YStack gap="$2">
          {data.map((item) => (
            <YStack
              key={item.confession.id}
              p="$3"
              bg="$background"
              rounded="$3"
              borderWidth={1}
              borderColor="$borderColor"
            >
              <Text numberOfLines={2}>{item.confession.message}</Text>
              <Text fontSize="$2" color="gray" mt="$2">
                {new Date(item.confession.createdAt).toLocaleDateString()}
              </Text>
            </YStack>
          ))}
        </YStack>
      )}
    </YStack>
  );
};

const FriendsTab = ({ data }: { data: FriendsData }) => {
  return (
    <YStack flex={1} p="$4" gap="$3">
      <Text fontSize="$6" fontWeight="700">
        Friends ({data.length})
      </Text>
      {data.length === 0 ? (
        <EmptyState message="No friends yet" />
      ) : (
        <YStack gap="$2">
          {data.map((item) => (
            <XStack
              key={item.friends.id}
              p="$3"
              bg="$background"
              rounded="$3"
              borderWidth={1}
              borderColor="$borderColor"
              items="center"
              gap="$3"
            >
              <YStack flex={1}>
                <Text fontWeight="600">
                  {item.user.firstName} {item.user.lastName}
                </Text>
                <Text fontSize="$2" color="gray">
                  @{item.user.username}
                </Text>
              </YStack>
            </XStack>
          ))}
        </YStack>
      )}
    </YStack>
  );
};

const FollowersTab = ({ data }: { data: FollowersData }) => {
  return (
    <YStack flex={1} p="$4" gap="$3">
      <Text fontSize="$6" fontWeight="700">
        Followers ({data.length})
      </Text>
      {data.length === 0 ? (
        <EmptyState message="No followers yet" />
      ) : (
        <YStack gap="$2">
          {data.map((item) => (
            <XStack
              key={`${item.followers.followerId}-${item.followers.followingId}`}
              p="$3"
              bg="$background"
              rounded="$3"
              borderWidth={1}
              borderColor="$borderColor"
              items="center"
              gap="$3"
            >
              <YStack flex={1}>
                <Text fontWeight="600">
                  {item.user.firstName} {item.user.lastName}
                </Text>
                <Text fontSize="$2" color="gray">
                  @{item.user.username}
                </Text>
              </YStack>
            </XStack>
          ))}
        </YStack>
      )}
    </YStack>
  );
};

const FollowingTab = ({ data }: { data: FollowingsData }) => {
  return (
    <YStack flex={1} p="$4" gap="$3">
      <Text fontSize="$6" fontWeight="700">
        Following ({data.length})
      </Text>
      {data.length === 0 ? (
        <EmptyState message="Not following anyone yet" />
      ) : (
        <YStack gap="$2">
          {data.map((item) => (
            <XStack
              key={`${item.following.followerId}-${item.following.followingId}`}
              p="$3"
              bg="$background"
              rounded="$3"
              borderWidth={1}
              borderColor="$borderColor"
              items="center"
              gap="$3"
            >
              <YStack flex={1}>
                <Text fontWeight="600">
                  {item.user.firstName} {item.user.lastName}
                </Text>
                <Text fontSize="$2" color="gray">
                  @{item.user.username}
                </Text>
              </YStack>
            </XStack>
          ))}
        </YStack>
      )}
    </YStack>
  );
};

// Main Component
export default function ProfileStats() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile-stats"],
    queryFn: async () => {
      const response = await apiFetch("/api/profile");
      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }
      const json = await response.json();
      return ProfilePageLoadSchema.parse(json);
    },
  });

  const tabs = ["confessions", "friends", "followers", "following"];

  const [tabState, setTabState] = React.useState<{
    currentTab: string;
    intentAt: TabLayout | null;
    activeAt: TabLayout | null;
    prevActiveAt: TabLayout | null;
  }>({
    activeAt: null,
    currentTab: "confessions",
    intentAt: null,
    prevActiveAt: null,
  });

  const setCurrentTab = (currentTab: string) =>
    setTabState({ ...tabState, currentTab });

  const setIntentIndicator = (intentAt: TabLayout | null) =>
    setTabState({ ...tabState, intentAt });

  const setActiveIndicator = (activeAt: TabLayout | null) =>
    setTabState({
      ...tabState,
      prevActiveAt: tabState.activeAt,
      activeAt,
    });

  const { activeAt, intentAt, prevActiveAt, currentTab } = tabState;

  // 1 = right, 0 = nowhere, -1 = left
  const direction = (() => {
    if (!activeAt || !prevActiveAt || activeAt.x === prevActiveAt.x) {
      return 0;
    }
    return activeAt.x > prevActiveAt.x ? -1 : 1;
  })();

  const handleOnInteraction: TabsTabProps["onInteraction"] = (type, layout) => {
    if (type === "select") {
      setActiveIndicator(layout);
    } else {
      setIntentIndicator(layout);
    }
  };

  const switchToTab = (newTab: string) => {
    setCurrentTab(newTab);
  };

  const pan = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .failOffsetY([-10, 10])
    .onEnd((event) => {
      const currentIndex = tabs.indexOf(currentTab);
      const velocityThreshold = 300;
      const distanceThreshold = 30;

      if (
        event.velocityX > velocityThreshold ||
        event.translationX > distanceThreshold
      ) {
        // Swipe right - go to previous tab
        if (currentIndex > 0) {
          switchToTab(tabs[currentIndex - 1]);
        }
      } else if (
        event.velocityX < -velocityThreshold ||
        event.translationX < -distanceThreshold
      ) {
        // Swipe left - go to next tab
        if (currentIndex < tabs.length - 1) {
          switchToTab(tabs[currentIndex + 1]);
        }
      }
    })
    .runOnJS(true);

  if (isLoading) {
    return (
      <YStack flex={1} items="center" justify="center" p="$4">
        <Spinner size="large" color="$color" />
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack flex={1} items="center" justify="center" p="$4">
        <Text color="$red10">Failed to load profile stats</Text>
      </YStack>
    );
  }

  const totalConfessions = data?.allConfessions.length ?? 0;
  const totalFriends = data?.allFriends.length ?? 0;
  const totalFollowers = data?.followers.length ?? 0;
  const totalFollowing = data?.following.length ?? 0;

  return (
    <Tabs
      value={currentTab}
      onValueChange={setCurrentTab}
      flex={1}
      orientation="horizontal"
      flexDirection="column"
      activationMode="manual"
    >
      <YStack flex={1}>
        <YStack position="relative">
          <AnimatePresence>
            {intentAt && (
              <TabsRovingIndicator
                rounded="$2"
                width={intentAt.width}
                height={intentAt.height}
                x={intentAt.x}
                y={intentAt.y}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {activeAt && (
              <TabsRovingIndicator
                rounded="$2"
                active
                width={activeAt.width}
                height={activeAt.height}
                x={activeAt.x}
                y={activeAt.y}
              />
            )}
          </AnimatePresence>

          <Tabs.List
            gap="$2"
            flex={1}
            disablePassBorderRadius
            backgroundColor="transparent"
          >
            <XStack justify="space-between" flex={1}>
              <Tabs.Tab
                unstyled
                value="confessions"
                onInteraction={handleOnInteraction}
                paddingVertical="$1"
                paddingHorizontal="$2"
              >
                <YStack items="center" gap="$0.25">
                  <Text fontSize="$5" fontWeight="800" color="$color">
                    {totalConfessions}
                  </Text>
                  <Text fontSize="$1" color="gray" fontWeight="500">
                    Confessions
                  </Text>
                </YStack>
              </Tabs.Tab>
              <Tabs.Tab
                unstyled
                value="friends"
                onInteraction={handleOnInteraction}
                paddingVertical="$1"
                paddingHorizontal="$2"
              >
                <YStack items="center" gap="$0.25">
                  <Text fontSize="$5" fontWeight="800" color="$color">
                    {totalFriends}
                  </Text>
                  <Text fontSize="$1" color="gray" fontWeight="500">
                    Friends
                  </Text>
                </YStack>
              </Tabs.Tab>
              <Tabs.Tab
                unstyled
                value="followers"
                onInteraction={handleOnInteraction}
                paddingVertical="$1"
                paddingHorizontal="$2"
              >
                <YStack items="center" gap="$0.25">
                  <Text fontSize="$5" fontWeight="800" color="$color">
                    {totalFollowers}
                  </Text>
                  <Text fontSize="$1" color="gray" fontWeight="500">
                    Followers
                  </Text>
                </YStack>
              </Tabs.Tab>
              <Tabs.Tab
                unstyled
                value="following"
                onInteraction={handleOnInteraction}
                paddingVertical="$1"
                paddingHorizontal="$2"
              >
                <YStack items="center" gap="$0.25">
                  <Text fontSize="$5" fontWeight="800" color="$color">
                    {totalFollowing}
                  </Text>
                  <Text fontSize="$1" color="gray" fontWeight="500">
                    Following
                  </Text>
                </YStack>
              </Tabs.Tab>
            </XStack>
          </Tabs.List>
        </YStack>

        <GestureDetector gesture={pan}>
          <YStack flex={1}>
            <AnimatePresence
              exitBeforeEnter
              custom={{ direction }}
              initial={false}
            >
              <AnimatedYStack key={currentTab} flex={1}>
                {data && (
                  <>
                    {currentTab === "confessions" && (
                      <ConfessionsTab data={data.allConfessions} />
                    )}

                    {currentTab === "friends" && (
                      <FriendsTab data={data.allFriends} />
                    )}

                    {currentTab === "followers" && (
                      <FollowersTab data={data.followers} />
                    )}

                    {currentTab === "following" && (
                      <FollowingTab data={data.following} />
                    )}
                  </>
                )}
              </AnimatedYStack>
            </AnimatePresence>
          </YStack>
        </GestureDetector>
      </YStack>
    </Tabs>
  );
}
