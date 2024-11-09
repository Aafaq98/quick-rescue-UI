import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject to track if the user is logged in or not
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private username: string | null = null;

  constructor() {
    // Check if the user is already logged in by fetching from localStorage
    const savedUser = localStorage.getItem('username');
    if (savedUser) {
      this.username = savedUser;
      this.loggedInSubject.next(true);
    }
  }

  // Simulate login function
  login(username: string, password: string): boolean {
    // In a real application, you should validate username and password from a server
    if (username === 'test@test.com' && password === '123') {
      this.username = username;
      localStorage.setItem('username', username); // Save the username to localStorage
      this.loggedInSubject.next(true);
      return true;
    }
    return false;
  }

  // Get the current login status (as Observable)
  isLoggedIn() {
    return this.loggedInSubject.asObservable();
  }

  // Logout functionality
  logout() {
    localStorage.removeItem('username'); // Remove username from localStorage
    this.username = null;
    this.loggedInSubject.next(false);
  }

  // Get the username of the logged-in user
  getUsername() {
    return this.username;
  }
}
