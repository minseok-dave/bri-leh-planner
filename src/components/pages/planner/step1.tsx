import { useFormContext, useWatch } from 'react-hook-form'
import { z } from 'zod'

import { JsonFileDrop } from '@/components/ui/json-file-drop'
import type { PlannerFormSchema } from '@/schemas/pages'
import type { ProfileJSON } from '@/types'

import PageTitle from './page-title'

const Step1 = () => {
  const form = useFormContext<z.infer<typeof PlannerFormSchema>>()
  const fileName = useWatch({
    control: form.control,
    name: 'fileName',
  })

  const handleFileLoad = (jsonData: unknown, fileName: string) => {
    // 전체 ProfileJSON 객체를 profileFile에 저장
    form.setValue('profileFile', jsonData)
    form.setValue('fileName', fileName)

    // parsedProfiles는 step2에서 자동으로 파싱하도록 함
    // 여기서는 profileFile만 저장
    const profileData = jsonData as ProfileJSON
    if (
      profileData &&
      typeof profileData === 'object' &&
      'profiles' in profileData &&
      Array.isArray(profileData.profiles)
    ) {
      // parsedProfiles도 미리 초기화 (step2에서 바로 사용 가능하도록)
      form.setValue('parsedProfiles', profileData.profiles)
    }
  }

  const handleError = (error: Error) => {
    alert(error.message)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageTitle
        title="프로필 파일 로드"
        subTitle={`이전에 작성하셨던 파일이 있으신가요?\n 있으시다면 그 파일을 로드해주세요.\n 없으시다면 다음 단계로 넘어가주세요.`}
      />

      <JsonFileDrop
        onFileLoad={handleFileLoad}
        onError={handleError}
        value={fileName ?? null}
      />
    </div>
  )
}

export default Step1
