export interface Meta {
  code: number;
  success: boolean;
  message: string;
  data: Array<Alerta[]>;
}

export interface Alerta {
  idAlerta: string;
  mensajeAlerta: string;
}
