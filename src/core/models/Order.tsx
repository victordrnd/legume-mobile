import Item from "./Item";

export default interface Order {
  id: number;
  items: Item[];
  total_price: number;
  created_at: Date;
  updated_at: Date;
  created: string;
}