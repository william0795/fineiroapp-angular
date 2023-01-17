import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit {

    page:number = 1;
    totalPaginas:number;

    pageSuscription:Subscription;

    
    @Input() totalDatos: number;
    @Input() datosPorpagina: number;

    @Input() maxSize: number = 5;

    //@Input() page: number = 1;

    @Output() paginaSeleccionada:EventEmitter<number>;

  constructor(private commonSer:CommonService ) { 
    this.paginaSeleccionada = new EventEmitter();
  }

  ngOnInit(): void {
    this.pageSuscription = this.commonSer.pageActual.subscribe( page =>{
         console.log('pageeeeeeeee', page )
         this.page = page;
     })
  }

  ngOnDestroy() {
      if( this.pageSuscription  ){
        this.pageSuscription.unsubscribe();
      }
  }

  onPageChange(page){
      this.paginaSeleccionada.emit(page);
  }

}
