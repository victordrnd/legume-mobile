import Item from "./Item";
import User from "./User";

export default interface Order {
  id: number;
  preparator:User;
  items: Item[];
  total_price: number;
  created_at: Date;
  updated_at: Date;
  created: string;
}