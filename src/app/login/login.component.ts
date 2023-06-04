import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}

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
  ],
})
export class LoginComponentModule {}
