import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private fullName$ = new BehaviorSubject<string>('');
  private role$ = new BehaviorSubject<string>('');
  constructor() {}

  public getRoleFromStone() {
    return this.role$.asObservable();
  }

  public setRoleForStone(role: string) {
    this.role$.next(role);
  }
  public getFullNameFromStone() {
    return this.role$.asObservable();
  }

  public setFullNameForStone(fullName: string) {
    this.role$.next(fullName);
  }
}
