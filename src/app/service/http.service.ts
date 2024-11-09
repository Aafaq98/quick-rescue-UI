import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login} from "../models/models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

 private readonly baseUrl:string = 'http://localhost:8080/';
 private loginEndpoint = 'api/login/userlogin'


  constructor(private httpClient: HttpClient) {}


  /**
   *
   *  handle login and create new user in the system
   */
  login(loginCredentials: Login): Observable<Login> {
    return this.httpClient.post<Login>(`${this.baseUrl}${this.loginEndpoint}`,loginCredentials);
  }



}
