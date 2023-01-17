export interface Meta {
  code: number;
  success: boolean;
  message: string;
  data: institucionesBancarias[];
}

export interface institucionesBancarias {
  codigoInstitucion: number;
  codigoTipoIdentificacion: number;
  numeroIdentificacion: string;
  nombreInstitucion: string;
  nombreComercial: string;
  direccionPrincipal: string;
}
