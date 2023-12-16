import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationDetailsDTO } from 'src/app/accommodation-details/model/AccommodationDetailsDTO';
import { AccommodationDetailsService } from 'src/app/accommodation-details/service/accommodation-details.service';

@Component({
  selector: 'app-owners-accommodation-details',
  templateUrl: './owners-accommodation-details.component.html',
  styleUrls: ['./owners-accommodation-details.component.css'],
})
export class OwnersAccommodationDetailsComponent {
  selected: null | undefined;
  id: number;
  acc: AccommodationDetailsDTO;
  constructor(
    private route: ActivatedRoute,
    private service: AccommodationDetailsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;

    this.service.findById(this.id).subscribe((data) => {
      this.acc = data;
    });
  }

  protected readonly Array = Array;
}
