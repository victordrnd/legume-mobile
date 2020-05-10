import { AxiosInstance } from "axios";
import Service from "./Service";
import environment from "../../../environments/environment";
import Order from "../models/Order";
import Item from "../models/Item";

class ProductService {
  http: AxiosInstance;
  constructor() {
    this.http = Service.getInstance();
  }

  editDeliveredQuantity(order: Order, item: Item, delivered_quantity: number) {
    let body = {
      "order_id": order.id,
      "items": [
        { "id": item.product.id, "delivered_quantity": delivered_quantity, "type": item.buyable_type }
      ]
    }

    return this.http.put(`${environment.apiUrl}/order/edit`, body).catch((err) => console.warn(err));
  }
}

export default new ProductService(); 