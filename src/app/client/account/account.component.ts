import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { HttpService } from '../../service/http.service';
import { Account, Contact } from '../../models/models';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ContactBuilder } from '../../api-builder/contact-builder';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink,DialogModule,ButtonModule, ReactiveFormsModule, InputTextModule, TableModule, CheckboxModule  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  account!: Account;
  contact: Contact[] = [];
  form!: FormGroup;
  id!: number;
  contactId!: number;
  contactDialog = false;

  constructor(private httpService: HttpService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute){
    this.form = this.fb.group({
      firstName: ['', [Validators.required]], 
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      hasLogin: [false, [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      streetAddress: [''],
      stateAddress: ['']
    });
  }
  ngOnInit(): void {
      // Access the route parameter
      this.route.paramMap.subscribe(params => {
        this.id = parseInt(params.get('id')!);
        this.getAccountById(this.id);
        this.getAllContactByAccountId(this.id);
      });
  }

  handleAddContact(): void {
    this.contactDialog = true;
  }
  handleCloseContact(): void {
    this.contactDialog = false;
  }

  handleEditContact(contact: Contact): void {
    this.handleAddContact();
    this.contactId = contact?.id? contact?.id: -1;
    this.form.patchValue({
      ...contact,
      city: contact.address.city,
      country: contact.address.country,
    });
    
  }
  handleDelete(id: number): void {
    this.deleteContact(id);
  }

  handleSubmit(form: FormGroup): void {
    if(!form.valid){
      return;
    }

    const payload = ContactBuilder.buildContact(form.value, this.id);
    if(this.contactId) {
      this.editContact(payload);
      return;
    }
    this.addContact(payload);

  }

  private getAccountById(id: number): void {
    this.httpService.getAccountById(id).subscribe({
      next: (account: Account) => {
        this.account = account;
      },
      error: (error: any) => {
        console.error(error);
      },
    })
  }
 private getAllContactByAccountId(id: number): void {
    this.httpService.getAllContactByAccountId(id).subscribe({
      next: (contact: Contact[]) => {
        this.contact = contact;
      },
      error: (error: any) => {
        console.error(error);
      },
    })
  }

  private addContact(contact: Contact): void {
    this.httpService.addContact(contact).subscribe({
      next: (contact: Contact) => {
        this.handleCloseContact();
        this.getAllContactByAccountId(this.id);
      },
      error: (error: any) => {
        console.error(error);
      },
    })
  }
  private editContact(contact: Contact): void {
    this.httpService.editContact(contact).subscribe({
      next: (contact: Contact) => {
        this.handleCloseContact();
        this.getAllContactByAccountId(this.id);
      },
      error: (error: any) => {
        console.error(error);
      },
    })
  }

  private deleteContact(id: number): void {
    this.httpService.deleteContact(id).subscribe({
      next: (contact: Contact) => {
        this.handleCloseContact();
        this.getAllContactByAccountId(this.id);
      },
      error: (error: any) => {
        console.error(error);
      },
    })
  }

}
