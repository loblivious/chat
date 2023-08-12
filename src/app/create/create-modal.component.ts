import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CreateStore } from './data-access/create.store';
import { CreateFormComponentModule } from './ui/create-form.component';

@Component({
  selector: 'app-create-modal',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Create Account</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="modalControl.dismiss()">
            <ion-icon name="close" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <app-create-form
        *ngIf="store.status$ | async as status"
        (create)="store.createAccount($event)"
        [createStatus]="status"
      ></app-create-form>
    </ion-content>
  `,
  styles: [
    `
      :host {
        height: 100%;
      }

      ion-content {
        --background: linear-gradient(
          62deg,
          var(--ion-color-primary) 0%,
          var(--ion-color-secondary) 100%
        );
      }
    `,
  ],
  providers: [CreateStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateModalComponent {
  constructor(
    protected store: CreateStore,
    protected modalControl: ModalController
  ) {}
}

@NgModule({
  declarations: [CreateModalComponent],
  imports: [IonicModule, CommonModule, CreateFormComponentModule],
  exports: [CreateModalComponent],
})
export class CreateModalComponentModule {}
