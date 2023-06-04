import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  limit,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private firestore: Firestore = inject(Firestore);

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
}
