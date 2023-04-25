import {Orders} from "./orders";
import {Product} from "./product";

export interface OrderDetail {
  id?: number;
  quantity?: number;
  orders?: Orders;
  product?: Product;
}
