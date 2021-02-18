import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubjectFormComponent } from './subjectform.component';
import { CollabGuard } from '../../guards/collab.guard';

const routes: Routes = [
  {
    path: '',
    component: SubjectFormComponent,
    canActivate: [CollabGuard],
    data: {
      title: 'Ajouter un sujet'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectFormRoutingModule {}
