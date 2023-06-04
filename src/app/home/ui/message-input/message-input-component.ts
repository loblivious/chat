import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-message-input',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInputComponent {}

@NgModule({
  declarations: [MessageInputComponent],
  imports: [CommonModule, IonicModule],
  exports: [MessageInputComponent],
})
export class MessageInputComponentModule {}
