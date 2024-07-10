import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatAnchor, MatButton } from '@angular/material/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButton, MatAnchor],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  @Input() isDisabled = false;
  @Input() color = 'primary';
}
