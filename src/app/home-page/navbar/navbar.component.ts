import { Component } from '@angular/core';
import { UserService } from 'src/app/User/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private service: UserService) {}
  signOut() {
    this.service.signOut();
  }
}
