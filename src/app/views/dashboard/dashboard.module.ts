import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SubjectComponent } from '../subject/subject.component';
import {CommonModule} from '@angular/common'
import {MatDialogModule} from '@angular/material/dialog'
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    MatDialogModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule
  ],
  declarations: [ DashboardComponent, SubjectComponent],
  
})
export class DashboardModule { }
