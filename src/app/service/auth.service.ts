import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Login} from "../models/models";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private  httpService: HttpService) {}

    login(payload: Login) {
    this.httpService.login(payload).subscribe((response) => {
      console.log('response', response);
    });
  }

}
