import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Account, AlertProfile, Contact, Login} from "../models/models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

 private readonly baseUrl:string = 'http://localhost:8080/';
//  private readonly baseUrl:string = 'http://192.168.1.106:8080/';
 private loginEndpoint = 'api/login/userlogin'
 private accountsEndpoint = 'api/account'
 private contactEndpoint = 'api/contact'
 private alertProfileEndpoint = 'api/alertprofile'


  constructor(private httpClient: HttpClient) {}


  /**
   *
   *  handle login and create new user in the system
   */
  login(loginCredentials: Login): Observable<Login> {
    return this.httpClient.post<Login>(`${this.baseUrl}${this.loginEndpoint}`,loginCredentials);
  }

    /**
   *
   *  handle login and create new user in the system
   */
    getAccounts(): Observable<Account[]> {
      return this.httpClient.get<Account[]>(`${this.baseUrl}${this.accountsEndpoint}`);
    }
    addAccount(account: Account): Observable<Account> {
      return this.httpClient.post<Account>(`${this.baseUrl}${this.accountsEndpoint}`, account);
    }
    deleteAccount(id: number): Observable<Account> {
      return this.httpClient.delete<Account>(`${this.baseUrl}${this.accountsEndpoint}/${id}`);
    }
    editAccount(account: Account): Observable<Account> {
      return this.httpClient.put<Account>(`${this.baseUrl}${this.accountsEndpoint}`, account);
    }
    getAccountById(id: number): Observable<Account> {
      return this.httpClient.get<Account>(`${this.baseUrl}${this.accountsEndpoint}/${id}`);
    }

    getAllContactByAccountId(id: number): Observable<Contact[]> {
      return this.httpClient.get<Contact[]>(`${this.baseUrl}${this.contactEndpoint}/account/${id}`);
    }

    addContact(contact: Contact): Observable<Contact> {
      return this.httpClient.post<Contact>(`${this.baseUrl}${this.contactEndpoint}`, contact);
    }
    getContact(): Observable<Contact> {
      return this.httpClient.get<Contact>(`${this.baseUrl}${this.contactEndpoint}`);
    }
    editContact(contact: Contact): Observable<Contact> {
      return this.httpClient.put<Contact>(`${this.baseUrl}${this.contactEndpoint}`, contact);
    }
    deleteContact(id: number): Observable<Contact> {
      return this.httpClient.delete<Contact>(`${this.baseUrl}${this.contactEndpoint}/${id}`);
    }

    getAllAlertProfileByAccountId(id: number): Observable<AlertProfile[]> {
      return this.httpClient.get<AlertProfile[]>(`${this.baseUrl}${this.alertProfileEndpoint}/account/${id}`);
    }

    addAlertProfile(alertProfile: AlertProfile): Observable<AlertProfile> {
      return this.httpClient.post<AlertProfile>(`${this.baseUrl}${this.alertProfileEndpoint}`, alertProfile);
    }

    editAlertProfile(alertProfile: AlertProfile): Observable<AlertProfile> {
      return this.httpClient.put<AlertProfile>(`${this.baseUrl}${this.alertProfileEndpoint}`, alertProfile);
    }

    deleteAlertProfile(id: number): Observable<AlertProfile> {
      return this.httpClient.delete<AlertProfile>(`${this.baseUrl}${this.alertProfileEndpoint}/${id}`);
    }


}
