import { Component, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { SendMessage } from '../../models/message.interface';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  @Input() message: SendMessage;
}
