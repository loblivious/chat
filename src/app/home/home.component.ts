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

@Component({
  selector: 'app-home',
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ion-header>
        <ion-toolbar>
          <ion-title> Home </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <app-message-list [messages]="vm.messages"></app-message-list>
      </ion-content>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeStore],
})
export class HomeComponent implements OnInit {
  protected store = inject(HomeStore);

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
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
})
export class HomeComponentModule {}
