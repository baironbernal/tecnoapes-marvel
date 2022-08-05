import { Pipe, PipeTransform } from '@angular/core';
import { Comic } from '../models/comic.model';

@Pipe({
  name: 'orderIncome'
})
export class OrderIncomePipe implements PipeTransform {

  transform(items: any): Comic {
    return items.slice().sort( (a, b) => {
        if (a.type === 'income') {
          return -1;
        }
        else {
          return 1;
        }
    });
  }

}
