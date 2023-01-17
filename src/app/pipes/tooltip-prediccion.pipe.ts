import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tooltipPrediccion'
})
export class TooltipPrediccionPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
      
    let title = '';
       if( value.cantidadAtenciones == 0 && value.agregar == 0 && value.reducir == 0  ){
        return null;
       }else{
           return `Para cubrir ${value.cantidadAtenciones} Atenciones <br> Agregar: ${value.agregar} Atenciones <br> Reducir: ${value.reducir} Atenciones`;
       }
     
    
  }

}
