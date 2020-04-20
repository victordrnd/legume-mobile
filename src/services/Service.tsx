import axios, { AxiosInstance } from 'axios';


class Service {

    static instance : AxiosInstance;
    static token : string;

    static getInstance() : AxiosInstance{
        if(Service.instance == undefined){
            Service.instance = axios;
            Service.instance.interceptors.request.use((config) => {
                if(Service.token){
                    config.headers.Authorization = "Bearer " + Service.token
                }
                return config;
            });
        }

        return Service.instance;
    }

    private constructor() {
    }
  
}

export default Service;