import { X } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import OptionRadioGroup from '@/components/ui/option-radio-group'
import OptionSelect from '@/components/ui/option-select'
import { Separator } from '@/components/ui/separator'
import {
  ARCANA_OPTIONS,
  BOOLEAN_OPTIONS1,
  BOOLEAN_OPTIONS2,
  ROBE_PIERCING_OPTIONS,
  TRIBE_OPTIONS,
  WEAPON_OPTIONS,
} from '@/constants/select-options'
import { cn } from '@/lib/utils'
import type { PlannerFormSchema } from '@/schemas/pages'

import SubSection from './sub-section'

type CardFieldsProps = {
  index?: number
  className?: string
  onRemove?: () => void
}

const CardFields = ({ index, className, onRemove }: CardFieldsProps) => {
  const form = useFormContext<z.infer<typeof PlannerFormSchema>>()

  return (
    <div className={cn(className)}>
      {/* field.value 또는 profile을 사용해서 폼 필드 렌더링 */}
      {index !== undefined && (
        <Card>
          <CardContent className="space-y-4 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-[-20px] right-[10px]"
              onClick={onRemove}
            >
              <X className="w-4 h-4 text-red-main hover:text-red-main/80" />
            </Button>

            <div>
              <h4 className="text-md font-bold text-gray-900">기본 정보</h4>
              <Separator />
            </div>

            <div className="flex flex-wrap gap-4">
              <FormField
                name={`parsedProfiles.${index}.name`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-500">아이디</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={field.onChange}
                        className="w-[180px]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name={`parsedProfiles.${index}.tribe`}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-[0_0_auto]">
                    <FormLabel className="text-gray-500">종족</FormLabel>
                    <FormControl>
                      <OptionSelect
                        options={TRIBE_OPTIONS}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name={`parsedProfiles.${index}.arcana`}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-[0_0_auto]">
                    <FormLabel className="text-gray-500">아르카나</FormLabel>
                    <FormControl>
                      <OptionSelect
                        options={ARCANA_OPTIONS}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name={`parsedProfiles.${index}.weapon`}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-[0_0_auto]">
                    <FormLabel className="text-gray-500">무기</FormLabel>
                    <FormControl>
                      <OptionSelect
                        options={WEAPON_OPTIONS}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name={`parsedProfiles.${index}.robe_piercing`}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-[0_0_auto]">
                    <FormLabel className="text-gray-500">로브 피어싱</FormLabel>
                    <FormControl>
                      <OptionSelect
                        options={ROBE_PIERCING_OPTIONS}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div>
              <h4 className="text-md font-bold text-gray-900">디버프 정보</h4>
              <Separator />
            </div>

            <div className="flex gap-4 flex-wrap">
              <SubSection title="상태지원">
                <FormField
                  name={`parsedProfiles.${index}.debuff.status_support.level`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-[0_0_auto] flex flex-col">
                      <FormLabel className="text-gray-500">토템 레벨</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value}
                          onChange={field.onChange}
                          className="w-[180px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </SubSection>

              <SubSection title="데스마커">
                <FormField
                  name={`parsedProfiles.${index}.debuff.death_marker.level`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-[0_0_auto]">
                      <FormLabel className="text-gray-500">증폭 세공</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value}
                          onChange={field.onChange}
                          className="w-[180px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name={`parsedProfiles.${index}.debuff.death_marker.has_special`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-[0_0_auto] flex flex-col">
                      <FormLabel className="text-gray-500">
                        스아렌 여부
                      </FormLabel>
                      <FormControl>
                        <OptionRadioGroup
                          options={BOOLEAN_OPTIONS1}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </SubSection>

              <SubSection title="어퍼컷">
                <FormField
                  name={`parsedProfiles.${index}.debuff.uppercut.rate_level`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-[0_0_auto]">
                      <FormLabel className="text-gray-500">확률 세공</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value}
                          onChange={field.onChange}
                          className="w-[180px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name={`parsedProfiles.${index}.debuff.uppercut.has_increased_protection`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-[0_0_auto] flex flex-col">
                      <FormLabel className="text-gray-500">
                        추가 감소 세공 여부
                      </FormLabel>
                      <FormControl>
                        <OptionRadioGroup
                          options={BOOLEAN_OPTIONS1}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </SubSection>

              <SubSection title="서포트샷">
                <FormField
                  name={`parsedProfiles.${index}.debuff.suport_shot.has_set_bonus`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-[0_0_auto] flex flex-col">
                      <FormLabel className="text-gray-500">
                        세트 보너스 여부
                      </FormLabel>
                      <FormControl>
                        <OptionRadioGroup
                          options={BOOLEAN_OPTIONS1}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name={`parsedProfiles.${index}.debuff.suport_shot.has_magigraph`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-[0_0_auto] flex flex-col">
                      <FormLabel className="text-gray-500">
                        마기그래피 여부
                      </FormLabel>
                      <FormControl>
                        <OptionRadioGroup
                          options={BOOLEAN_OPTIONS1}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </SubSection>

              <SubSection title="프라가라흐">
                <FormField
                  name={`parsedProfiles.${index}.debuff.fragrach.has_throwing_star`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-[0_0_auto] flex flex-col">
                      <FormLabel className="text-gray-500">
                        수리검 프라가라흐 여부
                      </FormLabel>
                      <FormControl>
                        <OptionRadioGroup
                          options={BOOLEAN_OPTIONS2}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </SubSection>

              <SubSection title="연막">
                <FormField
                  name={`parsedProfiles.${index}.debuff.smoke`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-[0_0_auto] flex flex-col">
                      <FormLabel className="text-gray-500">
                        연막 가능 여부
                      </FormLabel>
                      <FormControl>
                        <OptionRadioGroup
                          options={BOOLEAN_OPTIONS2}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </SubSection>

              <SubSection title="하이드라">
                <FormField
                  name={`parsedProfiles.${index}.debuff.hydra.level`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-[0_0_auto] flex flex-col">
                      <FormLabel className="text-gray-500">레벨 세공</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value}
                          onChange={field.onChange}
                          className="w-[180px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </SubSection>

              <SubSection title="펫">
                <FormField
                  name={`parsedProfiles.${index}.debuff.pet_count.cat`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-[0_0_auto] flex flex-col justify-between">
                      <FormLabel className="text-gray-500">야옹이</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value}
                          onChange={field.onChange}
                          className="w-[180px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name={`parsedProfiles.${index}.debuff.pet_count.mire`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-[0_0_auto] flex flex-col justify-between">
                      <FormLabel className="text-gray-500">미르/케라</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value}
                          onChange={field.onChange}
                          className="w-[180px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name={`parsedProfiles.${index}.debuff.pet_count.fox`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-[0_0_auto] flex flex-col justify-between">
                      <FormLabel className="text-gray-500">폭스롯</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value}
                          onChange={field.onChange}
                          className="w-[180px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </SubSection>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default CardFields
