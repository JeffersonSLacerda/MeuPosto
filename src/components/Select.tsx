
import { SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectTrigger } from "@gluestack-ui/themed";
import { SelectDragIndicator } from "@gluestack-ui/themed";
import { ChevronDownIcon } from "@gluestack-ui/themed";
import {Select as GSSelect, SelectBackdrop, SelectContent, SelectItem, SelectPortal } from "@gluestack-ui/themed"
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
  return (
    <GSSelect w="$48" mt="$8" >
      <SelectTrigger variant="outline" size="md">
        <SelectInput placeholder={placeholder} color="$gray100"/>
        <SelectIcon as={ChevronDownIcon} mr="$4" />
      </SelectTrigger>
      <SelectPortal {...rest}>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {items.map((item, index) =>(
            <SelectItem
              key={index}
              label={item.label} 
              value={item.value} 
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </GSSelect>
  )
}
