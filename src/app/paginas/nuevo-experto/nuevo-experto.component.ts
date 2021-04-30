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
	spinner: boolean = false;

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
		this.spinner = true;
		this.etiquetaService.encontrarTodas("",0, 100).subscribe(data =>{
			this.arrayEtiquetas = data["content"];
			this.arrayEtiquetas.map(elemento => this.arrayListadoEtiquetas.push(elemento["nombre"]));
			// console.log(this.arrayListadoEtiquetas);
			this.spinner = false;
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


		
	// Validación de los datos introducidos
	let mensajeError: string = ''; // Aquí se irán sumando las distintas advertencias producidas





	// Validación del nombre
	let nombreValidado:boolean = true;

	if(nuevoExperto.nombre == ''){
		// alert('El nombre no puede estar vacío');
		nombreValidado = false;
		mensajeError += 'El nombre no puede estar vacío. \n\n';
	}else{
		
		let regexp = new RegExp(/^([a-zA-ZáéíóúñÑ]+)(\s+[a-zA-ZáéíóúñÑ]+)*\s*$/);
		let resultadoNombre = nuevoExperto.nombre.match(regexp);
		if(resultadoNombre != null){
			nombreValidado = true;
		}else{
			// alert("Validación del nombre: INCORRECTA\n Sólo se permiten letras y espacios");
			nombreValidado = false;
			mensajeError += "Validación del nombre: INCORRECTA - Sólo se permiten letras y espacios.\n\n";
		}
	}




	// Validación del teléfono 
	let telefonoValidado = true;
	if(nuevoExperto.telefono != ''){

		let regexp = new RegExp(/^(\+34|0034|34)?[ -]*(6|7|8|9)[ -]*([0-9][ -]*){8}$/);
		let resultadoTelefono = nuevoExperto.telefono.match(regexp);
		if(resultadoTelefono != null){
			telefonoValidado = true;
		}else{
			// alert("El teléfono no tiene el formato correcto.");
			telefonoValidado = false;
			mensajeError += "El teléfono no tiene el formato correcto.\n\n";
		}
	}


	// Validación del NIF
	let nifValidado = true;
	if(nuevoExperto.nif !=''){
		
		let regexp = new RegExp(/^\d{8}-[a-zA-Z]{1}$/);
		let resultadoNif = nuevoExperto.nif.match(regexp);
		if(resultadoNif != null){
			nifValidado = true;
		}else{
			nifValidado = false; 
			mensajeError += "Formato de NIF incorrecto.\n(12345678-A) \n\n";
		}
	}


	// Validación Email
	let emailValidado = true;
	if(nuevoExperto.email != ''){
	
		let regexp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/);
		let resultadoEmail = nuevoExperto.email.match(regexp);
		if(resultadoEmail != null){
			emailValidado = true;
		}else{
			emailValidado = false;
			mensajeError += "Email no válido";
		}
	}





	// ^(http|https|ftp)\:\/\/[a-z0-9\.-]+\.(([a-z]{2,4})+)$	Valida una URL.
	// ^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$
	// Validación URL Linkedin
	let linkedinValidado = true;
	if(nuevoExperto.contactoLinkedin != ''){
		let regexp = new RegExp(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/);
		let resultadoLinkedin = nuevoExperto.contactoLinkedin.match(regexp);
		if(resultadoLinkedin != null){
			linkedinValidado = true;
		}else{
			linkedinValidado = false;
			mensajeError += "La URL de Linkedin no es correcta";
		}
	}









	if(nombreValidado && telefonoValidado && nifValidado && emailValidado && linkedinValidado){

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
		
		


			this.spinner = true;
			this.expertoService.crear(nuevoExperto).subscribe(data =>{
				this.router.navigate(['/expertos']);
				// console.log(data);
				this.spinner = false;
				
			});



		

	}else{
		alert(mensajeError);
	}

	mensajeError = '';












	}

}
