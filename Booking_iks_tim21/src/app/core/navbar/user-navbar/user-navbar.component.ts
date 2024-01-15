import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {NotificationService} from "../../services/notification/notification.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css'],
})
export class UserNavbarComponent {
  role: string = '';

  constructor(private authService: AuthService, private router: Router,private notifService:NotificationService) {}

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }

  ngOnInit(): void {
    this.authService.userState.subscribe((result) => {
      this.role = result;
    });
  }

  logOut(): void {
    this.authService.logout().subscribe({
      next: (_) => {
        this.notifService.closeSocket();
        sessionStorage.removeItem('user');
        this.authService.setUser();
        this.router.navigate(['/homePage']);
        sessionStorage.removeItem("userId")
      },
    });
    this.notifService
  }


}
