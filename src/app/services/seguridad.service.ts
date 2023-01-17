   /** 
      * @desc hace la llamada a End Point
      * examples include user_pass(), user_username(), user_age(), user_regdate()
      * @author William Ferruzola william.ferruzola@goitsa.com  
      * @fecha 25/05/2020 18:00
    */
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  URL_SEG = environment.urlSeg;
  parametros : any = {};

  constructor(private apiService: ApiService,  private authS : AuthService) { }
  verifica_usuario(usuario) {
    console.log('ajuste leonel, entro a seguridad.service.ts: ', this.URL_SEG);
    console.log('environment.urlSeg: ', environment.urlSeg);
    let data;
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/usuarios/verificacion_cuenta?usuario=${usuario}`,'GET',data);
  }
  actualizacontrasena(body: object) {

    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/usuarios/activacion_cuenta`,'POST',body);
  }
  crearusuario(body: object, idtoken) {
    const bodyrequest = JSON.stringify(body);
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/usuarios`,'POST',bodyrequest);
  }
  crearRol(body: object, idtoken) {
    const bodyrequest = JSON.stringify(body);
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/roles`,'POST',bodyrequest);
  }
  modificarusuario(body: object, idtoken) {
    const bodyrequest = JSON.stringify(body);
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/usuarios`,'PUT',bodyrequest);
  }
  modificarRol(body: object, idtoken, secuenciaRol) {
    const bodyrequest = JSON.stringify(body);
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/roles/${secuenciaRol}`,'PUT',bodyrequest);
  }
  inactivarUsuario(secuenciaUser, idtoken) {
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/usuarios/${secuenciaUser}/inactivar`,'PUT',null);
  }
  inactivarReconocimientoPregunta(secuenciaUser, idtoken) {
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/usuarios/${secuenciaUser}/no_preguntar_rec_facial`,'PUT',null);
  }
  activarUsuario(secuenciaUser, idtoken) {
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/usuarios/${secuenciaUser}/activar`,'PUT',null);

  }
  inactivarRol(secuenciaRol, idtoken) {
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/roles/${secuenciaRol}/inactivar`,'PUT',null);

  }
  activarRol(secuenciaRol, idtoken) {
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/roles/${secuenciaRol}/activar`,'PUT',null);
  }
  inactivaReconocimiento(secuenciaUsuario, idtoken) {
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/usuarios/${secuenciaUsuario}/inactiva_reconocimiento_facial`,'POST',null);
  }
  getUsuarioId(idtoken, secuenciaUser) {
    let data;
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/usuarios/${secuenciaUser}`,'GET',data);
  }
  getEmpleadoId(idtoken, secuenciaUser) {
    let data;
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/empleados/${secuenciaUser}`,'GET',data);
  }
  getUsuarioIdPerfil(idtoken, secuenciaUser) {
    let data;
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/usuarios/${secuenciaUser}/datos_perfil`,'GET',data);
  }
  putUsuarioIdPerfil(idtoken, secuenciaUser,body) {
    const bodyrequest = JSON.stringify(body);
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/usuarios/${secuenciaUser}/datos_perfil`,'PUT',bodyrequest);
  }
  getRolId(idtoken, secuenciaRolXEmpresa) {
    let data;
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/roles/${secuenciaRolXEmpresa}`,'GET',data);
  }
  getRoles(idtoken, codigoEmpresa, codigoAplicacion,valorFiltro,tipoRol,numpage) {
    let data;
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/roles?codigoEmpresa=${codigoEmpresa}&esActivo=${tipoRol}&codigoAplicacion=${codigoAplicacion}&tipoFiltro=nombreRol&page=${numpage}&perPage=16&valorFiltro=${valorFiltro}`,'GET',data);
  }
  getRolxAplicacion(idtoken, codigoEmpresa, codigoAplicacion,valorFiltro,tipoRol,numpage) {
    let data;
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/roles?codigoEmpresa=${codigoEmpresa}&esActivo=${tipoRol}&codigoAplicacion=${codigoAplicacion}&tipoFiltro=nombreRol&page=${numpage}&perPage=16&valorFiltro=${valorFiltro}`,'GET',data);
  }
  getRolxAplicacionGen(idtoken, codigoEmpresa, codigoAplicacion,valorFiltro,tipoRol,numpage) {
    let data;
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/roles?codigoEmpresa=${codigoEmpresa}&esActivo=${tipoRol}&codigoAplicacion=${codigoAplicacion}&tipoFiltro=nombreRol&page=${numpage}&perPage=16&valorFiltro=${valorFiltro}`,'GET',data);
  }
  getsucursalxempresa(idtoken: string, codempresa) {
    let data;
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/sucursales?codigoEmpresa=${codempresa}`,'GET',data);

  }
  getsucursalxempresaOrdenado(idtoken: string, codempresa,codigoSucursal) {
    let data;
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/sucursales/gestion_usuarios?codigoEmpresa=${codempresa}&codigoSucursalLogin=${codigoSucursal}`,'GET',data);
  }
  getsucursalxempresaOrdenadoUser(idtoken: string, codempresa,codigoSucursal,secuenciaUser) {
    let data;
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/sucursales/gestion_usuarios?codigoEmpresa=${codempresa}&codigoSucursalLogin=${codigoSucursal}&secuenciaUsuario=${secuenciaUser}`,'GET',data);
  }
  getCodigoUsuario(idtoken: string,codempresa,codigoGrupoUsuario, primerNombre,primerApellido,segundoNomnbre,segundoApellido) {
    let data;
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/grupos_usuarios/${codigoGrupoUsuario}/codigo_usuario?codigoEmpresa=${codempresa}&primerNombre=${primerNombre}&primerApellido=${primerApellido}&segundoNombre=${segundoNomnbre}&segundoApellido=${segundoApellido}`,'GET',data);
  }
  getmodulouser(idtoken: string, secuencia, codigosuc) {
    let data;
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/usuarios/${secuencia}/modulos_acceso?codigoSucursal=${codigosuc}`,'GET',data);
  }

  getgrupouser(idtoken: string, codigoempresa) {
    let data;
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/grupos_usuarios?codigoEmpresa=${codigoempresa}&esAdministrado=S`,'GET',data);
  }
  getCodigoPaises(idtoken: string, codigoempresa) {
    let data;
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/paises/codigos_telefonicos?codigoEmpresa=${codigoempresa}`,'GET',data);
  }
  getTipoIdentificacion(idtoken: string, codigoempresa) {
    let data;
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/tipos_identificacion/gestion_usuarios?codigoEmpresa=${codigoempresa}`,'GET',data);
  }

  getusuarios(idtoken: string, codigoempresa, valor, paginate,tipoUsuario,grupoUser,esActivo) {
    let data;
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/grupos_usuarios/${grupoUser}/usuarios?codigoEmpresa=${codigoempresa}&filtroTipoUsuario=${tipoUsuario}&estado=${esActivo}&page=${paginate}&perPage=16&tipoFiltro=nombreUsuario&valorFiltro=${valor}`,'GET',data);
  }
  getempleados(idtoken: string, codigoempresa, valor, paginate) {
    let data;
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/empleados?codigoEmpresa=${codigoempresa}&usuarioCreado=false&page=${paginate}&perPage=16&tipoFiltro=nombreEmpleado&valorFiltro=${valor}`,'GET',data);
  }
  getmenumodulo(idtoken: string, secuencia, codmodulo, codigosuc) {
    let data;
    return this.apiService.apiPublicCall(`${this.URL_SEG}/v1/usuarios/${secuencia}/opciones_acceso?codigoModulo=${codmodulo}&codigoSucursal=${codigosuc}`,'GET',data);
  }
}
