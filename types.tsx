
export type TLSParamList = {
  Login: undefined
  ActualApp: {
    token: string
  } // TODO: Add in user token
}

export type DrawerParamList = {
  Home: {
    token: string
  }
  Locations: undefined
  Announcements: undefined
  NotFoundScreen: undefined
  Testing: undefined
}

export type Location = {
  locationName: string
  locationID: string
}

export type MapStackParamList = {
  Home: undefined
  InventoryMain: Location
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

export type Announcement = {
  id: string
  title: string
  body: string
  timestamp: string

}