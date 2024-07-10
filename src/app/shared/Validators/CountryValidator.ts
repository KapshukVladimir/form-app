import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Country } from '../enum/country';

export class CountryValidator {
  static validCountry(control: AbstractControl): ValidationErrors | null {
    const validCountries = Object.values(Country);
    if (control.value && !validCountries.includes(control.value)) {
      return { invalidCountry: true };
    }
    return null;
  }
}
