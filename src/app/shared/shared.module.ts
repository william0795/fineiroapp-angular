import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { CaceberaSecundariaComponent } from './cacebera-secundaria/cacebera-secundaria.component';
import { PaginadorComponent } from './paginador/paginador.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { DomseguroModule } from '../pipes/domseguro.module'
import { NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './loading/loading.component';
import { WebcamComponent } from './web-cam/web-cam.component';
import { HomeComponent } from './home/home.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ChatbotComponent } from './chatbot/chatbot.component';
import { ChatBotService } from './chatbot/chatbot.service';
import { ChatBotDirective } from './chatbot/chatbot.directive';
import { MessageRequestText } from './chatbot/chatbot-message-request-text.component';
import { MessageResponseCard } from './chatbot/chatbot-message-response-card.component';
import {  MessageResponseText } from './chatbot/chatbot-message-response-text.component';
import {  MessageResponseError } from './chatbot/chatbot-message-response-error.component';
import { ToastComponent } from './toast/toast.component';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TagInputModule } from 'ngx-chips';

import { WacomComponent } from './wacom/wacom.component';
import { ModalCorreoPacienteComponent } from './wacom/components/modal-correo-paciente/modal-correo-paciente.component';

@NgModule({
  declarations: [
    CabeceraComponent, 
    CaceberaSecundariaComponent, 
    PaginadorComponent, 
    ChecklistComponent, 
    LoadingComponent, 
    WebcamComponent, 
    HomeComponent, 
    ToastComponent,
    
    ChatbotComponent,
    ChatBotDirective,
    MessageRequestText,
    MessageResponseCard,
    MessageResponseText,
    MessageResponseError,
    ToastComponent,
    GoogleMapsComponent,
    WacomComponent,
    ModalCorreoPacienteComponent],
  imports: [
    CommonModule,
    DomseguroModule,
    NgbPaginationModule,    
    NgbModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => {
            return new TranslateHttpLoader(http);
          },
          deps: [HttpClient]
        }
      }),
  ],
  providers: [ChatBotService],
  entryComponents:[
    CabeceraComponent,
    PaginadorComponent,
    CaceberaSecundariaComponent,
    ChecklistComponent,
    LoadingComponent,
    WebcamComponent,
    HomeComponent,
    ToastComponent,
    GoogleMapsComponent ,
    
    ChatbotComponent,
    MessageRequestText,
    MessageResponseCard,
    MessageResponseText,
    MessageResponseError,
    WacomComponent
  ],
  exports:[
    CabeceraComponent,
    PaginadorComponent,
    CaceberaSecundariaComponent,
    ChecklistComponent,
    LoadingComponent,
    ToastComponent,
    WebcamComponent,
    HomeComponent,
    ChatbotComponent,
    GoogleMapsComponent,
    WacomComponent
  ]
})
export class SharedModule { }
