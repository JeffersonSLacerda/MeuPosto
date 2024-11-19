
import { SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectTrigger } from "@gluestack-ui/themed";
import { SelectDragIndicator } from "@gluestack-ui/themed";
import { ChevronDownIcon } from "@gluestack-ui/themed";
import {Select as GSSelect, SelectBackdrop, SelectContent, SelectItem, SelectPortal, } from "@gluestack-ui/themed"
import { ComponentProps } from "react"

type Props = Omit<ComponentProps<typeof SelectPortal>, 'children'> & {
  placeholder: string;
  items: {
    label: string;
    value: string;
    isDisabled?: boolean;
  }[];
};

export function Select({items, placeholder,  ...rest}: Props) {
  console.log("placeholder: " + placeholder);
  return (
    <GSSelect>
      <SelectTrigger variant="rounded" size="md">
        <SelectInput placeholder={placeholder} />
        <SelectIcon as={ChevronDownIcon} />
      </SelectTrigger>

      <SelectPortal >
        <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {items.map((item: any, index: number) => {
            <SelectItem 
              key={index}
              label={item.label}
              value={item.value}
              isDisabled={item.isDisabled ?? false}
            />
          })}
        </SelectContent>
      </SelectPortal>
    </GSSelect>
  )
}
