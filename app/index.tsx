import { useEffect } from "react";
import { router } from "expo-router";

export default function Page() {
  useEffect(() => {
    router.replace("/(auth)/login");
  }, []);

  return null;
}
