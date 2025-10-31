import { Label } from './label'
import { RadioGroup, RadioGroupItem } from './radio-group'

type OptionRadioGroupProps = {
  options: {
    label: string
    value: boolean
  }[]
  value: boolean
  onChange: (value: boolean) => void
}

const OptionRadioGroup = ({
  options,
  value,
  onChange,
}: OptionRadioGroupProps) => {
  return (
    <RadioGroup
      value={value ? 'true' : 'false'}
      onValueChange={(value) => onChange(value === 'true')}
      className="h-[36px] w-[180px]"
    >
      <div className="flex items-center gap-3">
        {options.map((option) => (
          <div
            key={option.value.toString()}
            className="flex items-center gap-3"
          >
            <RadioGroupItem
              value={option.value ? 'true' : 'false'}
              id={option.value.toString()}
            />
            <Label htmlFor={option.value.toString()}>{option.label}</Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  )
}

export default OptionRadioGroup
