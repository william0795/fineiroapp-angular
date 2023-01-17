import { Component, OnInit,EventEmitter } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
import * as moment from 'moment';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-homes',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private subscription: Subscription;
  

  showChat=false;

modulo:any;
datamodulo:object;
  constructor(private auth: AuthService,private activatedRoute: ActivatedRoute,
              private router:Router) {
                  console.log('tttttttttttttttttttttttttttt')
                this.datamodulo=JSON.parse(localStorage.getItem('moduloselect'));
                console.log("DataModuloSelecet",this.datamodulo['codigo']);

               }

  ngOnInit() {
    console.log('tttttttttttttttttttttttttttt')
    this.activatedRoute.params.subscribe(params => {
      this.modulo=params['modulo'];
      console.log(this.modulo);
    })
  }

  public handleShowChat():void  {    
    this.showChat=true;
    console.log("mostrarChat -> ", this.showChat)
  }

  handleClosedChat(closed:boolean):void{
    this.showChat=closed;
  }

  verificarToken(){
      this.auth.verificarToken('home');
      setTimeout( () => {
        this.verificarToken();
      }, 600000 );
  }
}
