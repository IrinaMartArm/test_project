import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import * as Checkbox from "@radix-ui/react-checkbox"
import {CheckIcon} from "../../assets/Check.tsx";
import './multiSelect.scss'

type MultiSelectProps = {
	values: string[]
	options: {label: string, value: string}[]
	onChange: (value: string) => void
}

export const MultiSelect = ({options, values, onChange}: MultiSelectProps) => {

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger className="multiSelect__trigger">
				{ values.length > 0
					? options
						.filter((o) => values.includes(o.value))
						.map((o) => o.label)
						.join(", ")
					: "Select company types"
				}
			</DropdownMenu.Trigger>

			<DropdownMenu.Content className="multiSelect__content">
				{options.map((opt) => (
					<DropdownMenu.CheckboxItem
						key={opt.value}
						checked={values.includes(opt.value)}
						onCheckedChange={() => onChange(opt.value)}
						className={`multiSelect__content-item ${values.includes(opt.value) && 'multiSelect__content-item-selected'}`}
					>
						<Checkbox.Root
							className="checkbox"
							checked={values.includes(opt.value)}
						>
							<Checkbox.Indicator>
								<CheckIcon />
							</Checkbox.Indicator>
						</Checkbox.Root>
						{opt.label}
					</DropdownMenu.CheckboxItem>
				))}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	)
}
