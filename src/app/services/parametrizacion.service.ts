import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ApiService } from "./api.service";
import { Meta as RespInstitucionBancaria } from "../interface/institucionesBancarias.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ParametrizacionService {
  URL_GEN = environment.urlGeneral;
  URL_PLA = environment.urlPla;

  constructor(private apiService: ApiService) {}

  crearActualizarEspecialidad(params, option, codigoEspecialidad = 0) {
    console.log(params, option, codigoEspecialidad);
    if (option == 2) {
      return this.apiService.ApiCall(
        `${this.URL_GEN}/v1/especialidades/${codigoEspecialidad}`,
        "PUT",
        params
      );
    } else {
      return this.apiService.ApiCall(
        `${this.URL_GEN}/v1/especialidades`,
        "POST",
        params
      );
    }
  }

  getReporteEspecialidad(params) {
    return this.apiService.ApiCallDownload(
      `${this.URL_GEN}/v1/reportes/especialidades`,
      "GET",
      params
    );
  }

  getReporteProfesionales(params) {
    return this.apiService.ApiCallDownload(
      `${this.URL_GEN}/v1/reportes/profesionales`,
      "GET",
      params
    );
  }

  getReporteConsultorios(params) {
    return this.apiService.ApiCallDownload(
      `${this.URL_GEN}/v1/reportes/consultorios`,
      "GET",
      params
    );
  }

  getReporteSucursales(params) {
    return this.apiService.ApiCallDownload(
      `${this.URL_GEN}/v1/reportes/sucursales`,
      "GET",
      params
    );
  }

  sendEmailParametrizacionParametros(params, data, tipo) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/reportes/${tipo}/correo_electronico`,
      "POST",
      data,
      params
    );
  }

  getSucursalesParametrizadas(params) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/sucursales/parametrizacion_agenda`,
      "GET",
      params
    );
  }

  getPaises() {
    return this.apiService.ApiCall(`${this.URL_GEN}/v1/paises`, "GET", "");
  }

  getProvincias(params) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/provincias`,
      "GET",
      params
    );
  }

  getCiudades(params) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/ciudades`,
      "GET",
      params
    );
  }

  getSectores() {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/sectores_cardinales`,
      "GET",
      ""
    );
  }

  getInfoSucursal(codigoSucursal, params) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/sucursales/${codigoSucursal}`,
      "GET",
      params
    );
  }

  getHorariosSucursal(params) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/sucursales/horarios_atencion`,
      "GET",
      params
    );
  }

  getCodigosPaises(params) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/paises/codigos_telefonicos`,
      "GET",
      params
    );
  }

  crearActualizarSucursal(params, opcion, codigoHorario) {
    if (opcion) {
      return this.apiService.ApiCall(
        `${this.URL_GEN}/v1/sucursales/horarios_atencion`,
        "POST",
        params
      );
    } else {
      return this.apiService.ApiCall(
        `${this.URL_GEN}/v1/sucursales/horarios_atencion/${codigoHorario}`,
        "PUT",
        params
      );
    }
  }

  deleteHorarioSucursal(codigoHorario) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/sucursales/horarios_atencion/${codigoHorario}/inactivar`,
      "PUT",
      ""
    );
  }

  actualizarSucursal(params, codigoSucursal, data) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/sucursales/${codigoSucursal}`,
      "PUT",
      params,
      data
    );
  }

  actualizarFotoSucursal(params, codigoSucursal, data) {
    return this.apiService.ApiCallMultiPart(
      `${this.URL_GEN}/v1/sucursales/${codigoSucursal}/foto_perfil`,
      "PUT",
      params,
      data
    );
  }

  getPoliticasProfesional(params) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/politicas/profesionales`,
      "GET",
      params
    );
  }

  getPoliticasProductividad(params) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/politicas/productividad`,
      "GET",
      params
    );
  }

  getPoliticasPrediccion(params) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/politicas/prediccion`,
      "GET",
      params
    );
  }

  creaActualizaPoliticaPrediccion(params, secuenciaPolitica, data) {
    if (secuenciaPolitica) {
      return this.apiService.ApiCall(
        `${this.URL_GEN}/v1/politicas/${secuenciaPolitica}/prediccion`,
        "PUT",
        params,
        data
      );
    } else {
      return this.apiService.ApiCall(
        `${this.URL_GEN}/v1/politicas/prediccion`,
        "POST",
        params,
        data
      );
    }
  }

  creaActualizaPoliticaProductividad(params, secuenciaPolitica, data) {
    if (secuenciaPolitica) {
      return this.apiService.ApiCall(
        `${this.URL_GEN}/v1/politicas/${secuenciaPolitica}/productividad`,
        "PUT",
        params,
        data
      );
    } else {
      return this.apiService.ApiCall(
        `${this.URL_GEN}/v1/politicas/productividad`,
        "POST",
        params,
        data
      );
    }
  }

  creaActualizaPoliticaProfesional(params, codigoPolitica, data) {
    if (codigoPolitica) {
      return this.apiService.ApiCall(
        `${this.URL_GEN}/v1/politicas/${codigoPolitica}/profesionales`,
        "PUT",
        params,
        data
      );
    } else {
      return this.apiService.ApiCall(
        `${this.URL_GEN}/v1/politicas/profesionales`,
        "POST",
        params,
        data
      );
    }
  }

  getProfesionesMedicas() {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/profesiones_medicas`,
      "GET",
      ""
    );
  }

  getInstitucionesBancarias(params: object) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/instituciones/bancarias`,
      "GET",
      params
    );
  }
}
