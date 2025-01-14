export interface Order {
  id: number;
  description: string;
  locationId: number;
}

export interface Location {
  id: number;
  name: string;
  // orders: Order[];
}
