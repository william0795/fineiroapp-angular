import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { UsuarioFacialModel } from '../models/usuario.facial.model';
import { ValidadoresService } from 'src/app/services/validadores.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL_SEG = environment.urlSeg;
  URL_BASE = environment.apiUrl;
  URL_SEG_ORGANIZACION = environment.apiSeguridadOrganizacion;

  user: string;
  respuesta: object;
  private urlIdentityGC = environment.urlIdentityGC;
  private apiKeyIdentityGC = environment.apiKeyIdentityGC;
  refresh;
  datar:object;
  
  private urlph = `${this.URL_BASE}${this.URL_SEG}`;

  time=60;

  lenguaje="es";

  rutas:any[]=[
  ];
  datamodGen:any[]=[];
  modEscogido;

  private aplication = environment.aplication;

  userToken: string;
  suc: object;
  mod: object;
  datasuc: object;
  datamod: object;

  currentLanguage :string;

  keySecret:string = '';

  constructor(private http: HttpClient,private router:Router,private validar:ValidadoresService,private jwtHelper: JwtHelperService,private storage: StorageService) {
    this.leerToken();
  }
  logout(pagina) {
    console.log("Activo Logout",pagina);  
    this.elimData();
    this.router.navigateByUrl(`/login`);
  }
  elimData(){
    this.storage.remove('token');
  }

  refreshToken() {

  }


   b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode(parseInt(p1, 16))
    }))
}
b64DecodeUnicode(str) {
  return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
}
  loginP(usuario: UsuarioModel) {
    const url = `https://api.finerio.mx/api/login`;
    let data = {
      username:usuario.email,
      password:usuario.password
    }
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept-Language":"es-ES",
      "Authorization":"Bearer undefined"
    });
    return this.http.post(url, JSON.stringify(data), { headers })
      .pipe(map(resp => {
        localStorage.setItem('token', resp['access_token'])
        return resp;
      }));

  }
  getDataUser() {
    console.log('ejecuta me')
    let idtoken = localStorage.getItem('token')
    const url = `https://api.finerio.mx/api/me`;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept-Language":"es-ES",
      'Authorization': `Bearer ${idtoken}`
    });
    return this.http.get(url, { headers })
      .pipe(map(resp => {
        localStorage.setItem('dataUsuario', JSON.stringify(resp));
        return resp;
      }));
  }
  getMovimientos(data){
    let token = localStorage.getItem('token')
    let dataUser = JSON.parse(localStorage.getItem('dataUsuario'));
    console.log('dataUser', dataUser)
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept-Language":"es-ES",
      "Authorization": `Bearer ${token}`
    });
    return this.http.get(`https://api.finerio.mx/api/users/${dataUser['id']}/movements`, { headers: headers , params: data })
    .pipe(map(resp => {
      localStorage.setItem('token', resp['access_token'])
      return resp;
    }));
  }

  getrespuesta() {
    this.respuesta = JSON.parse(localStorage.getItem('data'));
    return this.respuesta;
  }
  getrespuestaTemp() {
    this.respuesta = JSON.parse(localStorage.getItem('dataTemp'));
    return this.respuesta;
  }

  getToken(){
    this.respuesta = JSON.parse(localStorage.getItem('data'));
    //console.log(  'tokennnnnnnnnnnnn', this.jwtHelper.decodeToken(this.respuesta['data'].idToken) )
    this.keySecret = this.jwtHelper.decodeToken(this.respuesta['data'].idToken).userSigningKey;
    return this.respuesta['data'].idToken;
  }
  saveusuario(userenv: string) {
    localStorage.setItem('user', userenv);
  }
  getusuario() {
    return localStorage.getItem('user');
  }
  verificarTiempoToken(){

  }
  num=0;
  contador(){
    this.num=this.num+1;
    console.log("contador",this.num);
    setTimeout( () => { this.contador()}, 60000 );
  }
  verificaContador(){
    console.log("Contador de Sesion",this.num);
  }
  guardarToken(idtoken: string) {
    if (idtoken == null) {
      localStorage.setItem('token', 'tokenaunnoconfirmado');
    } else {
      this.userToken = idtoken;
      localStorage.setItem('token', idtoken);
    }
      // setTimeout( () => { this.contador()}, 1000 );
    let hoy = new Date();
    let hoyr = new Date();

    hoy.setSeconds(3600);
    hoyr.setSeconds(2700);
    localStorage.setItem('expira', hoy.getTime().toString());
    localStorage.setItem('expiraReturnToken', hoyr.getTime().toString());
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }
  verificarToken(pagina){
    console.log('Pagina',pagina);
    
    console.log('Verificando Token');
    if(pagina=='contraseñaActualizar'){
      this.datar=this.getrespuestaTemp();
    }else{
      this.datar=this.getrespuesta();
    }
    const expira = Number(localStorage.getItem('expiraReturnToken'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if(this.datar==null){
     // this.router.navigateByUrl(`/select-empresa`);
    }
    if (expiraDate > new Date() || expira==null) {
      console.log('Aun no cumple tiempo');
    } else {
      console.log('Cumple tiempo');
      if(this.datar['data'].refreshToken!=null){
        this.refresh={
          "refreshToken":this.datar['data'].refreshToken
        }
      }      
     console.log("Enviar Refresh",this.refresh);
      return false;
    }
  }
  estaAutenticado(): boolean {
    // if (this.userToken.length < 2) {
    //   return false;
    // }
    let token = localStorage.getItem('token')
    // const expira = Number(localStorage.getItem('expira'));
    // const expiraDate = new Date();
    // expiraDate.setTime(expira);

    if (token) {
      return true;
    } else {
      return false;
    }
    // console.log("expiraDate",expiraDate);

    //return this.userToken.length > 2;
  }
}
