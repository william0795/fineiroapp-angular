import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html',
  styleUrls: ['./validators.component.css']
})
export class ValidatorsComponent implements OnInit {
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

  ngOnInit() {
  }

  validarFormulario(objeto:object){
    let objetoValidar=this.usuariot;
    objetoValidar=objeto;
    console.log("objeto a Validar",objetoValidar);

    if(objetoValidar.primerNombre==null || objetoValidar.primerApellido==null || objetoValidar.segundoApellido==null || objetoValidar.fechaNacimiento==null || objetoValidar.codigoUsuario==null || objetoValidar.sexo==null || objetoValidar.telefonoCelular==null || objetoValidar.correoElectronico==null || objetoValidar.sucursales.length==0 || objetoValidar.roles.length==0 || objetoValidar.primerNombre=="" || objetoValidar.primerApellido=="" || objetoValidar.segundoApellido=="" || objetoValidar.fechaNacimiento=="" || objetoValidar.codigoUsuario=="" || objetoValidar.sexo=="" || objetoValidar.telefonoCelular=="" || objetoValidar.correoElectronico=="")
    {
      return false;
    }
    else{
      return true;
    }

  }

}
