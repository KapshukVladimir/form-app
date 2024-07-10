import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MultiFormItemComponent } from '../multi-form-item/multi-form-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { NgTemplateOutlet } from '@angular/common';
import { MAX_LENGTH_OF_FORMS } from '../../../../shared/constants/default-values';

@Component({
  selector: 'app-multi-form-list',
  standalone: true,
  imports: [
    MultiFormItemComponent,
    ReactiveFormsModule,
    MatIcon,
    NgTemplateOutlet,
  ],
  templateUrl: './multi-form-list.component.html',
  styleUrl: './multi-form-list.component.scss',
})
export class MultiFormListComponent {
  @Input() formGroupItems: any[] = [];
  @Input() isDisabled = false;
  @Output() addNewItem: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteItem: EventEmitter<number> = new EventEmitter<number>();

  protected readonly MAX_LENGTH_OF_FORMS = MAX_LENGTH_OF_FORMS;
}
