import { Component } from '@angular/core';
import { OnInit  } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/chat-message';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgClass ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit  {

  messageInput: String = ""
  userId: String = ""
  messagesList:any[] = []

  constructor(private chatService: ChatService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['idUser'];
    this.chatService.joinRoom('room1');
    this.listenerMessage();
  }

  sendMessage() {
    const message = {
      message: this.messageInput,
      user: this.userId
    } as ChatMessage 
    this.chatService.sendMessage('room1', message)
    this.messageInput = ""
  }

  listenerMessage(){
    this.chatService.getMessageSubject().subscribe((messages: any) => {
      this.messagesList = messages.map((item: any) => (
        {
        ...item,
        message_side : item.user === this.userId ? 'sender' : 'receiver'
    })
    )
    })
  }


}
