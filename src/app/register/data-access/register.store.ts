import { Injectable } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, from, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { Credentials } from 'src/app/shared/interfaces/credentials';

export type RegisterStatus = 'pending' | 'creating' | 'success' | 'error';

interface RegisterState {
  status: RegisterStatus;
}

@Injectable()
export class RegisterStore extends ComponentStore<RegisterState> {
  status$ = this.select((state) => state.status);

  register = this.effect((credentials$: Observable<Credentials>) =>
    credentials$.pipe(
      tap(() => this.patchState({ status: 'creating' })),
      switchMap((credentials) =>
        this.authService.createAccount(credentials);
          tapResponse(
            () => {
              this.patchState({ status: 'success' });
              this.navController.navigateRoot('/home');
            },
            () => this.patchState({ status: 'error' })
          )
        )
      )
    )
  );

  constructor(
    private authService: AuthService,
    private modalController: ModalController,
    private navController: NavController
  ) {
    super({ status: 'pending' });
  }
}
