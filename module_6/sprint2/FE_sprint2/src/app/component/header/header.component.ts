import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewportScroller} from "@angular/common";
import {TokenStorageService} from "../../service/token-storage.service";
import {ShareService} from "../../service/share.service";
import {Router} from "@angular/router";
import {Cart} from "../../model/cart";
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit {
  count= 0;
  isLogin: boolean;
  nameUser: string;
  idAccount: number;
  @Input() inputValue: string;

  constructor(private scroll: ViewportScroller,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private router: Router,
              private cartService: CartService) {

      this.idAccount = Number(this.tokenStorageService.getIdAccount())
      this.cartService.showAllCart(this.idAccount).subscribe(next => {
        this.count = next.length;
        this.isLogin = this.tokenStorageService.isLogged();
        this.nameUser = this.tokenStorageService.getUser()?.name
        console.log(this.nameUser)
      })
      this.shareService.getCount().subscribe(data => {
        this.count = data
      })
    }


  ngOnInit(): void {
    if(this.tokenStorageService.getToken()){
      this.shareService.getClickEvent().subscribe(next1 => {
      this.idAccount = Number(this.tokenStorageService.getIdAccount())
      this.cartService.showAllCart(this.idAccount).subscribe(next => {
        this.count = next.length;
          this.isLogin = this.tokenStorageService.isLogged();
          this.nameUser = this.tokenStorageService.getUser()?.name
        console.log(this.nameUser)
        })
      });
      this.shareService.getCount().subscribe(data => {
        this.count = data
      })
    }
  }

  scrollToTopLogin() {
    this.scroll.scrollToPosition([0, 600]);
  }

  logout() {
    this.tokenStorageService.logout();
    this.isLogin = this.tokenStorageService.isLogged();
    this.shareService.sendClickEvent();
    this.router.navigateByUrl("")
  }


  goToResultPage() {
    this.router.navigate(['/search'], {queryParams: {'name': this.inputValue}});
  }
}
