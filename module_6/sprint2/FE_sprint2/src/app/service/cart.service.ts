import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient) { }

  showAllCart(id): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/api/cart/list/"+id)
  }

  addCart(accountId,productId,quantity): Observable<any> {
    let dto = {
      accountId:accountId,
      productId:productId,
      quantity:quantity,
    }
    return this.httpClient.post("http://localhost:8080/api/cart/create", dto);
  }

  increaseQuantity(id): Observable<any> {
    let dto = {
      id:id
    }
    return this.httpClient.post("http://localhost:8080/api/cart/increase", dto);
  }

  reduceQuantity(id): Observable<any> {
    let dto = {
      id:id
    }
    return this.httpClient.post("http://localhost:8080/api/cart/reduce", dto);
  }
}
