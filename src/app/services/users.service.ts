import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private estaLogeado: boolean = false;

  constructor(private http: HttpClient, private cookies: CookieService) { }

  login(user: any): Observable<any>{
    //return this.http.post("https://reqres.in/api/login", user);
    
    //https://proyectofinalurda.herokuapp.com
    // return this.http.post("https://proyectofinalurda.herokuapp.com/api/usuario-login", user);
    
    return this.http.post("/api/usuario-login", user);
  }

  register(user: any): Observable<any>{
    return this.http.post("/api/usuario-registro",user);
  }

  deleteToken(){
    this.cookies.delete("token");
  }

  // Getter y Setter
  setToken(token: string){
    this.cookies.set("token", token);
  }

  getToken(){
    return this.cookies.get("token");
  }

  getEstaLogeado(){
    return this.estaLogeado;
  }
  setEstaLogeado(value: boolean){
    this.estaLogeado = value;
  }
}
