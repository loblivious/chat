import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login-form',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {}

@NgModule({
  declarations: [LoginFormComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [LoginFormComponent],
})
export class LoginFormComponentModule {}
