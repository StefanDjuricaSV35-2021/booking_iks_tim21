import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthModule } from '../../auth.module';
import { UserService } from 'src/app/core/services/user/user.service';
import { ActivationRequest } from 'src/app/core/models/activationRequest.model';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-activate.account',
  templateUrl: './activate.account.component.html',
  styleUrls: ['./activate.account.component.css'],
})
export class ActivateAccountComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  public email: string;

  ngOnInit() {
    let e = this.route.snapshot.paramMap.get('email');
    if (e == null) {
      alert('Error wrong page path!!!');
      this.router.navigate(['homePage']);
    } else {
      this.userService.getActivationRequest(e).subscribe({
        next: (data: ActivationRequest) => {
          this.email = data.email;
        },
        error: (error) => {
          console.error(
            'Failed to load page duo to invalid or expired request:',
            error
          );

          const errorMessage =
            error?.error?.message ||
            'Failed to load page duo to invalid or expired request.';
          alert(errorMessage);
          this.router.navigate(['homePage']);
        },
      });
    }
  }

  activate() {
    this.userService.activateAccount(this.email).subscribe({
      next: (data: User) => {
        alert(
          'You have successfully activated your account you will be redirected to login page.'
        );
        this.router.navigate(['login']);
      },
      error: (error) => {
        console.error('Something went wrong upon account activation:', error);

        const errorMessage =
          error?.error?.message ||
          'Something went wrong upon account activation.';
        alert(errorMessage);
        this.router.navigate(['homePage']);
      },
    });
  }
}
