import {Product} from "./product";

export interface Cart {
  id?: number;
  quantity?: number;
  account?: Account;
  product?: Product;
}
