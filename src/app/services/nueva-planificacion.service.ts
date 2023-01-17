import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NuevaPlanificacionService {
    URL_GEN = environment.urlGeneral;
    URL_PLA = environment.urlPla;

  constructor(private apiService: ApiService) { }

  getAllEspecialidades(params){
    return this.apiService.ApiCall(`${this.URL_GEN}/v1/especialidades`,'GET',params);
  }

  getDetalleEspecialidad(especialidad){
    return this.apiService.ApiCall(`${this.URL_GEN}/v1/especialidades/${especialidad}`,'GET','');
  }


    profesionalesAsignados(codigoSucursal,params){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/sucursales/${codigoSucursal}/especialidades_profesionales`,'GET',params);
    }

    seccionesSitiosFisicos(params){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/secciones_fisicas`,'GET',params);
    }
    
    sitiosFisicos(params){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/consultorios`,'GET',params);
    }

    crearPlanificacion(params){
        return this.apiService.ApiCall(`${this.URL_PLA}/v1/planificador`,'POST',params);
    }

    tiposSitiosFisicos(){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/tipos_sitios`,'GET','');
    }

    nuevoConsultorio(params){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/consultorios`,'POST',params);
    }

    getConsultorios(params){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/consultorios`,'GET',params);
    }

    detalleConsultorios(codigoSitio){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/consultorios/${codigoSitio}`,'GET','');
    }

    crearProfesional(params){
        return this.apiService.ApiCallMultiPart(`${this.URL_GEN}/v1/profesionales`,'POST',params);
    }

    getProfesional(params){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/personal_sanitario`,'GET',params);
    }

    getdetallePersonalSanitario(secuenciaUsuario){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/personal_sanitario/${secuenciaUsuario}`,'GET','');
    }


    getProfesiones(){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/profesiones_medicas`,'GET','');
    }

    getPaises(params){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/paises/codigos_telefonicos`,'GET',params);
    }

    getTiposIdentificacion(params){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/tipos_identificacion`,'GET',params);
    }


    getprestacionesxEspecialidad(params){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/especialidades_profesional/asignar_prestaciones`,'GET',params);
    }


    saveEspecialidadProfesional(params){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/especialidades_profesional`,'POST',params);
    }

    getPrestacionesxHorario(params){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/horarios_profesional/asignar_prestaciones`,'GET',params);
    }


    saveHorarioProfesional(params){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/horarios_profesional`,'POST',params);
    }

    actualizaConsultorio(params,codigoSitio){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/consultorios/${codigoSitio}`,'PUT',params);
    }


    actualizarEspecialidadesXSucursal(codigoSucursal,datos,params){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/sucursales/${codigoSucursal}/especialidades`,'PUT',datos,params);
    }


    getInfoProfesional(params){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/profesionales`,'GET',params);
    }

    getInfoProfesionalxCodigo(codigoProfesional){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/profesionales/${codigoProfesional}`,'GET','');
    }

 
    getEspecialidadyHorariosxProfesional(codigoProfesional){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/profesionales/${codigoProfesional}/especialidades_horarios`,'GET','');
    }

    actualizarProfesional(codigoProfesional,params){
        return this.apiService.ApiCallMultiPart(`${this.URL_GEN}/v1/profesionales/${codigoProfesional}`,'PUT',params);
    }

    actualizarEspecialidad(codigoProfesional,codigoEspecialidad,params){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/especialidades_profesional/${codigoProfesional}/${codigoEspecialidad}`,'PUT',params);
    }

    actualizarHorario(codigoProfesional,params){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/horarios_profesional/${codigoProfesional}`,'PUT',params);
    }


    desactivarHorario(codigoHorario){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/horarios_profesional/${codigoHorario}`,'DELETE','');
    }

    desactivarEspecialidad(codigoProfesional,codigoEspecialidad){
        return this.apiService.ApiCall(`${this.URL_GEN}/v1/especialidades_profesional/${codigoProfesional}/${codigoEspecialidad}`,'DELETE','');
    }

    getFirmaDigital(codigoProfesional){
        return this.apiService.ApiCallDownload(`${this.URL_GEN}/v1/profesionales/${codigoProfesional}/firma_digital`,'GET','');
    }


}
