import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/User/user-store.service';
import { UserService } from 'src/app/User/user.service';
import { TransactionService } from 'src/app/base/transaction.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public formIsDirty: boolean = false;
  constructor(
    private service: UserService,
    private tService: TransactionService
  ) {}
  ngOnInit(): void {
    this.formIsDirty = this.tService.formIsDirty;
  }
  signOut() {
    this.service.signOut();
  }
  saveChanges() {
    this.tService.triggerSaveClicked();
  }

  discardChanges() {
    this.tService.triggerDiscardClicked();
  }
}
