import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {OrderDetailComponent} from "./component/order-detail/order-detail.component";
import {InfoProductComponent} from "./component/info-product/info-product.component";
import {BodyComponent} from "./component/body/body.component";
import {SearchComponent} from "./component/search/search.component";


const routes: Routes = [
  {path: '', component: BodyComponent},
  {path: 'login', component: LoginComponent},
  {path: 'orderDetail', component: OrderDetailComponent},
  {path: 'info/:id', component: InfoProductComponent},
  {path: 'search', component: SearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
