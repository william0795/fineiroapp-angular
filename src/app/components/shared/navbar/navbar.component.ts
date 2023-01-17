import { Component, OnInit,EventEmitter,Output,  
  OnChanges, 
  SimpleChanges, 
  SimpleChange } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {
userauth:string;
sucursal:object=this.auth.getsucursal();
modulo:object=this.auth.getModulo();
disabeled=true;
disabeledM=true;
mostLogo:boolean=true;
data:object=this.auth.getrespuesta();
datasuc:any[]=[];
src="assets/images/phantom/perfil-usuario/imagenPerfil.png"

@Output() public showChat: EventEmitter<void> = new EventEmitter<void>();

  constructor(private auth:AuthService,private router:Router,private validadores:ValidadoresService) {
    this.userauth=this.data['data'].codigoUsuario;
    this.auth.getsucursaluser(this.data['data'].idToken,this.data['data'].secuenciaUsuario)
    .subscribe(resp =>{
      resp['data'].forEach(element => {
        this.datasuc.push(element);
      });
      console.log(resp['data']);

    });

    if(this.data['data'].fotoPerfil!=null){
      this.src=this.data['data'].fotoPerfil;
    }
    console.log(this.data);
    console.log(this.datasuc);

      if(this.sucursal['nombre']==null){
        console.log('no hay sucursal');
      }else{
        this.disabeled=false;
      }
      if(this.modulo['nombre']==null){
        console.log('no hay modulo');
      }else{
        this.disabeledM=false;
      }
  }
usuarioVerificate=true;
  ngOnInit() {
    console.log("userSucursal",this.userauth);
    this.usuarioVerificate=this.validadores.esEmailValido(this.userauth);
    console.log("Usuario Correo",this.usuarioVerificate);

  }

  ngOnChanges(changes: SimpleChanges) {    
    console.log('navBar - ngOnChanges',changes);    
  }

  mostlogo(){
    this.mostLogo=!this.mostLogo;
  }
  directModulos(){
    this.router.navigateByUrl('/home');
  }
  salir(){
    this.auth.logout('cabeceraPrincipal');
    this.router.navigateByUrl('/login');
  }

  ayuda(){    
    this.router.navigateByUrl('/ayuda');
  }


  perfilContrasena(){
    this.router.navigateByUrl('/modulo/seguridad/perfil-usuario/Cont');
  }
  verPefil(){
    this.router.navigateByUrl('/modulo/seguridad/perfil-usuario/init');
  }
  selectsuc(sucursal:string,codsuc,codempresa){
    localStorage.setItem('CodEmpresa',codempresa);
    this.auth.guardarsucursal(sucursal,codsuc,codempresa);
    this.router.navigateByUrl('/home');
    console.log(this.auth.getsucursal());
  }

}
