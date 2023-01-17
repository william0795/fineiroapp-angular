import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if (!value) {
        return '';
      }
      return value.trim();
  }

}
