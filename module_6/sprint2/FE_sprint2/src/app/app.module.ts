import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './component/login/login.component';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {BodyComponent} from './component/body/body.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {OrderDetailComponent} from './component/order-detail/order-detail.component';
import {InfoProductComponent} from './component/info-product/info-product.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { CartComponent } from './component/cart/cart.component';
import { SearchComponent } from './component/search/search.component';
import {Http403Interceptor} from "./component/security/http403.interceptor";
import {AuthInterceptor} from "./component/security/auth.interceptor";
import { ReceiptComponent } from './component/receipt/receipt.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    OrderDetailComponent,
    InfoProductComponent,
    CartComponent,
    SearchComponent,
    ReceiptComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [{ provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
