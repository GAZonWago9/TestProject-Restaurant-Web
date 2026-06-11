import type {dietList, restaurantStatusList} from "@/constants"

export type Restaurant = {
  id: string
  name: string
  address: string
  website: string
  status: Status
  diet?: Diet 
}

export type dish = {
  id: string
  name: string
  status: Status
  diet?: Diet 
}

type Status = typeof restaurantStatusList[number]
type Diet = typeof dietList[number]
 