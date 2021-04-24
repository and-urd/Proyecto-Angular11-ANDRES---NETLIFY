import { Etiqueta } from "./etiqueta.model";
import { IExperto } from "./i-experto.interface";

export class Experto implements IExperto{
    id: number = 0;
    nombre: string ='';
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    estadoMotivo: string ='';
    disponibilidad: string ='';
    modalidad: string ='';
    autonomo: boolean = false;
    telefono: string ='';
    email: string ='';
    contactoCiudad: string ='';
    contactoLinkedin: string ='';
    condicionesPorcentaje: string ='';
    condicionesPrecioHora: string ='';
    puntuacion: number = 0;
    nif: string ='';
    credencialesCorreo: string ='';
    credencialesCorreoPassword: string ='';
    credencialesZoom: string ='';
    credencialesZoomPassword: string ='';
    ficheroFoto: string ='';
    ficheroCv: string ='';
    observaciones: string ='';
    origen: string ='';
    estado: string ='';
    etiquetas: Etiqueta[] = [];

    constructor(
        id: number,         nombre: string,
        createdAt: Date, 
        updatedAt: Date,
        estadoMotivo: string,
        disponibilidad: string,
        modalidad: string,
        autonomo: boolean,
        telefono: string,
        email: string,
        contactoCiudad: string,
        contactoLinkedin: string,
        condicionesPorcentaje: string,
        condicionesPrecioHora:string,
        puntuacion: number,
        nif: string,
        credencialesCorreo:string,
        credencialesCorreoPassword: string,
        credencialesZoom:string,
        credencialesZoomPassword:string,
        ficheroFoto:string,
        ficheroCv:string,
        observaciones:string,
        origen: string,
        estado:string,
        etiquetas: Etiqueta[]
        )
    {
        this.id= id;
        this.nombre= nombre;
        this.createdAt= createdAt; 
        this.updatedAt= updatedAt;
        this.estadoMotivo= estadoMotivo;
        this.disponibilidad= disponibilidad;
        this.modalidad= modalidad;
        this.autonomo= autonomo;
        this.telefono= telefono;
        this.email= email;
        this.contactoCiudad= contactoCiudad;
        this.contactoLinkedin= contactoLinkedin;
        this.condicionesPorcentaje= condicionesPorcentaje;
        this.condicionesPrecioHora=condicionesPrecioHora;
        this.puntuacion= puntuacion;
        this.nif= nif;
        this.credencialesCorreo=credencialesCorreo;
        this.credencialesCorreoPassword= credencialesCorreoPassword;
        this.credencialesZoom=credencialesZoom;
        this.credencialesZoomPassword=credencialesZoomPassword;
        this.ficheroFoto=ficheroFoto;
        this.ficheroCv=ficheroCv;
        this.observaciones=observaciones;
        this.origen= origen;
        this.estado=estado;
        this.etiquetas= etiquetas;
    }
}
