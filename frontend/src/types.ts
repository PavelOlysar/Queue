export interface Order {
  id: number
  location: string
  description: string
  status: 'ordered' | 'prepared' | 'finished'
}

export interface Location {
  name: string
  orders: Order[]
}
