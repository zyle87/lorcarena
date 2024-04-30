import { configureStore, StateFromReducersMapObject } from '@reduxjs/toolkit'
import settings from './slices/settingsSlice.ts'
import builder from './slices/builderSlice.ts'
import { loadState, saveState } from './storage.ts'

const preloadedState = loadState()
const reducer = {
  builder,
  settings
}

export const store = configureStore({
  preloadedState,
  reducer
})

store.subscribe(() => {
  saveState(store.getState())
})

export type RootState = StateFromReducersMapObject<typeof reducer>
export type AppDispatch = typeof store.dispatch
