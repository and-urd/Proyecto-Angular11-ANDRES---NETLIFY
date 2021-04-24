import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Etiqueta } from 'src/app/models/etiqueta.model';
import { Experto } from 'src/app/models/experto.model';
import { ExpertoService } from 'src/app/services/experto.service';

@Component({
  selector: 'app-linea-experto',
  templateUrl: './linea-experto.component.html',
  styleUrls: ['./linea-experto.component.scss']
})
export class LineaExpertoComponent implements OnInit {

  arrayEtiquetas: Etiqueta[] = [];

  @Input() experto: Experto = new Experto(0, "",new Date(),new Date(), "", "", "",
                                          false, "", "", "", "", "", "", 0, "", "",
                                          "", "", "", "", "", "", "", "",  this.arrayEtiquetas);

  inputVisible: boolean = false;
  nombreAnterior: string = "";
  creadorAnterior: string = "";

  constructor(
              public router: Router,
              public expertoService: ExpertoService
              ) { }
     
  ngOnInit(): void {
  }

  borrarExperto(id: number){
    
    if(confirm(`Se borrará el experto ${this.experto["nombre"].toUpperCase()}.\nTambién se borrarán las etiquetas asociadas a los expertos !!`) == true){
      
      this.expertoService.borrar(id).subscribe(data =>{
        
        this.router.navigate(['/home']);
      },
      error =>{
        alert("Error durante el borrado");
      });
}

  }

  actualizar(){

  }

  actualizarExperto(){

  }
}
