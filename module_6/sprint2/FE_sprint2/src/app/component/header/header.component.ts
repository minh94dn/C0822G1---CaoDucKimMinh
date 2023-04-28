import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewportScroller} from "@angular/common";
import {TokenStorageService} from "../../service/token-storage.service";
import {ShareService} from "../../service/share.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit {
  isLogin = true;
  nameUser: string;
  @Input() inputValue: string;

  constructor(private scroll: ViewportScroller,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private router: Router) {
    this.shareService.getClickEvent().subscribe(next => {
      console.log(next)
      this.isLogin = tokenStorageService.isLogged();
      this.nameUser = tokenStorageService.getUser().name
      console.log(this.nameUser)
    })
  }

  ngOnInit(): void {
  }

  scrollToTopLogin() {
    this.scroll.scrollToPosition([0, 600]);
  }

  logout() {
    this.tokenStorageService.logout();
    this.isLogin = false;
    this.shareService.sendClickEvent();
  }


  goToResultPage() {
    this.router.navigate(['/search'], {queryParams: {'name': this.inputValue}});
  }
}
