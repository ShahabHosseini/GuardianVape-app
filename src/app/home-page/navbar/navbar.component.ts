import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/User/user-store.service';
import { UserService } from 'src/app/User/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private service: UserService) {}
  ngOnInit(): void {}
  signOut() {
    this.service.signOut();
  }
}
