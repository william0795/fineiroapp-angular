let dataO;
let dataOP = {
  baseUrlApi: "",
  idOganizacion: "",
  urlModAgendamiento: "",
  urlModApoyosDx: "",
  urlModComercial: "",
  urlModGeneral: "",
  urlModPlanificacion: "",
  urlModSeguridad: "",
  urlModSyncConvenios: "",
  urlModFacturacion: "",
  urlModReportes: "",
  urlModPaperless: ''
};

export const environment = {
  valid: urlRD(),
  // Desarrollo y Test
  apiSeguridadOrganizacion:
    "https://4ow8obkqmj.execute-api.us-east-1.amazonaws.com/desa/seguridad/",
  // Produccion
  // apiSeguridadOrganizacion: 'https://seguridad.phantomx.com.ec/seguridad/', 
  aplication: 'UEhBTlRPTVhfV0VC',
  apiKeyCaptcha: '6LeOZ8EZAAAAAEp65YPgMIE5ftn-2Pwl4utQ-dms',
  urlIdentityGC: 'https://identitytoolkit.googleapis.com/v1/accounts',
  apiKeyIdentityGC: 'AIzaSyDwKLb6fMeTwmGZc01p6iwHh2LmHhSe2O8',
  apiUrl : dataOP.baseUrlApi,
  urlSeg:  dataOP.urlModSeguridad,
  urlPla:  dataOP.urlModPlanificacion,
  urlAge: dataOP.urlModAgendamiento,
  urlGeneral: dataOP.urlModGeneral,
  urlComercial: dataOP.urlModComercial,
  urlApoyo: dataOP.urlModApoyosDx,
  urlSync: dataOP.urlModSyncConvenios,
  urlFac: dataOP.urlModFacturacion,
  urlRepo: dataOP.urlModReportes,
  urlPaper: dataOP.urlModPaperless,
  idOrganizacion: dataOP.idOganizacion,
  allModalidades: true,
  production: false,
};

export function urlRD() {
  console.log("validaData desde enviroment.ts");
  dataO = localStorage.getItem("dataPOrg");
  if (dataO == null) {
    console.log("No hay data Organizacion");
    dataOP.baseUrlApi = 'https://api-phantomx.veris.com.ec/';
     /*Desarrollo*/
    // dataOP.idOganizacion = '65509c8-9596-4506-a5b3-487782d5876e';
    /*Produccion*/
    dataOP.idOganizacion = '365509c8-9596-4506-a5b3-487782d5876e';
    dataOP.urlModAgendamiento = 'agendamiento';
    dataOP.urlModApoyosDx = 'apoyosdx';
    dataOP.urlModComercial = 'comercial';
    dataOP.urlModGeneral = 'general';
    dataOP.urlModPlanificacion = 'planificacion';
    dataOP.urlModSeguridad = 'seguridad';
    dataOP.urlModSyncConvenios = 'sync-convenios';
    dataOP.urlModFacturacion = 'facturacion';
  } else {
    console.log("Si hay data Organizacion");
    let dataOrgP = JSON.parse(localStorage.getItem("dataPOrg"));
    //console.log(dataOrgP)
    dataOP.baseUrlApi = `${dataOrgP.baseUrlApi}/`;
    dataOP.idOganizacion = dataOrgP.idOganizacion;
    dataOP.urlModAgendamiento =
      dataOrgP.recursosApi != null && dataOrgP.recursosApi != undefined
        ? dataOrgP.recursosApi.urlModAgendamiento
        : "";
    dataOP.urlModApoyosDx =
      dataOrgP.recursosApi != null && dataOrgP.recursosApi != undefined
        ? dataOrgP.recursosApi.urlModApoyosDx
        : "";
    dataOP.urlModComercial =
      dataOrgP.recursosApi != null && dataOrgP.recursosApi != undefined
        ? dataOrgP.recursosApi.urlModComercial
        : "";
    dataOP.urlModGeneral =
      dataOrgP.recursosApi != null && dataOrgP.recursosApi != undefined
        ? dataOrgP.recursosApi.urlModGeneral
        : "";
    dataOP.urlModPlanificacion =
      dataOrgP.recursosApi != null && dataOrgP.recursosApi != undefined
        ? dataOrgP.recursosApi.urlModPlanificacion
        : "";
    dataOP.urlModSeguridad =
      dataOrgP.recursosApi != null && dataOrgP.recursosApi != undefined
        ? dataOrgP.recursosApi.urlModSeguridad
        : "";
    dataOP.urlModSyncConvenios =
      dataOrgP.recursosApi != null && dataOrgP.recursosApi != undefined
        ? dataOrgP.recursosApi.urlModSyncConvenios
        : "";
    dataOP.urlModFacturacion =
      dataOrgP.recursosApi != null && dataOrgP.recursosApi != undefined
        ? dataOrgP.recursosApi.urlModFacturacion
        : "";

    dataOP.urlModReportes =
      dataOrgP.recursosApi != null && dataOrgP.recursosApi != undefined
        ? dataOrgP.recursosApi.urlModReportes
        : "";

    dataOP.urlModPaperless =
        dataOrgP.recursosApi != null && dataOrgP.recursosApi != undefined
        ? dataOrgP.recursosApi.urlModPaperless
        : "";
  }
}
