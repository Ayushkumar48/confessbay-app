import { useCallback, useState } from "react";
import { YStack, XStack, Button, H2, Paragraph } from "tamagui";
import { TextInput } from "../../../components/custom/form-fields/text-input";
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import AnimatedLogo from "../../../components/custom/branding/AnimatedLogo";
import FormField from "../../../components/custom/form-fields/form-field";

export default function Page() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback(() => {
    if (!username.trim() || !password.trim()) {
      setError("Please fill both fields");
      return false;
    }
    setError(null);
    return true;
  }, [username, password]);

  const handleLogin = useCallback(async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 700));

      if (username === "demo" && password === "demo") {
        console.log("success");
      } else {
        setError("Invalid username or password");
      }
    } finally {
      setLoading(false);
    }
  }, [username, password, validate]);

  return (
    <YStack
      flex={1}
      justify="center"
      verticalAlign="center"
      p="$4"
      bg="$background"
      animation="bouncy"
      enterStyle={{ opacity: 0, scale: 0.96 }}
      exitStyle={{ opacity: 0, scale: 0.96 }}
    >
      <YStack
        width="100%"
        maxW={420}
        p="$6"
        rounded="$4"
        bg="$accentBackground"
        elevation={4}
        shadowColor="$shadowColor"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.08}
        shadowRadius={8}
        animation="quick"
        enterStyle={{ opacity: 0, y: -14 }}
        exitStyle={{ opacity: 0, y: 14 }}
        gap="$5"
      >
        <YStack gap="$2" verticalAlign="center" justify="center">
          <AnimatedLogo size={64} initials="CB" animated />
          <H2
            color="$color"
            animation="quick"
            enterStyle={{ opacity: 0, y: -6 }}
          >
            Welcome Back
          </H2>
          <Paragraph size="$3" color="$color" opacity={0.8}>
            Sign in to continue to ConfessBay
          </Paragraph>
        </YStack>

        <FormField
          label="Username"
          animation="quick"
          enterStyle={{ opacity: 0, x: -12 }}
          exitStyle={{ opacity: 0, x: 12 }}
        >
          <TextInput
            placeholder="username or email"
            value={username}
            onChangeText={setUsername}
            size="$4"
            rounded="$3"
            bg="$background"
          />
        </FormField>

        <FormField
          label="Password"
          animation="quick"
          enterStyle={{ opacity: 0, x: 12 }}
          exitStyle={{ opacity: 0, x: -12 }}
        >
          <XStack verticalAlign="center" gap="$2">
            <TextInput
              flex={1}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              size="$4"
              rounded="$3"
              bg="$background"
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
          <Paragraph size="$3" color="$red10" animation="quick">
            {error}
          </Paragraph>
        ) : null}

        <Button
          size="$5"
          theme="accent"
          onPress={handleLogin}
          disabled={loading}
          animation="bouncy"
          enterStyle={{ opacity: 0, y: 18 }}
          exitStyle={{ opacity: 0, y: -18 }}
          pressStyle={{ scale: 0.96 }}
        >
          {loading ? "Signing in..." : "Login"}
        </Button>

        <XStack justify="center" verticalAlign="center" gap="$2">
          <Paragraph size="$3" color="$color">
            Don't have an account?
          </Paragraph>
          <Button
            size="$3"
            variant="outlined"
            onPress={() => console.log("go to signup")}
            animation="quick"
            enterStyle={{ opacity: 0, y: 10 }}
            exitStyle={{ opacity: 0, y: -10 }}
            pressStyle={{ scale: 0.95 }}
          >
            Sign Up
          </Button>
        </XStack>
      </YStack>
    </YStack>
  );
}
