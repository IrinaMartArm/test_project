import { useState } from 'react'
import * as SelectRadix from '@radix-ui/react-select'

import './select.scss'
import {ChevronIcon} from "../../assets/Chevron.tsx";

type ItemsType = {
  value: string
}

export type SelectType = {
  items: ItemsType[]
  onChange: (value: string) => void
  value?: string
}
export const Select = (
    {
      items,
      onChange,
      value,
      ...rest
    }: SelectType,
  ) => {
    const [open, setOpen] = useState(false)
    const toggle = () => {
      setOpen(!open)
    }

    console.log('Select', value)

    return (
      <div className="select">
        <SelectRadix.Root
          defaultValue={value}
          name="select"
          onOpenChange={toggle}
          onValueChange={onChange}
          value={value}
          {...rest}
        >
          <SelectRadix.Trigger className="select__trigger">
            <SelectRadix.Value />
              <SelectRadix.Icon className="">
                <ChevronIcon direction="down" />
              </SelectRadix.Icon>
          </SelectRadix.Trigger>
          <SelectRadix.Portal>
            <SelectRadix.Content className="select__content" position="popper" sideOffset={0}>
              <SelectRadix.Viewport className="select__viewport">
                <SelectRadix.Group>
                  {items.map(el => (
                    <SelectRadix.Item
                        className={`select__content-item ${el.value === value && 'select__content-item-selected'}`}
                      key={el.value}
                      value={el.value}
                    >
                      <SelectRadix.ItemText>
                        {/*<div className="">*/}
                          {el.value}
                        {/*</div>*/}
                      </SelectRadix.ItemText>
                    </SelectRadix.Item>
                  ))}
                </SelectRadix.Group>
              </SelectRadix.Viewport>
            </SelectRadix.Content>
          </SelectRadix.Portal>
        </SelectRadix.Root>
      </div>
    )
  }
