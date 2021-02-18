import { NgModule } from '@angular/core';

import { CollabDashboardComponent } from './collabdashboard.component';
import { CollabDashboardRoutingModule } from './collabdashboard-routing.module';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  imports: [
    CollabDashboardRoutingModule,
    CommonModule,
    ModalModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [ CollabDashboardComponent ]
})
export class CollabDashboardModule { }
