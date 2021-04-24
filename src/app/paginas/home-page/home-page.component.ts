import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
  }

  ir_lista_tareas(){
    this.router.navigate(['/tarea-lista']);
  }

  ir_lista_contactos(){
    this.router.navigate(['/contacto-lista']);
  }

  logout(){
    this.usersService.deleteToken();
    this.usersService.setEstaLogeado(false);
    this.router.navigate(['/login']);
  }

}
