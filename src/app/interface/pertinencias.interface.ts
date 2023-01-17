export interface Meta {
  code: number;
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  rows: Pertinencia[];
  totalRows: number;
}

export interface Pertinencia {
  codigoCliente: number;
  nombreCliente: string;
  codigoPrestacion: number;
  nombrePrestacion: string;
  codigoDiagnostico: number;
  diagnosticoCie: string;
  nombreDiagnostico: string;
  dxPermitido: boolean;
}
