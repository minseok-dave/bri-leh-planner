import { useCallback, useEffect, useState } from 'react'

import type { Profile } from '@/types'

type UsePlannerProps = {
  profiles: Profile[]
}

const usePlanner1 = ({ profiles }: UsePlannerProps) => {
  const [loading, setLoading] = useState(false)

  const calculate = useCallback(async () => {
    setLoading(true)
    try {
      // 여기에 계산 로직을 추가하세요
      // 예: await heavyCalculation(profiles)

      // 동기 계산인 경우 Promise로 감싸기:
      await new Promise((resolve) => {
        // 계산 로직 예시
        console.log(profiles)

        // 계산이 끝나면 resolve 호출
        setTimeout(resolve, 100) // 예시: 실제 계산 시간
      })
    } finally {
      setLoading(false)
    }
  }, [profiles])

  // profiles가 변경될 때 자동으로 계산을 실행하려면:
  useEffect(() => {
    if (profiles.length > 0) {
      calculate()
    }
  }, [calculate, profiles])

  return {
    loading,
    calculate,
  }
}

export default usePlanner1
