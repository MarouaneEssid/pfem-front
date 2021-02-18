import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    returnUrl: string;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['dashboard']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }

    submit(event: Event) {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            this.error = "champ(s) requis";
            event.preventDefault();
            return;
        }

        this.authenticationService.login(this.username.value, this.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                });
    }

    register() {
        this.router.navigate(['/register']);
    }

    get username(): AbstractControl {
      return this.loginForm.get('username');
    }

    get password(): AbstractControl {
      return this.loginForm.get('password');
    }

}
