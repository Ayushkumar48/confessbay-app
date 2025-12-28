import { forwardRef, memo, ComponentProps } from "react";
import { YStack, Input } from "tamagui";

export interface TextInputProps
  extends
    Omit<
      ComponentProps<typeof Input>,
      "animation" | "enterStyle" | "exitStyle"
    >,
    Pick<
      ComponentProps<typeof YStack>,
      "animation" | "enterStyle" | "exitStyle"
    > {}

const TextInputInner = forwardRef<any, TextInputProps>(
  ({ animation, enterStyle, exitStyle, ...inputProps }, ref) => {
    return (
      <YStack
        width="100%"
        animation={animation}
        enterStyle={enterStyle}
        exitStyle={exitStyle}
      >
        <Input ref={ref} {...inputProps} />
      </YStack>
    );
  },
);

TextInputInner.displayName = "TextInputInner";

export const TextInput = memo(TextInputInner) as typeof TextInputInner;

export default TextInput;
