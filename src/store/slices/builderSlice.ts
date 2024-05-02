import { createSlice } from '@reduxjs/toolkit'
import { inks } from '../../tools/const'
import { Card, Ink } from '../../tools/types'

export type BuilderState = {
  id: Nullable<number>
  name: string
  inks: Ink[]
  draft: Card[]
  deck: Card[]
  withRerolls: boolean
  reroll: number
  sets: number[]
}

const initialState: BuilderState = {
  id: null,
  name: 'New arena deck',
  inks: [],
  draft: [],
  deck: [],
  withRerolls: false,
  reroll: 3,
  sets: [1, 2, 3]
}

export const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    randomizeInks: (state) => {
      const firstInk = inks[Math.floor(Math.random() * inks.length)]
      const secondInk = inks.filter((ink) => ink !== firstInk)[
        Math.floor(Math.random() * (inks.length - 1))
      ]

      state.inks = [firstInk, secondInk]
    },
    addInk: (state, action) => {
      state.inks.push(action.payload)
    },
    updateName: (state, action) => {
      state.name = action.payload
    },
    removeInk: (state, action) => {
      state.inks = state.inks.filter((ink) => ink !== action.payload)
    },
    updateId: (state, action) => {
      state.id = action.payload
    },
    clearDraft: (state) => {
      state.draft = []
    },
    addCardToDraft: (state, action) => {
      state.draft.push(action.payload)
    },
    addCardToDeck: (state, action) => {
      state.deck.push(action.payload)
    },
    toggleRerolls: (state) => {
      state.withRerolls = !state.withRerolls
    },
    reroll: (state) => {
      state.draft = []
      state.reroll--
    },
    toggleSet: (state, action) => {
      if (state.sets.includes(action.payload)) {
        state.sets = state.sets.filter((set) => set !== action.payload)
      } else {
        state.sets.push(action.payload)
      }
    },
    clear: () => initialState,
    parse: (_, action) => {
      return action.payload
    }
  }
})

export const builderActions = builderSlice.actions

export default builderSlice.reducer
