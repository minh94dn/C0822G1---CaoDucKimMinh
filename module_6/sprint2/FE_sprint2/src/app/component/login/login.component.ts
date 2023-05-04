import { Component, OnInit } from '@angular/core';
import {SecurityService} from "../../service/security.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../service/token-storage.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ShareService} from "../../service/share.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  roles: string[] = [];
  returnUrl = '/';
  errors = {username: '', password: ''};
  isSubmited = false;

  formLogin = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    rememberMe: new FormControl(false)
  });
  constructor(private router: Router,
              private tokenStorageService: TokenStorageService,
              private route: ActivatedRoute,
              private shareService: ShareService,
              private securityService: SecurityService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 10);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    if (this.tokenStorageService.getToken()) {
      this.securityService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getRole();
      const username = this.tokenStorageService.getUsername();
    }
  }


  login() {
    this.errors = {username: '', password: ''};
    this.errorMessage = '';
    if (this.formLogin.valid) {
      this.securityService.login(this.formLogin.value).subscribe(
        data => {
          console.log(data);
          if (this.formLogin.value.rememberMe) {
            this.tokenStorageService.saveTokenLocal(data.token);
            this.tokenStorageService.saveUserLocal(data, data.email, data.id, data.username, data.name, data.roles, data.avatar);
          } else {
            this.tokenStorageService.saveTokenSession(data.token);
            this.tokenStorageService.saveUserSession(data, data.email, data.id, data.username, data.name, data.roles, data.avatar);
          }
          const user = this.tokenStorageService.getUser();
          this.securityService.setIsLoggedIn(user, true);
          this.shareService.sendClickEvent();
          const username = this.tokenStorageService.getUsername();
          this.roles = this.tokenStorageService.getRole();
          this.router.navigateByUrl('/');
          this.formLogin.reset();
        //   if (this.tokenStorageService.getRole()[0] != 'ROLE_ADMIN') {
        //     this.orderService.createCart(parseInt(this.tokenStorageService.getIdAccount())).subscribe();
        //   }
        //   this.orderService.findOrderByAccountId(parseInt(data.id)).subscribe(next => {
        //     this.order = next;
        //     this.orderService.addCartLocal(this.tokenStorageService.getCart(), this.order.orderId).subscribe(next => {
        //         this.tokenStorageService.removeCart();
        //         this.shareService.sendClickEvent();
        //       }
        //     );
        //   });
        //   Swal.fire({
        //     position: 'center',
        //     icon: 'success',
        //     title: 'Thông báo!',
        //     text: 'Đăng nhập thành công',
        //     showConfirmButton: false,
        //     timer: 2000
        //   });
        }, error => {
        //   if (error.status == 406) {
        //     this.errorMessage = error.error.message;
        //     this.toast.error(this.errorMessage, 'Thất bại'
        //       , {positionClass: 'toast-top-center'});
        //     Swal.fire({
        //       position: 'center',
        //       icon: 'error',
        //       title: 'Thông báo!',
        //       text: 'Đăng nhập thất bại',
        //       showConfirmButton: false,
        //       timer: 2000
        //     });
        //   }
          this.securityService.isLoggedIn = false;
          if (error.error.errors) {
            for (let i = 0; i < error.error.errors.length; i++) {
              if (error.error.errors && error.error.errors[i].field === 'username') {
                this.errors.username = error.error.errors[i].defaultMessage;
              }
              if (error.error.errors && error.error.errors[i].field === 'password') {
                this.errors.password = error.error.errors[i].defaultMessage;
              }
            }
          }
        }
      );
    }
  }
}
