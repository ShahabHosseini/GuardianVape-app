import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../Model/userDto';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  userUrl: string = this.baseUrl + 'Auth/';
  private userPayload: any;

  constructor(private http: HttpClient, private router: Router) {
    super();
    this.userPayload = this.decodedToken();
  }

  signUp(userDto: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.userUrl}register`, userDto);
  }
  login(userDto: UserDto): Observable<any> {
    return this.http.post<UserDto>(`${this.userUrl}authenticate`, userDto);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLogin(): boolean {
    return !!localStorage.getItem('token');
  }
  signOut() {
    // localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['login']);
  }
  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken() {
    if (this.userPayload) return this.userPayload.unique_name;
  }
  getRoleFromToken() {
    if (this.userPayload) return this.userPayload.role;
  }
}
