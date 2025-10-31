import { useFormContext, useWatch } from 'react-hook-form'
import { z } from 'zod'

import type { PlannerFormSchema } from '@/schemas/pages'

const usePlanner = () => {
  const form = useFormContext<z.infer<typeof PlannerFormSchema>>()

  const profileFile = useWatch({
    control: form.control,
    name: 'profileFile',
  })

  console.log(profileFile)
}

export default usePlanner
