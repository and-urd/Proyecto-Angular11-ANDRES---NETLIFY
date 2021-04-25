import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';
import { Etiqueta } from 'src/app/models/etiqueta.model';
import { Experto } from 'src/app/models/experto.model';
import { EtiquetaService } from 'src/app/services/etiqueta.service';
import { ExpertoService } from 'src/app/services/experto.service';

@Component({
	selector: 'app-informacion-experto',
	templateUrl: './informacion-experto.component.html',
	styleUrls: ['./informacion-experto.component.scss']
})
export class InformacionExpertoComponent implements OnInit {

	id: number = 0;
	arrayEtiquetas: Etiqueta[] = [];
	arrayListadoEtiquetas: string[] = [];
	etiquetasTodas: Etiqueta[] = [];
	spinner: boolean = false;

	experto: Experto = new Experto(0, "",new Date(),new Date(), "", "", "",
	false, "", "", "", "", "", "", 0, "", "",
	"", "", "", "", "", "", "", "", this.arrayEtiquetas  );

	disponibilidad: string = '';
	estado: string = '';
	origen: string = '';

	inputVisible: boolean = false;

	etiquetas = new FormControl;

	constructor(
				public router: Router,
				public expertoService: ExpertoService,
				public etiquetaService: EtiquetaService,
				public activatedRoute: ActivatedRoute
	
				) { }

	ngOnInit(): void {

		// Obtenemos el id pasado por parámetro en la URL
		this.activatedRoute.params.subscribe((params) => {
			if (params.id) {
				this.id = params.id

				// Recupero el experto con ese ID de la BBDD
				this.spinner = true;
				this.expertoService.encontrarPorId(this.id).subscribe(data =>{
					this.experto = data;
					this.disponibilidad = this.experto.disponibilidad;
					this.estado = this.experto.estado;
					this.origen = this.experto.origen;
					this.arrayEtiquetas = this.experto.etiquetas;



				// Recuperamos las etiquetas de la BBDD, para pintarlas en el combobox
				this.etiquetaService.encontrarTodas("",0, 100).subscribe(data =>{
					this.etiquetasTodas = data["content"];
					
					this.etiquetasTodas.map(elemento => {
						
						this.arrayListadoEtiquetas.push(elemento["nombre"])
					
					});
					
					
				});

				this.spinner = false;
					
				});
			} else {
			alert('El experto no existe.')
			this.regresarExpertos()
			}
		}, 
		error =>{
			alert('Se ha producico un error.');
			this.regresarExpertos();
		});



	}

	regresarExpertos(){
		this.router.navigate(['/expertos']);
	}

	cambioDisponibilidad(disp: string){
		// alert(disp);
		this.experto.disponibilidad = disp;
		this.actualizarExperto();
	}

	cambioEstado(est: string){
		this.experto.estado = est;
		this.actualizarExperto();
	}

	cambioOrigen(origen: string){
		this.experto.origen = origen;
		this.actualizarExperto();

	}

	actualizarExperto(){
		this.inputVisible = false;
		this.spinner = true;
		this.expertoService.actualizar(this.experto, this.id).subscribe(data =>{
			console.log(data);
			this.spinner = false;
			
		})
	}

	alternaVisible(){
		this.inputVisible = !this.inputVisible;
	}

	borrarEtiqueta(id: number){
		/* // Buscamos la etiqueta a borrar
		this.arrayEtiquetas.map(e =>{
			if(e.id == id){
				this.arrayEtiquetas.splice(e.id,1);
			}
		}); */

		for (let index = 0; index < this.arrayEtiquetas.length; index++) {
			const element = this.arrayEtiquetas[index];
				if(element.id == id){
					this.arrayEtiquetas.splice(index,1);
				}
		}


		// Asignamos el array de nuevo al experto
		this.experto.etiquetas = this.arrayEtiquetas;

		// actualizamos el experto en BBDD
		this.actualizarExperto();


	}

	agregarEtiquetas(){
		for(let etiqueta of this.etiquetasTodas){

			for(let i of this.etiquetas.value){ // Para cada string del combobox
				if(i == etiqueta["nombre"]){
					
					// si contienen la etiqueta no la añade 
					let existe = false;
					for(let e of this.arrayEtiquetas){
						if(e.nombre == etiqueta.nombre) existe = true;
					}

					if(existe== false)	this.arrayEtiquetas.push(etiqueta);	
					existe = false;
					

				}	
			}
		}

		this.experto.etiquetas = this.arrayEtiquetas;
		this.actualizarExperto();

	}
}
