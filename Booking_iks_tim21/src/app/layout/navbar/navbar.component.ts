import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  role: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // this.role = this.authService.isLoggedIn();
    // console.log('User state changed:', this.role);
    this.authService.userState.subscribe((result) => {
      console.log('User state changed:', result);
      this.role = result;
    });
  }
}
