import { Etiqueta } from "./etiqueta.model";

export interface IExperto {
    id: number;
    nombre: string;
    createdAt: Date;
    updatedAt: Date;
    estadoMotivo:string;
    disponibilidad: string;
    modalidad: string;
    autonomo: boolean;
    telefono: string;
    email: string;
    contactoCiudad: string;
    contactoLinkedin: string;
    condicionesPorcentaje: string;
    condicionesPrecioHora: string;
    puntuacion: number;
    nif: string;
    credencialesCorreo: string;
    credencialesCorreoPassword: string;
    credencialesZoom: string;
    credencialesZoomPassword: string;
    ficheroFoto: string;
    ficheroCv: string;
    observaciones: string;
    origen: string;
    
    estado: string;

    etiquetas: Etiqueta[];

}
