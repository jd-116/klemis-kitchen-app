
export type TLSParamList = {
  Login: undefined
  ActualApp: undefined // TODO: Add in user token
}

export type DrawerParamList = {
  Home: undefined
  Locations: undefined
  Announcements: undefined
  Deliveries: undefined
  NotFoundScreen: undefined
  Testing: undefined
}

export type Location = {
  locationName: string
  locationID: string
}

// WHEN YOU'RE ADDING STUFF HERE DON'T ADD IT AS UNDEFINED !!!!!!
export type InventoryStackParamList = {
  LocationList: undefined
  InventoryMain: Location
  InventoryDetails: {
    location: Location
    itemID: string
  }
  InventorySearch: Location
}

export type PantryItem = {
  name: string
  id: string
  thumbnail: string | null
  quantity: number
}