import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Etiqueta } from 'src/app/models/etiqueta.model';
import { Experto } from 'src/app/models/experto.model';
import { ExpertoService } from 'src/app/services/experto.service';


interface valoresEstado {
  value: string;
  viewValue: string;
}

interface valoresValoracion{
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-expertos',
  templateUrl: './expertos.component.html',
  styleUrls: ['./expertos.component.scss']
})
export class ExpertosComponent implements OnInit {


  arrayExpertos: Experto[] = [];

  totalPaginas: number = 0;
  paginaActual: number = 0;
  limiteTabla: number = 10;
  botonAntActivo: string = "disabled";
  botonSigActivo: string = "";
  checkboxValue: number = 0;
  spinner: boolean = false;

  nombreBusq:string = "";
  estadoBusq: string = "";
  valoracionBusq: string = "";
  etiquetaBusq: string = "";


  cars: valoresEstado[] = [
    {value: '', viewValue: 'Todos'},
    {value: 'Pdte. validar', viewValue: 'Pdte. validar'},
    {value: 'Validado', viewValue: 'Validado'}
  ];

  valoresVal: valoresValoracion[] = [
    {value: '', viewValue: 'Todos'},
    {value: '90', viewValue: '91 - 100'},
    {value: '80', viewValue: '81 - 90'},
    {value: '70', viewValue: '71 - 80'},
    {value: '60', viewValue: '61 - 70'},
    {value: '50', viewValue: '51 - 60'},
    {value: '40', viewValue: '41 - 50'},
    {value: '30', viewValue: '31 - 40'},
    {value: '20', viewValue: '21 - 30'},
    {value: '10', viewValue: '11 - 20'},
    {value: '0', viewValue: '0 - 10'}  
  ];

  
  selectedCar = this.cars[0].value;
  

  constructor(public router: Router, public expertoService: ExpertoService) { }

  ngOnInit(): void {
    this.spinner = true;
    this.expertoService.encontrarTodos("", "", "", "0", String(this.limiteTabla), "0"  ).subscribe(data => {
      this.arrayExpertos = data["content"];
      this.totalPaginas = data["totalPages"];

      this.spinner = false;
    });
  }



