import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  NgModule,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-message-input',
  template: `
    <ion-toolbar color="primary">
      <ion-textarea
        [formControl]="messageControl"
        placeholder="type message..."
      ></ion-textarea>
      <ion-buttons slot="primary">
        <ion-button (click)="sendMessage()">
          <ion-icon slot="icon-only" name="send"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  `,
  styles: [
    `
      ion-textarea {
        font-size: 1.2em !important;
        --padding-top: 25px;
        --padding-start: 15px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInputComponent {
  @Output() send = new EventEmitter<string>();

  messageControl = new FormControl('');

  sendMessage() {
    if (this.messageControl.value) {
      this.send.emit(this.messageControl.value);
      this.messageControl.reset();
    }
  }
}

@NgModule({
  declarations: [MessageInputComponent],
  imports: [IonicModule, ReactiveFormsModule],
  exports: [MessageInputComponent],
})
export class MessageInputComponentModule {}
