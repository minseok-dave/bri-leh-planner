import { zodResolver } from '@hookform/resolvers/zod'
import { useForm as _useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'

import { PlannerFormSchema } from '@/schemas/pages'

const useForm = () => {
  const form = _useForm<z.infer<typeof PlannerFormSchema>>({
    defaultValues: {
      step: 1,
    },
    resolver: zodResolver(PlannerFormSchema),
  })

  const step = useWatch({
    control: form.control,
    name: 'step',
  })

  const handleNextStep = () => {
    const step = form.getValues('step')
    if (step > 3) return
    form.setValue('step', step + 1)
  }

  const handlePreviousStep = () => {
    const step = form.getValues('step')
    if (step < 1) return
    form.setValue('step', step - 1)
  }

  return {
    form,
    step,
    handleNextStep,
    handlePreviousStep,
  }
}

export default useForm
