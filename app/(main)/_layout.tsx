import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "tamagui";
import { Home, Compass, User, Send } from "@tamagui/lucide-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import TabIcon from "@/components/custom/tab-icon";
import { useAuth } from "$lib/context/auth";
import AppHeader from "@/components/custom/navbar/app-header";

export default function TabLayout() {
  const { user } = useAuth();
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
            header: () => <AppHeader title="Feed" />,
            title: "Feed",
            tabBarIcon: ({ focused, size }) => (
              <TabIcon
                focused={focused}
                Icon={Home}
                size={size}
                activeColor="$accentBackground"
              />
            ),
          }}
        />

        <Tabs.Screen
          name="discover/index"
          options={{
            header: () => <AppHeader title="Discover" />,
            title: "Discover",
            tabBarIcon: ({ focused, size }) => (
              <TabIcon
                focused={focused}
                Icon={Compass}
                size={size}
                activeColor="$accentBackground"
              />
            ),
          }}
        />

        <Tabs.Screen
          name="messages/index"
          options={{
            header: () => <AppHeader title="Messages" />,
            title: "Messages",
            tabBarIcon: ({ focused, size }) => (
              <TabIcon
                focused={focused}
                Icon={Send}
                size={size}
                activeColor="$accentBackground"
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile/index"
          options={{
            header: () => <AppHeader title="Profile" />,
            title: "Profile",
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                focused={focused}
                Icon={User}
                size={size}
                activeColor="$accentBackground"
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
