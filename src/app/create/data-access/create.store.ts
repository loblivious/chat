import { Injectable } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { Credentials } from 'src/app/shared/interfaces/credentials';

export type CreateStatus = 'pending' | 'creating' | 'success' | 'error';

interface CreateState {
  status: CreateStatus;
}

@Injectable()
export class CreateStore extends ComponentStore<CreateState> {
  status$ = this.select((state) => state.status);

  constructor(
    private authService: AuthService,
    private modalControl: ModalController,
    private navControl: NavController
  ) {
    super({ status: 'pending' });
  }

  createAccount = this.effect((credentials$: Observable<Credentials>) =>
    credentials$.pipe(
      tap(() => this.patchState({ status: 'creating' })),
      switchMap((credentials) =>
        this.authService.createAccount(credentials).pipe(
          tapResponse(
            (user) => {
              this.patchState({ status: 'success' });
              this.modalControl.dismiss();
              this.navControl.navigateRoot('/home');
            },
            (error) => this.patchState({ status: 'error' })
          )
        )
      )
    )
  );
}
