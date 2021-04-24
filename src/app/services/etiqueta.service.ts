import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etiqueta } from '../models/etiqueta.model';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService {

  constructor(private http: HttpClient) { }

  // Encontrar todas las ETIQUETAS 
  // filtros: límite, página, nombre
  // /api/etiquetas/?nombre=&page=0&size=10
  encontrarTodas(nombre: string, page: number, size: number): Observable<any>{
    return this.http.get(`/api/etiquetas/?nombre=${nombre}&page=${page}&size=${size}`);
  }

  // Encontrar una ETIQUETA por su 'id'
  //   /api/etiquetas/1
  encontrarPorId(i: number): Observable<any>{
    return this.http.get(`/api/etiquetas/${i}`);
  }

  // Crear una etiqueta
  //    /api/etiquetas  POST
  // El id de la etiqueta a crear debe ser 0
  crear(etiqueta: Etiqueta): Observable<any>{
    return this.http.post("/api/etiquetas", etiqueta);
  }

  // Actualizar una etiqueta
  actualizar(id: number, etiqueta: Etiqueta): Observable<any>{
    return this.http.put(`/api/etiquetas/${id}`, etiqueta);
  }

  // Borrar una ETIQUETA por su 'id'
  deleteEtiqueta(i: number): Observable<any>{
    return this.http.delete(`/api/etiquetas/${i}`);
  }

}
