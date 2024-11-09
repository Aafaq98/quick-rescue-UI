import { Account, Contact, Login } from "../models/models";

export class ContactBuilder {
    static buildContact(form: any, contactId?: number): Contact {
        const obj: Contact = {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            gender: form.gender,
            phoneNumber: form.phoneNumber,
            hasLogin: form.hasLogin,
            address: {
                city: form.city,
                country: form.country,
            },
            account: form.account
        };
        if(contactId){
            obj.account = {
                id: contactId,
            }
        }
        return obj
    }
}
