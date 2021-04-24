import { IUser } from "./i-user.interface";

export class User implements IUser{
    email: string='';
    password: string='';
    passwordRepetido: string ='';

    constructor(email: string, password: string, passwordRepetido: string){
        this.email = email;
        this.password = password;
        this.passwordRepetido = passwordRepetido;
    }
}


