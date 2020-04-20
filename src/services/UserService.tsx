import axios, { AxiosInstance } from 'axios';
import environment from '../../environments/environment';
import AsyncStorage from '@react-native-community/async-storage';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import Service from './Service';
import NavigationService from './NavigationService';
class UserService {

    http: AxiosInstance
    constructor() {
        this.http = axios;
    }

    private currentUserSubject = new BehaviorSubject<any>({});
     currentUser = this.currentUserSubject
        .asObservable()
        .pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new BehaviorSubject<any>(false);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();
    
    tokenSubject = new BehaviorSubject<any>(false);
    tokenObservable = this.tokenSubject.asObservable();

    token :string;

    async populate() {
        if (await this.tokenObservable.subscribe(token => this.token = token)) {
            try {
                await this.http
                    .get(`${environment.apiUrl}/auth/current`).then(res => {
                        this.setAuth(res.data.result);
                        this.isAuthenticatedSubject.next(true);
                        res.data.result.user.lastLogin = new Date();
                        this.currentUserSubject.next(res.data.result.user);
                    });
            } catch (error) {
                this.purgeAuth();
                console.log(error)
                this.isAuthenticatedSubject.next(false);
                return false;
            }
            return true;
        } else {
            // Remove any potential remnants of previous auth states
            //this.purgeAuth();
            return false;
        }
    }

    async login(obj, callback, errorCallback) {
        this.http.post(`${environment.apiUrl}/auth/login`, obj)
            .then((res) => {
                console.log(res);
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


    getToken() : string{
        return this.token;
    }

    async destroyToken() {
        AsyncStorage.removeItem('@token')
    }



    purgeAuth() {
        this.destroyToken();
        this.currentUserSubject.next({});
        this.isAuthenticatedSubject.next(false);
    }

}

export default new UserService();