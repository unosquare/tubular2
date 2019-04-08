import { Pipe, PipeTransform } from '@angular/core';
import { isValid } from 'date-fns';

@Pipe({ name: 'mdate' })
export class MDatePipe implements PipeTransform {
  public transform(value: any, format?: string): any {
    if (isValid(new Date(value))) {
      return format ? value.format(format) : value.format();
    }

    return value;
  }
}
