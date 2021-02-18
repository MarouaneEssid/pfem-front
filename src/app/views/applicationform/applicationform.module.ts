import { NgModule } from '@angular/core';
import { ApplicationFormComponent } from './applicationform.component';
import { ApplicationFormRoutingModule} from './applicationform-routing.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    ApplicationFormRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  declarations: [ ApplicationFormComponent ]
})
export class ApplicationFormModule { }
