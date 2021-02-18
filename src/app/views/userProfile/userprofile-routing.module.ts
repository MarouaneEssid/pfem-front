import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './userprofile.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    data: {
      title: 'Profil'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule {}
