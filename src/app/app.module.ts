import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatDivider, MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';  



import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './paginas/login-page/login-page.component';
import { RegisterPageComponent } from './paginas/register-page/register-page.component';
import { HomePageComponent } from './paginas/home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NotFoundPageComponent } from './paginas/not-found-page/not-found-page.component';
// import { TareasListaComponent } from './pages/tareas-lista/tareas-lista.component';
// import { ContactosListaComponent } from './pages/contactos-lista/contactos-lista.component';
// import { LineaContactoComponent } from './components/linea-contacto/linea-contacto.component';
// import { DetalleContactoComponent } from './pages/detalle-contacto/detalle-contacto.component';
// import { DetalleTareaComponent } from './pages/detalle-tarea/detalle-tarea.component';
// import { LineaTareaComponent } from './components/linea-tarea/linea-tarea.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EtiquetasComponent } from './paginas/etiquetas/etiquetas.component';
import { NuevaEtiquetaComponent } from './paginas/nueva-etiqueta/nueva-etiqueta.component';
import { LineaEtiquetaComponent } from './components/linea-etiqueta/linea-etiqueta.component';
import { ExpertosComponent } from './paginas/expertos/expertos.component';
import { LineaExpertoComponent } from './components/linea-experto/linea-experto.component';
import { NuevoExpertoComponent } from './paginas/nuevo-experto/nuevo-experto.component';
import {MatSelectModule} from '@angular/material/select';
import { InformacionExpertoComponent } from './paginas/informacion-experto/informacion-experto.component'; 
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    NotFoundPageComponent,
    // TareasListaComponent,
    // ContactosListaComponent,
    // LineaContactoComponent,
    // DetalleContactoComponent,
    // DetalleTareaComponent,
    // LineaTareaComponent,
    EtiquetasComponent,
    NuevaEtiquetaComponent,
    LineaEtiquetaComponent,
    ExpertosComponent,
    LineaExpertoComponent,
    NuevoExpertoComponent,
    InformacionExpertoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule, 
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatGridListModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSelectModule
  ],
  providers: [CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
