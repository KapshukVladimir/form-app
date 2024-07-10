import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'convertAbstractControl',
  standalone: true,
})
export class AbstractControlPipe<T> implements PipeTransform {
  transform(formControl: T): FormControl {
    return formControl as unknown as FormControl;
  }
}
