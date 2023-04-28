import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './component/login/login.component';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {BodyComponent} from './component/body/body.component';
import {HttpClientModule} from "@angular/common/http";
import {OrderDetailComponent} from './component/order-detail/order-detail.component';
import {InfoProductComponent} from './component/info-product/info-product.component';
import {AccountComponent} from './model/account/account.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { CartComponent } from './component/cart/cart.component';
import { SearchComponent } from './component/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    OrderDetailComponent,
    InfoProductComponent,
    AccountComponent,
    CartComponent,
    SearchComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
