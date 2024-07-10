import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayTimeConverter',
  standalone: true,
})
export class DisplayTimeConverterPipe implements PipeTransform {
  transform(time: number): string | number {
    if (time < 0) {
      return '';
    }
    return time < 10 ? `00:0${time}` : `00:${time}`;
  }
}
