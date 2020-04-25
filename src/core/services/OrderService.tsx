import AsyncStorage from '@react-native-community/async-storage';
import { AxiosInstance } from 'axios';
import { BehaviorSubject } from 'rxjs';
import environment from '../../../environments/environment';
import Service from "./Service";
import Booking from '../models/Booking';


class OrderService {
  _currentOrderprocessed: BehaviorSubject<any> = new BehaviorSubject<any>({});
  http: AxiosInstance;
  constructor() {
    this.http = Service.getInstance();
  }

  prepare(id): Promise<any> {
    return this.http.get(`${environment.apiUrl}/order/prepare?order_id=${id}`)
      .catch(err => console.warn(err));
  }

  async setCurrentOrderProcessedByBookingId(id): Promise<any> {
    let booking = await this.http.get(`${environment.apiUrl}/booking/${id}`);
    await this.http.put(`${environment.apiUrl}/order/prepare?order_id=${booking.data.order_id}`)
    await AsyncStorage.setItem('currentOrderProcessedID',booking.data.order_id);
  }

  async getCurrentPorcessedOrder() {

    return this._currentOrderprocessed.asObservable().toPromise();
  }
}

export default new OrderService();