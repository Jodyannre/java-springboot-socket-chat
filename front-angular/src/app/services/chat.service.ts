import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import { ChatMessage } from '../models/chat-message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any;

  constructor() { 
    this.initConnectionSocket();
  }

  //Iniciar conexión con socket
  initConnectionSocket(){
    const url = "//localhost:3000/chat-socket";
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(()=> socket);
  }

  //Ingresar a una sala de chat
  joinRoom(roomId: String) {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${roomId}`, (messages:any) => {
        const messageContent = JSON.parse(messages.body);
        console.log(messageContent);
      })
    })
  }

  //Enviar un mensaje

  sendMessage(roomId: String, chatMessage: ChatMessage) {
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage));
  }


}
