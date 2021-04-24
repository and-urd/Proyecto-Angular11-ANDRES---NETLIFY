import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Etiqueta } from 'src/app/models/etiqueta.model';
import { Experto } from 'src/app/models/experto.model';
import { EtiquetaService } from 'src/app/services/etiqueta.service';
import { ExpertoService } from 'src/app/services/experto.service';

@Component({
  selector: 'app-nuevo-experto',
  templateUrl: './nuevo-experto.component.html',
  styleUrls: ['./nuevo-experto.component.scss']
})
export class NuevoExpertoComponent implements OnInit {

  arrayEtiquetas: Etiqueta[] = [];
  arrayListadoEtiquetas: string [] = [];

  disponibilidad: string= '';

  experto: Experto = new Experto(0, "", new Date(), new Date(),  "",
                                  "", "", false,  "", "", "", "", "", 
                                  "",0, "", "", "", "", "", "", "", "", 
                                  "", "",this.arrayEtiquetas);


  expertoForm: FormGroup = new FormGroup({});
  etiquetas = new FormControl();

  

  constructor(
                public router: Router,
                public expertoService: ExpertoService,
                public etiquetaService: EtiquetaService,
                public formBuilder:FormBuilder
              ) { }

  ngOnInit(): void {
    this.expertoForm = this.formBuilder.group({
      nombre: '',
      disponibilidad: '',
      telefono: '',
      email: '',
      contactoCiudad: '',
      contactoLinkedin: '',
      nif: '',
      etiquetas: '',
    });

    // Recuperamos las etiquetas de la BBDD
    this.etiquetaService.encontrarTodas("",0, 100).subscribe(data =>{
      this.arrayEtiquetas = data["content"];
      this.arrayEtiquetas.map(elemento => this.arrayListadoEtiquetas.push(elemento["nombre"]));
      // console.log(this.arrayListadoEtiquetas);
      
    });
    
  }

  crear_nuevo_experto(){

    let nuevoExperto = this.experto;

    nuevoExperto.nombre = this.expertoForm.value.nombre;
    nuevoExperto.disponibilidad = this.disponibilidad;
    nuevoExperto.telefono = this.expertoForm.value.telefono;
    nuevoExperto.email = this.expertoForm.value.email;
    nuevoExperto.contactoCiudad = this.expertoForm.value.contactoCiudad;
    nuevoExperto.contactoLinkedin = this.expertoForm.value.contactoLinkedin;
    nuevoExperto.nif = this.expertoForm.value.nif;
    nuevoExperto.puntuacion = 100;

    // console.log(this.etiquetas.value);
    
    // Creo el array de etiquetas para el nuevo experto
    let arrayEtiquetasExperto: Etiqueta[]= [];

    if(this.etiquetas.value != null){

      for(let etiqueta of this.arrayEtiquetas){ // Para todas las etiquetas existentes en BBDD
        for(let i of this.etiquetas.value){// Para cada elemento seleccionado en el combobox
          
          if(i == etiqueta["nombre"] ){ // si coinciden los nombres , agrego la etiqueta
            arrayEtiquetasExperto.push(etiqueta);
          }
        }
      }
    }

    nuevoExperto.etiquetas = arrayEtiquetasExperto;
    
    

    this.expertoService.crear(nuevoExperto).subscribe(data =>{
      this.router.navigate(['/expertos']);
      console.log(data);
      
    });


  }

}
