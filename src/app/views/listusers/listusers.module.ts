import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ModalModule } from 'ngx-bootstrap/modal';

import { ListUsersComponent } from './listusers.component';
import { ListUsersRoutingModule } from './listusers-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ListUsersRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    ModalModule,
    ModalModule.forRoot()
  ],
  declarations: [ ListUsersComponent ]
})
export class ListUsersModule { }
