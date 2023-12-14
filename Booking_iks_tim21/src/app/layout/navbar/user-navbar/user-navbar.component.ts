import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css'],
})
export class UserNavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logOut(): void {
    // localStorage.removeItem('user');
    // this.authService.setUser();
    // this.router.navigate(['/mainPage']);
    this.authService.logout().subscribe({
      next: (_) => {
        localStorage.removeItem('user');
        this.authService.setUser();
        this.router.navigate(['/mainPage']);
      },
    });
  }
}
