import { useCallback, useMemo, useState } from "react";
import {
  YStack,
  XStack,
  Button,
  Paragraph,
  ScrollView,
  useTheme,
} from "tamagui";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import { validateForm } from "$lib/client/validate-form";
import {
  SignupForm,
  signupSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
} from "$lib/client/schema";
import FormField from "@/components/custom/form-fields/form-field";
import TextInput from "@/components/custom/form-fields/text-input";
import DateInput from "@/components/custom/form-fields/date-input";
import { Link, router } from "expo-router";
import { Header } from "../header";
import SelectField from "../../form-fields/select-field";
import { gender } from "$lib/client/enums";
import AvatarPicker from "../../form-fields/avatar-picker";
import { signup } from "$lib/hooks/auth";
import { z } from "zod";
import { extractTreeErrors } from "@/components/utils/utils";

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
  formData: SignupForm;
  updateFormData: (key: keyof SignupForm, value: any) => void;
  errors: Errors;
  showPassword?: boolean;
  setShowPassword?: (show: boolean) => void;
  showConfirmPassword?: boolean;
  setShowConfirmPassword?: (show: boolean) => void;
}

function Step1({ formData, updateFormData, errors }: StepProps) {
  return (
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
  );
}

function Step2({ formData, updateFormData, errors }: StepProps) {
  return (
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
  );
}

function Step3({
  formData,
  updateFormData,
  errors,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}: StepProps) {
  return (
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
      <FormField label="Confirm Password" error={errors.confirmPassword?.[0]}>
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
  );
}

function Step4({ formData, updateFormData, errors }: StepProps) {
  return (
    <YStack gap="$4">
      <FormField label="Gender" error={errors.gender?.[0]}>
        <SelectField
          value={formData.gender}
          onValueChange={(v) => updateFormData("gender", v)}
          options={gender}
          placeholder="Select gender"
        />
      </FormField>
      <FormField
        label="Date of Birth (optional)"
        error={errors.dateOfBirth?.[0]}
      >
        <DateInput
          value={formData.dateOfBirth}
          onChange={(date) => updateFormData("dateOfBirth", date)}
        />
      </FormField>
    </YStack>
  );
}

function Step5({ formData, updateFormData, errors }: StepProps) {
  return (
    <YStack gap="$4">
      <FormField label="Current City (optional)" error={errors.city?.[0]}>
        <TextInput
          placeholder="Mumbai"
          value={formData.city}
          onChangeText={(v) => updateFormData("city", v)}
          size="$4"
          rounded="$3"
          bg="$background"
        />
      </FormField>
    </YStack>
  );
}

function Step6({ formData, updateFormData, errors }: StepProps) {
  return (
    <YStack gap="$4">
      <FormField label="Profile Picture (optional)" error={errors.avatar?.[0]}>
        <AvatarPicker
          value={formData.avatar}
          onChange={(media) => updateFormData("avatar", media)}
        />
      </FormField>
    </YStack>
  );
}

const stepComponents = [Step1, Step2, Step3, Step4, Step5, Step6];

export default function Signup() {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(3);
  const [formData, setFormData] = useState<SignupForm>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  const updateFormData = useCallback(
    (key: keyof SignupForm, value: SignupForm[keyof SignupForm]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
      setErrors({});
      setError(null);
    },
    [],
  );

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
    [formData],
  );

  const validateCurrentStep = useCallback(() => {
    const stepData = getStepData(currentStep);
    const result = validateForm(
      stepData as any,
      steps[currentStep].schema as any,
    );
    if (!result.valid) {
      setErrors(result.errors);
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
    if (!validateCurrentStep()) return;
    const finalCheck = signupSchema.safeParse(formData);
    if (!finalCheck.success) {
      const errors = extractTreeErrors(z.treeifyError(finalCheck.error));
      setErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const res = await signup(finalCheck.data);
      if (res.success) {
        router.replace("/feed");
      }
    } catch (e: any) {
      setError(e.message ?? "Sign up failed.");
    } finally {
      setLoading(false);
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
        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
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
              <Header title="Sign Up" description="Create your account" />

              <YStack
                key={currentStep}
                animation={{ type: "timing", duration: "500ms" }}
                enterStyle={{ opacity: 0, x: 50 }}
                exitStyle={{ opacity: 0, x: -50 }}
                gap="$4"
              >
                {currentStepComponent}
              </YStack>

              {error && Object.keys(errors).length === 0 ? (
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
