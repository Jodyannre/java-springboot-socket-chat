import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/chat-message';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit  {

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.joinRoom('room1');
  }

  sendMessage() {
    const message = {
      message: 'Hola mundo',
      user: 'user1'
    } as ChatMessage 
    this.chatService.sendMessage('room1', message)
  }

}
