import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { HttpService } from '../../service/http.service';
import {Account, AlertProfile, Contact} from '../../models/models';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ContactBuilder } from '../../api-builder/contact-builder';
import { RadioButtonModule } from 'primeng/radiobutton';
import {AlertBuilder} from "../../api-builder/alert-builder";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink,DialogModule,ButtonModule, ReactiveFormsModule, InputTextModule, TableModule, CheckboxModule, RadioButtonModule  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  account!: Account;
  contact: Contact[] = [];
  alertProfile: AlertProfile[] = [];
  form!: FormGroup;
  alertForm!: FormGroup
  alertDialog = false;
  id!: number;
  contactId!: number;
  alertId!: number;
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
      stateAddress: [''],
    });
    this.alertForm = this.fb.group({
      name: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
    })
  }
  ngOnInit(): void {
      // Access the route parameter
      this.route.paramMap.subscribe(params => {
        this.id = parseInt(params.get('id')!);
        this.getAccountById(this.id);
        this.getAllContactByAccountId(this.id);
        this.getAllAlertProfileById(this.id);
      });
  }

  handleAddContact(): void {
    this.contactDialog = true;
  }
  handleCloseContact(): void {
    this.contactDialog = false;
  }
  handleAddAlert(): void {
    this.alertDialog = true;
  }
  handleCloseAlert(): void {
    this.alertDialog = false;
  }

  handleEditAlert(alertProfile: AlertProfile): void {
    this.handleAddAlert();
    this.alertId = alertProfile?.id? alertProfile?.id: -1;
    this.alertForm.patchValue({
      ...alertProfile,
      city: alertProfile.location.city,
      country: alertProfile.location.country,
    });
  }

  handleDeleteAlert(id: number) {
    this.deleteAlertProfile(id);
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

  private getAllAlertProfileById(id: number): void {
    this.httpService.getAllAlertProfileByAccountId(id).subscribe({
      next: (alertProfiles: AlertProfile[]) => {
        this.alertProfile = alertProfiles;
      },
      error: (error: any) => {
        console.error(error);
      },
    })
  }

  private addAlertProfile(alertProfile: AlertProfile): void {
    this.httpService.addAlertProfile(alertProfile).subscribe({
      next: (alertProfiles: AlertProfile) => {
        this.handleCloseAlert();
        this.getAllAlertProfileById(this.id);
      },
      error: (error: any) => {
        console.error(error);
      },
    })
  }

  private editAlertProfile(alertProfile: AlertProfile): void {
    this.httpService.editAlertProfile(alertProfile).subscribe({
      next: (alertProfiles: AlertProfile) => {
        this.handleCloseAlert();
        this.getAllAlertProfileById(this.id);
      },
      error: (error: any) => {
        console.error(error);
      },
    })
  }

  private deleteAlertProfile(id: number): void {
    this.httpService.deleteAlertProfile(id).subscribe({
      next: (alertProfiles: AlertProfile) => {
        this.getAllAlertProfileById(this.id);
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

  handleSubmitAlert(alertForm: FormGroup) {
    if(!alertForm.valid) {
      return;
    }
    const payload = AlertBuilder.buildAlert(alertForm.value, this.id, this.alertId);
    if(this.alertId) {
      this.editAlertProfile(payload);
      return;
    }
    this.addAlertProfile(payload);

  }
}
