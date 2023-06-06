import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  limit,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { Observable, map, take } from 'rxjs';
import { Message } from '../interfaces/message';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  getMessages() {
    const messageCollection = query(
      collection(this.firestore, 'messages'),
      orderBy('created', 'desc'),
      limit(50)
    );
    return collectionData(messageCollection, { idField: 'id' }).pipe(
      map((messages) => [...messages].reverse())
    ) as Observable<Message[]>;
  }

  addMessage(message: string) {
    this.authService.user$.pipe(take(1)).subscribe((user) => {
      if (user?.email) {
        const newMessage: Message = {
          author: 'me@test.com',
          content: message,
          created: Date.now().toString(),
        };
        const messageCollection = collection(this.firestore, 'messages');
        addDoc(messageCollection, newMessage);
      }
    });
  }
}
