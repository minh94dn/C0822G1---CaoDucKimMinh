import {Component, OnInit} from '@angular/core';
import {ViewportScroller} from "@angular/common";
import {TokenStorageService} from "../../service/token-storage.service";
import {ShareService} from "../../service/share.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin = true;
  nameUser: string;
  constructor(private scroll: ViewportScroller,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService) {
    this.shareService.getClickEvent().subscribe(next => {
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
}
