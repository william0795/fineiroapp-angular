import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomseguroPipe } from './domseguro.pipe';
import { DomseguroRoutingModule } from './domseguro-routing.module';
import { IncludeDayPipe } from './include-day.pipe';
import { TooltipPrediccionPipe } from './tooltip-prediccion.pipe';
import { TrimPipe } from './trim.pipe';
import { InputNumerosValidacionesPipe } from './input-numeros-validaciones.pipe';


@NgModule({
  declarations: [
    DomseguroPipe,
    IncludeDayPipe,
    TooltipPrediccionPipe,
    TrimPipe,
    InputNumerosValidacionesPipe
  ],
  exports: [
    DomseguroPipe,
    IncludeDayPipe,
    TooltipPrediccionPipe
  ],
  imports: [
    CommonModule,
    DomseguroRoutingModule
  ]
})
export class DomseguroModule { }
