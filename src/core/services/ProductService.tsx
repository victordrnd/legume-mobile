import { AxiosInstance } from "axios";
import Service from "./Service";
import environment from "../../../environments/environment";
import Order from "../models/Order";

class ProductService {
  http: AxiosInstance;
  constructor() {
    this.http = Service.getInstance();
  }

  editDeliveredQuantity( order: Order,item_id: number, delivered_quantity: number) {
    let body = {
      "order_id": order.id,
      "items": [
        { "id": item_id, "delivered_quantity": delivered_quantity }
      ]
    }

    return this.http.put(`${environment.apiUrl}/order/edit`, body).catch((err) => {
      console.warn(err)
    })
  }
}

export default new ProductService(); 