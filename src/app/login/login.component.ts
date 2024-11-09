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
import { HttpService } from '../service/http.service';
import { Login, UserRole } from '../models/models';

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
    private  httpService: HttpService,
    private  authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]], // username field with validation
      password: ['', [Validators.required]], // password field with validation
    });
  }

  login() {
    if (!this.form.valid) {
      alert('Invalid form');
      return;
    }
    const payload = LoginBuilder.buildLogin(this.form.value);
    this.httpService.login(payload).subscribe({
      next: (login: Login) => {
        this.authService.setToken(login);
        if (this.authService.isAuthenticatedUser()) {
          if(this.authService.getRole() === UserRole.ADMIN){
            this.router.navigate(['client']);
          } else {
            this.router.navigate(['client', this.authService.getAccountId()]);
          }
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });

    // if (this.authService.login(payload)) {
    //   this.router.navigate(['/client']);
    // }
  }
}
