import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/profile/model/user.model';
import { UserService } from 'src/app/profile/user.service';
import {AccommodationPreviewDTO} from "../../features/home/components/accommodation-preview/model/accommodationPreviewDTO";

@Component({
  selector: 'app-owners-accommodation-preview',
  templateUrl: './owners-accommodation-preview.component.html',
  styleUrls: ['./owners-accommodation-preview.component.css'],
})
export class OwnersAccommodationPreviewComponent {
  @Input() accommodationPreview: AccommodationPreviewDTO;
}
