import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'troncature',
  standalone: true
})
// export class TroncaturePipe implements PipeTransform {

//   transform(value: unknown, ...args: unknown[]): unknown {
//     return null;
//   }

// }
export class TroncaturePipe implements PipeTransform {
  transform(value: string, limit: number = 20): string {
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
