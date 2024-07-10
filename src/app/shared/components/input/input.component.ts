import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractControlPipe } from '../../pipes/abstract-control.pipe';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatFormFieldModule,
    ReactiveFormsModule,
    AbstractControlPipe,
  ],
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() formControl!: FormControl;
  @Input() labelName = '';
  @Input() errorMessage = '';
  @Input() disabled!: boolean;
}
