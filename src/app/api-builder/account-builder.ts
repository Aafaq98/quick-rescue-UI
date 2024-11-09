import { Account, Login } from "../models/models";

export class AccountBuilder {
    static buildAccount(form: any, id?: number): Account {
        const obj: Account = {
            name: form.name,
            emailDomain: form.emailDomain,
            timeZoneCity: form.timeZoneCity,
        };
        if(id){
            obj.id = id;
        }
        return obj
    }
}
