export interface SendMessage {
  author: string;
  text: string;
}

export interface TypingStatusMessage {
  isTyping: boolean;
  author: string;
}
