import { AxiosInstance } from "axios";
import Service from "./Service";
import environment from "../../../environments/environment";
import Order from "../models/Order";
import Item from "../models/Item";

class ProductService {
  http: AxiosInstance;
  constructor() {
    this.http = Service.getInstance();
  }

}

export default new ProductService(); 