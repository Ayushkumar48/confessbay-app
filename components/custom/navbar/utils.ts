import { IconComponent } from "@/components/types";
import {
  Bell,
  Compass,
  Funnel,
  Home,
  Menu,
  Plus,
  Send,
  SquarePen,
  User,
  UserPlus,
  Users,
} from "@tamagui/lucide-icons";
import { Href } from "expo-router";

export type HeaderItem = {
  label: string;
  pagename: string;
  icon: IconComponent;
  headerLeft: {
    icon: IconComponent;
    type?: string;
    href?: Href;
  };
  headerRight: {
    icon: IconComponent;
    type?: string;
    href?: Href;
  };
  onPress: () => void;
};
export const headerItems: HeaderItem[] = [
  {
    label: "Feed",
    pagename: "feed/index",
    icon: Home,
    headerLeft: { icon: Plus, type: "navigate", href: "/feed/new" },
    headerRight: { icon: Bell, type: "navigate", href: "/notifications" },
    onPress: () => console.log("Home pressed"),
  },
  {
    label: "Discover",
    pagename: "discover/index",
    icon: Compass,
    headerLeft: { icon: Funnel },
    headerRight: { icon: Users, type: "navigate", href: "/discover/people" },
    onPress: () => console.log("Discover pressed"),
  },
  {
    label: "Messages",
    pagename: "messages/index",
    icon: Send,
    headerLeft: { icon: SquarePen },
    headerRight: {
      icon: UserPlus,
      type: "navigate",
      href: "/messages/new-person",
    },
    onPress: () => console.log("Messages pressed"),
  },
  {
    label: "Profile",
    pagename: "profile/index",
    icon: User,
    headerLeft: { icon: Plus, type: "navigate", href: "/feed/new" },
    headerRight: { icon: Menu, type: "navigate", href: "/profile/settings" },
    onPress: () => console.log("Profile pressed"),
  },
];

export const hiddenItems = [
  "notifications/index",
  "discover/people/index",
  "profile/settings/index",
  "feed/new/index",
  "messages/new-person/index",
];
