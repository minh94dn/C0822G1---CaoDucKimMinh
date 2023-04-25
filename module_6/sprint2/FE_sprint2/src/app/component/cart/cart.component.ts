import { Component, OnInit } from '@angular/core';
import {Product} from "../../model/product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: Product[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
