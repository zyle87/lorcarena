import { createSlice } from '@reduxjs/toolkit'
import { BuilderState } from './builderSlice'

export type SettingsState = {
  storeVersion: number
  saves: BuilderState[]
}

const initialState: SettingsState = {
  storeVersion: parseInt(import.meta.env.VITE_STORE_VERSION),
  saves: []
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    save: (state, action) => {
      const index = state.saves.findIndex(
        (save) => save.id === action.payload.id
      )

      if (index !== -1) {
        state.saves[index] = action.payload
      } else {
        state.saves.push(action.payload)
      }
    },
    removeSave: (state, action) => {
      state.saves = state.saves.filter((save) => save.id !== action.payload)
    }
  }
})

export const settingsActions = settingsSlice.actions

export default settingsSlice.reducer
