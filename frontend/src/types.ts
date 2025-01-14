export interface Order {
  id: number
  locationId: number
  location: string
  description: string
  status: 'ordered' | 'prepared' | 'finished'
}

export interface Location {
  id: number
  name: string
  orders: Order[]
  newOrderDescription?: string
  newName?: string
  error?: string | null
}
