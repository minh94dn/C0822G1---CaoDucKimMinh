import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListPointComponent} from './component/point/list-point/list-point.component';
import {EditPointComponent} from './component/point/edit-point/edit-point.component';

const routes: Routes = [
  {path: 'pointManagement/:teacherId', component: ListPointComponent},
  {path: 'pointManagement/:teacherId/editPoint/:id', component: EditPointComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
