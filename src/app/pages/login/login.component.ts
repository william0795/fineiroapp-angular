import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { SeguridadService } from 'src/app/services/seguridad.service';
import Swal from 'sweetalert2';
import { Router,ActivatedRoute } from '@angular/router';
//import { urlR } from '../../../environments/environment.prod';
import { /*urlRD,*/ environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
usuario: UsuarioModel;
recordarme=false;
next=false;
dis=true;
disc=true;
errorlog=false;
userph:any;
data:any;
error:any;
erroru=false;
erroruVU=false;
activapopup=false;
typeInputF="password";
showPF:boolean=true;
popupResetCont=false;
errorTitle="Login Usuario";
logeado;
urlApiOrganizacion;
urlfondo='';
  constructor(private auth: AuthService,private segService: SeguridadService,
              private activatedRoute: ActivatedRoute,
              private router:Router) {


               }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    console.log(localStorage.getItem('email'));
    
    setTimeout( () => {
      console.log("espera Retorno");
      let content:any=document.getElementById('email');
      content.focus();
    }, 1000 );

  }
registrReco:boolean;
registros:boolean=true;
unuarioName;
sexoUser;

  mostrarPassword(){

    if(this.typeInputF=="text"){
      this.showPF=true;
      this.typeInputF="password";
    }else{
      this.showPF=false;
      this.typeInputF="text";
    }
  }
  activab(variable:any){
    if(variable!=undefined){
      if(variable.lenght===0 || variable==""){
        this.dis=true;
      }else{
        this.dis=false;
      }
    }
  }
  activabl(variablec:any){
    if(variablec!=undefined){
      if(variablec.lenght===0 || variablec==""){
        this.disc=true;
      }else{
        this.disc=false;
      }
    }
    
  }

  cerrarerror(){
    this.erroru=false;
    // let content:any=document.getElementById('password');
    // content.focus();
  }
  activeCont=false;
  onSubmit(form:NgForm){
    console.log(form);
    if(form.invalid){return;}
    if(this.usuario.password.length<6){
      this.errorlog=true;
    }else{
      this.errorlog=false;
    }


    if(this.usuario.email !=null && this.usuario.password!=null &&this.usuario.email !="" && this.usuario.password!="" && this.errorlog==false){
      this.activapopup=true;
      // console.log("Usuario Autenticación",this.usuario);
      
      this.auth.loginP(this.usuario)
      .subscribe(resp =>{
        this.activapopup=false;
        this.getDataUusuario();
        console.log(resp);
      },(err) =>{
        console.log(err.error);
        this.errorlog=true;
        this.erroru=true;
        this.error='Acceso no autorizado';
        console.log(this.errorlog);
        Swal.close();
        this.activapopup=false;
        setTimeout( () => {
          let content:any=document.getElementById('errorbtn');
          content.focus();
        }, 500 );


      });
    }

  }
  getDataUusuario(){
    this.auth.getDataUser()
      .subscribe(resp =>{
        this.router.navigateByUrl('/movimientos');
        console.log(resp);
      },(err) =>{
        console.log(err.error);
        this.errorlog=true;
        this.erroru=true;
        this.error='Acceso no autorizado';
        console.log(this.errorlog);
        Swal.close();
        this.activapopup=false;
        setTimeout( () => {
          let content:any=document.getElementById('errorbtn');
          content.focus();
        }, 500 );


      });
  }
}
