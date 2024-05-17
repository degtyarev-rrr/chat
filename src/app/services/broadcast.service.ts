import { Injectable, NgZone } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { SendMessage, TypingStatusMessage } from '../models/message.interface';
import { BroadcastMessage } from '../models/broadcast.interface';
import { MessageType } from '../constants/messages.constants';

@Injectable({
  providedIn: 'root',
})
export class BroadcastService {
  private broadcastChannel: BroadcastChannel;
  private messagesSubject = new Subject<BroadcastMessage>();

  constructor(private ngZone: NgZone) {
    this.broadcastChannel = new BroadcastChannel('chat_channel');
    this.broadcastChannel.onmessage = (event) => {
      this.ngZone.run(() => {
        this.messagesSubject.next(event.data);
      });
    };
  }

  sendMessage(payload: SendMessage | TypingStatusMessage, type: MessageType): void {
    this.broadcastChannel.postMessage({ type, payload });
  }

  getMessages(): Observable<BroadcastMessage> {
    return this.messagesSubject;
  }
}
