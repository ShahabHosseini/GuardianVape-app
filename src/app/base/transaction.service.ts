import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private saveClickSubject = new Subject<void>();
  private discardClickSubject = new Subject<void>();
  public formIsDirty: boolean = false;
  saveClicked$ = this.saveClickSubject.asObservable();
  discardClicked$ = this.discardClickSubject.asObservable();

  constructor() {}

  triggerSaveClicked() {
    this.saveClickSubject.next();
  }

  triggerDiscardClicked() {
    this.discardClickSubject.next();
  }
}
