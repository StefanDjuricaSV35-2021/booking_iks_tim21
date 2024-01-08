import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../core/models/user.model";
import {UserReportModule} from "../user-report.module";

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent {
  @Input() user : User;
  @Input() isSelected: boolean = false;
  @Output() cardSelected = new EventEmitter<number>();
  constructor(
  ) {
  }
  selectCard() {
    this.cardSelected.emit();
  }
}
