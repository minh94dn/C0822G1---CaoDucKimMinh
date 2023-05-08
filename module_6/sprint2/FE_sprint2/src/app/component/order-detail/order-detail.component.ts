import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../service/cart.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {Cart} from "../../model/cart";
import {ShareService} from "../../service/share.service";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  quantity = 0;
  cart: Cart[] = []
  total = 0;
  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private cartService:CartService,
              private tokenStorageService:TokenStorageService,
              private shareService:ShareService) {
    this.getCart();
    this.shareService.getClickEvent().subscribe(next => {
      this.getCart()
    })
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {

      this.cartService.showAllCart(this.tokenStorageService.getUser().id).subscribe(next => {
        console.log(next)
        this.cart = next;
        this.getValue()
        this.shareService.setCount(next.length);
      })

  }
  getValue() {
    this.total = 0
    if (this.cart != null) {
      this.quantity = this.cart.length;
      for (let i = 0; i < this.cart.length; i++) {
        this.total += this.cart[i].product.price * this.cart[i].quantity
      }
    }
  }

  stepUp(id: number) {
    this.cartService.increaseQuantity(id).subscribe(next => {
      this.shareService.sendClickEvent()
      this.getCart()
      this.getValue();
    })
  }

  stepDown(id: number) {
    this.cartService.reduceQuantity(id).subscribe(next => {
      this.shareService.sendClickEvent()
      this.getCart()
      this.getValue()
    })
  }
}
