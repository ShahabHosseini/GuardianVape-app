import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../Model/userDto';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiDto } from '../Model/token-api.dto';
import { ResetPasswordDto } from '../Model/reset-password-dto';

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

  storeRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
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
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getfullNameFromToken() {
    if (this.userPayload) return this.userPayload.unique_name;
  }

  getRoleFromToken() {
    if (this.userPayload) return this.userPayload.role;
  }

  renewToken(tokenApi: TokenApiDto) {
    return this.http.post<any>(`${this.userUrl}refresh`, tokenApi);
  }

  sendResetPasswordLink(email: string) {
    return this.http.post<any>(`${this.userUrl}send-reset-email/${email}`, {});
  }
  resetPassord(resetPasswordDto: ResetPasswordDto) {
    return this.http.post<any>(
      `${this.userUrl}reset-password`,
      resetPasswordDto
    );
  }
}
