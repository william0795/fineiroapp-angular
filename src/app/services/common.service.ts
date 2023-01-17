import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

    pageActual = new EventEmitter<number>();

    opcionParametrizar = new EventEmitter<string>();

    opcionVista = new EventEmitter<number>();

    buscadorSobrecupo = new EventEmitter<boolean>();

    buscadorGeneral = new EventEmitter<number>();
    
    loadingCitas = new EventEmitter<number>();

    actualizadorAsistente : any;

    showMessageSuccess: Subject<any>;

    datosAutomaticaCitas:any = {busquedaAutomatica:false};

    cambiaSucursalHome = new EventEmitter<number>();

    
  constructor() {
    this.showMessageSuccess = new Subject<any>();
   }
}
