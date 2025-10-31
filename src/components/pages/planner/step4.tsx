import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useForm from '@/hooks/pages/planner/step4/use-form'
import usePlanner1 from '@/hooks/pages/planner/step4/use-planner-1'
import type { Profile } from '@/types'

import LabelValue from './label-value'
import PageTitle from './page-title'

const Step4 = () => {
  const { profiles } = useForm()
  const { loading } = usePlanner1({ profiles: profiles || [] })

  const handleExportFile = () => {
    // 현재 form의 parsedProfiles 배열 가져오기
    const currentProfiles: Profile[] = profiles || []

    // ProfileJSON 형태로 구성
    const exportData = {
      editor_name: 'Unknown',
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
  }

  return (
    <div className="flex flex-col gap-6">
      <PageTitle
        title="브리레흐 플래너"
        subTitle={`앞서 전달된 결과를 토대로 최적의 브리레흐 파티를 자동으로 생성합니다.`}
      />

      <div className="flex gap-2 justify-end">
        <Button onClick={handleExportFile} variant="outline" className="w-fit">
          JSON 파일 내보내기
        </Button>
        <Button disabled variant="outline" className="w-fit">
          화면 캡쳐 이미지 내보내기
        </Button>
      </div>

      <div className="flex flex-col gap-6 overflow-y-auto max-h-[900px] border border-gray-200 rounded-md p-4">
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-bold text-gray-900">1관</h4>
            <Separator />
          </div>

          <div className="flex flex-col gap-0.5">
            <LabelValue label="상태지원" value="나나" />
            <LabelValue label="100 프라가라흐" value="나나" />
            <LabelValue label="50 프라가라흐" value="나나" />
            <LabelValue label="5시" value="나나" />
            <LabelValue label="7시" value="나나" />
            <LabelValue label="11시" value="나나" />
            <LabelValue label="1시" value="나나" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-bold text-gray-900">2관</h4>
            <Separator />
          </div>

          <div className="flex flex-col gap-0.5">
            <LabelValue label="상태지원" value="나나" />
            <LabelValue label="100 프라가라흐" value="나나" />
            <LabelValue label="50 프라가라흐" value="나나" />
            <LabelValue label="12시" value="나나" />
            <LabelValue label="3시" value="나나" />
            <LabelValue label="9시" value="나나" />
            <LabelValue label="6시" value="나나" />
            <LabelValue label="기믹" value="나나" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-bold text-gray-900">3관</h4>
            <Separator />
          </div>

          <div className="flex flex-col gap-0.5">
            <LabelValue label="상태지원" value="나나" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step4
