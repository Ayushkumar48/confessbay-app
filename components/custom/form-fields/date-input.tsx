import { ComponentProps, useState, useCallback, memo } from "react";
import { TouchableOpacity } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { YStack, Input } from "tamagui";
import { formatDate } from "@/components/utils/utils";

export interface DateInputProps
  extends
    Omit<
      ComponentProps<typeof Input>,
      | "animation"
      | "enterStyle"
      | "exitStyle"
      | "value"
      | "onChange"
      | "onChangeText"
      | "editable"
      | "placeholder"
    >,
    Pick<
      ComponentProps<typeof YStack>,
      "animation" | "enterStyle" | "exitStyle"
    > {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
}

function DateInput({
  value,
  onChange,
  placeholder = "Select Date",
  animation,
  enterStyle,
  exitStyle,
  ...inputProps
}: DateInputProps) {
  const [show, setShow] = useState<boolean>(false);

  const handleChange = useCallback(
    (event: DateTimePickerEvent, date?: Date) => {
      if (event.type === "set" && date) {
        onChange?.(date);
      }
      if (event.type !== "dismissed") {
        setShow(false);
      }
    },
    [onChange],
  );

  return (
    <YStack
      width="100%"
      animation={animation}
      enterStyle={enterStyle}
      exitStyle={exitStyle}
    >
      <TouchableOpacity onPress={() => setShow(true)}>
        <Input
          {...inputProps}
          value={value ? formatDate(value) : placeholder}
          editable={false}
        />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value ?? new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleChange}
        />
      )}
    </YStack>
  );
}

export default memo(DateInput);
