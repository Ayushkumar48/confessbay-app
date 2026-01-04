import React, { useMemo, ComponentProps } from "react";
import { YStack, XStack, Paragraph } from "tamagui";

export interface FormFieldProps extends Pick<
  ComponentProps<typeof YStack>,
  "animation" | "enterStyle" | "exitStyle" | "gap"
> {
  /**
   * Visible label text for the field.
   * If `id` is provided, the label will be associated with the input via htmlFor.
   */
  label?: string;

  /**
   * DOM id to attach to the input element so that the label can reference it.
   * Helpful for accessibility (clicking label focuses input).
   */
  id?: string;

  /**
   * Optional icon (React node) displayed to the left of the label.
   */
  icon?: React.ReactNode;

  /**
   * Small helper text shown under the field.
   */
  description?: string;

  /**
   * Error message. When present it will be rendered and styled as an error.
   */
  error?: string | null;

  /**
   * The input element (or any interactive control) to render as the field's child.
   *
   * IMPORTANT: this wrapper avoids applying Tamagui animation props directly to
   * the input component. If you need wrapper animation, pass `animation`, `enterStyle`
   * and `exitStyle` to this component and it will animate the container only.
   */
  children: React.ReactNode;
}

/**
 * FormField
 *
 * Optimized wrapper for form controls:
 * - memoized with React.memo to avoid unnecessary re-renders when props are stable
 * - internal label row and helper text are memoized via useMemo for stable subtrees
 *
 * Notes:
 * - Do not pass animation props directly to child inputs. Instead pass them to this wrapper.
 */
function FormField({
  label,
  id,
  icon,
  description,
  error,
  children,
  animation,
  enterStyle,
  exitStyle,
  gap = "$2",
}: FormFieldProps) {
  // Memoize the label row — it only changes when label/icon/id change.
  const labelRow = useMemo(() => {
    if (!label && !icon) return null;

    return (
      <XStack verticalAlign="center" gap="$3">
        {icon ? (
          <YStack
            width={36}
            height={36}
            verticalAlign="center"
            justify="center"
          >
            {icon}
          </YStack>
        ) : null}

        {id ? (
          <label htmlFor={id} style={{ display: "block", cursor: "pointer" }}>
            <Paragraph size="$3" color="$color">
              {label}
            </Paragraph>
          </label>
        ) : (
          <Paragraph size="$3" color="$color">
            {label}
          </Paragraph>
        )}
      </XStack>
    );
  }, [label, icon, id]);

  const helper = useMemo(() => {
    if (error) {
      return (
        <Paragraph size="$2" color="$red10" role="alert">
          {error}
        </Paragraph>
      );
    }
    if (description) {
      return (
        <Paragraph size="$2" color="$color" opacity={0.75}>
          {description}
        </Paragraph>
      );
    }
    return null;
  }, [error, description]);

  return (
    <YStack
      animation={animation}
      enterStyle={enterStyle}
      exitStyle={exitStyle}
      gap={gap}
    >
      {labelRow}
      <YStack>{children}</YStack>
      {helper}
    </YStack>
  );
}

export default FormField;
