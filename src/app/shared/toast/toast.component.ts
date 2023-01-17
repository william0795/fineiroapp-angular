import { Component, OnInit,Input } from '@angular/core';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

    @Input() message: string;
    @Input() tiempo: number = 3000;
    @Input() codigo: number = 400;

    icono:any = 'success';

  constructor() { }

  ngOnInit(): void {
      this.showToast();
  }

  showToast(){
    if( this.codigo >= 200 && this.codigo < 300   ){
        this.icono = 'success';
      }
      if( this.codigo >= 400 && this.codigo < 500   ){
        this.icono = 'error';
      }
      if( this.codigo >= 500 && this.codigo < 600   ){
        this.icono = 'warning';
      }
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: this.tiempo,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: this.icono,
        title: this.message
      })
  }

}
