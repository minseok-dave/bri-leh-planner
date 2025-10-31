import { useMemo } from 'react'

import Step1 from '@/components/pages/planner/step1'
import Step2 from '@/components/pages/planner/step2'
import Step3 from '@/components/pages/planner/step3'
import Step4 from '@/components/pages/planner/step4'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import useForm from '@/hooks/pages/planner/use-form'
import { cn } from '@/lib/utils'

const Planner = () => {
  const { form, step, handleNextStep, handlePreviousStep } = useForm()

  const StepComponent = useMemo(() => {
    const components = {
      1: <Step1 />,
      2: <Step2 />,
      3: <Step3 />,
      4: <Step4 />,
    }
    return components[step as keyof typeof components]
  }, [step])

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>{StepComponent}</Form>
      <div className={cn('flex gap-2 justify-center')}>
        <div className="flex gap-2">
          {step > 1 && (
            <Button variant="outline" onClick={handlePreviousStep}>
              이전
            </Button>
          )}
          {step === 1 && <Button onClick={handleNextStep}>다음</Button>}
        </div>
      </div>

      <div className="text-sm text-center text-muted-foreground">
        현재 단계: {step}
      </div>
    </div>
  )
}

export default Planner
