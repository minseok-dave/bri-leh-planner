import usePlanner from '@/hooks/pages/planner/step3/use-planner'

import PageTitle from './page-title'

const Step3 = () => {
  usePlanner()

  return (
    <div className="flex flex-col gap-6">
      <PageTitle
        title="플레이 플래너 결과"
        subTitle={`플레이 플래너 결과를 확인해주세요.`}
      />
    </div>
  )
}

export default Step3
