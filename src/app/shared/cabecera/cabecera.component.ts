import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ValidadoresService } from 'src/app/services/validadores.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {


  constructor(private auth:AuthService,private router:Router,private validadores:ValidadoresService , private commonSer:CommonService) {

   }
  ngOnInit() {

  }
  salir(){
    this.auth.logout('Cabecera Modulos');
    this.router.navigateByUrl(`/login`);
  }

}
