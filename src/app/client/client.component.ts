import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Login } from '../models/models';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
  user: Login | null = null;
  constructor(private authService: AuthService, private router: Router){}
  ngOnInit(): void {
    this.user = this.authService.getToken();
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['login'])
  }



}
