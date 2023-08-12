import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Credentials } from 'src/app/shared/interfaces/credentials';
import { CreateStatus } from '../data-access/create.store';
import { passwordMatchesValidator } from '../utils/password-matches';

@Component({
  selector: 'app-create-form',
  template: `
    <form [formGroup]="createForm" (ngSubmit)="onSubmit()" #form="ngForm">
      <ion-item lines="none">
        <ion-icon slot="start" name="mail-outline"></ion-icon>
        <ion-input
          formControlName="email"
          type="email"
          placeholder="email"
        ></ion-input>
      </ion-item>
      <ion-note
        color="danger"
        *ngIf="
          (createForm.controls.email.dirty || form.submitted) &&
          !createForm.controls.email.valid
        "
      >
        Please provide a valid email
      </ion-note>
      <ion-item lines="none">
        <ion-icon slot="start" name="lock-closed-outline"></ion-icon>
        <ion-input
          formControlName="password"
          type="password"
          placeholder="password"
        ></ion-input>
      </ion-item>
      <ion-note
        color="danger"
        *ngIf="
          (createForm.controls.password.dirty || form.submitted) &&
          !createForm.controls.password.valid
        "
      >
        Password must be at least 8 characters long
      </ion-note>
      <ion-item lines="none">
        <ion-icon slot="start" name="lock-closed-outline"></ion-icon>
        <ion-input
          formControlName="confirmPassword"
          type="password"
          placeholder="confirmPassword"
        ></ion-input>
      </ion-item>
      <ion-note
        color="danger"
        *ngIf="
          (createForm.controls.confirmPassword.dirty || form.submitted) &&
          !createForm.controls.confirmPassword.valid
        "
      >
        Must match password field
      </ion-note>
      <ion-note color="danger" *ngIf="createStatus === 'error'">
        Could not create account with those credentials
      </ion-note>
      <ion-button
        type="submit"
        expand="full"
        [disabled]="createStatus === 'creating'"
      >
        <ion-spinner *ngIf="createStatus === 'creating'"></ion-spinner>
        Submit
      </ion-button>
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
export class CreateFormComponent {
  @Output() create = new EventEmitter<Credentials>();
  @Input() createStatus: CreateStatus = 'pending';

  createForm = this.fb.nonNullable.group(
    {
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    { updateOn: 'blur', validators: [passwordMatchesValidator] }
  );

  constructor(private fb: FormBuilder) {}

  protected onSubmit() {
    if (this.createForm.valid) {
      const { confirmPassword, ...credentials } = this.createForm.getRawValue();
      this.create.emit(credentials);
    }
  }
}

@NgModule({
  declarations: [CreateFormComponent],
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  exports: [CreateFormComponent],
})
export class CreateFormComponentModule {}