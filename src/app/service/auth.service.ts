import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Login, UserRole} from "../models/models";
import {HttpService} from "./http.service";
import { Route } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  setToken(login: Login): void {
    const data = JSON.stringify(login);
    localStorage.setItem('auth',data);
  }

  getToken(): Login | null {
    try {
      const storedData = localStorage.getItem('auth');
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  }

  isAuthenticatedUser(): boolean {
    const token = this.getToken();
    return token ? true : false;
  }

  logout(): void {
    localStorage.removeItem('auth');
  }

  getRole(): UserRole | null {
    const user = this.getToken()?.contact;
    return (user?.role as UserRole) || null;
  }

  getAccountId(): number | null {
    const accountId = this.getToken()?.contact?.account?.id;
    return accountId ? accountId: null;
  }

}
