import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { DatePickerComponent } from '../../../../shared/components/date-picker/date-picker.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AbstractControlPipe } from '../../../../shared/pipes/abstract-control.pipe';
import { InputAutocompleteComponent } from '../../../../shared/components/input-autocomplete/input-autocomplete.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-multi-form-item',
  standalone: true,
  imports: [
    InputComponent,
    DatePickerComponent,
    ReactiveFormsModule,
    AbstractControlPipe,
    InputAutocompleteComponent,
    MatIcon,
  ],
  templateUrl: './multi-form-item.component.html',
  styleUrl: './multi-form-item.component.scss',
})
export class MultiFormItemComponent {
  @Input() formGroupItem!: FormGroup;
  @Input() labelName = '';
  @Input() isDeleteDisable = false;
  @Input() isCardDisabled = false;
  @Output() deleteItem = new EventEmitter<void>();
}
