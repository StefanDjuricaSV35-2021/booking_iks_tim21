import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;

  constructor(private route: ActivatedRoute, private service: ProfileService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['userId'];
      //hardcoded to get user with id 7, for now.
      this.service.getUser(7).subscribe({
        next: (data: User) => {
          this.user = data;
        },
      });
    });
  }
}
