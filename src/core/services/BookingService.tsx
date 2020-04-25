import { AxiosInstance } from 'axios';
import environment from '../../../environments/environment';
import Service from "./Service";
import Booking from "../models/Booking"
import { BehaviorSubject } from 'rxjs';
import AsyncStorage from '@react-native-community/async-storage';


class BookingService {
  http: AxiosInstance;
  _currentBookingprocessed: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor() {
    this.http = Service.getInstance();
  }

  getBookings(page): Promise<any> {
    return this.http.get(`${environment.apiUrl}/booking/all?page=${page}`)
      .then(res => {
        return res.data.data as Booking[];
      })
      .catch(err => console.warn(err));
  }

  async setCurrentBookingProcessed(id): Promise<any> {
    let booking = await this.http.get(`${environment.apiUrl}/booking/${id}`);
    await AsyncStorage.setItem('currentBookingProcessed', JSON.stringify(booking.data))
  }

  async getCurrentPorcessedBooking() {
    return this._currentBookingprocessed.asObservable().toPromise();
  }
}

export default new BookingService();