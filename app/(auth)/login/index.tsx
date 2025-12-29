import { useCallback, useState } from "react";
import { YStack, XStack, Button, H2, Paragraph, ScrollView } from "tamagui";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import { validateForm } from "$lib/client/validate-form";
import { validateField } from "$lib/client/validate-field";
import { loginSchema } from "$lib/client/schema";
import AnimatedLogo from "@/components/custom/branding/AnimatedLogo";
import FormField from "@/components/custom/form-fields/form-field";
import TextInput from "@/components/custom/form-fields/text-input";

type Errors = {
  username: string[];
  password: string[];
};

export default function Page() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [errors, setErrors] = useState<Errors>({ username: [], password: [] });

  const onUsernameChange = useCallback((v: string) => {
    setUsername(v);
    try {
      const fieldErrors = validateField(loginSchema, "username", v);
      setErrors((prev) => ({ ...prev, username: fieldErrors }));
      setError((prev) => (prev ? null : prev));
    } catch (e) {
      setErrors((prev) => ({ ...prev, username: [] }));
    }
  }, []);

  const onPasswordChange = useCallback((v: string) => {
    setPassword(v);
    try {
      const fieldErrors = validateField(loginSchema, "password", v);
      setErrors((prev) => ({ ...prev, password: fieldErrors }));
      setError((prev) => (prev ? null : prev));
    } catch (e) {
      setErrors((prev) => ({ ...prev, password: [] }));
    }
  }, []);

  const handleLogin = useCallback(async () => {
    const form = { username, password };
    const result = validateForm(form, loginSchema);

    if (!result.valid) {
      setErrors((prev) => ({
        ...(prev as Errors),
        ...(result.errors as Partial<Errors>),
      }));
      const firstError = Object.values(result.errors).flat()[0];
      setError(firstError ?? "Please fix the errors and try again");
      return;
    }

    setErrors({ username: [], password: [] });
    setError(null);
    setLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 700));
      if (username === "demo" && password === "demo") {
        console.log("authentication success - demo user");
      } else {
        setError("Invalid username or password");
      }
    } catch (e) {
      setError("An unexpected error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  }, [username, password]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <YStack
        flex={1}
        animation={{ type: "bouncy", duration: "800ms", delay: "200ms" }}
        enterStyle={{ opacity: 0, scale: 0.96 }}
        exitStyle={{ opacity: 0, scale: 0.96 }}
      >
        <ScrollView style={{ flex: 1 }}>
          <YStack p="$4">
            <YStack
              width="100%"
              maxW={420}
              p="$6"
              animation={{ type: "timing", duration: "600ms", delay: "200ms" }}
              enterStyle={{ opacity: 0, y: -14 }}
              exitStyle={{ opacity: 0, y: 14 }}
              gap="$5"
            >
              <YStack gap="$2" items="center" justify="center">
                <AnimatedLogo size={64} initials="CB" animated />
                <H2
                  color="$color"
                  animation={{
                    type: "timing",
                    duration: "600ms",
                    delay: "200ms",
                  }}
                  enterStyle={{ opacity: 0, y: -6 }}
                >
                  Welcome Back
                </H2>
                <Paragraph size="$3" color="$color" opacity={0.8}>
                  Sign in to continue to ConfessBay
                </Paragraph>
              </YStack>

              <FormField
                label="Username or Email"
                animation={{
                  type: "timing",
                  duration: "600ms",
                  delay: "200ms",
                }}
                enterStyle={{ opacity: 0, x: -12 }}
                exitStyle={{ opacity: 0, x: 12 }}
                error={errors.username?.[0] ?? null}
              >
                <TextInput
                  placeholder="your_username"
                  value={username}
                  onChangeText={onUsernameChange}
                  size="$4"
                  rounded="$3"
                  bg="$background"
                  id="username"
                />
              </FormField>

              <FormField
                label="Password"
                animation={{
                  type: "timing",
                  duration: "1000ms",
                  delay: "300ms",
                }}
                enterStyle={{ opacity: 0, x: 12 }}
                exitStyle={{ opacity: 0, x: -12 }}
                error={errors.password?.[0] ?? null}
              >
                <XStack items="center" gap="$2" width="100%">
                  <TextInput
                    flex={1}
                    placeholder="••••••••"
                    value={password}
                    onChangeText={onPasswordChange}
                    secureTextEntry={!showPassword}
                    size="$4"
                    rounded="$3"
                    bg="$background"
                    id="password"
                  />
                  <Button
                    size="$3"
                    circular
                    icon={showPassword ? EyeOff : Eye}
                    onPress={() => setShowPassword((s) => !s)}
                    pressStyle={{ scale: 0.95 }}
                    enterStyle={{ opacity: 0, scale: 0.9 }}
                    exitStyle={{ opacity: 0, scale: 0.9 }}
                  />
                </XStack>
              </FormField>

              {error ? (
                <Paragraph
                  size="$3"
                  color="$red10"
                  animation={{
                    type: "timing",
                    duration: "500ms",
                    delay: "200ms",
                  }}
                >
                  {error}
                </Paragraph>
              ) : null}

              <Button
                size="$5"
                theme="accent"
                onPress={handleLogin}
                disabled={loading}
                animation={{
                  type: "bouncy",
                  duration: "1000ms",
                  delay: "200ms",
                }}
                enterStyle={{ opacity: 0, y: 18 }}
                exitStyle={{ opacity: 0, y: -18 }}
                pressStyle={{ scale: 0.96 }}
              >
                {loading ? "Signing in..." : "Login"}
              </Button>
            </YStack>
          </YStack>
        </ScrollView>
      </YStack>
    </KeyboardAvoidingView>
  );
}
