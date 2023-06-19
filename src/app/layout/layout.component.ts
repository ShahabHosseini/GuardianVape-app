import { Component } from '@angular/core';
import { UserService } from '../User/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(public service: UserService) {}
}
