import Product from "./Product";

export default interface Item {
  id: number;
  product_id: number;
  quantity: number;
  delivered_quantity: number;
  order_id: number;
  buyable_type: string;
  product: Product;
}