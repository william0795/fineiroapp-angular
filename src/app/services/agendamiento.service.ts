import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { StorageService } from "src/app/services/storage.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AgendamientoService {
  URL_GEN = environment.urlGeneral;
  URL_AGE = environment.urlAge;
  URL_COM = environment.urlComercial;
  URL_APO = environment.urlApoyo;
  URL_PL = environment.urlPla;
  URL_SYNC = environment.urlSync;

  conexion = "PHA_X";

  showConfirm: Subject<any>;
  loadData: Subject<any>;
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private router: Router,
    private storage: StorageService,
    private authS: AuthService
  ) {
    this.showConfirm = new Subject<any>();
    this.loadData = new Subject<any>();
  }

  getCiudades(codigoPais, codigoProvincia, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_GEN}/v1/ciudades?codigoProvincia=${codigoProvincia}&codigoPais=${codigoPais}`,
      "GET",
      data
    );
  }
  getPais(data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_GEN}/v1/paises`,
      "GET",
      data
    );
  }
  getCodTelPaises(data:any){
    return this.apiService.apiPublicCall(`${this.URL_GEN}/v1/paises/codigos_telefonicos`,'GET',data);
  }
  getMotivoPermiso(data:any){
    return this.apiService.apiPublicCall(`${this.URL_PL}/v1/permisos/motivos`,'GET',data);
  }
  ingresaBloqueo(data:any){
    return this.apiService.apiPublicCall(`${this.URL_PL}/v1/registros/bloquearPorRango`,'POST',data);
  }
  ingresaBloqueoDesbloqueo(data:any){
    return this.apiService.apiPublicCall(`${this.URL_AGE}/v1/reservas/bloqueo_desbloqueo`,'POST',data);
  }
  getTipoIdentificacion(usoTipoIdentificacion ,codigoEmpresa,data:any){
    return this.apiService.apiPublicCall(`${this.URL_GEN}/v1/tipos_identificacion?codigoEmpresa=${codigoEmpresa}&usoTipoIdentificacion=${usoTipoIdentificacion}`,'GET',data);
  }
  getDiscapacidad(data:any){
    return this.apiService.apiPublicCall(`${this.URL_GEN}/v1/tipos_discapacidad`,'GET',data);
  }
  getSectores(data:any){
    return this.apiService.apiPublicCall(`${this.URL_GEN}/v1/sectores_cardinales`,'GET',data);
  }
  getProvincia(codigoPais,data:any){
    return this.apiService.apiPublicCall(`${this.URL_GEN}/v1/provincias?codigoPais=${codigoPais}`,'GET',data);
  }
  getVerificaDemandaPaciente(idPaciente,data:any){
    return this.apiService.apiPublicCall(`${this.URL_AGE}/v1/pacientes/${idPaciente}/aptitud_demanda_inducida`,'GET',data);
  }
  getPaciente(codigoPaciente,tipoFiltro,data:any){
    return this.apiService.apiPublicCall(`${this.URL_GEN}/v1/pacientes/consulta_basica?tipoFiltro=${tipoFiltro}&valorFiltro=${codigoPaciente}&page=1&perPage=50`,'GET',data);
  }

  getPacienteG(data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_GEN}/v1/pacientes/consulta_basica`,
      "GET",
      data
    );
  }

  getPacienteID(codigoPaciente, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_GEN}/v1/pacientes/${codigoPaciente}?incluirLocalidadUltimaAtencion=true`,
      "GET",
      data
    );
  }
  getConveniosPaciente(codigoPaciente, codigoEmpresa, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_COM}/v1/pacientes/${codigoPaciente}/convenios?codigoEmpresa=${codigoEmpresa}`,
      "GET",
      data
    );
  }
  getCitasVigentes(codigoPaciente, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_AGE}/v1/pacientes/${codigoPaciente}/citas_vigentes`,
      "GET",
      data
    );
  }

  getGrupoFamiliarPaciente(codigoPaciente, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_COM}/v1/pacientes/${codigoPaciente}/grupo_familiar_convenios?codigoEmpresa=1`,
      "GET",
      data
    );
  }
  asignaPaquete(codigoPaquete, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_COM}/v1/paquetes/${codigoPaquete}`,
      "POST",
      data
    );
  }
  registraSobrecupo(data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_AGE}/v1/reservas/sobrecupo`,
      "POST",
      data
    );
  }
  validaConvenioPaciente(data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_SYNC}/v1/validacion_aseguradora/sync/convenios_paciente`,
      "GET",
      data
    );
  }
  validaConvenioPacienteAsync(data: any, params) {
    return this.apiService.ApiCall(
      `${this.URL_SYNC}/v1/validacion_aseguradora/async/convenios_paciente`,
      "POST",
      data,
      params
    );
  }
  getConveniosAutomaticos(data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_SYNC}/v1/validacion_aseguradora/sync/clientes`,
      "GET",
      data
    );
  }

  iniciaAtencion(data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_AGE}/v1/atenciones/iniciar`,
      "POST",
      data
    );
  }
  getValidaIntervalo(data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_AGE}/v1/reservas/validacion_intervalo_vigente`,
      "POST",
      data
    );
  }
  agregaPacienteAtencion(codigoAtencion, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_AGE}/v1/atenciones/${codigoAtencion}/agregar_paciente`,
      "POST",
      data
    );
  }
  quitarPacienteAtencion(codigoAtencion, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_AGE}/v1/atenciones/${codigoAtencion}/quitar_paciente`,
      "POST",
      data
    );
  }
  finalizaAtencion(codigoAtencion, data) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/atenciones/${codigoAtencion}/finalizar_atencion`,
      "PUT",
      data
    );
  }
  getAtencionCurso(params) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/atenciones/atencion_en_curso`,
      "GET",
      params
    );
  }
  getValidaConvenioPaciente(params) {
    return this.apiService.ApiCall(
      `${this.URL_SYNC}/v1/validacion_aseguradora/sync/convenios_paciente`,
      "GET",
      params
    );
  }
  getOrdenesPrestacion(idPaciente, params) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/pacientes/${idPaciente}/ordenes_pendientes_agendar/prestacion`,
      "GET",
      params
    );
  }
  getParametrosConvenios(params) {
    return this.apiService.ApiCall(
      `${this.URL_SYNC}/v1/validacion_aseguradora/sync/parametros_busqueda`,
      "GET",
      params
    );
  }
  getValidacionesReservar(params) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/reservas/validaciones_previas_reservar`,
      "GET",
      params
    );
  }
  postValidacionesReservar(data) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/reservas/validaciones_previas_reservar`,
      "POST",
      data
    );
  }
  sincronizaCovenioManual(secuenciaAfiliado, idPaciente, data) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/afiliados/${secuenciaAfiliado}/sincronizacion_manual?idPaciente=${idPaciente}`,
      "POST",
      data
    );
  }
  getReservasEliminadas(params) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/reservas/gestion_eliminacion`,
      "GET",
      params
    );
  }
  getOrdenes(codigoPaciente, params) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/pacientes/${codigoPaciente}/ordenes_pendientes_agendar`,
      "GET",
      params
    );
  }

  getValorizacionApi(params) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/accesos_api`,
      "GET",
      params
    );
  }

  getValorizacionCotizaciones(data, params, urlApi) {
    return this.apiService.ApiCallValor(
      `${urlApi}v1/valorizacion`,
      "POST",
      data,
      params
    );
  }
  getConsultaAfiliado(data, params) {
    return this.apiService.ApiCall(
      `${this.URL_SYNC}/v1/validacion_aseguradora/sync/consulta_afiliado`,
      "POST",
      data,
      params
    );
  }
  sincronizaConvenio(data, params) {
    return this.apiService.ApiCall(
      `${this.URL_SYNC}/v1/validacion_aseguradora/sync/sincronizar`,
      "POST",
      data,
      params
    );
  }
  asignaTarjeta(codigoTarjeta, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_COM}/v1/tarjetas/${codigoTarjeta}`,
      "POST",
      data
    );
  }
  enviarDatosSucursal(codigoSucursal, params, data: any) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/sucursales/${codigoSucursal}/enviar_ubicacion`,
      "POST",
      data,
      params
    );
  }
  reenvioBotonPago(secuenciaPaquete, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_COM}/v1/paquetes/${secuenciaPaquete}/reenvio_mail_boton_pago`,
      "POST",
      data
    );
  }
  reenvioBotonPagoCitas(codigoReserva, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_AGE}/v1/reservas/${codigoReserva}/envio_boton_pago`,
      "POST",
      data
    );
  }
  reenvioResultados(idOrdenApoyo, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_APO}/v1/ordenes/${idOrdenApoyo}/envio_informe_resultados`,
      "POST",
      data
    );
  }
  eliminaLoginPaquete(codigoEmpresa, codigoSucursal, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_COM}/v1/paquetes/autenticacion/ejecutivo_lider?codigoEmpresa=${codigoEmpresa}&codigoSucursal=${codigoSucursal}`,
      "POST",
      data
    );
  }

  eliminaLoginPaquete2(params, data: any) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/paquetes/autenticacion/ejecutivo_lider`,
      "POST",
      data,
      params
    );
  }

  eliminaPaquete(codigoPaquete, params) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/paquetes/${codigoPaquete}`,
      "DELETE",
      params
    );
  }
  getAfiliados(params) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/afiliados`,
      "GET",
      params
    );
  }
  getHistorialCitas(codigoPaciente, params) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/pacientes/${codigoPaciente}/historial_citas`,
      "GET",
      params
    );
  }
  getHorarioProfesional(codigoProfesional, params) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/profesionales/${codigoProfesional}/detalle_horarios`,
      "GET",
      params
    );
  }
  creaAfiliadoTitular(codigoEmpresa, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_COM}/v1/afiliados/titular?codigoEmpresa=${codigoEmpresa}`,
      "POST",
      data
    );
  }
  creaAfiliadoDependiente(codigoEmpresa, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_COM}/v1/afiliados/dependiente?codigoEmpresa=${codigoEmpresa}`,
      "POST",
      data
    );
  }
  generarPrereserva(data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_AGE}/v1/reservas/prereservar`,
      "POST",
      data
    );
  }
  generarDemandaInsatisfecha(idPaciente, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_AGE}/v1/pacientes/${idPaciente}/demanda_insatisfecha`,
      "POST",
      data
    );
  }
  generarReserva(codigoReserva, data: any) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/reservas/${codigoReserva}/confirmar_prereserva`,
      "PUT",
      data
    );
  }
  confirmarReserva(codigoReserva, data: any) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/reservas/${codigoReserva}/confirmar_reserva`,
      "PUT",
      data
    );
  }
  eliminarPreReserva(codigoReserva, data: any) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/reservas/${codigoReserva}/eliminar_prereserva`,
      "PUT",
      data
    );
  }
  eliminarReserva(codigoReserva, data: any) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/reservas/${codigoReserva}/eliminar_reserva`,
      "PUT",
      data
    );
  }
  getExamenesLaboratorio(params) {
    return this.apiService.ApiCall(
      `${this.URL_APO}/v1/laboratorio/ordenes/estado_resultados`,
      "GET",
      params
    );
  }
  getExamenesImagenes(params) {
    return this.apiService.ApiCall(
      `${this.URL_APO}/v1/imagenes/ordenes/estado_resultados`,
      "GET",
      params
    );
  }
  getExamenesProcedimientos(params) {
    return this.apiService.ApiCall(
      `${this.URL_APO}/v1/procedimientos/ordenes/estado_resultados`,
      "GET",
      params
    );
  }
  getTrazabilidadLaboratorio(params) {
    return this.apiService.ApiCall(
      `${this.URL_APO}/v1/laboratorio/ordenes/trazabilidad`,
      "GET",
      params
    );
  }
  getTrazabilidadImagenes(params) {
    return this.apiService.ApiCall(
      `${this.URL_APO}/v1/imagenes/ordenes/trazabilidad`,
      "GET",
      params
    );
  }
  getTrazabilidadProcedimientos(params) {
    return this.apiService.ApiCall(
      `${this.URL_APO}/v1/procedimientos/ordenes/trazabilidad`,
      "GET",
      params
    );
  }

  getTarjetasPaciente(codigoPaciente, codigoEmpresa, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_COM}/v1/pacientes/${codigoPaciente}/tarjetas?codigoEmpresa=${codigoEmpresa}`,
      "GET",
      data
    );
  }
  getDetallePaquete(codigoPaquete, codigoEmpresa, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_COM}/v1/paquetes/${codigoPaquete}/detalles?codigoEmpresa=${codigoEmpresa}`,
      "GET",
      data
    );
  }
  getDetallePaquetePaciente(codigoPaquete, params) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/paquetes/${codigoPaquete}/detalles_asignados`,
      "GET",
      params
    );
  }
  getPrestacionesCotizacion(params) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/prestaciones/cotizacion`,
      "GET",
      params
    );
  }
  getServiciosCotizacion(params) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/servicios/cotizacion`,
      "GET",
      params
    );
  }
  getTarjetas(params) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/tarjetas`,
      "GET",
      params
    );
  }
  getPaquetesPaciente(idPaciente, params) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/pacientes/${idPaciente}/paquetes`,
      "GET",
      params
    );
  }
  getPaquetesPacienteSerPrest(idPaciente, data, params) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/pacientes/${idPaciente}/items_paquete_prestacion`,
      "POST",
      data,
      params
    );
  }
  getPaquetes(params) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/paquetes`,
      "GET",
      params
    );
  }
  getParentezco(params) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/tipos_parentesco`,
      "GET",
      params
    );
  }
  getCiudadesCentros(codigoEmpresa, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_GEN}/v1/ciudades/centros_medicos?codigoEmpresa=${codigoEmpresa}`,
      "GET",
      data
    );
  }
  getSucursalesCentros(params) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/sucursales`,
      "GET",
      params
    );
  }
  getSucursalId(codigoSucursal, codigoEmpresa, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_GEN}/v1/sucursales/${codigoSucursal}?codigoEmpresa=${codigoEmpresa}`,
      "GET",
      data
    );
  }
  getEspecialidadesSucursal(codigoSucursal, codigoEmpresa, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_GEN}/v1/sucursales/${codigoSucursal}/especialidades?codigoEmpresa=${codigoEmpresa}&tipoConsulta=TODOS`,
      "GET",
      data
    );
  }

  getConvenios(codigoEmpresa, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_COM}/v1/convenios?codigoEmpresa=${codigoEmpresa}&page=1&perPage=16`,
      "GET",
      data
    );
  }

  getEstadoCivil(data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_GEN}/v1/estado_civil`,
      "GET",
      data
    );
  }
  getMotivoCancelacion(data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_AGE}/v1/reservas/motivos_cancelacion`,
      "GET",
      data
    );
  }
  getMotivoInactivaPaquete(data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_COM}/v1/paquetes/motivos_inactivacion`,
      "GET",
      data
    );
  }

  getMotivoInactivaPaquete2() {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/paquetes/motivos_inactivacion`,
      "GET",
      null
    );
  }

  getAllEspecialidades(params) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/especialidades`,
      "GET",
      params
    );
  }
  getOrdenesExistentes(idPaciente, params) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/pacientes/${idPaciente}/ordenes_existentes_cotizar`,
      "GET",
      params
    );
  }
  getPrestaciones(params) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/prestaciones`,
      "GET",
      params
    );
  }
  getDisponibilidad(params) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/disponibilidad`,
      "GET",
      params
    );
  }
  getConveniosSearch(params) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/convenios`,
      "GET",
      params
    );
  }
  getMetaData(codigoCliente, params) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/clientes/${codigoCliente}/metadata_creacion_afiliado`,
      "GET",
      params
    );
  }
  crearPaciente(imageUser, dataPaciente) {
    console.log("Upload Image");
    const formDatauser = new FormData();
    formDatauser.append(
      "pacienteCrear",
      new Blob([JSON.stringify(dataPaciente)], { type: "application/json" })
    );
    if (imageUser != null) {
      formDatauser.append("fotoPaciente", imageUser);
    }

    console.log("pacienteCrear:", formDatauser);
    // console.log('fotoPaciente:',imageUser);

    return this.apiService.ApiCallMultiPart(
      `${this.URL_GEN}/v1/pacientes/`,
      "POST",
      formDatauser
    );
  }
  actualizarPaciente(imageUser, dataPaciente, idPaciente) {
    console.log("Upload Image");
    const formDatauser = new FormData();
    formDatauser.append(
      "pacienteActualizar",
      new Blob([JSON.stringify(dataPaciente)], { type: "application/json" })
    );
    if (imageUser != null) {
      formDatauser.append("fotoPaciente", imageUser);
    }

    console.log("pacienteActualizar:", dataPaciente);
    // console.log('fotoPaciente:',imageUser);

    return this.apiService.ApiCallMultiPart(
      `${this.URL_GEN}/v1/pacientes/${idPaciente}`,
      "PUT",
      formDatauser
    );
  }
  rutasAtencion: any[] = [
    { nombre: "general", ruta: "demandaInducida" },
    { nombre: "paciente", ruta: "gestionCitas" },
    { nombre: "actualizar-datos", ruta: "actualizacionDatosPaciente" },
    { nombre: "beneficios", ruta: "beneficios" },
    { nombre: "historial-citas", ruta: "historialCitas" },
    { nombre: "cotizador", ruta: "cotizador" },
    { nombre: "trazabilidad-examenes", ruta: "trazabilidadApoyosDx" },
    { nombre: "centros-medicos", ruta: "centrosMedicos" },
    { nombre: "videoconsulta", ruta: "videoconsulta" },
  ];
  datamodGen: any[] = [];
  dataVistas: any[] = [];
  datamodulo: any = {
    nombre: null,
  };

  verificaRuta() {
    console.log("Verifica Ruta Atencion");

    this.dataVistas = [];
    this.datamodGen = this.storage.get("ModulosAcceso2");
    console.log("datamodGen", this.datamodGen);
    this.datamodulo = JSON.parse(localStorage.getItem("moduloselect"));

    this.datamodGen.forEach((elementmd) => {
      if (elementmd.codigoModulo == this.datamodulo["codigo"]) {
        console.log("CodigoModulo", elementmd.codigoModulo);
        console.log("ModuloOpciones", elementmd.opciones);

        if (elementmd.opciones != null && elementmd.opciones != undefined) {
          elementmd.opciones.forEach((elementOP) => {
            if (elementOP.descripcionOpcion == "Atención") {
              this.dataVistas = elementOP.acciones;
            }
          });
        }
      }
    });

    let permiteDemanda = false;

    let ruta = this.router.url;
    let contRuta = ruta.split("/");
    let contRuta2 = ruta.split("atencion/");
    let contRuta3 = contRuta2[1].split("/");
    let nameRuta = contRuta3[0];
    let verificaRuta = false;
    console.log("contRuta2", contRuta2);
    console.log("contRuta3", contRuta3);

    if (nameRuta == "crear-paciente") {
      verificaRuta = true;
    } else {
      this.rutasAtencion.forEach((item) => {
        if (item.nombre == nameRuta) {
          this.dataVistas.forEach((itemV) => {
            if (itemV == item.ruta) {
              verificaRuta = true;
            }
            if (itemV == "demandaInducida") {
              permiteDemanda = true;
            }
          });
        }
      });
    }

    setTimeout(() => {
      let rutaFirst = "";
      if (verificaRuta == false) {
        if (nameRuta == "general") {
          if (permiteDemanda == false) {
            if (this.dataVistas.length != 0) {
              this.rutasAtencion.forEach((itemR) => {
                if (itemR.ruta == this.dataVistas[0]) {
                  rutaFirst = itemR.nombre;
                }
              });
              console.log("rutaFirst", rutaFirst);
              console.log("this.dataVistas", this.dataVistas);
              this.router.navigateByUrl(
                `modulo/agendamiento/atencion/${rutaFirst}`
              );
            } else {
              this.router.navigateByUrl(`home`);
            }
          }
        } else {
          this.router.navigateByUrl(`home`);
        }
      } else {
        console.log("nameRuta", nameRuta);
      }
    }, 100);

    console.log("verificaRuta", verificaRuta);
    console.log("nameRuta", nameRuta);
    console.log("ruta", ruta);
  }

  getAllProfesional(params) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/profesionales`,
      "GET",
      params
    );
  }
  getPaises(params) {
    return this.apiService.ApiCall(`${this.URL_GEN}/v1/paises`, "GET", params);
  }
  getAllProfesionalAgendamiento(params) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/profesionales`,
      "GET",
      params
    );
  }
  getReservaAgendaMedico(params) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/reservas/agenda_medico`,
      "GET",
      params
    );
  }
  getCoberturaValoriza(params){
    return this.apiService.ApiCall(`${this.URL_AGE}/v1/reservas/cobertura_valorizacion_convenio`,'GET',params);
  }

  getImageProfile(idPaciente, params) {
    return this.apiService.ApiCallDownload(
      `${this.URL_GEN}/v1/pacientes/${idPaciente}/foto_perfil?codigoEmpresa=` +
        params.codigoEmpresa +
        "&size=" +
        params.size,
      "GET",
      ""
    );
  }

  getClasificadorServicios(params) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/servicios/clasificador`,
      "GET",
      params
    );
  }
  deleteAfiliado(secuenciaAfiliado, params) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/afiliados/${secuenciaAfiliado}`,
      "DELETE",
      params
    );
  }

  getConveniosPacientes(idPaciente, params) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/pacientes/` + idPaciente + "/convenios",
      "GET",
      params
    );
  }
  getTarjetasPacientes(idPaciente, params) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/pacientes/` + idPaciente + "/tarjetas",
      "GET",
      params
    );
  }

  getDetailOrdenesExistentes(idPaciente, params) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/pacientes/${idPaciente}/detalle_orden_cotizar/`,
      "GET",
      params
    );
  }

  getValorizacionOrdCotizacion(data, params, urlApi) {
    let test = JSON.parse(JSON.stringify(data));
    test.some((item, index) => {
      let tmpPrestaciones: any = item.prestaciones;
      console.log(tmpPrestaciones);
      tmpPrestaciones.some((item, index) => {
        if (item.codigoServicio == 0) {
          //delete tmpPrestaciones[index];
          tmpPrestaciones.splice(index, 1);
        }
      });
    });
    console.log(test);
    return this.apiService.ApiCallValor(
      `${urlApi}v1/valorizacion`,
      "POST",
      test,
      params
    );
  }
  sendEmailOrdCotizacion(data, params, idPaciente) {
    let test = JSON.parse(JSON.stringify(data)).serviciosExistentes;
    test.some((item, index) => {
      let tmpPrestaciones: any = item.detalles;
      console.log(tmpPrestaciones);
      tmpPrestaciones.some((item, index) => {
        if (!item.lineaDetalleOrden) {
          //delete tmpPrestaciones[index];
          tmpPrestaciones.splice(index, 1);
        }
      });
    });
    let formaterParams: any = {};
    formaterParams.serviciosExistentes = test;
    console.log(test);
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/pacientes/${idPaciente}/enviar_cotizacion_correo`,
      "POST",
      formaterParams,
      params
    );
  }
  sendEmailServCotizacion(data, params, idPaciente) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/pacientes/${idPaciente}/enviar_cotizacion_correo`,
      "POST",
      data,
      params
    );
  }

  getDetalleServicio(params, codPrestacion) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/sucursales/prestaciones/${codPrestacion}`,
      "GET",
      params
    );
  }

  getParameter(params) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/parametros`,
      "GET",
      params
    );
  }

  getTratamientosTerminados(params, url) {
    return this.apiService.ApiCallDwh(
      `${url}v1/tratamientos/captura_servicios`,
      "GET",
      params
    );
  }

  getPerfiladoPaciente(params, url) {
    return this.apiService.ApiCallDwh(
      `${url}v1/perfilado_paciente`,
      "GET",
      params
    );
  }

  getNubePalabras(params, url) {
    return this.apiService.ApiCallDwh(`${url}v1/nube_palabras`, "GET", params);
  }

  getNotasPaciente(params, idPaciente) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/pacientes/${idPaciente}/notas`,
      "GET",
      params
    );
  }

  addNotaPaciente(idPaciente, params, params2) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/pacientes/${idPaciente}/notas`,
      "POST",
      params,
      params2
    );
  }

  getUltimasCitas(idPaciente) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/pacientes/${idPaciente}/demanda_inducida/ultimas_citas`,
      "GET",
      ""
    );
  }
  getDuplicidadPaciente(idPaciente) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/pacientes/${idPaciente}/posible_duplicidad_hc`,
      "GET",
      ""
    );
  }

  getMedicosFavoritos(idPaciente) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/pacientes/${idPaciente}/demanda_inducida/medicos_favoritos`,
      "GET",
      ""
    );
  }

  updateEmail(idPaciente, dataPatient) {
    const formDatauser = new FormData();
    formDatauser.append(
      "pacienteActualizar",
      new Blob([JSON.stringify(dataPatient)], { type: "application/json" })
    );
    return this.apiService.ApiCallMultiPart(
      `${this.URL_GEN}/v1/pacientes/${idPaciente}`,
      "PUT",
      formDatauser
    );
  }

  getDetailsCitas(idReserva) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/reservas/${idReserva}/log_eventos`,
      "POST",
      ""
    );
  }

  reenviarUrl(idReserva) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/reservas/${idReserva}/enviar_link_teleconsulta_correo`,
      "POST",
      ""
    );
  }

  reenviarPlan(idReserva) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/reservas/${idReserva}/enviar_plan_tratamiento_correo`,
      "POST",
      ""
    );
  }

  reenviarCertificado(idReserva) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/reservas/${idReserva}/enviar_certificados_emitidos_correo`,
      "POST",
      ""
    );
  }

  shareOrdCotizacion(data, params, idPaciente) {
    let test = JSON.parse(JSON.stringify(data)).serviciosExistentes;
    test.some((item, index) => {
      let tmpPrestaciones: any = item.detalles;
      console.log(tmpPrestaciones);
      tmpPrestaciones.some((item, index) => {
        if (!item.lineaDetalleOrden) {
          //delete tmpPrestaciones[index];
          tmpPrestaciones.splice(index, 1);
        }
      });
    });
    let formaterParams: any = {};
    formaterParams.serviciosExistentes = test;
    console.log(test);
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/pacientes/${idPaciente}/enviar_cotizacion_whatsapp`,
      "POST",
      formaterParams,
      params
    );
  }

  shareServCotizacion(data, params, idPaciente) {
    return this.apiService.ApiCall(
      `${this.URL_AGE}/v1/pacientes/${idPaciente}/enviar_cotizacion_whatsapp`,
      "POST",
      data,
      params
    );
  }

  shareResultados(idOrdenApoyo, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_APO}/v1/ordenes/${idOrdenApoyo}/envio_resultados_whatsapp`,
      "POST",
      data
    );
  }

  eliminarTarjeta(secuenciaTarjeta, codEmpresa) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/tarjetas/${secuenciaTarjeta}?codigoEmpresa=` +
        codEmpresa,
      "DELETE",
      ""
    );
  }

  enviarProcedimientos(idOrdenApoyo, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_APO}/v1/ordenes/${idOrdenApoyo}/envio_informe_resultados`,
      "POST",
      data
    );
  }

  getCalculoEdad(params) {
    return this.apiService.ApiCall(
      `${this.URL_GEN}/v1/util/calculo_edad`,
      "GET",
      params
    );
  }

  getPacientes(codigoPaciente, tipoFiltro, data: any) {
    return this.apiService.apiPublicCall(
      `${this.URL_GEN}/v1/pacientes/consulta_basica?tipoFiltro=${tipoFiltro}&valorFiltro=${codigoPaciente}&page=1&perPage=20&estado=ACTIVO`,
      "GET",
      data
    );
  }

  getPaquetesRecomendacion( params,idPaciente ){
    return this.apiService.ApiCall(`${this.URL_COM}/v1/pacientes/${idPaciente}/recomendacion_paquetes`,'GET',params);
  }

  getDetallesPaquetes(params, paquete) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/paquetes/${paquete}/detalles`,
      "GET",
      params
    );
  }

  getHistorialPaquetes(params, idPaciente) {
    return this.apiService.ApiCall(
      `${this.URL_COM}/v1/pacientes/${idPaciente}/paquetes/historial`,
      "GET",
      params
    );
  }
}
