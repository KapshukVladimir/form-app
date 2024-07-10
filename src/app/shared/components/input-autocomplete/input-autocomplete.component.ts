import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { COUNTRIES } from '../../constants/default-values';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-input-autocomplete',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatAutocomplete,
    MatOption,
    AsyncPipe,
    MatAutocompleteTrigger,
    MatFormFieldModule,
  ],
  templateUrl: './input-autocomplete.component.html',
})
export class InputAutocompleteComponent implements OnInit {
  @Input() formControl: FormControl = new FormControl<string>('');
  @Input() disabled!: boolean;

  public countries: string[] = COUNTRIES;
  public filteredCountries!: Observable<string[]>;

  constructor(private destroyRef$: DestroyRef) {}

  public ngOnInit(): void {
    this.filteredCountries = this.formControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterValue(value)),
      takeUntilDestroyed(this.destroyRef$),
    );
  }

  private filterValue(value: string): string[] {
    const filterValue = value?.toLowerCase();

    return this.countries.filter((country) =>
      country.toLowerCase().includes(filterValue),
    );
  }
}
