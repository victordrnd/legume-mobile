import { AxiosInstance } from 'axios';
import environment from '../../../environments/environment';
import Service from "./Service";
import Booking from "../models/Booking"
import { BehaviorSubject } from 'rxjs';
import AsyncStorage from '@react-native-community/async-storage';


class BookingService {
  http: AxiosInstance;
  _currentBookingprocessed: BehaviorSubject<any>= new BehaviorSubject<any>({});
  constructor() {
    this.http = Service.getInstance();
  }

  getBookings(): Promise<any> {
    return this.http.post(`${environment.apiUrl}/booking/all`)
    .then( res => {
      return res.data.data as Booking[];
    })
    .catch(err => console.warn(err))
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