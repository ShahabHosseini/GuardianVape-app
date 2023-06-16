import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  userUrl: string = this.baseUrl + 'Auth/';
  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  getUsers() {
    return this.http.get<any>(this.userUrl);
  }
}
