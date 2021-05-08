import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
	providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

	constructor(public usersService: UsersService) { }

	// Implementación del método
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// throw new Error('Method not implemented.');

		// Obtenemos el token desde la cookie
		const token: string = this.usersService.getToken();

		let request = req;

		// Validamos el token si existe
		
		if (token){
			// Clonamos el token y lo mandamos en la cabecera de todas las peticiones HTTP
			request = req.clone({
			  setHeaders: {
				//Autorizaciòn de tipo Bearer + token
				//El tipo de autorizaciòn depende del back
				authorization: `Bearer ${ token }`
			  }
			});
		}
		
		return next.handle(request);
		
	}
}
