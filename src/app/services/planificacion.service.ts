import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PlanificacionService {

    parametros : any = {};
    URL_GEN = environment.urlGeneral;
    URL_PLA = environment.urlPla;
    URL_SEG = environment.urlSeg;
    URL_AGE = environment.urlAge;


  constructor(private apiService: ApiService,  private authS : AuthService) { }


     /** 
      * @desc hace la llama
      * examples include user_pass(), user_username(), user_age(), user_regdate()
      * @author Francisco Javier francis.mejiav@gmail.com  
    */
    getPlanificaciones(data:any){
        return this.apiService.apiPublicCall(`${this.URL_PLA}/v1/planificaciones`,'GET',data);
    }
    getPlataforma(data:any){
        return this.apiService.apiPublicCall(`${this.URL_GEN}/v1/profesionales/plataforma_teleconsulta`,'GET',data);
    }

    getSucursales(secuenciaUsuario: any){
        return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/usuarios/${secuenciaUsuario}/sucursales`,'GET', '');
    }

    getProfesionalesA(params){
        return this.apiService.ApiCall(`${this.URL_AGE}/v1/profesionales/disponibles_sucursal`,'GET', params);
    }

    getSucursalesDataCompleta(params){
        return this.apiService.apiPublicCall(`${this.URL_GEN}/v1/sucursales`,'GET',params);
    }

    getDiaLaborablesxSucursal(codigoSucursal,params){
        return this.apiService.apiPublicCall(`${this.URL_GEN}/v1/sucursales/${codigoSucursal}`,'GET',params);
    }

    getMotivos(){
        return this.apiService.apiPublicCall(`${this.URL_PLA}/v1/permisos/motivos`,'GET', '');
    }

    deletePlanificacion(planificacion:number){
        return this.apiService.ApiCall(`${this.URL_PLA}/v1/planificaciones/${planificacion}`,'DELETE','');
    }

    publicarPlanificacion(planificacion){
        return this.apiService.ApiCall(`${this.URL_PLA}/v1/planificaciones/${planificacion}/publicar`,'PUT','');
    }

    getListusers(grupoUsuario,params){
        return this.apiService.ApiCall(`${this.URL_SEG}/v1/grupos_usuarios/${grupoUsuario}/usuarios`,'GET',params);
    }

    getPLaniEnProceso(params){
        return this.apiService.ApiCall(`${this.URL_PLA}/v1/planificador/enProceso`,'GET',params);
    }

    getPermisos(params){
        return this.apiService.ApiCall(`${this.URL_PLA}/v1/permisos`,'GET',params);
    }

    deletepermiso(idPermiso){
        return this.apiService.ApiCall(`${this.URL_PLA}/v1/permisos/${idPermiso}`,'DELETE','');
    }

    savePermisoFecha(params){
        return this.apiService.ApiCall(`${this.URL_PLA}/v1/permisos/porFecha`,'POST',params);
    }

    updatePermisoFecha(params,idPermiso){
        return this.apiService.ApiCall(`${this.URL_PLA}/v1/permisos/porFecha/${idPermiso}`,'PUT',params);
    }

    updatePermisoRango(params,idPermiso){
        return this.apiService.ApiCall(`${this.URL_PLA}/v1/permisos/porRango/${idPermiso}`,'PUT',params);
    }

    savePermisoRango(params){
        return this.apiService.ApiCall(`${this.URL_PLA}/v1/permisos/porRango`,'POST',params);
    }


    downloadFile(data:any){
        return this.apiService.ApiCallDownload(`${this.URL_PLA}/v1/reportes/planificaciones`,'GET',data);
    }

    sendEmailPlanificaciones(params,data){
        return this.apiService.ApiCall(`${this.URL_PLA}/v1/reportes/planificaciones`,'POST',data,params);
    }


    getPrediccionRecomendacion(params,idPlanificacion){
        return this.apiService.ApiCall(`${this.URL_PLA}/v1/prediccion/recomendaciones/${idPlanificacion}`,'GET',params);
    }

    getPrediccionVariableGraficoSemanal(params,idPlanificacion){
        return this.apiService.ApiCall(`${this.URL_PLA}/v1/prediccion/variables/${idPlanificacion}/semanal`,'GET',params);
    }

    getPrediccionVariableGraficoMensual(params,idPlanificacion){
        return this.apiService.ApiCall(`${this.URL_PLA}/v1/prediccion/variables/${idPlanificacion}/mensual`,'GET',params);
    }

    getPrediccionVariableDetalleSemanal(params,idPlanificacion){
        return this.apiService.ApiCall(`${this.URL_PLA}/v1/prediccion/variables/${idPlanificacion}/detalle`,'GET',params);
    }

    sendEmailPrediccion(params,data,idPlanificacion){
        return this.apiService.ApiCall(`${this.URL_PLA}/v1/reportes/prediccion/recomendaciones/${idPlanificacion}`,'POST',data,params);
    }

    sendEmailPrediccionVariables(params,data,idPlanificacion,semanal){
        if(semanal){
            return this.apiService.ApiCall(`${this.URL_PLA}/v1/reportes/prediccion/variables/${idPlanificacion}/semanal`,'POST',data,params);
        }else{
            return this.apiService.ApiCall(`${this.URL_PLA}/v1/reportes/prediccion/variables/${idPlanificacion}/mensual`,'POST',data,params);
        }
        
    }

    sendEmailComparativo(params,data,idPlanificacion){
        return this.apiService.ApiCall(`${this.URL_PLA}/v1/reportes/prediccion/comparativo/${idPlanificacion}`,'POST',data,params);
    }

    sendEmailProductividadProyectada(params,data,idPlanificacion){
        return this.apiService.ApiCall(`${this.URL_PLA}/v1/reportes/prediccion/productividad/${idPlanificacion}`,'POST',data,params);
    }

    sendEmailPermisos(params,data){
        return this.apiService.ApiCall(`${this.URL_PLA}/v1/reportes/permisos`,'POST',data,params);
    }

    getReportePrediccionRecomendacion(params,idPlanificacion){
        return this.apiService.ApiCallDownload(`${this.URL_PLA}/v1/reportes/prediccion/recomendaciones/${idPlanificacion}`,'GET',params);
    }
    getReportePrediccionVariables(params,idPlanificacion,semanal){
        if( semanal ){
            return this.apiService.ApiCallDownload(`${this.URL_PLA}/v1/reportes/prediccion/variables/${idPlanificacion}/semanal`,'GET',params);
        }else{
            return this.apiService.ApiCallDownload(`${this.URL_PLA}/v1/reportes/prediccion/variables/${idPlanificacion}/mensual`,'GET',params);
        }
    }

    getReportePermisos(params){
        return this.apiService.ApiCallDownload(`${this.URL_PLA}/v1/reportes/permisos/`,'GET',params);
    }

    getReportePrediccionComparativo(params,idPlanificacion){
        return this.apiService.ApiCallDownload(`${this.URL_PLA}/v1/reportes/prediccion/comparativo/${idPlanificacion}`,'GET',params);
    }

    getPrediccionComparativa(params,idPlanificacion){
        return this.apiService.ApiCall(`${this.URL_PLA}/v1/prediccion/comparativo/${idPlanificacion}`,'GET',params);
    }

    getHistoricoMensualSemanal(params,idPlanificacion,opcion){
        if( opcion == 'M' ){
            return this.apiService.ApiCall(`${this.URL_PLA}/v1/prediccion/historico/${idPlanificacion}/mensual`,'GET',params);
        }else{
            return this.apiService.ApiCall(`${this.URL_PLA}/v1/prediccion/historico/${idPlanificacion}/semanal`,'GET',params);
        }
    }

    getPrediccionProductividad(params,idPlanificacion){
            return this.apiService.ApiCall(`${this.URL_PLA}/v1/prediccion/productividad/${idPlanificacion}/`,'GET',params);
    }

    getReportePrediccionProductividad(params,idPlanificacion){
        return this.apiService.ApiCallDownload(`${this.URL_PLA}/v1/reportes/prediccion/productividad/${idPlanificacion}/`,'GET',params);
    }


    getReporteHistorico(params,idPlanificacion,mensual){
        if( mensual ){
            return this.apiService.ApiCallDownload(`${this.URL_PLA}/v1/reportes/prediccion/historico/${idPlanificacion}/mensual`,'GET',params);
        }else{
            return this.apiService.ApiCallDownload(`${this.URL_PLA}/v1/reportes/prediccion/historico/${idPlanificacion}/semanal`,'GET',params);
        }
    }

    sendEmailPrediccionHistorico(params,data,idPlanificacion,mensual){
        if(!mensual){
            return this.apiService.ApiCall(`${this.URL_PLA}/v1/reportes/prediccion/historico/${idPlanificacion}/semanal`,'POST',data,params);
        }else{
            return this.apiService.ApiCall(`${this.URL_PLA}/v1/reportes/prediccion/historico/${idPlanificacion}/mensual`,'POST',data,params);
        }
    }

    getProveedoresExternos(){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/instituciones/prestadores_externos`,'GET','');
    }

}
