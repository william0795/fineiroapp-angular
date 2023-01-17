import { EventEmitter, Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { StorageService } from "./storage.service";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class FacturacionService {
  parametros: any = {};
  URL_GEN = environment.urlGeneral;
  URL_PLA = environment.urlPla;
  URL_SEG = environment.urlSeg;
  URL_AGE = environment.urlAge;
  URL_FAC = environment.urlFac;
  URL_COM = environment.urlComercial;
  URL_SYNC = environment.urlSync;
  URL_REPO = environment.urlRepo;
  URL_PAPER = environment.urlPaper;

  /*Datos compartidos en facturación automática*/
  selectedPacientes: any[] = []
  selectedPacientesDemanda : any[] = []
  contadorReservas: number;
  contadorOrdenesMedicas: number;
  contadorOrdenesManuales: number;
  contadorChequeos: number;
  contadorPromocionales: number;
  finalizarTransaccion = new EventEmitter<object>();
  datosFactura: any = {};
  demanda: number = 0;
  cobro: number;

  dataFacturacionAutomatica:any = [];
  dataCajaAperturada:any = {};
  idPreTransaccion:number;

  /*Datos compartidos en facturación manual*/
  datosOrdenFacManual:any = {};
  datosDetallesFacManual:any = {};

  /*Datos compartidos en cotizacion*/
  selectedPacientesCotizacion: any[] = []
  selectedPacientesDemandaCotizacion: any[] = []
  contadorOrdenesMedicasCotizacion: number;
  datosFacturaCotizacion: any = {};
  demandaCotizacion: number = 0;

  idPreTransaccionCotizacion: number;
  contadorIdUnico = 0;

  dataCotizacion:any = [];
  pacienteElegidoActualizacion: any;
  idsAgrupacionCotizacion: any = []
    
  dataPaqueteEliminado = new EventEmitter<object>();

  resetDataPrioridad = new EventEmitter<any>();

  traduccionesGeneral:any = {};

  datosFacturaManual:any = {};

  formasPagoRegistradasFacAutomatica:any ;
  arrayIdAgrupacionesFacturadas:any = [];

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private router: Router,
    private storage: StorageService,
    private authS: AuthService
  ) {}

  /**
   * @author Edison Farinango edison.farinango@horizontesazules.ec
   */
  /* =================================== FACTURACION =========================================== */

  
  /*-------------ANULACIONES-------------------*/
  getTiposComprobantes(params) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/tipos_comprobantes`,
      "GET",
      params
    );
  }

  getMotivosNotaCredito(params) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/motivos_nota_credito`,
      "GET",
      params
    );
  }

  getConsultaComprobantesAnulacion(params){
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/comprobantes/factura_paciente/consulta_por_anulacion`,
      "GET",
      params
    );
  }

  postAnulacionPaciente(params,data){
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/comprobantes/anulacion_paciente`,
      "POST",
      data,
      params
    );
    
  }

  getPuntosEmision(params){
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/puntos_emision/autorizacion_sri_vigentes`,
      "GET",
      params
    );
  }

  getAutorizacionesSri(params){
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/autorizaciones_sri/vigentes`,
      "GET",
      params
    );
  }

  getValidacionSecuencialSri(params){
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/autorizaciones_sri/valida_numero_comprobante`,
      "GET",
      params
    );
  }

  postAnulacionAutenticacionEjectivoLider(params,data){
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/comprobantes/autenticacion/ejecutivo_lider`,
      "POST",
      data,
      params
    );
  }

  /* -------------REPORTES---------------------*/
  getReportesFile(secuenciaArqueo: any, params) {
    console.log(this.URL_REPO)
    let url = "reportes"
    return this.apiService.ApiCallDownload(
      `${url}/v1/facturacion/arqueos_caja/${secuenciaArqueo}`,
      "GET",
      params
    );
  }

  postReporteOrdenMedica(data,codigoEmpresa){
    console.log(this.URL_REPO)
    let url = "reportes"
    return this.apiService.ApiCallDownload(
      `${url}/v1/gestion_medica/orden_medica?codigoEmpresa=${codigoEmpresa}`,
      "POST",
      data,
    );
  }

  getAbonoFile(codigoAbono: any, params) {
    console.log(this.URL_REPO)
    let url = "reportes"
    return this.apiService.ApiCallDownload(
      `${url}/v1/facturacion/abonos/${codigoAbono}`,
      "GET",
      params
    );
  }

  getFacturasComprobantes(params){
    console.log(this.URL_REPO)
    let url = "reportes"
    return this.apiService.ApiCallDownload(
      `${url}/v1/facturacion/comprobante_paciente`,
      "GET",
      params
    );
  }

  getReporteFacturacionAuto(params) {
    console.log(this.URL_REPO)
    let url = "reportes"
    return this.apiService.ApiCallDownload(
      `${this.URL_REPO}/v1/facturacion/comprobante_paciente`,
      "GET",
      params
    );
  }

  /* -------------PACIENTES--------------- */
  postCrearPaciente(imageUser, params) {
    console.log("Upload Image");
    const formDatauser = new FormData();
    formDatauser.append(
      "pacienteCrear",
      new Blob([JSON.stringify(params)], { type: "application/json" })
    );
    if (imageUser != null) {
      formDatauser.append("fotoPaciente", imageUser);
    }

    console.log("pacienteCrear:", formDatauser);
    console.log('fotoPaciente:',imageUser);

    return this.apiService.ApiCallMultiPart(
      `${this.URL_GEN}/v1/pacientes/`,
      "POST",
      formDatauser
    );
  }

  getCodigoTelefonicoPaises(params){
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/paises/codigos_telefonicos`,
      "GET",
      params
    );
  }

  getPaciente(codigoPaciente, tipoFiltro, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_GEN}/v1/pacientes/consulta_basica?tipoFiltro=${tipoFiltro}&valorFiltro=${codigoPaciente}&page=1&perPage=20`,
      "GET",
      data
    );
  }

  getPacienteCompleto(codigoPaciente, tipoFiltro, data: any) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/pacientes/consulta_completa?tipoFiltro=${tipoFiltro}&valorFiltro=${codigoPaciente}&page=1&perPage=20`,
      "GET",
      data
    );
  }

  getPacientePorId(codigoPaciente,data){
    return this.apiService.apiPublicCall(
      `${this.URL_GEN}/v1/pacientes/${codigoPaciente}?incluirLocalidadUltimaAtencion=true`,
      "GET",
      data
    );
  }

  getDuplicidadPaciente(idPaciente) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/pacientes/${idPaciente}/posible_duplicidad_hc`,
      "GET",
      ""
    );
  }

  getConveniosPacientes(idPaciente, params) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/pacientes/${idPaciente}/convenios`,
      "GET",
      params
    );
  }

  getPaquetesPacientes(idPaciente, params) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/pacientes/${idPaciente}/paquetes`,
      "GET",
      params
    );
  }

  getTarjetasPacientes(idPaciente, params) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/pacientes/${idPaciente}/tarjetas`,
      "GET",
      params
    );
  }

  postReservasIdPaciente(idPaciente: any, data: any, params: any = {}) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/pacientes/${idPaciente}/reservas/por_facturar`,
      "POST",
      params,
      data
    );
  }
  getOrdenesMedicas(idPaciente: any, params) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/pacientes/${idPaciente}/ordenes_medicas/por_facturar`,
      "GET",
      params
    );
  }

  getOrdenesMedicasManuales(idPaciente: any, params: any) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/pacientes/${idPaciente}/ordenes_manuales/por_facturar`,
      "GET",
      params
    );
  }

  getChequeos(idPaciente: any, params) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/pacientes/${idPaciente}/chequeos_pre_post/por_facturar`,
      "GET",
      params
    );
  }

  getOrdenesMedicasCotizar(idPaciente: any, params) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/pacientes/${idPaciente}/ordenes_medicas/por_cotizar`,
      "GET",
      params
    );
  }
  
  getKardexTerapia(idPaciente,params){
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/pacientes/${idPaciente}/kardex/terapias`,
      "GET",
      params
    );
  }


  /* ---------CAJEROS-------------- */
  /*putAgregarItemPreTransaccion(idPreTransaccion,codigoEmpresa,params){
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/pre_transacciones/${idPreTransaccion}/agregar_item?codigoEmpresa=
      ${codigoEmpresa}`,
      "POST",
      params
    );
  }*/
  getCajas(secuenciaUsuario: any, params) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/cajeros/${secuenciaUsuario}/cajas`,
      "GET",
      params
    );
  }

  getCajeros(params) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/cajeros`,
      "GET",
      params
    );
  }

  /* -------------ARQUEOS CAJA--------------- */
  getArqueosCaja(secuenciaArqueo: any, params) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/arqueos_caja/${secuenciaArqueo}`,
      "GET",
      params
    );
  }

  postArqueosCajaApertura(params) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/arqueos_caja/apertura`,
      "POST",
      params
    );
  }

  getDenominaciononeda(params: object) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/arqueos_caja/denominaciones_monedas`,
      "GET",
      params
    );
  }

  getCajerosSecuencia(secuenciaUsuario, params) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/cajeros/${secuenciaUsuario}/cajas`,
      "GET",
      params
    );
  }

  putArqueoCajaCierre(body: object) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/arqueos_caja/cierre`,
      "PUT",
      body
    );
  }

  getFacturacionPdfTxt(secuenciaArqueo, params?: any) {
    return this.apiService.ApiCall(
      `reportes/v1/facturacion/arqueos_caja/${secuenciaArqueo}`,
      "GET",
      params
    );
  }

  /* ======================== SYNC CONVENIOS =============================================================== */
  /* -------------VALIDACIÓN ASEGURADORA--------------- */
  getAsycConvenioPaciente(data: any, params) {
    return this.apiService.ApiCall(
      `${this.URL_SYNC}/v1/validacion_aseguradora/async/convenios_paciente`,
      "POST",
      data,
      params
    );
  }

  getSyncConveniosAutomaticos(data: any) {
    return this.apiService.ApiCall(
      `${this.URL_SYNC}/v1/validacion_aseguradora/sync/clientes`,
      "GET",
      data
    );
  }

  /* ======================== COMERCIAL=============================================================== */
  /* -------------PACIENTES--------------- */
  getPaquetesPaciente(idPaciente: any, params) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/pacientes/${idPaciente}/paquetes`,
      "GET",
      params
    );
  }

  /* -------------PAQUETES--------------- */
  getDetallesAsignadosPaquetes(secuenciaPaquetePaciente: any, params) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/paquetes/${secuenciaPaquetePaciente}/detalles_asignados`,
      "GET",
      params
    );
  }

  getPaquetesPromocionales(idPaciente: any, params) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/pacientes/${idPaciente}/paquetes`,
      "GET",
      params
    );
  }

  getPromocionalesRecomendados(idPaciente: any, params) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/pacientes/${idPaciente}/recomendacion_paquetes`,
      "GET",
      params
    );
  }
  getDetallesPromocionalesRecomendados(codigoPaquete: any, params) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/paquetes/${codigoPaquete}/detalles`,
      "GET",
      params
    );
  }
  

  /* -------------Pertinencias--------------- */
  getVerPertinencias(codigoConvenio: any, params) {
    return this.apiService.apiPublicCall(
      `${this.URL_COM}/v1/convenios/${codigoConvenio}/pertinencia_prestacion`,
      "GET",
      params
    );
  }

  /* ------------- Alerta de Bienvenida/Cumpleaños --------------- */
  getAlerta(idPaciente: number, params?: any) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/pacientes/${idPaciente}/alertas_bienvenida`,
      "GET",
      params
    );
  }

  /* ------------- Grupo de prestacion --------------- */

  getGrupoPrestacion(params?: any) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/prestaciones/grupos_prestacion`,
      "GET",
      params
    );
  }

  getDemanda(params?: any) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/servicios/a_demanda`,
      "GET",
      params
    );
  }

  /* ------------- Resumenes --------------- */

  getVerificarDatosFactura(params?: any) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/pacientes/verificar_datos_factura`,
      "GET",
      params
    );
  }

  getDiagnostico(params?: any) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/diagnosticos`,
      "GET",
      params
    );
  }

  setDemanda(d: number) {
    this.demanda = d;
  }

  getDemandaForm() {
    return this.demanda;
  }

  setDemandaCotizacion(d: number){
    this.demandaCotizacion = d
  }

  getDemandaFormCotizacion(){
    return this.demandaCotizacion;
  }

  /* ------------- Abonos --------------- */
  getAbonosPendientesPorAbonar(params?: any) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/abonos/ordenes/pendientes_por_abonar`,
      "GET",
      params
    );
  }

  getAbonosHistorial(params?: any) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/abonos/ordenes/historial`,
      "GET",
      params
    );
  }

  getDetalleAbonos(numeroOrden, params) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/abonos/ordenes/${numeroOrden}`,
      "GET",
      params
    );
  }

  validarValorAbono(params) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/abonos/validar_valor/`,
      "GET",
      params
    );
  }

  anularAbono(codigoAbono) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/abonos/${codigoAbono}`,
      "DELETE",
      ""
    );
  }

  getDetallesOrden(numeroOrden, params) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/abonos/ordenes/${numeroOrden}/detalles`,
      "GET",
      params
    );
  }
  
  getServiciosLineaNegocio(params) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/servicios`,
      "GET",
      params
    );
  }

  generaAbonoOrden(params) {
    return this.apiService.ApiCall(`${this.URL_FAC}/v1/abonos`, "POST", params);
  }
  
  /*------------Pre-transacciones------------------*/
  postInicializarPreTransaccion(params,data){
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/pre_transacciones/inicializar`,"POST", data, params
    );
  }

  agregarItemPreTransaccion(idPreTransaccion,codigoEmpresa,requestBody){
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/pre_transacciones/${idPreTransaccion}/agregar_item?codigoEmpresa=${codigoEmpresa}`,
      "PUT",
      requestBody
    );
  }

  eliminarItemPreTransaccion(idPreTransaccion,codigoEmpresa,requestBody){
    return this.apiService.ApiCall(`${this.URL_FAC}/v1/pre_transacciones/${idPreTransaccion}/eliminar_item?codigoEmpresa=${codigoEmpresa}`,
      "PUT",
      requestBody
    );
  }

  putAgregarItemPreTransaccion(idPreTransaccion,params,data){
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/pre_transacciones/${idPreTransaccion}/agregar_item`,
      "PUT",
      data,
      params
    );
  }

  deleteItemPreTransaccion(idPreTransaccion,params,data){
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/pre_transacciones/${idPreTransaccion}/eliminar_item`,
      "PUT",
      data,
      params
    );
  }

  postObtenerDatosPreTransaccion(idPreTransaccion,params,data){
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/pre_transacciones/${idPreTransaccion}/consulta`,
      "POST",
      data,
      params
    );
  }

  putSetearCantidadItemPreTransaccion(idPreTransaccion,params,data){
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/pre_transacciones/${idPreTransaccion}/setear_cantidad_item`,
      "PUT",
      data,
      params
    );
  }

  putSetearBeneficioPreTransaccion(idPreTransaccion,params,data){
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/pre_transacciones/${idPreTransaccion}/setear_beneficio`,
      "PUT",
      data,
      params
    );
  }

  putSetearDiagnosticos(idPreTransaccion,params,data){
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/pre_transacciones/${idPreTransaccion}/setear_diagnosticos`,
      "PUT",
      data,
      params
    );
  }

  postGuardarCotizacion(idPreTransaccion,params,data){
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/pre_transacciones/${idPreTransaccion}/cotizar`,
      "POST",
      data,
      params
    );
  }

  getPersonalEmpresa(params){
    return this.apiService.ApiCall(`${this.URL_GEN}/v1/personal_empresa`, "GET", params);
  }

  asociarReserva(idPreTransaccion, params,data) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/pre_transacciones/${idPreTransaccion}/asociar_reserva`,
      "PUT",
      data,
      params
    );
  }


  seteaDatosFactura(idPreTransaccion, params,data) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/pre_transacciones/${idPreTransaccion}/setear_datos_factura`,
      "PUT",
      data,
      params
    );
  }

  seteaAtributoGeneral(idPreTransaccion,params,data){
    return this.apiService.ApiCall(
        `${this.URL_FAC}/v1/pre_transacciones/${idPreTransaccion}/setear_atributo_general`,
        "PUT",
        data,
        params
      );
  }

  seteaCobertura(idPreTransaccion,params,data){
    return this.apiService.ApiCall(
        `${this.URL_FAC}/v1/pre_transacciones/${idPreTransaccion}/setear_cobertura`,
        "PUT",
        data,
        params
      );
  }

  seteaAutorizacionAseguradora(idPreTransaccion,params,data){
    return this.apiService.ApiCall(
        `${this.URL_FAC}/v1/pre_transacciones/${idPreTransaccion}/setear_autorizacion_aseguradora`,
        "PUT",
        data,
        params
      );
  }

    validacion_previo_pago(idPreTransaccion,params,data){
        return this.apiService.ApiCall(
            `${this.URL_FAC}/v1/pre_transacciones/${idPreTransaccion}/validacion_previo_pago`,
            "POST",
            data,
            params
          );
    }

    setear_pagos(idPreTransaccion,params,data){
        return this.apiService.ApiCall(
            `${this.URL_FAC}/v1/pre_transacciones/${idPreTransaccion}/setear_pagos`,
            "POST",
            data,
            params
          );
    }

    consultarDocumentosPaperless(params){
        return this.apiService.ApiCall(
            `${this.URL_FAC}/v1/paperless/consulta_documentos_cajero`,
            "GET",
            params
          );
    }


    facturarAutomatica(idPreTransaccion,params,data){
        return this.apiService.ApiCall(
            `${this.URL_FAC}/v1/pre_transacciones/${idPreTransaccion}/facturar`,
            "POST",
            data,
            params
          );
    }

    diferidos(params){
        return this.apiService.ApiCall(
            `${this.URL_FAC}/v1/formas_pago/tarjeta/diferidos`,
            "GET",
            params
          );
    }

  /*---------Atención Preferencial----------*/
  getTiposAutorizaciones(){
    return this.apiService.ApiCall(`${this.URL_FAC}/v1/autorizacion_servicio/tipos`,"GET","");
  }

  getMotivosAutorizaciones(params){
    return this.apiService.ApiCall(`${this.URL_FAC}/v1/autorizacion_servicio/motivos`,"GET",params);
  }

  autenticacionCajeroLider(params, data: any) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/autorizacion_servicio/autenticacion/ejecutivo_lider`,
      "POST",
      data,
      params
    );
  }



  /*---------Atención Preferencial----------*/
  getAtencionesPreferencial(){
    return this.apiService.ApiCall(`${this.URL_GEN}/v1/atencion_preferencial`, "GET", "");
  }

  /*---------Reportes----------*/
  getReporteArqueoCaja(secuenciaArqueo, params) {
    return this.apiService.ApiCall(
      `${this.URL_REPO}/v1/facturacion/arqueos_caja/${secuenciaArqueo}`,
      "GET",
      params
    );
  }

  /*---------Formas de pago ----------*/
  getparametrosTarjeta(params) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/formas_pago/tarjeta/parametros`,
      "GET",
      params
    );
  }

  getInstitucionesBancarias(params: object) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/instituciones/bancarias`,
      "GET",
      params
    );
  }


  /* -------------Facturacion manual--------------- */
  getOrdenesFactManual(params) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/ordenes`,
      "GET",
      params
    );
  }

  getDetallesOrdenesFactManual(numeroOrden,params) {
    return this.apiService.ApiCall(
      `${this.URL_FAC}/v1/ordenes/${numeroOrden}/detalles`,
      "GET",
      params
    );
  }

  tiposIdentificacion(params){
    return this.apiService.ApiCall(
        `${this.URL_GEN}/v1/tipos_identificacion`,
        "GET",
        params
      );
  }


  validaNumeroComprobante(params){
    return this.apiService.ApiCall(
        `${this.URL_FAC}/v1/autorizaciones_sri/valida_numero_comprobante`,
        "GET",
        params
      );
  }


  getParametrosWacom(params){
    return this.apiService.ApiCall(
        `${this.URL_PAPER}/v1/parametros`,
        "GET",
        params
      );
  }

  getFirmaPaciente(params){
    return this.apiService.ApiCallDownload(
        `${this.URL_PAPER}/v1/transacciones/firma_paciente`,
        "GET",
        params
      );
  }

  seteaFirmaPaciente(params){
    return this.apiService.ApiCallMultiPart(
        `${this.URL_PAPER}/v1/transacciones/firma_paciente`,
        "POST",
        params
      );
  }

  procesarDocumentos(params,data){
    return this.apiService.ApiCall(
        `${this.URL_PAPER}/v1/transacciones/procesar_documentos`,
        "POST",
        data,
        params
      );
  }

  generaComprobanteFacturaManual(params,data){
    return this.apiService.ApiCall(
        `${this.URL_FAC}/v1/comprobantes/factura_manual_paciente`,
        "POST",
        data,
        params
      );
  }

  consultaTransaccionFacturada(idPreTransaccion,params,data){
    return this.apiService.ApiCall(
        `${this.URL_FAC}/v1/pre_transacciones/${idPreTransaccion}/consulta_trans_facturadas`,
        "POST",
        data,
        params
      );
  }

  validaDocumentosPaperless(params,data){
    return this.apiService.ApiCall(
        `${this.URL_PAPER}/v1/transacciones/valida_documentos`,
        "POST",
        data,
        params
      );
  }


}
