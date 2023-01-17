import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {
  usuariot:any={
    primerNombre:null,
    segundoNombre:null,
    primerApellido:null,
    segundoApellido:null,
    fechaNacimiento:null,
    codigoUsuario:null,
    sexo:null,
    sucursal:[],
    rol:[],
    telefonoCelular:null,
    correoElectronico:null
  }

  constructor() { }
  esEmailValido(email: string):boolean {
    let mailValido = false;
      'use strict';
      var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (email.match(EMAIL_REGEX)){
        mailValido = true;
      }
    return mailValido;
  }
  validarCodigoRol(email: string){
    let caracteres=this.tieneCaracteres(email);
    let espacios=this.ValidarEspacios(email);
    console.log("Tiene Espacios",espacios);
    console.log("Tiene Caracteres",caracteres);

    if(caracteres || espacios){
      return true;
    }else{
      return false;
    }
  }
  codificarUrl(url){
    let codurl=encodeURIComponent(url);
    let urlCod=decodeURIComponent(codurl);
    let urlCodF=decodeURI(urlCod);
    return urlCod;
  }
  tieneCaracteres(cadena:string){
    let cadenaValido = false;
    let letras="*-+/=?¿'¡[]{}.,:;|!@#~$%&¬()'<>´´ç\|¨``^";

    for(let i=0; i<cadena.length; i++){
      if (letras.indexOf(cadena.charAt(i),0)!=-1){
         cadenaValido=true;
      }
   }
    return cadenaValido;
  }
  tieneAllCaracteres(cadena:string){
    let cadenaValido = false;
    let letras="*-+/=?¿'¡[]{}.,:;|!@#~$%&¬()'_´´ç\|<>¨``^";

    for(let i=0; i<cadena.length; i++){
      if (letras.indexOf(cadena.charAt(i),0)!=-1){
         cadenaValido=true;
      }
   }
    return cadenaValido;
  }
  tienePorcentaje(cadena:string){
    let cadenaValido = false;
    let letras="%";

    for(let i=0; i<cadena.length; i++){
      if (letras.indexOf(cadena.charAt(i),0)!=-1){
         cadenaValido=true;
      }
   }
    return cadenaValido;
  }
  validarFormulario(objeto:object){
    let objetoValidar=this.usuariot;
    objetoValidar=objeto;
    console.log("objeto a Validar",objetoValidar);
    if(objetoValidar.primerNombre==null || objetoValidar.primerApellido==null || objetoValidar.fechaNacimiento==null || objetoValidar.codigoUsuario==null || objetoValidar.sexo==null || objetoValidar.telefonoCelular==null || objetoValidar.correoElectronico==null || objetoValidar.sucursales.length==0 || objetoValidar.roles.length==0 || objetoValidar.primerNombre=="" || objetoValidar.primerApellido=="" || objetoValidar.fechaNacimiento=="" || objetoValidar.codigoUsuario=="" || objetoValidar.sexo=="" || objetoValidar.telefonoCelular=="" || objetoValidar.correoElectronico=="")
    {
      return false;
    }
    else{
      return true;
    }
  }

  validarContraseña(contraseña: string):boolean {
    console.log("telefono Validar2",contraseña);
    let contraseñaValido = false;
      'use strict';
      var espacios = false;
      var cont = 0;
      while (!espacios && (cont < contraseña.length)) {
        if (contraseña.charAt(cont) == " ")
          espacios = true;
        cont++;
      }

      if (espacios) {  return false; }

      if(contraseña.length<8){ return false; }

      if(this.tieneNumeros(contraseña) && this.tieneMayuscula(contraseña) && this.tieneMinuscula(contraseña) && this.tieneAllCaracteres(contraseña)){
         contraseñaValido = true;
      }

      return contraseñaValido;
  }
  ValidarEspacios(cadena: string){
      console.log("Validar Cadena",cadena);
      var noValido = / /;
      if(noValido.test(cadena)){
          return true;
      }
      else{
          return false;
      }
  }
  ContarEspacios(cadena: string){
    let textoRoto = cadena.toLowerCase().split("");
    let cont=0;
    let noValido = / /;
      console.log("Validar Cadena",cadena);
      for(let k=0;k < textoRoto.length;k++){
        if(noValido.test(textoRoto[k])){
            cont++;
        }
      }
      return cont;
  }
  validarDatos(cadena: string){
    let espacios=this.ContarEspacios(cadena);
    let numeros=this.tieneNumeros(cadena);
    let caracteres=this.tieneCaracteres(cadena);

    if(espacios<=2 && numeros==false && caracteres==false){
      return true;
    }else{
      return false;
    }

  }
  tieneMayuscula(cadena:string){
    let cadenaValido = false;
    let letras="ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

    for(let i=0; i<cadena.length; i++){
      if (letras.indexOf(cadena.charAt(i),0)!=-1){
         cadenaValido=true;
      }
   }
    return cadenaValido;
  }

  tieneMinuscula(cadena:string){
    let cadenaValido = false;
    let letras="abcdefghijklmnñopqrstuvwxyz";

    for(let i=0; i<cadena.length; i++){
      if (letras.indexOf(cadena.charAt(i),0)!=-1){
         cadenaValido=true;
      }
   }
    return cadenaValido;
  }
  tamanoContrasena(cadena:string){
    if(cadena.length<8){
      return false;
    }else{
      return true;
    }
  }
  tieneNumeros(cadena:string){
    let cadenaValido = false;
    let numeros="0123456789";

    for(let i=0; i<cadena.length; i++){
      if (numeros.indexOf(cadena.charAt(i),0)!=-1){
         cadenaValido=true;
      }
   }
    return cadenaValido;
  }
  validarNumeroTelefono(telefono: string,longitud):boolean {
    console.log("telefono Validar2",telefono);

    let telefonoValido = false;
      'use strict';
      var EMAIL_REGEX = /^[0-9]\d{6,10}$/;
      if (telefono.match(EMAIL_REGEX)){
        telefonoValido = true;
      }
      if(telefono.length!=longitud){
        telefonoValido = false;
      }
    return telefonoValido;
  }
  validarIdentificacion(identificacion: string, tipoIdentificacion):boolean {
    console.log("identificacion Validar",identificacion);
    console.log("tipoIdentificacion",tipoIdentificacion);

    let identificacionValido = false;
      'use strict';
      
      if(tipoIdentificacion==2){
        var EMAIL_REGEX = /^[0-9]\d{9,9}$/;
        if (identificacion.match(EMAIL_REGEX)){
          identificacionValido = true;
        }
        console.log('entraCedula');
        
        // if(identificacion.length!=10){
        //   telefonoValido = false;
        // }
      }else{
        
        if(tipoIdentificacion==3){
          identificacionValido = true;
        }else{
          var EMAIL_REGEX = /^[0-9]\d{1,14}$/;
          if (identificacion.match(EMAIL_REGEX)){
            identificacionValido = true;
          }
        }
        // if(identificacion.length!=10){
        //   telefonoValido = false;
        // }
      }

    return identificacionValido;
  }
  validarIngresoTexto(cadena: string):boolean {
    console.log("cadena Validar",cadena);
    let cadenaValido = false;
      'use strict';
      var EMAIL_REGEX = /^[a-zA-Z]{2,254}$/;
      if (cadena.match(EMAIL_REGEX)){
        cadenaValido = true;
      }
    return cadenaValido;
  }
}
