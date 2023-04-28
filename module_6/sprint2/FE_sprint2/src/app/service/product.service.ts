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

  searchAllProduct(search: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:8080/api/product/search?name=' + search)
  }

  findByCategoryId1(page1: number, size1: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:8080/api/product/fanList?page=' + page1 + '&size=' + size1)
  }

  findByCategoryId2(page2: number, size2: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:8080/api/product/stoveList?page=' + page2 + '&size=' + size2)
  }

  findById(id: number): Observable<Product> {
    return this.httpClient.get<Product>('http://localhost:8080/api/product/info/' + id)
  }
}
