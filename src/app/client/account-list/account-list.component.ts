import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { Account } from '../../models/models';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AccountBuilder } from '../../api-builder/account-builder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [DialogModule,ButtonModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css',
})
export class AccountListComponent implements OnInit {
  account: Account[] = [];
  accountDialog = false;
  form!: FormGroup;
  id!: number;
  constructor(private httpService: HttpService, private fb: FormBuilder, private router: Router){
    this.form = this.fb.group({
      name: ['', [Validators.required]], // username field with validation
      emailDomain: ['', [Validators.required, Validators.email]], // password field with validation
      timeZoneCity: ['', [Validators.required]], // password field with validation
    });
  }
  ngOnInit(): void {
    this.getAccounts();
  }

  private getAccounts(): void {
    this.httpService.getAccounts().subscribe({
      next: (account: Account[]) => {
        this.account = account;
      },
      error: (error: any) => {
        console.error(error);
      },
    })
  }

  handleAdd(): void {
    this.accountDialog = true;
    this.form.reset();
  }

  handleSubmit(form: FormGroup): void {
    if(!form.valid){
      return;
    }
    const payload = AccountBuilder.buildAccount(form.value, this.id);
    if(this.id){
      this.editAccount(payload);
      return;
    }
    this.addAccount(payload);
  }

  handleDelete(id: number | undefined): void {
    if(id){
      this.deleteAccount(id);
    }
  }

  handleAccountSelect(id: number | undefined): void {
    this.router.navigate(['/client',id])
  }
  handleEdit(account: Account): void {
    if(account && account?.id){
      this.accountDialog = true;
      this.id = account.id;
      this.form.patchValue(account);
    }

  }

  private addAccount(account: Account): void {
    this.httpService.addAccount(account).subscribe({
      next: (account: Account) => {
        this.accountDialog = false;
        this.getAccounts();
      },
      error: (error: any) => {
        console.error(error);
      },
    })
  }
  private deleteAccount(id: number): void {
    this.httpService.deleteAccount(id).subscribe({
      next: (account: Account) => {
        this.getAccounts();
      },
      error: (error: any) => {
        console.error(error);
      },
    })
  }
  private editAccount( account: Account): void {
    this.httpService.editAccount(account).subscribe({
      next: (account: Account) => {
        this.accountDialog = false;
        this.getAccounts();
      },
      error: (error: any) => {
        console.error(error);
      },
    })
  }
}
