import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'values'
})
export class ValuesPipe implements PipeTransform {

  transform(value: any, arg1?: string, arg2?: string): any {
    if (!value) {
      return [];
    }

    let keyArr: any[] = Object.keys(value),
      dataArr = [],
      keyName = (arg1) ? arg1 : 'name';

    keyArr.forEach((key: any) => {
      value[key][keyName] = key;
      dataArr.push(value[key])
    });

    if (arg2) {
      dataArr.sort((a: Object, b: Object): number => {
        return a[keyName] > b[keyName] ? 1 : -1;
      });
    }

    return dataArr;
  }
}
