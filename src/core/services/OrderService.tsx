import { AxiosInstance } from 'axios';
import environment from '../../../environments/environment';
import Service from "./Service";


class OrderService {

  http: AxiosInstance;
  constructor() {
    this.http = Service.getInstance();
  }

  prepare(id) {
    return this.http.put(`${environment.apiUrl}/order/prepare?order_id=${id}`)
      .catch(err => console.warn(err));
  }
}

export default new OrderService();