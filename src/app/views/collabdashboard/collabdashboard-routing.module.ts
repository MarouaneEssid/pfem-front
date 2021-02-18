import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollabDashboardComponent } from './collabdashboard.component';
import { CollabGuard } from '../../guards/collab.guard';

const routes: Routes = [
  {
    path: '',
    component: CollabDashboardComponent,
    canActivate: [CollabGuard],
    data: {
      title: 'Gestion des candidatures'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollabDashboardRoutingModule {}
