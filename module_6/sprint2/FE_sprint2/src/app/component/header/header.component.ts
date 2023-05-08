import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewportScroller} from "@angular/common";
import {TokenStorageService} from "../../service/token-storage.service";
import {ShareService} from "../../service/share.service";
import {Router} from "@angular/router";
import {Cart} from "../../model/cart";
import {CartService} from "../../service/cart.service";
import {SecurityService} from "../../service/security.service";
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit {

  @Input() inputValue: string;
  username?: string;
  img?: string;
  name?: string;
  role?: string;
  isLoggedIn = false;
  itemCount = 0;

  constructor(private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private accountService: SecurityService,
              private router: Router,
              private cartDetailService: CartService,
              private productService: ProductService,
              private searchService: ShareService) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
    this.searchService.getCount().subscribe(count => {
      this.itemCount = count;
    });
  }


  ngOnInit(): void {
    this.loadHeader();
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.role = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
      this.isLoggedIn = this.username != null;
      this.findNameUser();
    } else {
      this.isLoggedIn = false;
    }
  }

  findNameUser(): void {
    this.accountService.findByUserName(this.tokenStorageService.getUser().username).subscribe(next => {
      console.log(next)
      this.name = next?.name;
      // this.img = next?.avatar;
      this.cartDetailService.showAllCart(next?.id).subscribe(item => {
        console.log(item.length)
        this.itemCount = item?.length;
      });
    });
  }

  logOut() {
    this.tokenStorageService.signOut();
    this.ngOnInit();
    this.router.navigateByUrl('');
  }

  // scrollToTopLogin() {
  //   this.scroll.scrollToPosition([0, 600]);
  // }

  goToResultPage() {
    this.router.navigate(['/search'], {queryParams: {'name': this.inputValue}});
  }

  scrollToTopLogin() {

  }
}
