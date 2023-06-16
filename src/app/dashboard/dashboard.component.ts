import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { UserService } from '../User/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public users: any = [];
  constructor(private api: ApiService, private userService: UserService) {
    //localStorage.clear();
  }
  ngOnInit(): void {
    this.api.getUsers().subscribe((res) => {
      this.users = res;
    });
  }
}
