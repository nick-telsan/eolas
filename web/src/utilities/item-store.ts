import { create } from 'zustand'

interface ItemState {
  id?: number
  setId: (id: number) => void
}

export const useItemStore = create<ItemState>((set) => ({
  id: undefined,
  setId: (id: number) => set(() => ({ id })),
}))
