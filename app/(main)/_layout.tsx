import { Redirect, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import TabIcon from "@/components/custom/tab-icon";
import { useAuth } from "$lib/context/auth";
import { headerItems } from "@/components/custom/navbar/utils";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  const { user } = useAuth();
  const pathname = usePathname();
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
        backgroundColor={
          pathname === "/profile"
            ? theme.accentColor.get()
            : theme.accent2.get()
        }
        style="light"
      />
      <Tab.Navigator
        tabBarPosition="bottom"
        screenOptions={{
          swipeEnabled: true,
          lazy: true,
          lazyPreloadDistance: 0,
          tabBarShowLabel: false,
          tabBarActiveTintColor: theme.accentBackground.get(),
          tabBarInactiveTintColor: theme.gray?.get(),
          tabBarStyle: {
            elevation: 20,
            height: 56,
            paddingTop: 2,
            borderTopColor: theme.borderColor.get(),
            backgroundColor: theme.background.get(),
          },
          tabBarIndicatorStyle: {
            display: "none",
          },
        }}
      >
        {headerItems.map((item, index) => (
          <Tab.Screen
            key={index}
            name={item.pagename}
            component={item.component}
            options={{
              title: item.label,
              tabBarIcon: ({ focused }) => (
                <TabIcon
                  focused={focused}
                  Icon={item.icon}
                  size={24}
                  activeColor="$accentBackground"
                />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
}
