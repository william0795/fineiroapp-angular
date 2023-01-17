import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { FacturacionService } from 'src/app/services/facturacion.service';
import { ModalCorreoPacienteComponent } from './components/modal-correo-paciente/modal-correo-paciente.component';

declare const wizardEventController: any;
declare var SERVICEPORT: any;  
declare var  LICENCEKEY: any;

declare const capture: any;

@Component({
  selector: 'app-wacom',
  templateUrl: './wacom.component.html',
  styleUrls: ['./wacom.component.scss']
})
export class WacomComponent implements OnInit {

    datosWacom:any = {};

    @Input() nombres:string;
    @Input() apellidos:string;
    @Input() datos:any;
    @Input() idPaciente:any;

    @Output() firmaResponse:EventEmitter<any> = new EventEmitter();
    @Output() mensajeSuccess:EventEmitter<any> = new EventEmitter();
    @Output() correoPacienteResp:EventEmitter<any> = new EventEmitter();

    codigoEmpresa:number;
    message: string;
    codigoRespuestaHttp: number = 400;
    muestraMensajeAlerta: boolean = false;
    processing:boolean;
    correoPaciente:string;


  constructor(private facturacionService: FacturacionService,
              private authServ : AuthService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.codigoEmpresa = this.authServ.suc['codigoempresa'];
    this.datosWacom.nombres = this.nombres ;
    this.datosWacom.appellidos = this.apellidos ;
    this.setParametrosWacom();
    console.log(this.datos);
  }


  ngOnDestroy(): void {
   
  }

  prueba(){
    this.muestraMensaje('hola', 200);
  }

  setParametrosWacom(){
    let params :any = {};
    params.codigoEmpresa = this.codigoEmpresa;
    this.processing = true;
    this.facturacionService.getParametrosWacom(params)
        .subscribe( (resp:any)=>{
            this.processing = false;
            SERVICEPORT = resp.data.puertoComunicacionWacom;
            LICENCEKEY = resp.data.licenciaSignatureSdkWacom;
            wizardEventController.body_onload();
            this.verificaFirmaPaciente();
        },error=>{
            this.processing = false;
            this.muestraMensaje(error.error.message, error.error.code);
        })
  }

  verificaFirmaPaciente(){
    let params :any = {};
    params.codigoEmpresa = this.codigoEmpresa;
    params.idPaciente = this.idPaciente;
    this.processing = true;
    this.facturacionService.getFirmaPaciente(params)
        .subscribe( (resp:any)=>{
            console.log('entraaaaaaaaaa');
            console.log( resp );
            let img = new Image();
            var objectURL = URL.createObjectURL(resp);
            img.src = objectURL;
            let imageBox = document.getElementById("imageBox");
            imageBox.appendChild(img);

            this.processing = false;
        },error=>{
            this.processing = false;
            this.muestraMensaje(error.error.message, error.error.code);
        })
  }



  capturarFirma(){
    capture(res=>{
        this.firmaResponse.emit(res);
        this.guardaFirmaPaciente(res);
    })
  }

  guardaFirmaPaciente(firma){
    let dataDocumento : any = {};
    dataDocumento.numeroTransaccion = this.datos.numeroTransaccion;

    let documento = firma;

    const contentType = 'image/png';
    let b64Data = firma.substring(22);


    const formData = new FormData();
    
    const blob = this.b64toBlob(b64Data, contentType);

    formData.append("dataDocumento", JSON.stringify(dataDocumento)  );
    formData.append("documento", blob , 'firma.png');


    this.processing = true;
    this.facturacionService.seteaFirmaPaciente(formData)
        .subscribe((resp:any)=>{
            console.log( resp.data )
            this.processing = false;
            this.mensajeSuccess.emit('¡Documento Firmado Exitosamente!');
            //this.muestraMensaje('¡Documento Firmado Exitosamente!', 200);
        },error=>{
            this.processing = false;
            this.muestraMensaje(error.error.message, error.error.code);
        })
  }


  muestraMensaje(msg, code) {
    this.message = msg;
    this.codigoRespuestaHttp = code;
    this.muestraMensajeAlerta = true;
    setTimeout(() => {
      this.muestraMensajeAlerta = false;
    }, 100);
  }


  abreModalCorreoPaciente(){
    const mdlCorreo = this.modalService.open(ModalCorreoPacienteComponent, { size: "md", backdrop: 'static', windowClass: '', centered:true });
    mdlCorreo.componentInstance.respuesta.subscribe((resp: any) =>{
        this.correoPaciente = resp;
        this.correoPacienteResp.emit({correo: resp, idPaciente: this.idPaciente });
    })
  }


   b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }


}
