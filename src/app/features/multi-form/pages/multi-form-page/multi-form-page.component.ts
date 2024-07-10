import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MultiFormListComponent } from '../../components/multi-form-list/multi-form-list.component';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { IFormItem } from '../../interfaces/form-item.interface';
import { CountryValidator } from '../../../../shared/Validators/CountryValidator';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { FormService } from '../../services/form.service';
import {
  DEFAULT_START_DUE,
  DEFAULT_TIMER_INTERVAL,
  DURATION_TIME,
  MAX_CANCEL_DURATION,
  MAX_LENGTH_OF_FORMS,
  MIN_VALUE_FOR_DELETE,
  TIMER_REMAIN,
} from '../../../../shared/constants/default-values';
import { TButtonColors } from '../../../../shared/enum/button-colors';
import { DisplayTimeConverterPipe } from '../../pipes/display-time-converter.pipe';
import { MatHint } from '@angular/material/form-field';

@Component({
  selector: 'app-multi-form-page',
  standalone: true,
  imports: [
    ButtonComponent,
    MultiFormListComponent,
    DisplayTimeConverterPipe,
    MatHint,
  ],
  templateUrl: './multi-form-page.component.html',
  styleUrl: './multi-form-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiFormPageComponent implements OnInit {
  public formArray!: FormArray;
  public isSubmitting = false;
  public remainingTime = TIMER_REMAIN;
  public timerSubscription!: Subscription;
  protected readonly MAX_LENGTH_OF_FORMS = MAX_LENGTH_OF_FORMS;
  protected readonly TButtonColors = TButtonColors;
  private cancelSubject = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  public submitForms(): void {
    if (this.formArray.valid) {
      this.isSubmitting = true;
      this.cancelSubject.next();

      this.startTimer();

      const delay$ = new Observable((observer) => {
        const timeoutId = setTimeout(() => {
          observer.next();
          observer.complete();
        }, MAX_CANCEL_DURATION);

        return () => clearTimeout(timeoutId);
      });

      delay$
        .pipe(
          takeUntil(this.cancelSubject),
          switchMap(() =>
            this.formService.submitForm(this.formArray.getRawValue()),
          ),
        )
        .subscribe(() => {
          this.isSubmitting = false;
          this.remainingTime = TIMER_REMAIN;
          this.initializeForm();
          this.cdr.markForCheck();
        });
    }
  }

  public get getFormGroups(): FormGroup<IFormItem>[] {
    return this.formArray.controls as FormGroup<IFormItem>[];
  }

  public deleteItem(index: number): void {
    if (this.formArray.length > MIN_VALUE_FOR_DELETE) {
      this.formArray.removeAt(index);
    }
  }

  public addNewItem(): void {
    this.formArray.push(
      this.fb.group<IFormItem>({
        country: new FormControl('', [
          Validators.required,
          CountryValidator.validCountry,
        ]),
        userName: new FormControl(
          '',
          [Validators.required],
          [this.userNameValidator()],
        ),
        birthDate: new FormControl(new Date(), Validators.required),
      }),
    );
  }

  public cancelSubmission(): void {
    this.cancelSubject.next();
    this.isSubmitting = false;
    this.remainingTime = TIMER_REMAIN;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  public startTimer(): void {
    this.timerSubscription = timer(DEFAULT_START_DUE, DEFAULT_TIMER_INTERVAL)
      .pipe(
        takeUntil(this.cancelSubject),
        tap(() => this.remainingTime--),
        takeUntil(timer(MAX_CANCEL_DURATION)),
      )
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  private userNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return of(control.value).pipe(
        debounceTime(DURATION_TIME),
        distinctUntilChanged(),
        switchMap((username) => this.formService.checkUser(username)),
        map((response: any) =>
          response.isAvailable ? null : { usernameTaken: true },
        ),
        catchError(() => of(null)),
      );
    };
  }

  private initializeForm(): void {
    this.formArray = this.fb.array<FormGroup<IFormItem>>([
      this.fb.group<IFormItem>({
        country: new FormControl('', [
          Validators.required,
          CountryValidator.validCountry,
        ]),
        userName: new FormControl(
          '',
          [Validators.required],
          [this.userNameValidator()],
        ),
        birthDate: new FormControl(new Date(), Validators.required),
      }),
    ]);
  }
}
