import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  getAllProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:8080/api/product/list')
  }

  findById(id: number): Observable<Product> {
    return this.httpClient.get<Product>('http://localhost:8080/api/product/info/' + id)
  }
}