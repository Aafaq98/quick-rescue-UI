import { Login } from "../models/models";

export class LoginBuilder {
    static buildLogin(form: any): Login {
        const obj: Login = {
            email: form.email,
            password: form.password
        };
        return obj
    }
}

