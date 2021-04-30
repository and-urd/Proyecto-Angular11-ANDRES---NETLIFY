import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Etiqueta } from 'src/app/models/etiqueta.model';
import { EtiquetaService } from 'src/app/services/etiqueta.service';

@Component({
  selector: 'app-linea-etiqueta',
  templateUrl: './linea-etiqueta.component.html',
  styleUrls: ['./linea-etiqueta.component.scss']
})
export class LineaEtiquetaComponent implements OnInit {

  @Input() etiqueta: Etiqueta = new Etiqueta(0, "", "", new Date(), new Date());
  inputVisible:boolean = false;
  nombreAnterior: string = "";
  creadorAnterior: string = "";
  
  constructor(
              public router: Router,
              public etiquetaService: EtiquetaService
  ) { }

  ngOnInit(): void {
    this.nombreAnterior = this.etiqueta["nombre"];
    this.creadorAnterior = this.etiqueta["creador"];
  }

  borrarEtiqueta(id: number){
    
    if(confirm(`Se borrará la etiqueta ${this.etiqueta["nombre"].toUpperCase()}.\nTambién se borrarán las etiquetas asociadas a los expertos !!`) == true){
      
            this.etiquetaService.deleteEtiqueta(id).subscribe(data =>{
              
              this.router.navigate(['/home']);
            },
            error =>{
              alert("Error durante el borrado");
            });
    }
  }

  actualizar(){
    if(this.inputVisible==false){
      this.inputVisible = true;
    }
  }

  noActualizar(){
    if(this.inputVisible){
      this.inputVisible = false;
    }
  }

  actualizarEtiqueta(){

    let arrayEtiquetas: Etiqueta[] = []; // Guardará todas las etiquetas de la BBDD
    let estaEnBBDD: boolean = false;

    // Obtengo todas las etiquetas de la base de datos
    this.etiquetaService.encontrarTodas("", 0, 100).subscribe(data =>{

      arrayEtiquetas = data["content"];
      // console.log(arrayEtiquetas);


        for (let i = 0; i < arrayEtiquetas.length; i++) {
          const element = arrayEtiquetas[i];
          if(this.etiqueta["nombre"] == element.nombre){
            estaEnBBDD = true;
          }
        }

        if(estaEnBBDD == true){
          this.inputVisible = false;
          alert("La etiqueta ya existe en la BBDD");
          this.etiqueta["nombre"] = this.nombreAnterior;
          this.etiqueta["creador"] = this.creadorAnterior;
        }else{

              if((this.etiqueta["nombre"] != this.nombreAnterior) || (this.etiqueta["creador"] != this.creadorAnterior))
              {
                    if(confirm("Se va modificar la etiqueta")== true)
                    {
                      this.etiquetaService.actualizar(this.etiqueta["id"],this.etiqueta).subscribe(data =>{
                      // this.inputVisible=false;
                      this.nombreAnterior = this.etiqueta["nombre"];
                      this.creadorAnterior = this.etiqueta["creador"];
                      // console.log(data);
                      });
                    }
                    else
                    {
                      this.etiqueta["nombre"] = this.nombreAnterior;
                      this.etiqueta["creador"] = this.creadorAnterior;
                      // this.inputVisible=false;
                    }

              }else{
                // this.inputVisible = false;
              }
              this.inputVisible = false;

        }

    });

  }

}
