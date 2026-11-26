
import { UserI } from '@/types/User'
import { createStore } from 'zustand/vanilla'
import { persist, createJSONStorage } from 'zustand/middleware'

export type UserActions = {
  login: (user: UserI) => void
  logout: () => void
}

export type UserStore = UserI & UserActions

export const defaultInitState: UserI = {
  email: '',
  name: '',
  isActive: false
}

export const createUserStore = (
  initState: UserI = defaultInitState
) => {
  return createStore<UserStore>()(
    persist(
      (set) => ({
        ...initState,

        login: (user) => set(() => ({
          name: user.name,
          email: user.email,
          isActive: user.isActive
        })),

        logout: () => set(() => ({
          name: '',
          email: ''
        }))
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
}
