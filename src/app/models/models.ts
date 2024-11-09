export interface Login {
    username: string,
    password: string,
    contact?: Contact
}

export interface Account {
  id?: number;
  name?: string;
  emailDomain?: string;
  timeZoneCity?: string | null;
}

export interface Address {
  streetAddress?: string | null;
  city: string;
  stateProvince?: string | null;
  country: string;
}

export interface Contact {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phoneNumber: string;
  status?: boolean;
  hasLogin: boolean;
  address: Address;
  role?: string | null;
  account: Account;
  //alertProfile: AlertProfile | null; // Assuming AlertProfile is another model or type you have
}

export enum UserRole {
  ADMIN = 'ADMIN',
  CONTACT = 'CONTACT',
}
