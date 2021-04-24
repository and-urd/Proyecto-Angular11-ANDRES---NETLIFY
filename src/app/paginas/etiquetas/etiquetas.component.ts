import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Etiqueta } from 'src/app/models/etiqueta.model';
import { EtiquetaService } from 'src/app/services/etiqueta.service';

@Component({
  selector: 'app-etiquetas',
  templateUrl: './etiquetas.component.html',
  styleUrls: ['./etiquetas.component.scss']
})
export class EtiquetasComponent implements OnInit {

  // Atributos
  arrayEtiquetas: Etiqueta[]= [];
  id: number = 0;
  nombre: string = '';
  creador: string= '';
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  totalPaginas: number = 0;
  paginaActual: number = 0;
  limiteTabla: number = 10;
  botonAntActivo: string = "disabled";
  botonSigActivo: string = "";
  checkboxValue: number = 0;
  spinner:boolean = false;

  nombreBusq: string = "";

  constructor(
              public router: Router,
              public etiquetaService: EtiquetaService
              ) { }

  ngOnInit(): void {
    
    // Obtengo las etiquetas de la BBDD
    this.spinner = true;
    this.etiquetaService.encontrarTodas("", 0, this.limiteTabla).subscribe(data =>{
      this.arrayEtiquetas = data["content"];
      this.totalPaginas = data["totalPages"]; 

      this.spinner = false;
    });
  }

  borrarEtiqueta(id: number){
    
    if(confirm("También se borrarán las etiquetas asociadas a los expertos !!") == true){
      
            this.etiquetaService.deleteEtiqueta(id).subscribe(data =>{
              
              this.router.navigate(['/etiquetas']);
            },
            error =>{
              alert("Error durante el borrado");
            });

    }
  }

  paginaSiguiente(){
    this.botonAntActivo = "";
    
    

    if(this.paginaActual < (this.totalPaginas - 1)){
      this.paginaActual ++;

      this.spinner = true;
      this.etiquetaService.encontrarTodas(this.nombreBusq, this.paginaActual, this.limiteTabla).subscribe(data =>{
        this.arrayEtiquetas = data["content"];

        this.spinner = false;
      });

      if(this.paginaActual == (this.totalPaginas - 1)) this.botonSigActivo = "disabled";
    }
  }

  paginaAnterior(){
    if (this.paginaActual != 0){
      this.botonSigActivo = "";
      this.paginaActual --;

      this.spinner = true;
      this.etiquetaService.encontrarTodas(this.nombreBusq, this.paginaActual, this.limiteTabla).subscribe(data =>{
        this.arrayEtiquetas = data["content"];
        this.spinner = false;
      });

      if(this.paginaActual == 0) this.botonAntActivo = "disabled";
    }
  }
  
  elementosPorPagina(i: number){
    this.limiteTabla = i;

    this.spinner = true;
    this.etiquetaService.encontrarTodas(this.nombreBusq, 0, i).subscribe(data =>{
      this.botonAntActivo="disabled";
      this.paginaActual = 0;
      this.arrayEtiquetas = data["content"];
      this.totalPaginas = data["totalPages"]; 

      this.spinner = false;
    });
  }

  busquedaNombre(){
    let cambios:boolean = false;

    this.spinner = true;
    this.etiquetaService.encontrarTodas(this.nombreBusq, 0, this.limiteTabla).subscribe(data =>{
      this.botonAntActivo="disabled";
      this.paginaActual = 0;
      this.arrayEtiquetas = data["content"];
      this.totalPaginas = data["totalPages"]; 
      cambios = true;

      this.spinner = false;
    });

    if(cambios == false){
      this.arrayEtiquetas = [];
    }

    
  }
}
