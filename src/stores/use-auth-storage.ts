import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type AuthStorage = {
  createdAt: string | null
  setCreatedAt: (createdAt: string) => void
}

const useAuthStorage = create<AuthStorage>()(
  persist(
    (set) => ({
      createdAt: null,
      setCreatedAt: (createdAt) => set({ createdAt }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default useAuthStorage
