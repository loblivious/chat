import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonRouterOutlet, IonicModule } from '@ionic/angular';
import { combineLatest, map } from 'rxjs';
import { CreateModalComponentModule } from '../create/create-modal.component';
import { LoginStore } from './data-access/login.store';
import { LoginFormComponentModule } from './ui/login-form.component';

@Component({
  selector: 'app-login',
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ion-content>
        <div class="container">
          <img src="./assets/images/logo.png" />
          <app-login-form
            (login)="store.login($event)"
            [loginStatus]="vm.status"
          ></app-login-form>
          <ion-modal
            [isOpen]="vm.createModalIsOpen"
            [presentingElement]="routerOutlet.nativeEl"
            [canDismiss]="true"
            (ionModalDidDismiss)="store.setCreateModalOpen(false)"
          >
            <ng-template>
              <app-create-modal></app-create-modal>
            </ng-template>
          </ion-modal>
        </div>
      </ion-content>
      <ion-footer>
        <ion-button expand="full" (click)="store.setCreateModalOpen(true)">
          Create Account
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
  providers: [LoginStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  vm$ = combineLatest([this.store.status$, this.store.createModalIsOpen$]).pipe(
    map(([status, createModalIsOpen]) => ({ status, createModalIsOpen }))
  );

  constructor(
    protected store: LoginStore,
    protected routerOutlet: IonRouterOutlet
  ) {}
}

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    IonicModule,
    LoginFormComponentModule,
    CreateModalComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
      },
    ]),
  ],
})
export class LoginComponentModule {}
