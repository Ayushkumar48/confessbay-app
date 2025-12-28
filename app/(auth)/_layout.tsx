import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTheme, YStack } from "tamagui";
import { LogIn, UserPlus } from "@tamagui/lucide-icons";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <>
      <StatusBar backgroundColor={theme.accent2.get()} style="inverted" />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: theme.red10.get(),
          tabBarStyle: {
            backgroundColor: theme.background.get(),
            borderTopColor: theme.borderColor.get(),
          },
          headerStyle: {
            backgroundColor: theme.background.get(),
            borderBottomColor: theme.borderColor.get(),
          },
          headerTintColor: theme.color.get(),
          animation: "shift",
        }}
      >
        <Tabs.Screen
          name="login/index"
          options={{
            title: "Login",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <YStack
                animation="quick"
                scale={focused ? 1.1 : 1}
                background={
                  focused ? theme.accentBackground.get() : "transparent"
                }
                rounded="$2"
                p="$1"
              >
                <LogIn color={color as any} />
              </YStack>
            ),
          }}
        />

        <Tabs.Screen
          name="signup/index"
          options={{
            title: "Create Account",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <YStack
                animation="quick"
                scale={focused ? 1.1 : 1}
                background={
                  focused ? theme.accentBackground.get() : "transparent"
                }
                rounded="$2"
                p="$1"
              >
                <UserPlus color={color as any} />
              </YStack>
            ),
          }}
        />
      </Tabs>
    </>
  );
}
