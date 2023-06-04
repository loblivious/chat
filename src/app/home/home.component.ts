import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomeStore } from './data-access/home.store';
import { combineLatest, map } from 'rxjs';
import { MessageListComponentModule } from './ui/message-list/message-list.component';
import { MessageInputComponentModule } from './ui/message-input/message-input-component';
import { MessageService } from '../shared/data-access/message.service';

@Component({
  selector: 'app-home',
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ion-header>
        <ion-toolbar>
          <ion-title> Chat </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <app-message-list [messages]="vm.messages"></app-message-list>
      </ion-content>
      <ion-footer>
        <app-message-input
          (send)="messageService.addMessage($event)"
        ></app-message-input>
      </ion-footer>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeStore],
})
export class HomeComponent implements OnInit {
  protected store = inject(HomeStore);
  protected messageService = inject(MessageService);

  vm$ = combineLatest([this.store.messages$]).pipe(
    map(([messages]) => ({ messages }))
  );

  ngOnInit() {
    this.store.loadMessages();
  }
}

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IonicModule,
    MessageListComponentModule,
    MessageInputComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
})
export class HomeComponentModule {}
