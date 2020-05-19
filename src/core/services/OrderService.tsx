import { AxiosInstance } from 'axios';
import environment from '../../../environments/environment';
import Service from "./Service";
import Order from '../models/Order';
import Item from '../models/Item';


class OrderService {

  http: AxiosInstance;
  constructor() {
    this.http = Service.getInstance();
  }

  prepare(id) {
    return this.http.put(`${environment.apiUrl}/order/prepare?order_id=${id}`)
      .catch(err => console.warn(err));
  }

  
  editDeliveredQuantity(order: Order, items: Array<Item>) {
    let body = {
      items : items
    }
    return this.http.put(`${environment.apiUrl}/order/${order.id}/edit`, body).catch((err) => console.warn(err));
  }
}

export default new OrderService();