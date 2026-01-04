import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "tamagui";
import { useAuthStore } from "$lib/store/auth";
import { Home, Compass, User, Send } from "@tamagui/lucide-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import TabIcon from "@/components/custom/tab-icon";

export default function TabLayout() {
  const user = useAuthStore((s) => s.user);
  const theme = useTheme();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background.get(),
      }}
      edges={["top"]}
    >
      <StatusBar
        translucent={false}
        backgroundColor={theme.accent2.get()}
        style="light"
      />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: theme.accentBackground.get(),
          tabBarInactiveTintColor: theme.gray?.get(),
          tabBarStyle: {
            elevation: 20,
            height: 56,
            paddingTop: 2,
            borderTopColor: theme.borderColor.get(),
          },
        }}
      >
        <Tabs.Screen
          name="feed/index"
          options={{
            title: "Feed",
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                focused={focused}
                Icon={Home}
                color={color}
                size={size}
                activeColor={theme.accentBackground.get()}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="discover/index"
          options={{
            title: "Discover",
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                focused={focused}
                Icon={Compass}
                color={color}
                size={size}
                activeColor={theme.accentBackground.get()}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="messages/index"
          options={{
            title: "Messages",
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                focused={focused}
                Icon={Send}
                color={color}
                size={size}
                activeColor={theme.accentBackground.get()}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile/index"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                focused={focused}
                Icon={User}
                color={color}
                size={size}
                activeColor={theme.accentBackground.get()}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
