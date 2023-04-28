import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {Product} from "../../model/product";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  productList: Product[];

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const keyword = params['name'];
      console.log(keyword)
      this.productService.searchAllProduct(keyword).subscribe(next =>{
        this.productList = next;
        console.log(next)
      })
    })
  }

  addCart(id: number) {

  }
}
