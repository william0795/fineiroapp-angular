import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbarsec',
  templateUrl: './navbarsec.component.html',
  styleUrls: ['./navbarsec.component.css']
})
export class NavbarsecComponent implements OnInit {
datamodulo:any={
  'nombre':null
}


codsuc;
bodynav:boolean=false;
navbarfostrap:boolean=false;
data:object;
datamenu:any[]=[];
datamod:any[]=[];
dataemp:object=this.auth.getsucursal();
validMenu=false;
selectmodu:object;
modselctl:string;
  constructor(private auth:AuthService,private router:Router) {
    this.datamodulo=JSON.parse(localStorage.getItem('moduloselect'));
        if(this.dataemp['codigo']!=null){
    this.codsuc=this.dataemp['codigo'];
    this.data=this.auth.getrespuesta();

    console.log("this.dataemp['codigo'];",this.dataemp['codigo'])
    console.log("this.auth.getrespuesta()",this.auth.getrespuesta())

    //if(this.codsuc!=null && this.codsuc!=undefined && this.datamodulo['codigo']!=null && this.datamodulo['codigo']!=undefined){
    if (this.dataemp){
    if(this.codsuc!=null && this.codsuc!=undefined && this.datamodulo['codigo']!=null && this.datamodulo['codigo']!=undefined ){
      this.validMenu=true
    }


    this.auth.getmenumodulo(this.data['data'].idToken,this.data['data'].secuenciaUsuario,this.datamodulo['codigo'],this.codsuc)
    .subscribe(resp =>{
      resp['data'].forEach(element => {
        this.datamenu.push(element);
      });
      console.log("MenuSecundario",resp['data']);

    });

      this.auth.getmodulouser(this.data['data'].idToken,this.data['data'].secuenciaUsuario,this.codsuc)
      .subscribe(resp =>{
        resp['data'].forEach(element => {
          this.datamod.push(element);
        });
        console.log("Modulos",resp['data']);
        console.log(this.datamod);

      },(err) =>{
        console.log(err.error);
      });
    }

  }
  }

  ngOnInit() {
  }
  redirect(nombreModulo,codigoModulo){
    console.log("NombreModulo",nombreModulo);
    console.log("codigoModulo",codigoModulo);
    this.router.navigateByUrl(`home-principal/${nombreModulo}`);
    this.selectmodu={
      nombre:nombreModulo,
      codigo:codigoModulo
    };
    this.modselctl=JSON.stringify(this.selectmodu);
    localStorage.setItem('moduloselect',this.modselctl);
    setTimeout(()=>{
      window.location.reload();
    },1000);

  }
  mostrarmenu(){
        this.bodynav= !this.bodynav;
        this.navbarfostrap= !this.navbarfostrap;
  }
}
