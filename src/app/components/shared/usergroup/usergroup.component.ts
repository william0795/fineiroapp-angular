import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.css']
})
export class UsergroupComponent implements OnInit {
data:object;
dataemp:object;
datagroup:any[]=[];
  constructor(private auth:AuthService) {
      this.data=this.auth.getrespuesta();
      this.dataemp=this.auth.getsucursal();
      this.auth.getgrupouser(this.data['data'].idToken,this.dataemp['codigoempresa'])
      .subscribe(resp =>{
        resp['data'].forEach(element => {
          this.datagroup.push(element);
        });
        console.log(resp['data']);

      });
  }

  ngOnInit() {
  }

}
