import { useFormContext, useWatch } from 'react-hook-form'
import { z } from 'zod'

import type { PlannerFormSchema } from '@/schemas/pages'
import type { Profile } from '@/types'

const usePlanner = () => {
  const form = useFormContext<z.infer<typeof PlannerFormSchema>>()

  const parsedProfiles = useWatch({
    control: form.control,
    name: 'parsedProfiles',
  })

  const selectedProfiles = useWatch({
    control: form.control,
    name: 'selectedProfiles',
  })

  const handleSelectProfile = (profile: Profile) => {
    const currentSelectedProfiles = selectedProfiles || []
    if (currentSelectedProfiles.some((p) => p.name === profile.name)) {
      form.setValue(
        'selectedProfiles',
        currentSelectedProfiles.filter((p) => p.name !== profile.name),
      )
    } else {
      form.setValue('selectedProfiles', [...currentSelectedProfiles, profile])
    }
  }

  const isSelectedProfile = (profile: Profile) => {
    const currentSelectedProfiles = selectedProfiles || []
    return currentSelectedProfiles.some((p) => p.name === profile.name)
  }

  const handleSelectComplete = () => {
    form.setValue('step', 4)
  }

  return {
    form,
    parsedProfiles,
    handleSelectProfile,
    isSelectedProfile,
    handleSelectComplete,
  }
}

export default usePlanner
