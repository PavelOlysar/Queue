export interface Order {
  id: number
  description: string
  locationId: number
  status: 'ordered' | 'prepared' | 'finished'
}

export interface Location {
  id: number
  name: string
  orders: Order[]
}
