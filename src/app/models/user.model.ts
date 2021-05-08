import { IUser } from "./i-user.interface";

export class User implements IUser{
    username: string = '';
    email: string='';
    password: string='';
    passwordRepetido: string ='';

    constructor(username: string, email: string, password: string, passwordRepetido: string){
        this.username = username;
        this.email = email;
        this.password = password;
        this.passwordRepetido = passwordRepetido;
    }
}


