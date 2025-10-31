import { z } from 'zod'

export const HomeFormSchema = z.object({
  createdAt: z.string().min(1),
})
