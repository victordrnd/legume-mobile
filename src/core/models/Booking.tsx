import User from "./User";
import Order from "./Order";

export default interface Booking {
  id: number;
  schedule: Date;
  user: User;
  status: { id: number, libelle: string, slug: string },
  order_id: number,
  order: Order;
  created_at: Date;
  updated_at: Date;
}