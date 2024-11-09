import { Login } from "../models/models";

export class LoginBuilder {
    static buildLogin(form: any): Login {
        const obj: Login = {
            username: form.username,
            password: form.password
        };
        return obj
    }
}

