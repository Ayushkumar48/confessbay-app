import { router } from "expo-router";
import { Button, Text, View } from "tamagui";

export default function Page() {
  return (
    <View>
      <Text>Hi</Text>
      <Text>Hi</Text>
      <Text>Hi</Text>
      <Text>Hi</Text>
      <Text>Hi</Text>
      <Text>Hi</Text>
      <Text>Hi</Text>
      <Text>Hi</Text>
      <Text>Hi</Text>
      <Text>Hi</Text>
      <Text>Hi</Text>
      <Button onPress={() => router.push("/(auth)/login")}>Login</Button>
    </View>
  );
}
