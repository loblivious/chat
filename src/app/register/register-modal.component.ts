import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  inject,
} from '@angular/core';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { RegisterFormComponentModule } from './ui/register-form/register-form.component';
import { BehaviorSubject } from 'rxjs';
import { Credentials } from '../shared/interfaces/credentials';
import { AuthService } from '../shared/data-access/auth.service';

export type RegisterStatus = 'pending' | 'creating' | 'success' | 'error';

@Component({
  selector: 'app-register-modal',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Create Account</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="modalController.dismiss()">
            <ion-icon name="close" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <app-register-form
        *ngIf="registerStatus$ | async as status"
        (register)="registerAccount($event)"
        [registerStatus]="status"
      ></app-register-form>
    </ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterModalComponent {
  private authService = inject(AuthService);
  protected modalController = inject(ModalController);
  private navController = inject(NavController);

  registerStatus$ = new BehaviorSubject<RegisterStatus>('pending');

  async registerAccount(credentials: Credentials) {
    this.registerStatus$.next('creating');

    try {
      await this.authService.createAccount(credentials);
      this.registerStatus$.next('success');
      this.modalController.dismiss();
      this.navController.navigateRoot('/home');
    } catch (err) {
      this.registerStatus$.next('error');
    }
  }
}

@NgModule({
  declarations: [RegisterModalComponent],
  imports: [CommonModule, IonicModule, RegisterFormComponentModule],
  exports: [RegisterModalComponent],
})
export class RegisterModalComponentModule {}
