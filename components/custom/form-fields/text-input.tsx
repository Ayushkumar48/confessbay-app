import { ComponentProps, ComponentPropsWithRef } from "react";
import { YStack, Input } from "tamagui";

export interface TextInputProps
  extends
    Omit<
      ComponentPropsWithRef<typeof Input>,
      "animation" | "enterStyle" | "exitStyle"
    >,
    Pick<
      ComponentProps<typeof YStack>,
      "animation" | "enterStyle" | "exitStyle"
    > {}

function TextInput({
  animation,
  enterStyle,
  exitStyle,
  ...inputProps
}: TextInputProps) {
  return (
    <YStack
      width="100%"
      animation={animation}
      enterStyle={enterStyle}
      exitStyle={exitStyle}
    >
      <Input {...inputProps} />
    </YStack>
  );
}

export default TextInput;
