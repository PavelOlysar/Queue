export interface Order {
  id: number
  location: string
  description: string
  status: 'ordered' | 'prepared' | 'finished'
}

export interface Location {
  id: number
  name: string
  newName?: string
  error?: string | null
  orders: Order[]
}
