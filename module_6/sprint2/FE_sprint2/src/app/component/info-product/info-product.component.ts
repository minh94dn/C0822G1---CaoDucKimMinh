import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {ProductService} from "../../service/product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.css']
})
export class InfoProductComponent implements OnInit {

  product: Product;
  id: number;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = +param.get('id');
    })
  }

  ngOnInit(): void {
    this.productService.findById(this.id).subscribe(next => {
      console.log(next)
      this.product = next
    }, error => {
      alert("lỗi")
      console.log(error)
    })
  }

}
