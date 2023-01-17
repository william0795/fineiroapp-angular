import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cacebera-secundaria',
  templateUrl: './cacebera-secundaria.component.html',
  styleUrls: ['./cacebera-secundaria.component.css']
})
export class CaceberaSecundariaComponent implements OnInit {

    menu:any = [];

  constructor() { }

  ngOnInit(): void {
      this.menu.ruta1 = 'gestion-rol';
      this.menu.ruta1 = 'gestion-usuarios';
  }

}
