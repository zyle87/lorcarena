import { inks } from './const'

export type Ink = (typeof inks)[number]

export type Card = {
  Artist: string
  Set_Name: string
  Set_Num: number
  Color: string
  Image: string
  Cost: number
  Inkable: boolean
  Name: string
  Type: string
  Rarity: string
  Flavor_Text: string
  Card_Num: number
  Body_Text: string
  Set_ID: string
}
