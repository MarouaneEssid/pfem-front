import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandiateGuard } from '../../guards/candidate.guard';

import { ApplicationFormComponent } from './applicationform.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationFormComponent,
    canActivate: [CandiateGuard],
    data: {
      title: 'Candidature'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationFormRoutingModule {}
