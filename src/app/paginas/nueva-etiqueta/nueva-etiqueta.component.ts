import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Etiqueta } from 'src/app/models/etiqueta.model';
import { EtiquetaService } from 'src/app/services/etiqueta.service';

@Component({
  selector: 'app-nueva-etiqueta',
  templateUrl: './nueva-etiqueta.component.html',
  styleUrls: ['./nueva-etiqueta.component.scss']
})
export class NuevaEtiquetaComponent implements OnInit {

  etiqueta: Etiqueta = new Etiqueta(0 , "", "", new Date(), new Date());

  id: number = 0;
  nombre: string = '';
  creador: string= '';
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  arrayEtiquetas: Etiqueta[] = []; // Todas las etiquetas de la bbdd

  etiquetaForm: FormGroup = new FormGroup({});
  constructor( 
              public router: Router,
              public etiquetaService: EtiquetaService,
              private formBuilder: FormBuilder
              ) { }

  ngOnInit(): void {
    this.etiquetaForm = this.formBuilder.group({
      id: 0,
      nombre: '',
      creador: ''
    });

    // Obtengo todas las etiquetas de la BBDD
    this.etiquetaService.encontrarTodas("", 0, 100).subscribe(data =>{
      this.arrayEtiquetas = data["content"];
      console.log(this.arrayEtiquetas);
    });

  }

  crear_nueva_etiqueta(){
    let etiqueta: Etiqueta = new Etiqueta(
      this.etiquetaForm.value.id,
      this.etiquetaForm.value.nombre,
      this.etiquetaForm.value.creador,
      new Date(), 
      new Date()
    );

    // Comprobamos si la etiqueta creada ya existe en la BBDD


      if(etiqueta.nombre != ''){


            let estaEnBBDD: boolean = false;
            for (let i = 0; i < this.arrayEtiquetas.length; i++) {
              const element = this.arrayEtiquetas[i];
              if(element.nombre == etiqueta.nombre){
                estaEnBBDD = true;
              }
            }

            if(estaEnBBDD==false){  
              this.etiquetaService.crear(etiqueta).subscribe(data => {
                this.router.navigate(['/etiquetas']);
                // console.log("Creación de etiqueta");
                // console.log(data);
              },
              error =>{
                alert("Error en la creación de la etiqueta");
              });
            }else{
              alert("La etiqueta ya existe en la base de datos.");
            }




      }else{
        alert("La etiqueta debe tener un nombre.");
      }


    

  }

}
