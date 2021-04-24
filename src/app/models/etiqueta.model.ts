import { IEtiqueta } from "./i-etiqueta.interface";

export class Etiqueta implements IEtiqueta{

    id: number = 0;
    nombre: string = '';
    creador: string= '';
    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    constructor(id: number, nombre: string, creador: string, createdAt: Date, updatedAt: Date){
        this.id = id;
        this.nombre = nombre;
        this.creador = creador;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
