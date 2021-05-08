import { IUser } from "./i-user.interface";

export class User implements IUser{
    username: string = '';
    email: string='';
    password: string='';
    passwordRepetido: string ='';

    constructor(email: string, password: string, passwordRepetido: string){
        this.email = email;
        this.password = password;
        this.passwordRepetido = passwordRepetido;
    }
}


