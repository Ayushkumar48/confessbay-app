import { H5, Tabs, Text, XStack, YStack } from "tamagui";

type ProfileStatsProps = {
  totalConfessions: number;
};

export default function ProfileStats({ totalConfessions }: ProfileStatsProps) {
  return (
    <Tabs defaultValue="confessions" flex={1}>
      <YStack flex={1}>
        <Tabs.List gap="$2" flex={1}>
          <XStack justify="space-between" flex={1}>
            <Tabs.Tab value="confessions">
              <YStack items="center" gap="$0.25">
                <Text fontSize="$5" fontWeight="800" color="$color">
                  {totalConfessions}
                </Text>
                <Text fontSize="$1" color="gray" fontWeight="500">
                  Confessions
                </Text>
              </YStack>
            </Tabs.Tab>
            <Tabs.Tab value="followers">
              <YStack items="center" gap="$0.25">
                <Text fontSize="$5" fontWeight="800" color="$color">
                  0
                </Text>
                <Text fontSize="$1" color="gray" fontWeight="500">
                  Followers
                </Text>
              </YStack>
            </Tabs.Tab>
            <Tabs.Tab value="followings">
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

        <Tabs.Content value="confessions">
          <H5>Tab 1</H5>
        </Tabs.Content>
        <Tabs.Content value="followers">
          <H5>Tab 2</H5>
        </Tabs.Content>
        <Tabs.Content value="followings">
          <H5>Tab 3</H5>
        </Tabs.Content>
      </YStack>
    </Tabs>
  );
}
