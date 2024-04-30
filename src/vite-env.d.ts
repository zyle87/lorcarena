/// <reference types="vite/client" />

declare type Nullable<T> = T | null
declare type Undefinable<T> = T | undefined

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string
    }
  }
}
