import { Component, OnInit } from '@angular/core';
import {Product} from "../../model/product";
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  productList: Product[] = [];

  constructor(private productService: ProductService) {
    this.getALlProduct();
  }

  ngOnInit(): void {
  }

  getALlProduct(){
    this.productService.getAllProduct().subscribe(next => {
      console.log(next)
      this.productList = next
    })
  }
}
