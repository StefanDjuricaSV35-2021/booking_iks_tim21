import { Injectable } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import SockJS from "sockjs-client/dist/sockjs"

import {NotificationDTO, NotificationType} from "../../models/NotificationDTO";
import {environment} from "../../../../env/env";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../../models/user.model";
import {UserService} from "../user/user-service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";




@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor( private userService:UserService,private snackBar: MatSnackBar) {
  }

  ngOnDestroy(){
    this.stompClient.disconnect;
  }

  initialize(): void {
    this.initializeWebSocketConnection()
  }


  public stompClient;
  public msg = [];
  initializeWebSocketConnection() {
    const serverUrl = environment.apiHost+"socket";
    let ws=new SockJS(serverUrl)

    this.stompClient = Stomp.Stomp.over(ws);

    this.stompClient.connect({}, ()=> {
      console.log('Connected to WebSocket');

      if(sessionStorage.getItem("userId")){
        this.openSocket()
      }
    });


  }


  openSocket() {
        const loggedUserId=sessionStorage.getItem("userId");

        const destination = `/user/${loggedUserId}/specific`;
        this.stompClient.subscribe(destination, (message) => {
          let duration=6000
            this.snackBar.open(message.body, 'Close', {
              horizontalPosition: "end",
              verticalPosition: "bottom",
              panelClass: ['custom-snackbar'],
            });

        });
  }

  closeSocket() {

    const loggedUserId=sessionStorage.getItem("userId");

    const destination = `/user/${loggedUserId}/specific`;
    this.stompClient.unsubscribe(destination)
  }


  sendMessage(): void {

    let not=new NotificationDTO(NotificationType.ACCOMMODATION_REVIEW,"aa",3)
    this.stompClient.send("/notifications-ws/send", {}, JSON.stringify(not));
  }


}

