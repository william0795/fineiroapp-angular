import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputNumerosValidaciones'
})
export class InputNumerosValidacionesPipe implements PipeTransform {

  transform(value: number): number {
    console.log(value);
    if(value < 0) {
      value = 0;
      return value;
    }
    return value
  }

}
