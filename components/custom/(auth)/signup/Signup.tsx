import React, { useCallback, useMemo, useState } from "react";
import {
  YStack,
  XStack,
  Button,
  H2,
  Paragraph,
  ScrollView,
  useTheme,
  Select,
} from "tamagui";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import { validateForm } from "$lib/client/validate-form";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
} from "$lib/client/schema";
import AnimatedLogo from "@/components/custom/branding/AnimatedLogo";
import FormField from "@/components/custom/form-fields/form-field";
import TextInput from "@/components/custom/form-fields/text-input";
import { Link } from "expo-router";

type FormData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  gender?: string;
  dateOfBirth?: Date;
  city: string;
  avatar: string;
};

type Errors = Record<string, string[]>;

const steps = [
  { title: "Personal Info", schema: step1Schema },
  { title: "Account Details", schema: step2Schema },
  { title: "Set Password", schema: step3Schema },
  { title: "Optional Info", schema: step4Schema },
  { title: "Location", schema: step5Schema },
  { title: "Profile Picture", schema: step6Schema },
];

interface StepProps {
  formData: FormData;
  updateFormData: (key: keyof FormData, value: any) => void;
  errors: Errors;
  showPassword?: boolean;
  setShowPassword?: (show: boolean) => void;
  showConfirmPassword?: boolean;
  setShowConfirmPassword?: (show: boolean) => void;
}

const Step1 = React.memo<StepProps>(({ formData, updateFormData, errors }) => (
  <YStack gap="$4">
    <FormField label="First Name" error={errors.firstName?.[0]}>
      <TextInput
        placeholder="John"
        value={formData.firstName}
        onChangeText={(v) => updateFormData("firstName", v)}
        size="$4"
        rounded="$3"
        bg="$background"
      />
    </FormField>
    <FormField label="Last Name" error={errors.lastName?.[0]}>
      <TextInput
        placeholder="Doe"
        value={formData.lastName}
        onChangeText={(v) => updateFormData("lastName", v)}
        size="$4"
        rounded="$3"
        bg="$background"
      />
    </FormField>
  </YStack>
));

const Step2 = React.memo<StepProps>(({ formData, updateFormData, errors }) => (
  <YStack gap="$4">
    <FormField label="Username" error={errors.username?.[0]}>
      <TextInput
        placeholder="your_username"
        value={formData.username}
        onChangeText={(v) => updateFormData("username", v)}
        size="$4"
        rounded="$3"
        bg="$background"
      />
    </FormField>
    <FormField label="Email" error={errors.email?.[0]}>
      <TextInput
        placeholder="john@example.com"
        value={formData.email}
        onChangeText={(v) => updateFormData("email", v)}
        size="$4"
        rounded="$3"
        bg="$background"
      />
    </FormField>
    <FormField
      label="Phone Number (optional)"
      error={errors.phoneNumber?.[0]}
    >
      <TextInput
        placeholder="+1234567890"
        value={formData.phoneNumber}
        onChangeText={(v) => updateFormData("phoneNumber", v)}
        size="$4"
        rounded="$3"
        bg="$background"
      />
    </FormField>
  </YStack>
));

const Step3 = React.memo<StepProps>(
  ({
    formData,
    updateFormData,
    errors,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  }) => (
    <YStack gap="$4">
      <FormField label="Password" error={errors.password?.[0]}>
        <XStack items="center" gap="$2" width="100%">
          <TextInput
            flex={1}
            placeholder="••••••••"
            value={formData.password}
            onChangeText={(v) => updateFormData("password", v)}
            secureTextEntry={!showPassword}
            size="$4"
            rounded="$3"
            bg="$background"
          />
          <Button
            size="$3"
            circular
            icon={showPassword ? EyeOff : Eye}
            onPress={() => setShowPassword?.(!showPassword)}
            pressStyle={{ scale: 0.95 }}
          />
        </XStack>
      </FormField>
      <FormField
        label="Confirm Password"
        error={errors.confirmPassword?.[0]}
      >
        <XStack items="center" gap="$2" width="100%">
          <TextInput
            flex={1}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChangeText={(v) => updateFormData("confirmPassword", v)}
            secureTextEntry={!showConfirmPassword}
            size="$4"
            rounded="$3"
            bg="$background"
          />
          <Button
            size="$3"
            circular
            icon={showConfirmPassword ? EyeOff : Eye}
            onPress={() => setShowConfirmPassword?.(!showConfirmPassword)}
            pressStyle={{ scale: 0.95 }}
          />
        </XStack>
      </FormField>
    </YStack>
  )
);

const Step4 = React.memo<StepProps>(({ formData, updateFormData }) => (
  <YStack gap="$4">
    <FormField label="Gender (optional)">
      <Select
        value={formData.gender}
        onValueChange={(v) => updateFormData("gender", v)}
      >
        <Select.Trigger>
          <Select.Value placeholder="Select gender" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="male" index={0}>
            Male
          </Select.Item>
          <Select.Item value="female" index={1}>
            Female
          </Select.Item>
          <Select.Item value="other" index={2}>
            Other
          </Select.Item>
          <Select.Item value="prefer_not_to_say" index={3}>
            Prefer not to say
          </Select.Item>
        </Select.Content>
      </Select>
    </FormField>
    <FormField label="Date of Birth (optional)">
      <TextInput
        placeholder="YYYY-MM-DD"
        value={
          formData.dateOfBirth
            ? formData.dateOfBirth.toISOString().split("T")[0]
            : ""
        }
        onChangeText={(v) => updateFormData("dateOfBirth", new Date(v))}
        size="$4"
        rounded="$3"
        bg="$background"
      />
    </FormField>
  </YStack>
));

