import { z } from 'zod'

export const HomeFormSchema = z.object({
  createdAt: z.string().min(1),
})

export const PlannerFormSchema = z.object({
  step: z.number().min(1),
  profileFile: z.any().optional(), // 전체 ProfileJSON 객체 저장
  parsedProfiles: z.array(z.any()).optional(), // 파싱된 Profile 배열
  fileName: z.string().nullable().optional(),
  selectedProfiles: z.array(z.any()).optional(),
})
