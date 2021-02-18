import { NgModule } from '@angular/core';

import { UserProfileComponent } from './userprofile.component';
import { UserProfileRoutingModule } from './userprofile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    UserProfileRoutingModule,
    ReactiveFormsModule,
    CommonModule

    
  ],
  declarations: [ UserProfileComponent ]
})
export class UserProfileModule { }
