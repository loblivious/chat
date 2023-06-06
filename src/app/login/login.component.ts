import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, IonRouterOutlet } from '@ionic/angular';
import { LoginStore } from './data-access/login.store';
import { combineLatest, map } from 'rxjs';
import { LoginFormComponentModule } from './ui/login-form/login-form.component';
import { RegisterModalComponentModule } from '../register/register-modal.component';

@Component({
  selector: 'app-login',
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ion-content>
        <div class="container">
          <img src="./assets/images/logo.png" alt="logo" />
          <app-login-form
            (login)="store.login($event)"
            [loginStatus]="vm.status"
          ></app-login-form>
          <ion-modal
            [isOpen]="vm.registerModalIsOpen"
            [presentingElement]="routerOutlet.nativeEl"
            [canDismiss]="true"
            (ionModalDidDismiss)="store.setRegisterModalOpen(false)"
          >
            <ng-template>
              <app-register-modal></app-register-modal>
            </ng-template>
          </ion-modal>
        </div>
      </ion-content>
      <ion-footer>
        <ion-button
          expand="full"
          data-test="open-register-button"
          (click)="store.setRegisterModalOpen(true)"
        >
          Register
        </ion-button>
      </ion-footer>
    </ng-container>
  `,
  styles: [
    `
      ion-content {
        --background: linear-gradient(
          62deg,
          var(--ion-color-primary) 0%,
          var(--ion-color-secondary) 100%
        );
      }
      ion-footer {
        background: linear-gradient(
          242deg,
          var(--ion-color-primary) 0%,
          var(--ion-color-secondary) 100%
        );
      }
      .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
          padding: 2rem;
          filter: drop-shadow(2px 4px 6px var(--ion-color-primary-shade));
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginStore],
})
export class LoginComponent {
  protected store = inject(LoginStore);
  protected routerOutlet = inject(IonRouterOutlet);

  vm$ = combineLatest([
    this.store.status$,
    this.store.registerModalIsOpen$,
  ]).pipe(
    map(([status, registerModalIsOpen]) => ({ status, registerModalIsOpen }))
  );
}

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
      },
    ]),
    LoginFormComponentModule,
    RegisterModalComponentModule,
  ],
})
export class LoginComponentModule {}
