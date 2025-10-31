import { Calendar as CalendarIcon } from 'lucide-react'
import { DateTime } from 'luxon'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type DatePickerProps = {
  value: string
  onChange: (date: string) => void
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [show, setShow] = useState(false)

  const luxonDate = value ? DateTime.fromISO(value) : null
  const displayDate = luxonDate?.toLocaleString(DateTime.DATE_FULL)

  return (
    <Popover open={show} onOpenChange={setShow}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!value}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal hover:cursor-pointer"
        >
          <CalendarIcon />
          {displayDate || <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={luxonDate?.toJSDate()}
          onSelect={(selected) => {
            if (selected) {
              const isoString = DateTime.fromJSDate(selected).toISO()
              if (isoString) {
                onChange(isoString)
                setShow(false)
              }
            }
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
