import { ComponentProps } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { YStack, useTheme } from "tamagui";

export interface SelectFieldProps extends Pick<
  ComponentProps<typeof YStack>,
  "animation" | "enterStyle" | "exitStyle"
> {
  options: readonly string[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder: string;
}

function SelectField({
  options,
  value,
  onValueChange,
  placeholder,
  animation,
  enterStyle,
  exitStyle,
}: SelectFieldProps) {
  const theme = useTheme();

  const data = options.map((option) => ({
    label: option,
    value: option,
  }));

  return (
    <YStack
      width="100%"
      animation={animation}
      enterStyle={enterStyle}
      exitStyle={exitStyle}
    >
      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        value={value}
        placeholder={placeholder}
        onChange={(item) => onValueChange(item.value)}
        style={[
          styles.dropdown,
          {
            backgroundColor: theme.backgroundPress.get(),
            borderColor: theme.borderColor.get(),
          },
        ]}
        containerStyle={[
          styles.container,
          {
            backgroundColor: theme.background.get(),
            borderColor: theme.borderColor.get(),
          },
        ]}
        placeholderStyle={{
          color: theme.color.get(),
        }}
        selectedTextStyle={{
          color: theme.color.get(),
        }}
        itemTextStyle={{
          color: theme.color.get(),
        }}
        activeColor={theme.backgroundPress.get()}
      />
    </YStack>
  );
}

export default SelectField;

const styles = StyleSheet.create({
  dropdown: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  container: {
    borderRadius: 10,
    borderWidth: 1,
  },
});
