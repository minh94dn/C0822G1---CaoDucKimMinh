import {Category} from "./category";

export interface Product {
  id?: number;
  code?: string;
  name?: string;
  description?: string;
  flagDelete?: boolean;
  image?: string;
  origin?: string;
  category?: Category;
  price?: number;
}
