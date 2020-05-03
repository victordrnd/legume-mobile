import { AxiosInstance } from 'axios';
import environment from '../../../environments/environment';
import Service from "./Service";
import Booking from "../models/Booking"
import AsyncStorage from '@react-native-community/async-storage';


class BookingService {
  http: AxiosInstance;

  constructor() {
    this.http = Service.getInstance();
  }

  getBookings(page, perpage:number = 10) {
    return this.http.get(`${environment.apiUrl}/booking/all?page=${page}&per_page=${perpage}`)
      .then(res => {
        return res.data.data as Booking[];
      })
      .catch(err => console.warn(err));
  }

  async setCurrentBooking(booking: Booking){
    await this.http.put(`${environment.apiUrl}/order/prepare`, {order_id: booking.order_id})
    return AsyncStorage.setItem('currentBookingProcessedId',booking.id.toString());
  }

  async getCurrentPorcessedBooking() {
    return await this.http.get(`${environment.apiUrl}/booking/${await AsyncStorage.getItem('currentBookingProcessedId')}`);
  }
}

export default new BookingService();