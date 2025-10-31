import { useFieldArray } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { EMPTY_PROFILE } from '@/constants/default-values'
import useForm from '@/hooks/pages/planner/step2/use-form'
import type { PlannerFormSchema } from '@/schemas/pages'

import CardFields from './card-fields'
import PageTitle from './page-title'

const Step2 = () => {
  const { form, parsedProfiles } = useForm()
  const { fields, update, remove, append } = useFieldArray<
    z.infer<typeof PlannerFormSchema>,
    'parsedProfiles'
  >({
    control: form.control,
    name: 'parsedProfiles',
  })

  const handleAddProfile = () => {
    append(EMPTY_PROFILE)
  }

  const handleExportFile = () => {
    // 현재 form의 parsedProfiles 배열 가져오기
    const currentProfiles = form.getValues('parsedProfiles') || []

    // 각 필드를 현재 form 값으로 업데이트
    currentProfiles.forEach((profile, index) => {
      update(index, profile)
    })

    // 원본 profileFile도 업데이트하여 step 변경 시 원래 데이터로 돌아가지 않도록 함
    const currentProfileFile = form.getValues('profileFile')
    if (currentProfileFile && typeof currentProfileFile === 'object') {
      const updatedProfileFile = {
        ...currentProfileFile,
        profiles: currentProfiles,
        updated_at: new Date()
          .toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          })
          .replace(
            /(\d{4})\/(\d{2})\/(\d{2}),?\s*(\d{2}):(\d{2}):(\d{2})/,
            '$1-$2-$3 $4:$5:$6',
          ),
      }
      form.setValue('profileFile', updatedProfileFile)
    }

    // ProfileJSON 형태로 구성
    const exportData = {
      editor_name: parsedProfiles?.editor_name || 'Unknown',
      updated_at: new Date()
        .toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
        .replace(
          /(\d{4})\/(\d{2})\/(\d{2}),?\s*(\d{2}):(\d{2}):(\d{2})/,
          '$1-$2-$3 $4:$5:$6',
        ),
      profiles: currentProfiles,
    }

    // JSON 문자열로 변환
    const jsonString = JSON.stringify(exportData, null, 2)

    // Blob 생성
    const blob = new Blob([jsonString], { type: 'application/json' })

    // 다운로드 링크 생성
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `profiles_${new Date().toISOString().split('T')[0]}.json`

    // 링크 클릭하여 다운로드
    document.body.appendChild(link)
    link.click()

    // cleanup
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    form.setValue('step', 3)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageTitle
        title="프로필 정보"
        subTitle={`로드한 JSON 파일의 프로필 정보 기반으로 자동 생성됩니다.\n 없다면 사용자 추가 버튼을 통해 추가해주세요.`}
      />

      <div className="flex justify-end gap-2">
        <Button
          onClick={handleAddProfile}
          variant="secondary"
          className="w-fit"
        >
          사용자 추가
        </Button>
        <Button onClick={handleExportFile} variant="outline" className="w-fit">
          저장
        </Button>
      </div>

      <div className="flex flex-col gap-6 overflow-y-auto max-h-[900px] border border-gray-200 rounded-md p-4">
        {fields.length > 0 ? (
          fields.map((field, index) => (
            <CardFields
              key={field.id}
              index={index}
              onRemove={() => remove(index)}
              className="flex-1"
            />
          ))
        ) : (
          <div className="min-h-[200px] flex items-center justify-center">
            <p className="text-gray-500 text-center">
              프로필 정보가 없습니다. 사용자 추가 버튼을 통해 추가해주세요.{' '}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Step2
