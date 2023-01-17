import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-correo-paciente',
  templateUrl: './modal-correo-paciente.component.html',
  styleUrls: ['./modal-correo-paciente.component.scss']
})
export class ModalCorreoPacienteComponent implements OnInit {

    correo:string = '';
    @Output() respuesta: EventEmitter<any> = new EventEmitter();

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  aceptarModal(){
    this.respuesta.emit(this.correo);
    this.closeModal();
  }

  stringTrim(){
      //this.correo = this.correo.trimStart();
  }

}
