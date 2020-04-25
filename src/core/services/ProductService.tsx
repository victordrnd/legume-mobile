import { AxiosInstance } from "axios";
import Service from "./Service";
import environment from "../../../environments/environment";

class ProductService {
  http: AxiosInstance;
  constructor() {
    this.http = Service.getInstance();
  }

  editDeliveredQuantity(id: number, order_id: number, delivered_quantity: number) {
    let body = {
      "order_id": order_id,
      "items": [
        { "id": id, "delivered_quantity": delivered_quantity }
      ]
    }
    return this.http.put(`${environment.apiUrl}/order/edit`, body).catch((err) => {
      console.warn(err)
    })
  }
}

export default new ProductService(); 