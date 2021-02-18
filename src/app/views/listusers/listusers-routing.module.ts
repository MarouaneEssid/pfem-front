import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListUsersComponent } from './listusers.component';
import { AdminGuard } from '../../guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: ListUsersComponent,
    canActivate: [AdminGuard],
    data: {
      title: 'La liste des utilisateurs'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListUsersRoutingModule {}
