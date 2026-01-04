import { Select, Adapt, Sheet, YStack } from "tamagui";
import { ChevronDown, ChevronUp, Check } from "@tamagui/lucide-icons";

type SelectFieldProps = {
  options: readonly string[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder: string;
};

function SelectField({
  options,
  value,
  onValueChange,
  placeholder,
}: SelectFieldProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <Select.Trigger maxWidth={220} iconAfter={ChevronDown}>
        <Select.Value placeholder={placeholder} />
      </Select.Trigger>
      <Adapt when="maxMd" platform="touch">
        <Sheet
          modal
          dismissOnSnapToBottom
          animation="medium"
          snapPointsMode="constant"
          snapPoints={[200, 190]}
        >
          <Sheet.Frame>
            <Select.Adapt.Contents />
          </Sheet.Frame>

          <Sheet.Overlay
            bg="$shadowColor"
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>
      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          items="center"
          justify="center"
          position="relative"
          width="100%"
          height="$3"
          bg="$background"
        >
          <YStack z={10}>
            <ChevronUp size={20} />
          </YStack>
        </Select.ScrollUpButton>

        <Select.Viewport minW={200}>
          <Select.Group>
            {options.map((option, index) => (
              <Select.Item key={option} value={option} index={index} bordered>
                <Select.ItemText>{option}</Select.ItemText>
                <Select.ItemIndicator marginLeft="auto">
                  <Check size={16} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton
          items="center"
          justify="center"
          position="relative"
          width="100%"
          height="$3"
          bg="$background"
        >
          <YStack z={10}>
            <ChevronDown size={20} />
          </YStack>
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}

export default SelectField;
