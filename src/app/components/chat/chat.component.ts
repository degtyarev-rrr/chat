import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { BroadcastService } from '../../services/broadcast.service';
import { UserService } from '../../services/user.service';
import { MessageComponent } from '../message/message.component';
import { ChatForm } from '../../models/chat-form.interface';
import { SendMessage, TypingStatusMessage } from '../../models/message.interface';
import { MESSAGE_TYPING_PART, MessageType } from '../../constants/messages.constants';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MessageComponent, NgFor],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  chatForm: FormGroup<ChatForm>;
  messages: SendMessage[] = [];
  typingIndicator = '';
  username: string;

  constructor(
    private fb: FormBuilder,
    private broadcastService: BroadcastService,
    private userService: UserService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.username = this.userService.getUsername();
    this.broadcastService
      .getMessages()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((message) => {
        if (message.type === MessageType.SEND) {
          this.messages.push(<SendMessage>message.payload);
        } else if (message.type === MessageType.TYPING_STATUS) {
          const typingMessage = <TypingStatusMessage>message.payload;
          this.typingIndicator = typingMessage.isTyping ? `${typingMessage.author} ${MESSAGE_TYPING_PART}` : '';
        }
      });
  }

  onSendMessage(): void {
    if (this.chatForm.value.message) {
      const text = this.chatForm.value.message;
      const message = { author: this.username, text };
      this.messages.push(message);
      this.broadcastService.sendMessage(message, MessageType.SEND);
      this.clearForm();
    }
  }

  onTypeMessage(status: boolean): void {
    const message = { author: this.username, isTyping: status };
    this.broadcastService.sendMessage(message, MessageType.TYPING_STATUS);
  }

  private initializeForm(): void {
    this.chatForm = this.fb.nonNullable.group({
      message: ['', [Validators.required]],
    });
  }

  private clearForm(): void {
    this.chatForm.reset();
  }
}
