import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SubjectFormComponent } from './subjectform.component';
import { SubjectFormRoutingModule } from './subjectform-routing.module';
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    SubjectFormRoutingModule,
    ChartsModule,
    NgSelectModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  declarations: [ SubjectFormComponent ],
  bootstrap:[SubjectFormComponent]
})
export class SubjectFormModule { }
