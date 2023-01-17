import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from '../environments/environment';
import { mergeMap, map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  ID_APPLICATION = environment.aplication;

  constructor(private auth:AuthService,private router:Router) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log ("solicitud interceptada correctamente!"); 
    // let data = JSON.parse(localStorage.getItem('data'));

    // let refreshToken = data['data'].refreshToken;
    // console.log('data',data);
    
    // console.log('refreshToken',refreshToken);


    let esperaRespuesta=false;
    return next.handle(request).pipe(catchError(err => {
      
      console.log(err.error);
      if (err.error.code === 401) {
        console.log('Refresh Token');
          if (err.error.message == "Token no valido.") {
            console.log('Refresh Token');
            // let refresh={
            //   "refreshToken":refreshToken
            // }

            // this.auth.getTokenRefresh(refresh)
            // .subscribe(async respt =>{
            //   // this.datar['data'].refreshToken=respt['data'].refreshToken;
               
            //   data['data'].idToken=respt['data'].idToken;
            //   data['data'].accessToken=respt['data'].accessToken;

            //   this.auth.guardarToken(respt['data'].idToken);
            //   this.auth.guardarRespuesta(data);
            //   console.log(respt);
            //   console.log("Datos Refrescar",data);
            //   console.log("Id token Refrescar",respt['data'].idToken);
            //   esperaRespuesta=true;
            //   request = request.clone({ 
            //   setHeaders: { 
            //     'Application': this.ID_APPLICATION,
            //     'Authorization': `Bearer ${respt['data'].idToken}` 
            //   } 
            //   });  
            //   setTimeout(() => {
            //     console.log('Ejecuta Peticion nueva');
                
            //     return next.handle(request);
            //   }, 2000); 
            //   // this.router.navigate(['/seguridad/gestion-usuarios']);
            // },(err) =>{
            //   // this.router.navigateByUrl(`/select-empresa`);
            //   // this.error=err.error['message'];
            //   // this.erroru=true;
            //   console.log(err.error);
            // });
            
              //TODO: Token refreshing
          }else {
              //Logout from account or do some other stuff
          }
      }
      
        return next.handle(request);
      // return next.handle(request);
    }));
  }
}
