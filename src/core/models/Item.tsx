import Product from "./Product";

export default interface Item {
  id: number;
  product_id: number;
  quantity: number;
  order_id: number;
  product: Product;
}