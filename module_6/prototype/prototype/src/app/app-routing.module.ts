import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BodyComponent} from "./body/body.component";
import {LoginComponent} from "./login/login.component";
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {InfoProductComponent} from "./info-product/info-product.component";


const routes: Routes = [
  {path: '', component: BodyComponent},
  {path: 'login', component: LoginComponent},
  {path: 'orderDetail', component: OrderDetailComponent},
  {path: 'info', component: InfoProductComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
