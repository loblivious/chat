import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { Credentials } from 'src/app/shared/interfaces/credentials';

export type LoginStatus = 'pending' | 'authenticating' | 'success' | 'error';

interface LoginState {
  status: LoginStatus;
  registerModalIsOpen: boolean;
}

@Injectable()
export class LoginStore extends ComponentStore<LoginState> {
  status$ = this.select((state) => state.status);
  registerModalIsOpen$ = this.select((state) => state.registerModalIsOpen);

  login = this.effect((credentials$: Observable<Credentials>) =>
    credentials$.pipe(
      tap(() => this.patchState({ status: 'authenticating' })),
      switchMap((credentials) =>
        this.authService.login(credentials).pipe(
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
    private navController: NavController
  ) {
    super({ status: 'pending', registerModalIsOpen: false });
  }

  setRegisterModalOpen(isOpen: boolean) {
    this.patchState({ registerModalIsOpen: isOpen });
  }
}