const Step5 = React.memo<StepProps>(({ formData, updateFormData, errors }) => (
  <YStack gap="$4">
    <FormField label="Current City" error={errors.city?.[0]}>
      <TextInput
        placeholder="New York"
        value={formData.city}
        onChangeText={(v) => updateFormData("city", v)}
        size="$4"
        rounded="$3"
        bg="$background"
      />
    </FormField>
  </YStack>
));

const Step6 = React.memo<StepProps>(({ formData, updateFormData }) => (
  <YStack gap="$4">
    <FormField label="Profile Picture (optional)">
      <TextInput
        placeholder="https://example.com/avatar.jpg"
        value={formData.avatar}
        onChangeText={(v) => updateFormData("avatar", v)}
        size="$4"
        rounded="$3"
        bg="$background"
      />
    </FormField>
  </YStack>
));

const stepComponents = [Step1, Step2, Step3, Step4, Step5, Step6];

export default function Signup() {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: undefined,
    dateOfBirth: undefined,
    city: "",
    avatar: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  const updateFormData = useCallback((key: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const getStepData = useMemo(
    () => (step: number) => {
      switch (step) {
        case 0:
          return { firstName: formData.firstName, lastName: formData.lastName };
        case 1:
          return {
            username: formData.username,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
          };
        case 2:
          return {
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          };
        case 3:
          return { gender: formData.gender, dateOfBirth: formData.dateOfBirth };
        case 4:
          return { city: formData.city };
        case 5:
          return { avatar: formData.avatar };
        default:
          return {};
      }
    },
    [formData]
  );

  const validateCurrentStep = useCallback(() => {
    const stepData = getStepData(currentStep);
    const result = validateForm(stepData as any, steps[currentStep].schema as any);
    if (!result.valid) {
      setErrors(result.errors);
      setError(
        Object.values(result.errors).flat()[0] || "Please fix the errors"
      );
      return false;
    }
    setErrors({});
    setError(null);
    return true;
  }, [currentStep, getStepData]);

  const handleNext = useCallback(() => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [validateCurrentStep]);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => prev - 1);
  }, []);

  const handleSignUp = useCallback(async () => {
    if (validateCurrentStep()) {
      setLoading(true);
      try {
        // TODO: Implement actual sign up logic
        console.log("Sign up data:", formData);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        setError("Sign up failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  }, [formData, validateCurrentStep]);

  const currentStepComponent = useMemo(() => {
    const StepComponent = stepComponents[currentStep];
    return (
      <StepComponent
        formData={formData}
        updateFormData={updateFormData}
        errors={errors}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
      />
    );
  }, [
    currentStep,
    formData,
    updateFormData,
    errors,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  ]);

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
                  Sign Up
                </H2>
                <Paragraph size="$3" color="$color" opacity={0.8}>
                  Step {currentStep + 1} of {steps.length}:{" "}
                  {steps[currentStep].title}
                </Paragraph>
              </YStack>

              <YStack
                key={currentStep}
                animation={{ type: "timing", duration: "500ms" }}
                enterStyle={{ opacity: 0, x: 50 }}
                exitStyle={{ opacity: 0, x: -50 }}
                gap="$4"
              >
                {currentStepComponent}
              </YStack>

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

              <XStack gap="$2">
                {currentStep > 0 && (
                  <Button
                    flex={1}
                    onPress={handleBack}
                    animation={{
                      type: "bouncy",
                      duration: "1000ms",
                      delay: "200ms",
                    }}
                    enterStyle={{ opacity: 0, y: 18 }}
                    exitStyle={{ opacity: 0, y: -18 }}
                    pressStyle={{ scale: 0.96 }}
                  >
                    Back
                  </Button>
                )}
                {currentStep < steps.length - 1 ? (
                  <Button
                    flex={1}
                    theme="accent"
                    onPress={handleNext}
                    animation={{
                      type: "bouncy",
                      duration: "1000ms",
                      delay: "200ms",
                    }}
                    enterStyle={{ opacity: 0, y: 18 }}
                    exitStyle={{ opacity: 0, y: -18 }}
                    pressStyle={{ scale: 0.96 }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    flex={1}
                    theme="accent"
                    onPress={handleSignUp}
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
                    {loading ? "Signing up..." : "Sign Up"}
                  </Button>
                )}
              </XStack>
            </YStack>
          </YStack>
          <XStack gap="$1" items="center" justify="center">
            <Paragraph>Already have an account?</Paragraph>
            <Link
              href="/login"
              style={{
                textDecorationLine: "underline",
                fontWeight: "900",
                color: theme.accentColor.get(),
              }}
            >
              Sign in
            </Link>
          </XStack>
        </ScrollView>
      </YStack>
    </KeyboardAvoidingView>
  );
}
