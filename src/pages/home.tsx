import { Info } from 'lucide-react'
import { Navigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DatePicker } from '@/components/ui/date-picker'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { AUTH_CREATED_AT } from '@/constants/env'
import useForm from '@/hooks/pages/home/use-form'
import useAuthStorage from '@/stores/use-auth-storage'

const Home = () => {
  const { form, onSubmit } = useForm()
  const createdAt = useAuthStorage((state) => state.createdAt)

  if (createdAt === AUTH_CREATED_AT) {
    return <Navigate to="/bri-leh-planner/planner" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>간단한 테스트!</CardTitle>
        <CardDescription>
          정답을 맞추면 프로필 수정 페이지로 이동합니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="createdAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>브래드앤버터 길드의 창설 일은?</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">제출</Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2 peer mr-2 hover:cursor-auto">
          <Info className="size-4" />
          <span className="text-gray-800 select-none">힌트</span>
        </div>
        <span className="text-gray-800 peer-hover:opacity-100 opacity-0 transition-all duration-300">
          힌트는 없어요 ㅋㅋ
        </span>
      </CardFooter>
    </Card>
  )
}

export default Home
