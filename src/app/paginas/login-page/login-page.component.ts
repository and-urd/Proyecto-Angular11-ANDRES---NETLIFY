import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  // Atributos
  email: string = '';
  password: string = '';
  loginFallido: boolean = false;
  hide: boolean = true;
  spinner: boolean = false;

  user: FormGroup = new FormGroup({});
  loginForm: FormGroup = new FormGroup({});

  // Constructor
  constructor(
                public usersService: UsersService, 
                public router: Router,
                public formBuilder: FormBuilder) { }

  login(){
    
    let user: User = new User(this.loginForm.value.email, this.loginForm.value.password, '');

    this.spinner = true;
    this.usersService.login(user).subscribe(data => {
    
      this.usersService.setToken(data.token);
      this.usersService.setEstaLogeado(true);

      this.router.navigate(['/home']);
      // console.log(data);
      this.spinner = false;
    },
    error =>{
      console.log(error);
      this.loginFallido= true;
      this.usersService.setEstaLogeado(false);
      this.spinner = false;
    })


    console.log(this.email);
    console.log(this.password);
    
    
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ir_registro(){
    this.router.navigate(['/register']);
  }

  ocultar_informacion_registro(){
    this.loginFallido = false;
  }

}
