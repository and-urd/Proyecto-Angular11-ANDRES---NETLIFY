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
  }

  crear_nueva_etiqueta(){
    let etiqueta: Etiqueta = new Etiqueta(
      this.etiquetaForm.value.id,
      this.etiquetaForm.value.nombre,
      this.etiquetaForm.value.creador,
      new Date(), 
      new Date()
    );

    if(etiqueta.nombre != ''){  
      this.etiquetaService.crear(etiqueta).subscribe(data => {
        this.router.navigate(['/etiquetas']);
        // console.log("Creación de etiqueta");
        // console.log(data);
      },
      error =>{
        alert("Error en la creación de la etiqueta");
      });
    }else{
      alert("La etiqueta debe tener un nombre.");
    }
    

  }

}
