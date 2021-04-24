import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
	selector: 'app-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

	// Atributos
	email: string='';
	password: string='';
	confirmPassword: string='';
	passwordError: boolean=false;
	spinner: boolean=false;

	registroFallido: boolean = false;

	user: FormGroup = new FormGroup({});
	registerForm: FormGroup = new FormGroup({});


	constructor(
				public usersService: UsersService, 
				public router: Router,
				public formBuilder: FormBuilder) { }

  	register(){

		let user: User = new User(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.passwordRepetido);

		if(user.password != user.passwordRepetido){
			this.passwordError= true;
		}else{
			this.spinner= true;
			this.usersService.register(user).subscribe(data =>{
			
				this.usersService.setToken(data.token);
				this.usersService.setEstaLogeado(true);
				
				this.spinner= false;
				this.router.navigate(['/home']);
		
				console.log(data);
			
			},
			error =>{
			console.log(error);
			this.spinner= false;
			this.usersService.setEstaLogeado(false);
			this.registroFallido = true;
			
			});
			
		}

	}

	ir_login(){
		this.router.navigate(['/login']);
	}

	borrar_informacion_registro(){
		this.passwordError = false;
		this.registroFallido = false;

	}


  ngOnInit(): void {
	  this.registerForm = this.formBuilder.group({
		  email: '',
		  password: '',
		  passwordRepetido: ''
	  })
  }


}
