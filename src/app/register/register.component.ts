import { AlertifyService } from '../alertify.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.bsConfig = { containerClass: 'theme-blue' };
    this.registerForm = new FormGroup({
      gender: new FormControl('male'),
      username: new FormControl('', Validators.required),
      knownAs: new FormControl('', Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', Validators.required)
    }, this.passwordMatchValidator);
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertifyService.success('Succesfuly Registered!');
      }, error => {
        this.alertifyService.error('Error registering user!');
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
