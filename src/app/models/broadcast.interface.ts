import { MessageType } from '../constants/messages.constants';
import { SendMessage, TypingStatusMessage } from './message.interface';

export interface BroadcastMessage {
  type: MessageType;
  payload: TypingStatusMessage | SendMessage;
  author: string;
}
