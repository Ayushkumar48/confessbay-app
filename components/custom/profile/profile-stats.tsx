import React from "react";
import {
  AnimatePresence,
  H5,
  Tabs,
  Text,
  XStack,
  YStack,
  styled,
  type TabsTabProps,
  type TabLayout,
  type StackProps,
} from "tamagui";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

type ProfileStatsProps = {
  totalConfessions: number;
};

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

export default function ProfileStats({ totalConfessions }: ProfileStatsProps) {
  const tabs = ["confessions", "followers", "followings"];

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
                paddingHorizontal="$3.5"
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
                value="followers"
                onInteraction={handleOnInteraction}
                paddingVertical="$1"
                paddingHorizontal="$3.5"
              >
                <YStack items="center" gap="$0.25">
                  <Text fontSize="$5" fontWeight="800" color="$color">
                    0
                  </Text>
                  <Text fontSize="$1" color="gray" fontWeight="500">
                    Followers
                  </Text>
                </YStack>
              </Tabs.Tab>
              <Tabs.Tab
                unstyled
                value="followings"
                onInteraction={handleOnInteraction}
                paddingVertical="$1"
                paddingHorizontal="$3.5"
              >
                <YStack items="center" gap="$0.25">
                  <Text fontSize="$5" fontWeight="800" color="$color">
                    0
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
              <AnimatedYStack key={currentTab}>
                <Tabs.Content value={currentTab} forceMount flex={1}>
                  <H5>{currentTab}</H5>
                </Tabs.Content>
              </AnimatedYStack>
            </AnimatePresence>
          </YStack>
        </GestureDetector>
      </YStack>
    </Tabs>
  );
}
