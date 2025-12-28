import React, { forwardRef, memo, useMemo } from "react";
import { YStack, Input, InputProps } from "tamagui";

export interface TextInputProps extends Omit<
  InputProps,
  "animation" | "enterStyle" | "exitStyle"
> {
  animation?: string;
  enterStyle?: any;
  exitStyle?: any;
}

/**
 * Optimized TextInput
 *
 * - forwards ref to the underlying Tamagui `Input`
 * - memoized to avoid unnecessary re-renders
 * - uses useMemo to stable-ize the rendered Input subtree when `inputProps` are unchanged
 *
 * Important: we still avoid applying animation props to the internal Input itself;
 * animation props are applied to the wrapper YStack.
 */
const TextInputInner = forwardRef<any, TextInputProps>(
  ({ animation, enterStyle, exitStyle, ...inputProps }, ref) => {
    // Memoize the Input element so it only re-creates when inputProps change.
    const inputEl = useMemo(() => {
      return <Input ref={ref as any} {...(inputProps as any)} />;
      // We purposely only depend on inputProps (shallow) — ref is stable across renders.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(inputProps)]);

    return (
      <YStack
        animation={animation}
        enterStyle={enterStyle}
        exitStyle={exitStyle}
      >
        {inputEl}
      </YStack>
    );
  },
);

TextInputInner.displayName = "TextInputInner";

// Use memo to avoid re-rendering the wrapper when props are stable.
export const TextInput = memo(
  TextInputInner,
) as unknown as typeof TextInputInner;

export default TextInput;
