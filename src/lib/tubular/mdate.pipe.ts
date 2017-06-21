import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'mdate'})
export class MDatePipe implements PipeTransform {
  public transform(value: any, format?: string): any {
      if (moment.isMoment(value)) {
        return format ? value.format(format) : value.format();
      }

      return value;
  }
}
