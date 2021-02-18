import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['',
        [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
      ],
      password: ['',
        [Validators.required, Validators.minLength(6)]
      ],
      firstname: ['',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
      ],
      lastname: ['',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
      ],
      school: ['',
        [Validators.required, Validators.minLength(3), Validators.maxLength(80)]
      ]
    });
  }


  submit() {
    if (this.registerForm.invalid) {
      return;
    }
    if (this.registerForm.valid) {
      let user: User = this.registerForm.value;
      user.role = { id: 3, name: 'STUDENT' };
      this.userService.register(user).subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  //getters
  get email(): AbstractControl {
    return this.registerForm.get('email');
  }
  get password(): AbstractControl {
    return this.registerForm.get('password');
  }
  get firstname(): AbstractControl {
    return this.registerForm.get('firstname');
  }
  get lastname(): AbstractControl {
    return this.registerForm.get('lastname');
  }

  get school(): AbstractControl {
    return this.registerForm.get('school');
  }



}