  paginaSiguiente(){
    this.botonAntActivo = "";
    
    

    if(this.paginaActual < (this.totalPaginas - 1)){
      this.paginaActual ++;

      this.spinner = true;
      this.expertoService.encontrarTodos(this.nombreBusq,"", this.estadoBusq, "0", String(this.limiteTabla), String(this.paginaActual)).subscribe(data =>{
        this.arrayExpertos = data["content"];

        this.filtroPorValoracion();
        
        this.filtradoPorEtiqueta();

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
      this.expertoService.encontrarTodos(this.nombreBusq,"", this.estadoBusq, "0", String(this.limiteTabla), String(this.paginaActual)).subscribe(data =>{
        this.arrayExpertos = data["content"];

        
      this.filtroPorValoracion();
      
      this.filtradoPorEtiqueta();

        this.spinner = false;
      });

      if(this.paginaActual == 0) this.botonAntActivo = "disabled";
    }
  }
  
  elementosPorPagina(i: number){
    this.limiteTabla = i;

    this.spinner = true;
    this.expertoService.encontrarTodos(this.nombreBusq,"", this.estadoBusq, "0", String(this.limiteTabla), String(this.paginaActual)).subscribe(data =>{
      this.botonAntActivo="disabled";
      this.paginaActual = 0;
      this.arrayExpertos = data["content"];
      this.totalPaginas = data["totalPages"]; 

      
      this.filtroPorValoracion();

      this.filtradoPorEtiqueta();

      this.spinner = false;
    });
  }





  busquedaNombre(){
    let cambios: boolean = false;

    this.paginaActual = 0;
    
    this.spinner = true;
    
    this.expertoService.encontrarTodos(this.nombreBusq,"", this.estadoBusq, "0",String(this.limiteTabla), String(this.paginaActual)).subscribe(data =>{
      if(data == null){
        this.arrayExpertos = [];
      }else{
        this.arrayExpertos = data["content"];
        this.paginaActual = 0;
        this.totalPaginas = data["totalPages"];
      }


      
      this.filtroPorValoracion();

      this.filtradoPorEtiqueta();

      this.spinner = false;
    })

    // if(cambios == false){
    //   this.arrayExpertos = [];
    // }

  }


  busquedaEtiqueta(){
    
    let cambios: boolean = false;

    this.paginaActual = 0;
    this.spinner = true;
    this.expertoService.encontrarTodos(this.nombreBusq,"", this.estadoBusq, "0",String(this.limiteTabla), String(this.paginaActual)).subscribe(data =>{
      this.arrayExpertos = data["content"];
      this.paginaActual = 0;
      this.totalPaginas = data["totalPages"];

      
      this.filtroPorValoracion();


      this.filtradoPorEtiqueta();

      this.spinner = false;


    })

    // if(cambios == false){
    //   this.arrayExpertos = [];
    // }

  }






  selectCar(event: Event){
    // alert((event.target as HTMLSelectElement).value)
    this.estadoBusq = (event.target as HTMLSelectElement).value;

    let cambios: boolean = false;

    this.paginaActual = 0;
    this.spinner = true;
    this.expertoService.encontrarTodos(this.nombreBusq, "", this.estadoBusq, "0",String(this.limiteTabla), String(this.paginaActual)).subscribe(data =>{
      this.arrayExpertos = data["content"];
      this.paginaActual = 0;
      this.totalPaginas = data["totalPages"];

      
      this.filtroPorValoracion();

      this.filtradoPorEtiqueta();
      this.spinner = false;
    })

    if(cambios == false){
      this.arrayExpertos = [];
    }

  }






  selectedValoracion(event: Event){
    // alert((event.target as HTMLSelectElement).value)

    this.valoracionBusq = (event.target as HTMLSelectElement).value;


    let cambios: boolean = false;

    this.paginaActual = 0;
    this.spinner = true;
    this.expertoService.encontrarTodos(this.nombreBusq, "", this.estadoBusq, "0",String(this.limiteTabla), String(this.paginaActual)).subscribe(data =>{
      this.arrayExpertos = data["content"];
      this.paginaActual = 0;
      this.totalPaginas = data["totalPages"];

      this.filtroPorValoracion();

      this.filtradoPorEtiqueta();
      this.spinner = false;
    })

    if(cambios == false){
      this.arrayExpertos = [];
    }






  }
  



  filtradoPorEtiqueta(){

    if(this.etiquetaBusq != ''){

      
      let arrayAuxExp: Experto[] = [];
      let listaEtiquetas: Etiqueta[] = [];
      
      for (let index = 0; index < this.arrayExpertos.length; index++) {
        const element = this.arrayExpertos[index];
        listaEtiquetas = element.etiquetas;

        for (let index = 0; index < listaEtiquetas.length; index++) {
          const etiqueta = listaEtiquetas[index];
          
          if(etiqueta.nombre.startsWith(this.etiquetaBusq)){
            arrayAuxExp.push(element);
            break;
              }
            }
          }
          
          this.arrayExpertos = arrayAuxExp;
          
          
    }


  }






  private filtroPorValoracion() {
    if (this.valoracionBusq != '') {

      let arrayAuxExp: Experto[] = [];

      for (let index = 0; index < this.arrayExpertos.length; index++) {
        const element = this.arrayExpertos[index];

        if (   (parseInt(this.valoracionBusq) < element.puntuacion) && (element.puntuacion <= (parseInt(this.valoracionBusq) + 10))  ) {
          arrayAuxExp.push(element);
        }
      }

      this.arrayExpertos = arrayAuxExp;
    }
  }


  irPaginaCrearExperto(){
    this.router.navigate(['/nuevo-experto']);
  }






}
