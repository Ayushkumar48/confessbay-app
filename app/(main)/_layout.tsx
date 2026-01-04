import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import TabIcon from "@/components/custom/tab-icon";
import { useAuth } from "$lib/context/auth";
import AppHeader from "@/components/custom/navbar/app-header";
import { headerItems, hiddenItems } from "@/components/custom/navbar/utils";

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
        {headerItems.map((item, index) => (
          <Tabs.Screen
            key={index}
            name={item.pagename}
            options={{
              header: () => <AppHeader {...item} />,
              title: item.label,
              tabBarIcon: ({ focused, size }) => (
                <TabIcon
                  focused={focused}
                  Icon={item.icon}
                  size={size}
                  activeColor="$accentBackground"
                />
              ),
            }}
          />
        ))}

        {hiddenItems.map((item) => (
          <Tabs.Screen
            key={item}
            name={item}
            options={{
              href: null,
            }}
          />
        ))}
      </Tabs>
    </SafeAreaView>
  );
}
