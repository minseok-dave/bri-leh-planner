import Fuse from 'fuse.js'
import { useEffect, useMemo, useState } from 'react'
import { useWatch } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import useForm from '@/hooks/pages/planner/step3/use-form'
import { cn } from '@/lib/utils'

import PageTitle from './page-title'

const Step3 = () => {
  const {
    form,
    parsedProfiles,
    handleSelectProfile,
    isSelectedProfile,
    handleSelectComplete,
  } = useForm()

  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

  // Debounce 효과: 0.5초 후에 검색어 업데이트
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [searchQuery])

  // parsedProfiles를 watch하여 변경사항 추적
  const watchedProfiles = useWatch({
    control: form.control,
    name: 'parsedProfiles',
  })

  // 검색 대상 데이터 준비
  const searchableData = useMemo(() => {
    const allProfiles = watchedProfiles || []
    return allProfiles.map((profile, index) => ({
      index,
      name: profile?.name || '',
    }))
  }, [watchedProfiles])

  // Fuse 인스턴스 생성
  const fuse = useMemo(() => {
    return new Fuse(searchableData, {
      keys: ['name'],
      threshold: 0.3, // 0.3은 유연한 검색, 0.0은 정확한 매치만, 1.0은 모든 결과 반환
      includeScore: true,
    })
  }, [searchableData])

  // 필터링된 프로필 계산 (fuse.js를 사용한 연관검색어)
  const filteredProfiles = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return watchedProfiles || []
    }

    const searchResults = fuse.search(debouncedSearchQuery)
    const matchedIndices = new Set(
      searchResults.map((result) => result.item.index),
    )

    return (watchedProfiles || []).filter((_, index) =>
      matchedIndices.has(index),
    )
  }, [watchedProfiles, debouncedSearchQuery, fuse])

  return (
    <div className="flex flex-col gap-6">
      <PageTitle
        title="파티원 선택"
        subTitle={`같이 진행하는 파티원을 선택해주세요.`}
      />

      <div className="flex justify-between gap-2">
        <div className="flex gap-2 items-center">
          <span className="font-medium text-sm text-gray-500">아이디 검색</span>
          <Input
            className="w-[250px]"
            placeholder="아이디를 입력해주세요."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="w-fit"
            onClick={handleSelectComplete}
          >
            선택완료
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <Card
              key={profile.name}
              className={cn(
                'flex-[0_0_calc(25%-16px)] hover:cursor-pointer hover:bg-gray-100 transition-all duration-300',
                isSelectedProfile(profile) && 'bg-gray-100',
              )}
              onClick={() => handleSelectProfile(profile)}
            >
              <CardHeader>
                <CardTitle>
                  <span className="font-normal">{profile.arcana}</span>
                  {` ${profile.name}`}
                </CardTitle>
              </CardHeader>
            </Card>
          ))
        ) : (
          <div className="min-h-[200px] flex items-center justify-center w-full">
            <p className="text-gray-500 text-center">
              {parsedProfiles && parsedProfiles.length > 0
                ? '검색 결과가 없습니다.'
                : '프로필 정보가 없습니다.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Step3
