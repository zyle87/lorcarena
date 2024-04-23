import { createSlice } from '@reduxjs/toolkit'
import { Card, Ink } from '../../tools/types'

export type BuilderState = {
  id: Nullable<number>
  inks: Ink[]
  draft: Card[]
  deck: Card[]
  reroll: number
}

const initialState: BuilderState = {
  id: null,
  inks: [],
  draft: [],
  deck: [],
  reroll: 3
}

export const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    addInk: (state, action) => {
      state.inks.push(action.payload)
    },
    removeInk: (state, action) => {
      state.inks = state.inks.filter((ink) => ink !== action.payload)
    },
    generateId: (state) => {
      state.id = Date.now()
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
    reroll: (state) => {
      state.draft = []
      state.reroll--
    },
    reset: () => initialState,
    parse: (_, action) => {
      return action.payload
    }
  }
})

export const builderActions = builderSlice.actions

export default builderSlice.reducer
