import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConveniosService {

  URL_GEN = environment.urlGeneral;
  URL_AGE = environment.urlAge;
  URL_COM = environment.urlComercial;
  URL_APO = environment.urlApoyo;
  URL_PL = environment.urlPla;
  URL_SYNC = environment.urlSync;


  conexion = 'PHA_X';

  showConfirm: Subject<any>;
  loadData: Subject<any>;

  constructor(private apiService: ApiService,
              private http: HttpClient,
              private router: Router,
              private storage: StorageService,
              private authS : AuthService) {
                this.showConfirm = new Subject<any>();
                this.loadData = new Subject<any>();
               }

  
  getClientes(params){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/clientes`,'GET',params);
  }
  getCicloVida(params){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/ciclos_vida`,'GET',params);
  }
  getGrupoPaciente(params){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/grupos_paciente`,'GET',params);
  }
  getClasificacionComercial(params){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/clasificacion_comercial_paquetes`,'GET',params);
  }
  getPaquetesPromocionales(params){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/paquetes_promocionales`,'GET',params);
  }
  getNivelBeneficio1(params){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/niveles_beneficio/nivel1`,'GET',params);
  }
  getNivelBeneficio2(params){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/niveles_beneficio/nivel2`,'GET',params);
  }
  getNivelBeneficio3(params){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/niveles_beneficio/nivel3`,'GET',params);
  }
  getNivelBeneficio4(params){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/niveles_beneficio/nivel4`,'GET',params);
  }
  getTarifarios(params){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/tarifarios`,'GET',params);
  }
  getPlantillaPrestaciones(params){
    return this.apiService.ApiCallDownload(`${this.URL_COM}/v1/tarifarios/plantilla_prestaciones_x_servicio`,'GET',params, []);
  }
  getPrestacionesTarifarios(idTarifario,params){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/tarifarios/${idTarifario}/consulta_prestaciones`,'GET',params);
  }
  getTipoComprobantes(params){
    return this.apiService.ApiCall(`${this.URL_GEN}/v1/tipos_comprobantes`,'GET',params);
  }
  getAsesorComercial(params){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/asesor_comercial`,'GET',params);
  }
  getClientesId(codigoCliente){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/clientes/${codigoCliente}`,'GET',null);
  }
  getInformacionParamPaperless(params){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/clientes/informacion_parametrizacion_doc_paperless`,'GET',params);
  }
  getEntidadAfiliadaId(codigoEntidad){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/entidadesAfiliadas/${codigoEntidad}`,'GET',null);
  }
  getPaqueteId(codigoPaquete){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/paquetes_promocionales/${codigoPaquete}`,'GET',null);
  }
  getEntidadesAfiliadas(params){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/entidadesAfiliadas`,'GET',params);
  }
  
  crearEntidad(data:any){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/entidadesAfiliadas`,'POST',data,null);
  }
  crearPaquetesPromocionales(data:any){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/paquetes_promocionales`,'POST',data,null);
  }
  cargaImagenPaquete(imageUser,codigoPaquete) {
    console.log("Upload Image")
    const formDatauser = new FormData();
    if(imageUser!=null){
      formDatauser.append('file', imageUser);
    }
    
    console.log('fotoPaquete:',imageUser);
    
    return this.apiService.ApiCallMultiPart(`${this.URL_COM}/v1/paquetes_promocionales/${codigoPaquete}/upload_imagen`,'POST',formDatauser);

  }
  editarPaquetesPromocionales(codigoPaquete,data:any){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/paquetes_promocionales/${codigoPaquete}`,'PUT',data,null);
  }
  aprobarPaquetesPromocionales(codigoPaquete,data:any){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/paquetes_promocionales/${codigoPaquete}/aprobar`,'PUT',data,null);
  }
  editaEntidad(data:any,codigoEntidad){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/entidadesAfiliadas/${codigoEntidad}`,'PUT',data,null);
  }
  crearCliente(data:any){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/clientes`,'POST',data,null);
  }
  editaCliente(data:any,codigoCliente){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/clientes/${codigoCliente}`,'PUT',data,null);
  }
  //getInformacionClientePaperless(params,codigoCliente){
 //   return this.apiService.ApiCall(`${this.URL_COM}/v1/clientes/${codigoCliente}`,'GET',params);
 // }
  validaConvenioPacienteAsync(data:any,params){
    return this.apiService.ApiCall(`${this.URL_SYNC}/v1/validacion_aseguradora/async/convenios_paciente`,'POST',data,params);
  }
  anulaPaquete(codigoPaquete,data){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/paquetes_promocionales/${codigoPaquete}/anular`,'PUT',data);
  }
  getParroquias(params){
    return this.apiService.ApiCall(`${this.URL_GEN}/v1/parroquias`,'GET',params);
  }

}
