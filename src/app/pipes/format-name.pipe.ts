import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatName',
  standalone: true
})
export class FormatNamePipe implements PipeTransform {

  transform(value: String): String {
    let newValue = value.charAt(0).toLocaleUpperCase()+value.slice(1)
    return newValue;
  }

}
