import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
// import { DomseguroPipe } from './pipes/domseguro.pipe';
import { DomseguroModule } from './pipes/domseguro.module'

//import { PlanificacionComponent } from './pages/planificacion/planificacion.component';
import { AutoRefreshComponent } from './components/auto-refresh/auto-refresh.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import {GoogleMapsModule} from '@angular/google-maps'; 

// import { ChatbotComponent } from './components/shared/chatbot/chatbot.component';

//Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { AgmCoreModule } from '@agm/core';
export function tokenGetter() {
    return (
      localStorage.getItem('data') != undefined &&
      JSON.parse(localStorage.getItem('data')).idToken != undefined
    ) ? JSON.parse(localStorage.getItem('data')).idToken : '';
  }


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BienvenidoComponent,
    LoadingComponent,
    // DomseguroPipe,
    //PlanificacionComponent,
    // ChatbotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DomseguroModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter
      }
    }),
    //GoogleMapsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot()
  ],
  providers: [
    { provide: Window, useValue: window },
    { provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi: true} 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
