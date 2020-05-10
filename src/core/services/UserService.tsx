import axios, { AxiosInstance } from 'axios';
import environment from '../../../environments/environment';
import AsyncStorage from '@react-native-community/async-storage';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import Service from './Service';

class UserService {

  http: AxiosInstance
  constructor() {
    this.http = Service.getInstance();
  }

  private currentUserSubject = new BehaviorSubject<any>({});
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new BehaviorSubject<any>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  tokenSubject = new BehaviorSubject<any>(false);
  tokenObservable = this.tokenSubject.asObservable();


  async load(): Promise<boolean> {
    let token;
    try {
      Service.token = await AsyncStorage.getItem("@token");
    } catch (error) {
      return false
    }
    if (token != null) {
      try {
        const res = await this.http
          .get(`${environment.apiUrl}/auth/current`);
        if (res.status == 200) {
          this.setAuth(res.data);
          return true;
        }
      }
      catch (err) {
        console.info(err.response);
        return false;
      }
    }
    this.purgeAuth();
    return false
  }

  async login(obj, callback, errorCallback) {
    this.http.post(`${environment.apiUrl}/auth/login`, obj)
      .then((res) => {
        callback(res.data);
      })
      .catch((error) => {
        errorCallback(error);
      })
  }

  async signup(obj, callback) {
    this.http.post(`${environment.apiUrl}/auth/signup`, obj)
      .then((res) => {
        callback(res.data);
      })
      .catch((error) => {
        console.info(error.response.data)
      })
  }


  async setAuth({ user, token }) {
    await AsyncStorage.setItem('@token', token);
    Service.token = token;
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }


  getToken(): string {
    return Service.token;
  }

  async destroyToken() {
    await AsyncStorage.removeItem('@token')
  }



  purgeAuth() {
    this.destroyToken();
    this.currentUserSubject.next({});
    this.isAuthenticatedSubject.next(false);
  }

}

export default new UserService();