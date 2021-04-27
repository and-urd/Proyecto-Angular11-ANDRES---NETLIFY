import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experto } from '../models/experto.model';

@Injectable({
  providedIn: 'root'
})
export class ExpertoService {
  
  constructor(private http: HttpClient) { }

  // Encontrar todos los EXPERTOS
  // filtros: límite, página, etiqueta, nombre, modalidad, estado
  // Con etiqueta = "0" , experto con cualquier etiqueta
  encontrarTodos( nombre: string, 
                  modalidad: string, 
                  estado: string, 
                  etiqueta: string, 
                  limite: string, 
                  pagina: string): Observable<any>{

    return this.http.get(`https://proyectofinalurda.herokuapp.com/api/expertos/?page=${pagina}&size=${limite}&nombre=${nombre}&modalidad=${modalidad}&estado=${estado}&etiqueta=${etiqueta}`);

  }

  // Encontrar experto por su Id
  encontrarPorId(id: number): Observable<any>{
    return this.http.get(`https://proyectofinalurda.herokuapp.com/api/expertos/${id}`);
  }

  // Crear un experto
  crear(experto: Experto): Observable<any>{
    return this.http.post(`https://proyectofinalurda.herokuapp.com/api/expertos`, experto);
  }

  // Actualizar experto
  actualizar(experto: Experto, id: number): Observable<any>{
    return this.http.put(`https://proyectofinalurda.herokuapp.com/api/expertos/${id}`, experto);
  }

  // Borrar experto
  borrar(id: number): Observable<any>{
    return this.http.delete(`https://proyectofinalurda.herokuapp.com/api/expertos/${id}`);
  }
}
