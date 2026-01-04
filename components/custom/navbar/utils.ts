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
import Notifications from "@/app/(main)/notifications";
import DiscoverPeople from "@/app/(main)/discover/people";
import ProfileSettings from "@/app/(main)/profile/settings";
import FeedNew from "@/app/(main)/feed/new";
import MessagesNewPerson from "@/app/(main)/messages/new-person";
import Discover from "@/app/(main)/discover";
import Feed from "@/app/(main)/feed";
import Profile from "@/app/(main)/profile";
import Messages from "@/app/(main)/messages";

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
  component: React.ComponentType;
};
export const headerItems: HeaderItem[] = [
  {
    label: "Feed",
    pagename: "feed/index",
    icon: Home,
    headerLeft: { icon: Plus, type: "navigate", href: "/feed/new" },
    headerRight: { icon: Bell, type: "navigate", href: "/notifications" },
    onPress: () => console.log("Home pressed"),
    component: Feed,
  },
  {
    label: "Discover",
    pagename: "discover/index",
    icon: Compass,
    headerLeft: { icon: Funnel },
    headerRight: { icon: Users, type: "navigate", href: "/discover/people" },
    onPress: () => console.log("Discover pressed"),
    component: Discover,
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
    component: Messages,
  },
  {
    label: "Profile",
    pagename: "profile/index",
    icon: User,
    headerLeft: { icon: Plus, type: "navigate", href: "/feed/new" },
    headerRight: { icon: Menu, type: "navigate", href: "/profile/settings" },
    onPress: () => console.log("Profile pressed"),
    component: Profile,
  },
];

export const hiddenItems = [
  {
    pagename: "notifications/index",
    component: Notifications,
  },
  {
    pagename: "discover/people/index",
    component: DiscoverPeople,
  },
  {
    pagename: "profile/settings/index",
    component: ProfileSettings,
  },
  {
    pagename: "feed/new/index",
    component: FeedNew,
  },
  {
    pagename: "messages/new-person/index",
    component: MessagesNewPerson,
  },
];
