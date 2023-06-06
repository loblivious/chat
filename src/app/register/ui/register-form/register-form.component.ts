import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Credentials } from 'src/app/shared/interfaces/credentials';
import { RegisterStatus } from '../../register-modal.component';

@Component({
  selector: 'app-register-form',
  template: `
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" #form="ngForm">
      <ion-item lines="none">
        <ion-icon slot="start" name="mail-outline"></ion-icon>
        <ion-input
          formControlName="email"
          type="email"
          placeholder="email"
        ></ion-input>
      </ion-item>
      <ion-item lines="none">
        <ion-icon slot="start" name="lock-closed-outline"></ion-icon>
        <ion-input
          formControlName="password"
          type="password"
          placeholder="password"
        ></ion-input>
      </ion-item>
      <ion-item lines="none">
        <ion-icon slot="start" name="lock-closed-outline"></ion-icon>
        <ion-input
          formControlName="confirmPassword"
          type="password"
          placeholder="confirm password"
        ></ion-input>
      </ion-item>
      <ion-button type="submit" expand="full"> Submit </ion-button>
    </form>
  `,
  styles: [
    `
      :host {
        height: 100%;
      }
      form {
        text-align: right;
      }
      ion-note {
        margin: 0 1rem 1rem 1rem;
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  private fb = inject(FormBuilder);
  @Output() register = new EventEmitter<Credentials>();
  @Input() registerStatus!: RegisterStatus;

  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const { confirmPassword, ...credentials } =
        this.registerForm.getRawValue();
      this.register.emit(credentials);
    }
  }
}

@NgModule({
  declarations: [RegisterFormComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [RegisterFormComponent],
})
export class RegisterFormComponentModule {}
