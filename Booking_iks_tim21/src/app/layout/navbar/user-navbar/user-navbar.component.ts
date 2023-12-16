import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css'],
})
export class UserNavbarComponent {
  role: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  role: string = '';

  ngOnInit(): void {
    this.role = this.authService.getRole();
  }

  someMethod() {
    this.trigger.openMenu();
  }

  ngOnInit(): void {
    this.authService.userState.subscribe((result) => {
      console.log('User state changed:', result);
      this.role = result;
    });
  }

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
