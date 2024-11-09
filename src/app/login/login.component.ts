import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginBuilder } from '../api-builder/login-builder';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // username field with validation
      password: ['', [Validators.required]], // password field with validation
    });
  }

  login() {
    if (!this.form.valid) {
      alert('Invalid form');
      return;
    }
    const payload = LoginBuilder.buildLogin(this.form.value);
    console.log(payload);
    // if (this.authService.login(payload)) {
    //   this.router.navigate(['/client']);
    // }
  }
}
