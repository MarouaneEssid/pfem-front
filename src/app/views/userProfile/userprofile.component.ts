import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';
import * as bcrypt from "bcryptjs";

@Component({
  templateUrl: 'userprofile.component.html'
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: User;
  isVerified = false;
  @ViewChild('checkingPassword') checkingPassword: ElementRef;
  constructor(
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.buildForm();
    this.getUser();
  }

  buildForm() {
    this.profileForm = this.formBuilder.group({
      email: [{ value: '', disabled: true }],
      password: ['', Validators.minLength(6)],
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      school: ['']
    });
  }

  getUser() {
    let payload = Object.assign({ id: null }, jwt_decode(this.authenticationService.currentUserValue.jwt));
    this.userService.getUser(payload.id).subscribe(
      user => {
        this.currentUser = user;
        this.profileForm.patchValue(user);
        this.password.patchValue('');
        if (user.role.id == 3) {
          this.school.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(30)])
        }
        this.profileForm.patchValue({ roleId: user.role.id });
      },
      error => console.log(`fetch user ${payload.id}.`, error));
  }

  verifyPassword(password: string) {
    bcrypt.compare(password, this.currentUser.password, (err, res) => this.isVerified = res);
  }

  submit() {
    this.currentUser = { ...this.currentUser, ...this.profileForm.value }
    this.userService.updateUser(this.currentUser.id, this.currentUser).subscribe(
      user => {
        this.currentUser = user;
        this.password.setValue("");
        this.checkingPassword.nativeElement.value = '';
        this.isVerified = false;
        this.toastr.success('profil mis à jour', 'succès');
      },
      error => console.log(`update user ${this.currentUser.id}.`, error));
  }

  cancel() {
    this.router.navigate(['dashboard']);
  }

  // getters
  get email(): AbstractControl {
    return this.profileForm.get('email');
  }
  get password(): AbstractControl {
    return this.profileForm.get('password');
  }
  get firstname(): AbstractControl {
    return this.profileForm.get('firstname');
  }
  get lastname(): AbstractControl {
    return this.profileForm.get('lastname');
  }
  get school(): AbstractControl {
    return this.profileForm.get('school');
  }

}
