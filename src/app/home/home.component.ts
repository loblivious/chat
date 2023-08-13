import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonContent, IonicModule } from '@ionic/angular';
import { combineLatest, map, startWith, tap } from 'rxjs';
import { AuthService } from '../shared/data-access/auth.service';
import { MessageService } from '../shared/data-access/message.service';
import { HomeStore } from './data-access/home.store';
import { MessageInputComponentModule } from './ui/message-input.component';
import { MessageListComponentModule } from './ui/message-list.component';

@Component({
  selector: 'app-home',
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ion-header class="ion-no-border">
        <ion-toolbar color="primary">
          <ion-title>
            <img src="assets/images/logo.png" />
          </ion-title>
          <ion-buttons slot="start">
            <ion-button (click)="store.logout()">
              <ion-icon name="log-out-outline" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <app-message-list
          *ngIf="vm.user"
          [messages]="vm.messages"
          [activeUser]="vm.user"
        ></app-message-list>
      </ion-content>
      <ion-footer>
        <app-message-input
          (send)="messageService.addMessage($event)"
        ></app-message-input>
      </ion-footer>
    </ng-container>
  `,
  styles: [
    `
      ion-content {
        --ion-background-color: var(--ion-color-primary);
      }

      ion-title img {
        max-height: 39px;
        margin-top: 9px;
        filter: drop-shadow(2px 4px 6px var(--ion-color-primary-shade));
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeStore],
})
export class HomeComponent implements OnInit {
  @ViewChild(IonContent) ionContent!: IonContent;
  
  vm$ = combineLatest([
    this.store.messages$,
    this.authService.user$.pipe(startWith(null)),
  ]).pipe(map(([messages, user]) => ({ messages, user })));

  constructor(
    protected store: HomeStore,
    protected messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.store.loadMessages();
    this.store.messages$.pipe(
      tap(() => setTimeout(() => this.ionContent?.scrollToBottom(200), 0))
    );
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
