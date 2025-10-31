import { useEffect, useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { z } from 'zod'

import type { PlannerFormSchema } from '@/schemas/pages'
import type { ProfileJSON } from '@/types'

const useForm = () => {
  const form = useFormContext<z.infer<typeof PlannerFormSchema>>()
  const profileFile = useWatch({
    control: form.control,
    name: 'profileFile',
  })

  const parsedProfiles = useWatch({
    control: form.control,
    name: 'parsedProfiles',
  })

  // profileFile에서 ProfileJSON 객체 파싱
  const profileJson = useMemo<ProfileJSON | null>(() => {
    if (!profileFile) return null

    // profileFile이 이미 ProfileJSON 객체인 경우
    if (typeof profileFile === 'object' && profileFile !== null) {
      if (
        'editor_name' in profileFile &&
        'updated_at' in profileFile &&
        'profiles' in profileFile
      ) {
        return profileFile as ProfileJSON
      }
    }

    // 문자열인 경우 파싱
    if (typeof profileFile === 'string') {
      try {
        return JSON.parse(profileFile) as ProfileJSON
      } catch {
        return null
      }
    }

    return null
  }, [profileFile])

  // profileJson이 있으면 parsedProfiles 배열 동기화
  useEffect(() => {
    if (profileJson && Array.isArray(profileJson.profiles)) {
      const currentParsedProfiles = form.getValues('parsedProfiles')
      // 현재 parsedProfiles가 없거나 길이가 다른 경우에만 업데이트
      if (
        !Array.isArray(currentParsedProfiles) ||
        currentParsedProfiles.length !== profileJson.profiles.length
      ) {
        form.setValue('parsedProfiles', profileJson.profiles)
      }
    }
  }, [profileJson, form])

  return {
    form,
    parsedProfiles: profileJson, // ProfileJSON 객체 반환
    parsedProfilesArray: parsedProfiles || [], // Profile 배열 반환
  }
}

export default useForm
