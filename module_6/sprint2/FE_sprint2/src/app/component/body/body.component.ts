import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {ProductService} from "../../service/product.service";
import {CartService} from "../../service/cart.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {ShareService} from "../../service/share.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  productList1: Product[] = [];
  productList2: Product[] = [];
  page1 = 0;
  size1 = 3;
  hasMore1 = false;
  displayedCount1: number = 0;
  role="none";
  page2 = 0;
  size2 = 3;
  hasMore2 = false;
  displayedCount2: number = 0;


  constructor(private productService: ProductService,
              private cartService:CartService,
              private token:TokenStorageService,
              private shareService: ShareService) {
    // this.getALlProduct();
  }

  ngOnInit(): void {
    this.loadCategoryId1();
    this.loadCategoryId2()
  }

  // getALlProduct(){
  //   this.productService.getAllProduct().subscribe(next => {
  //     console.log(next)
  //     this.productList = next
  //   })
  // }


  loadMoreCategoryId1() {
    this.page1++;
    this.productService.findByCategoryId1(this.page1, this.size1).subscribe(products => {
      this.productList1.push(...products);
      this.hasMore1 = products.length === this.size1;
      this.displayedCount1 += this.page1;
    });
  }

  private loadCategoryId1() {
    this.page1 = 0;
    this.productService.findByCategoryId1(this.page1, this.size1).subscribe(products => {
      this.productList1 = products;
      this.hasMore1 = products.length === this.size1;
    });
  }

  loadMoreCategoryId2() {
    this.page2++;
    this.productService.findByCategoryId2(this.page2, this.size2).subscribe(products => {
      this.productList2.push(...products);
      this.hasMore2 = products.length === this.size2;
      this.displayedCount2 += this.page2;
    });
  }

  private loadCategoryId2() {
    this.page2 = 0;
    this.productService.findByCategoryId2(this.page2, this.size2).subscribe(products => {
      console.log(products)
      this.productList2 = products;
      this.hasMore2 = products.length === this.size2;
    });
  }

  reset1() {
    this.loadCategoryId1()
  }

  reset2() {
    this.loadCategoryId2()
  }

  addCart(id:number) {
      this.cartService.addCart(this.token.getIdAccount(),id,1).subscribe(next=>{
      })
    this.cartService.showAllCart(this.token.getIdAccount()).subscribe(data => {
      this.shareService.setCount(data.length)
    })
  }
}
