import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutentGuard } from './guards/autent.guard';
// import { ContactosListaComponent } from './pages/contactos-lista/contactos-lista.component';
// import { DetalleContactoComponent } from './pages/detalle-contacto/detalle-contacto.component';
// import { DetalleTareaComponent } from './pages/detalle-tarea/detalle-tarea.component';
import { HomePageComponent } from './paginas/home-page/home-page.component';
import { LoginPageComponent } from './paginas/login-page/login-page.component';
import { NotFoundPageComponent } from './paginas/not-found-page/not-found-page.component';
import { RegisterPageComponent } from './paginas/register-page/register-page.component';
// import { TareasListaComponent } from './pages/tareas-lista/tareas-lista.component';
import { EtiquetasComponent } from './paginas/etiquetas/etiquetas.component';
import { NuevaEtiquetaComponent } from './paginas/nueva-etiqueta/nueva-etiqueta.component';
import { ExpertosComponent } from './paginas/expertos/expertos.component';
import { NuevoExpertoComponent } from './paginas/nuevo-experto/nuevo-experto.component';
import { InformacionExpertoComponent } from './paginas/informacion-experto/informacion-experto.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  }, 
  {
    path: 'home', 
    component: HomePageComponent,
    canActivate: [AutentGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  // {
  //   path: 'contacto-lista',
  //   component: ContactosListaComponent,
  //   canActivate: [AutentGuard]
  // },
  // {
  //   path: 'contacto/:id',
  //   component: DetalleContactoComponent,
  //   canActivate: [AutentGuard] 
  // },
  // {
  //     path: 'tarea-lista',
  //     component: TareasListaComponent,
  //     canActivate: [AutentGuard]
  // },
  // {
  //   path: 'tarea/:id', 
  //   component: DetalleTareaComponent,
  //   canActivate: [AutentGuard]
  // },
  {
    path: 'etiquetas',
    component: EtiquetasComponent,
    canActivate: [AutentGuard]
  },
  {
    path:'nueva-etiqueta',
    component: NuevaEtiquetaComponent,
    canActivate: [AutentGuard]
  },
  {
    path:'expertos',
    component: ExpertosComponent,
    canActivate: [AutentGuard]
  },
  {
    path:'nuevo-experto',
    component: NuevoExpertoComponent,
    canActivate: [AutentGuard]
  },
  {
    path: 'informacion-experto/:id',
    component: InformacionExpertoComponent,
    canActivate: [AutentGuard]
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
