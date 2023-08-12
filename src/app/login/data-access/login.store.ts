import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { Credentials } from 'src/app/shared/interfaces/credentials';

export type LoginStatus = 'pending' | 'authenticating' | 'success' | 'error';

interface LoginState {
  status: LoginStatus;
  createModalIsOpen: boolean;
}

@Injectable()
export class LoginStore extends ComponentStore<LoginState> {
  status$ = this.select((state) => state.status);
  createModalIsOpen$ = this.select((state) => state.createModalIsOpen);

  login = this.effect((credential$: Observable<Credentials>) =>
    credential$.pipe(
      tap(() => this.patchState({ status: 'authenticating' })),
      switchMap((creadentials) =>
        this.authService.login(creadentials).pipe(
          tapResponse(
            (user) => {
              this.patchState({ status: 'success' });
              this.navControl.navigateRoot('/home');
            },
            (error) => this.patchState({ status: 'error' })
          )
        )
      )
    )
  );

  constructor(
    private authService: AuthService,
    private navControl: NavController
  ) {
    super({ status: 'pending', createModalIsOpen: false });
  }

  setCreateModalOpen(isOpen: boolean) {
    this.patchState({ createModalIsOpen: isOpen });
  }
}
