import { useFormContext, useWatch } from 'react-hook-form'
import { z } from 'zod'

import type { PlannerFormSchema } from '@/schemas/pages'

const useForm = () => {
  const form = useFormContext<z.infer<typeof PlannerFormSchema>>()

  const profiles = useWatch({
    control: form.control,
    name: 'selectedProfiles',
  })

  return {
    form,
    profiles,
  }
}

export default useForm
