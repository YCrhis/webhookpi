
'use client'

import { createUserStore, UserStore } from '@/stores/userStore'
import { createContext, useContext, useRef } from 'react'
import { useStore } from 'zustand'

type UserStoreApi = ReturnType<typeof createUserStore>

const UserStoreContext = createContext<UserStoreApi | null>(null)

export function UserProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<UserStoreApi | null>(null)

  if (!storeRef.current) {
    storeRef.current = createUserStore()
  }

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  )
}

export function useUserStore<T>(
  selector: (state: UserStore) => T
): T {
  const store = useContext(UserStoreContext)

  if (!store) {
    throw new Error('useUserStore must be used within UserProvider')
  }

  return useStore(store, selector)
}
