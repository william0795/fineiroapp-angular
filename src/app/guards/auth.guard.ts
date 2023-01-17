import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  url;
  constructor(private auth:AuthService,
              private router:Router){
                this.url=localStorage.getItem('dataOrg');

  }

  canActivate():boolean {
    // this.auth.verificarToken('autguard');
    if(this.auth.estaAutenticado()){
      return true;
    } else{
      if(this.url!=null){
        this.router.navigateByUrl(`/login/${JSON.parse(localStorage.getItem('dataOrg')).identificadorLoginUrl}`);        
      }else{
        this.router.navigateByUrl('/login/veris');
      }
      
      return false;
    }
  }



}
