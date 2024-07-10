import { TFormItemLabel } from '../types/form-item.type';
import { FormControl } from '@angular/forms';

export interface IFormItem {
  country: FormControl<TFormItemLabel | null | string>;
  userName: FormControl<string | null>;
  birthDate: FormControl<Date | null>;
}
