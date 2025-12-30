import {
  forwardRef,
  memo,
  ComponentProps,
  ComponentRef,
  ComponentPropsWithRef,
} from "react";
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

const TextInput = forwardRef<ComponentRef<typeof Input>, TextInputProps>(
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

export default memo(TextInput);
