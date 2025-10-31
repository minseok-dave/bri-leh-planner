import { zodResolver } from '@hookform/resolvers/zod'
import { DateTime } from 'luxon'
import { useForm as _useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { AUTH_CREATED_AT } from '@/constants/env'
import { HomeFormSchema } from '@/schemas/pages'
import useAuthStorage from '@/stores/use-auth-storage'

const useForm = () => {
  const navigate = useNavigate()
  const setCreatedAt = useAuthStorage((state) => state.setCreatedAt)

  const form = _useForm<z.infer<typeof HomeFormSchema>>({
    defaultValues: {
      createdAt: DateTime.now().toISO(),
    },
    resolver: zodResolver(HomeFormSchema),
  })

  const onSubmit = form.handleSubmit((data) => {
    const inputDate = DateTime.fromISO(data.createdAt).toFormat('yyyy-MM-dd')
    if (inputDate === AUTH_CREATED_AT) {
      setCreatedAt(inputDate)
      navigate('/bri-leh-planner/profile-editor')
    } else {
      alert('틀렸습니다 ㅋㅋ')
    }
  })

  return {
    form,
    onSubmit,
  }
}

export default useForm
