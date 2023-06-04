import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {}

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, IonicModule],
  exports: [RegisterComponent],
})
export class RegisterComponentModule {}
