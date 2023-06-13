import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../Model/userDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  userUrl: string = this.baseUrl + 'Auth/';
  constructor(private http: HttpClient) {
    super();
  }

  signUp(userDto: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.userUrl}register`, userDto);
  }
  login(userDto: UserDto) {
    return this.http.post<UserDto>(`${this.userUrl}authenticate`, userDto);
  }
}
