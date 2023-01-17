import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includeDay'
})
export class IncludeDayPipe implements PipeTransform {

  transform(value: unknown, dias: unknown[]): unknown {
    return dias.includes(value);
  }

}
