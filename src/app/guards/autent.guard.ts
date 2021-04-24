import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AutentGuard implements CanActivate {
  
  constructor (private usersService: UsersService, private router: Router){};

  private token: string='';
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    this.token  = this.usersService.getToken();

      if(this.usersService.getEstaLogeado()  &&  this.token!=null){
        return true;
      }else {
        // ! TODO -- cambiar a false
        return true;
      }
  }
  
  
}
