import { View } from "tamagui";
import { Href, Link } from "expo-router";
import { IconComponent } from "@/components/types";

export default function ActionButton({
  icon: Icon,
  type,
  href,
}: {
  icon: IconComponent;
  type?: string;
  href?: Href;
}) {
  return (
    <>
      {href ? (
        <Link href={href}>
          <Icon color="white" />
        </Link>
      ) : (
        <View>
          <Icon color="white" />
        </View>
      )}
    </>
  );
}
