import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

import { AuthService } from "src/app/services/auth.service";
import { Component, OnInit, EventEmitter } from "@angular/core";
import { Subscription, Observable, timer } from "rxjs";
import * as moment from "moment";

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-bienvenido",
  templateUrl: "./bienvenido.component.html",
  styleUrls: ["./bienvenido.component.css"],
})
export class BienvenidoComponent implements OnInit {
  public activeLang = 'es';

  private subscription: Subscription;
  TimerExpired: EventEmitter<any> = new EventEmitter<any>();
  SearchDate: moment.Moment = moment();
  ElapsTime: number = 30;
  Reset: boolean = false;
  searchEndDate: moment.Moment;
  remainingTime: number;
  minutes: number;
  seconds: number;
  everySecond: Observable<number> = timer(0, 1000);
  refreshPage = false;
  aceptRefresh = false;

  showChat = false;

  usuario: string = localStorage.getItem("userName");
  sexo = localStorage.getItem("sexoUser");
  constructor(
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang(this.activeLang);
    this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");
    // this.verificarToken();

  }

  ngOnInit() {
    this.getMovimientos();
  }
dataMovimientos=[];
dataParams = {
  deep: true,
  offset: 0,
  max: 20,
  includeCharges: true,
  includeDeposits: true,
  includeDuplicates: true
}
valmax = 10;
  getMovimientos(){
    this.auth.getMovimientos(this.dataParams)
      .subscribe(resp =>{
        
        console.log('dataMovimientos', resp['data']);
        this.dataMovimientos=resp['data'];
      },(err) =>{
        console.log(err.error);
       // this.activapopup=false;


      });
  }
  PageChange(event){
    console.log('event', event)
    this.valmax=Number(event)*10;
  }
}
